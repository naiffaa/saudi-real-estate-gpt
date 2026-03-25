from pathlib import Path
from typing import Dict, Any, List
import json

import torch

from src.model import SaudiRealEstateModel
from src.parser import parse_user_query, normalize_text
from src.text_tokenizer import tokenize


KNOWN_CITY_TOKENS = {
    "الرياض",
    "جده",
    "جدة",
    "الدمام",
    "الخبر",
    "مكه",
    "مكة",
    "المدينه",
    "المدينة",
}

KNOWN_PROPERTY_TOKENS = {
    "شقه",
    "شقة",
    "شقق",
    "فيلا",
    "فلل",
    "فله",
    "فلة",
    "ارض",
    "أرض",
    "اراضي",
    "أراضي",
    "دور",
    "عماره",
    "عمارة",
    "استراحه",
    "استراحة",
}


def normalize_property_token(token: str):
    token = normalize_text(token)

    if token in {"شقه", "شقة", "شقق"}:
        return "شقه|شقة|شقق"
    if token in {"فيلا", "فلل", "فله", "فلة"}:
        return "فيلا|فلل|فله|فلة"
    if token in {"ارض", "أرض", "اراضي", "أراضي"}:
        return "ارض|أرض|اراضي|أراضي"
    if token == "دور":
        return "دور"
    if token in {"عماره", "عمارة"}:
        return "عماره|عمارة"
    if token in {"استراحه", "استراحة"}:
        return "استراحه|استراحة"

    return token


def normalize_city_token(token: str):
    token = normalize_text(token)

    if token == "جدة":
        return "جده"
    if token == "مكة":
        return "مكه"
    if token == "المدينة":
        return "المدينه"

    return token


class QueryModelInterface:
    def __init__(
        self,
        checkpoint_path: str = "checkpoints/model.pth",
        vocab_path: str = "checkpoints/vocab.json",
        embed_dim: int = 64,
    ):
        self.checkpoint_path = Path(checkpoint_path)
        self.vocab_path = Path(vocab_path)
        self.embed_dim = embed_dim

        self.model = None
        self.vocab = None
        self.id_to_token = None
        self.is_loaded = False

    def load(self):
        if not self.vocab_path.exists():
            raise FileNotFoundError(f"Vocab file not found: {self.vocab_path}")

        if not self.checkpoint_path.exists():
            raise FileNotFoundError(
                f"Checkpoint file not found: {self.checkpoint_path}"
            )

        with open(self.vocab_path, "r", encoding="utf-8") as f:
            self.vocab = json.load(f)

        self.id_to_token = {idx: token for token, idx in self.vocab.items()}

        vocab_size = len(self.vocab)
        model = SaudiRealEstateModel(vocab_size=vocab_size, embed_dim=self.embed_dim)

        state = torch.load(self.checkpoint_path, map_location="cpu")
        model.load_state_dict(state)
        model.eval()

        self.model = model
        self.is_loaded = True

    def encode_tokens(self, tokens: List[str]) -> List[int]:
        if self.vocab is None:
            return []

        unk_id = self.vocab.get("<unk>", 1)
        return [self.vocab.get(tok, unk_id) for tok in tokens]

    def predict_next_tokens(self, query: str, top_k: int = 5) -> List[str]:
        if not self.is_loaded:
            self.load()

        tokens = tokenize(query)
        input_ids = self.encode_tokens(tokens)

        if not input_ids:
            return []

        x = torch.tensor([input_ids], dtype=torch.long)

        with torch.no_grad():
            logits = self.model(x)
            last_logits = logits[0, -1]
            top_ids = torch.topk(
                last_logits, k=min(top_k, last_logits.shape[0])
            ).indices.tolist()

        predicted_tokens = [
            self.id_to_token[idx]
            for idx in top_ids
            if idx in self.id_to_token
        ]
        return predicted_tokens

    def infer_filters(self, query: str) -> Dict[str, Any]:

        filters = parse_user_query(query)

        needs_city = filters.get("city") is None
        needs_property_type = (
            filters.get("property_type") is None and not filters.get("wants_all_types")
        )

        if not needs_city and not needs_property_type:
            return filters

        predicted_tokens = self.predict_next_tokens(query, top_k=5)
        predicted_tokens_norm = {normalize_text(tok): tok for tok in predicted_tokens}

        if needs_city:
            for city in KNOWN_CITY_TOKENS:
                if normalize_text(city) in predicted_tokens_norm:
                    filters["city"] = normalize_city_token(city)
                    break

        if needs_property_type:
            for prop in KNOWN_PROPERTY_TOKENS:
                if normalize_text(prop) in predicted_tokens_norm:
                    filters["property_type"] = normalize_property_token(prop)
                    break

        return filters


_model_interface = QueryModelInterface()


def understand_query_with_model(query: str) -> Dict[str, Any]:
    return _model_interface.infer_filters(query)