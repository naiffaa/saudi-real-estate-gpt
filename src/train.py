import json
from pathlib import Path

import pandas as pd
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader

from src.model import SaudiRealEstateModel
from src.text_tokenizer import tokenize


DATA_CANDIDATES = [
    "data/processed/properties_sale_clean.csv",
    "data/raw/aqar_sale_raw.csv",
]

CHECKPOINT_DIR = Path("checkpoints")
VOCAB_PATH = CHECKPOINT_DIR / "vocab.json"
MODEL_PATH = CHECKPOINT_DIR / "model.pth"

PAD_TOKEN = "<pad>"
UNK_TOKEN = "<unk>"


def find_dataset_path() -> Path:
    for path in DATA_CANDIDATES:
        p = Path(path)
        if p.exists():
            return p
    raise FileNotFoundError(
        "ما لقيت ملف البيانات. تأكد من وجود أحد هذه الملفات:\n"
        + "\n".join(DATA_CANDIDATES)
    )


def row_to_text(row: pd.Series) -> str:
    parts = []

    for col in [
        "title",
        "description",
        "city",
        "district",
        "category_name",
    ]:
        if col in row and pd.notna(row[col]):
            parts.append(str(row[col]))

    if "price" in row and pd.notna(row["price"]):
        parts.append(f"بسعر {row['price']} ريال")

    if "area_sqm" in row and pd.notna(row["area_sqm"]):
        parts.append(f"بمساحه {row['area_sqm']} متر")

    if "num_bedrooms" in row and pd.notna(row["num_bedrooms"]):
        parts.append(f"{int(float(row['num_bedrooms']))} غرف")

    return " ".join(parts).strip()


def load_training_texts() -> list[str]:
    dataset_path = find_dataset_path()
    df = pd.read_csv(dataset_path)

    texts = []
    for _, row in df.iterrows():
        text = row_to_text(row)
        if text:
            texts.append(text)

    if not texts:
        raise ValueError("ملف البيانات موجود لكن ما قدرت أطلع منه نصوص تدريب.")

    return texts


def build_vocab(texts: list[str], min_freq: int = 1) -> dict[str, int]:
    freq = {}

    for text in texts:
        for tok in tokenize(text):
            freq[tok] = freq.get(tok, 0) + 1

    vocab = {
        PAD_TOKEN: 0,
        UNK_TOKEN: 1,
    }

    for token, count in sorted(freq.items(), key=lambda x: (-x[1], x[0])):
        if count >= min_freq and token not in vocab:
            vocab[token] = len(vocab)

    return vocab


def encode_text(text: str, vocab: dict[str, int]) -> list[int]:
    unk_id = vocab[UNK_TOKEN]
    return [vocab.get(tok, unk_id) for tok in tokenize(text)]


class NextTokenDataset(Dataset):
    def __init__(self, texts: list[str], vocab: dict[str, int], seq_len: int = 12):
        self.samples = []
        self.seq_len = seq_len
        self.pad_id = vocab[PAD_TOKEN]

        for text in texts:
            ids = encode_text(text, vocab)

            if len(ids) < 2:
                continue

            for i in range(1, len(ids)):
                x = ids[:i][-seq_len:]
                y = ids[1 : i + 1][-seq_len:]

                x = [self.pad_id] * (seq_len - len(x)) + x
                y = [self.pad_id] * (seq_len - len(y)) + y

                self.samples.append(
                    (
                        torch.tensor(x, dtype=torch.long),
                        torch.tensor(y, dtype=torch.long),
                    )
                )

        if not self.samples:
            raise ValueError("ما تكونت عينات تدريب كافية. تأكد من البيانات.")

    def __len__(self):
        return len(self.samples)

    def __getitem__(self, idx):
        return self.samples[idx]


def train(
    epochs: int = 10,
    batch_size: int = 32,
    embed_dim: int = 64,
    seq_len: int = 12,
    lr: float = 1e-3,
):
    print("تحميل النصوص...")
    texts = load_training_texts()
    print(f"عدد النصوص: {len(texts)}")

    print("بناء المفردات...")
    vocab = build_vocab(texts)
    print(f"حجم المفردات: {len(vocab)}")

    CHECKPOINT_DIR.mkdir(parents=True, exist_ok=True)

    with open(VOCAB_PATH, "w", encoding="utf-8") as f:
        json.dump(vocab, f, ensure_ascii=False, indent=2)

    dataset = NextTokenDataset(texts=texts, vocab=vocab, seq_len=seq_len)
    loader = DataLoader(dataset, batch_size=batch_size, shuffle=True)

    model = SaudiRealEstateModel(vocab_size=len(vocab), embed_dim=embed_dim)
    criterion = nn.CrossEntropyLoss(ignore_index=vocab[PAD_TOKEN])
    optimizer = torch.optim.Adam(model.parameters(), lr=lr)

    print("بدء التدريب...")
    model.train()

    for epoch in range(epochs):
        total_loss = 0.0

        for x, y in loader:
            optimizer.zero_grad()

            logits = model(x)  # (batch, seq, vocab)
            loss = criterion(
                logits.view(-1, logits.size(-1)),
                y.view(-1),
            )

            loss.backward()
            optimizer.step()

            total_loss += loss.item()

        avg_loss = total_loss / max(len(loader), 1)
        print(f"Epoch {epoch + 1}/{epochs} - Loss: {avg_loss:.4f}")

    torch.save(model.state_dict(), MODEL_PATH)

    print("\nتم حفظ الملفات:")
    print(f"- {VOCAB_PATH}")
    print(f"- {MODEL_PATH}")


if __name__ == "__main__":
    train()