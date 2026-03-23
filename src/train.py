# src/train.py

from pathlib import Path
import json

import torch
import torch.nn as nn
import torch.optim as optim

from src.data_utils import prepare_dataset
from src.model import SaudiRealEstateModel


def pad_sequences(sequences, pad_value=0):
    max_length = max(len(seq) for seq in sequences)
    padded = []

    for seq in sequences:
        padded_seq = seq + [pad_value] * (max_length - len(seq))
        padded.append(padded_seq)

    return padded, max_length


def main():
    data = prepare_dataset("data/sample_listings.txt")

    pairs = data["pairs"]
    vocab_size = data["vocab_size"]

    input_sequences = [pair[0] for pair in pairs]
    target_sequences = [pair[1] for pair in pairs]

    input_padded, max_len = pad_sequences(input_sequences, pad_value=0)
    target_padded, _ = pad_sequences(target_sequences, pad_value=0)

    inputs = torch.tensor(input_padded, dtype=torch.long)
    targets = torch.tensor(target_padded, dtype=torch.long)

    print("Inputs shape :", inputs.shape)
    print("Targets shape:", targets.shape)

    model = SaudiRealEstateModel(vocab_size=vocab_size, embed_dim=64)

    criterion = nn.CrossEntropyLoss(ignore_index=0)
    optimizer = optim.Adam(model.parameters(), lr=0.001)

    model.train()

    for epoch in range(50):
        optimizer.zero_grad()

        logits = model(inputs)

        loss = criterion(
            logits.reshape(-1, vocab_size),
            targets.reshape(-1)
        )

        loss.backward()
        optimizer.step()

        print(f"Epoch {epoch + 1}/50, Loss: {loss.item():.4f}")

    checkpoints_dir = Path("checkpoints")
    checkpoints_dir.mkdir(exist_ok=True)

    model_path = checkpoints_dir / "model.pth"
    vocab_path = checkpoints_dir / "vocab.json"

    torch.save(model.state_dict(), model_path)

    vocab_data = {
        "stoi": data["stoi"],
        "itos": {str(k): v for k, v in data["itos"].items()},
        "vocab_size": vocab_size,
        "max_len": max_len,
    }

    with vocab_path.open("w", encoding="utf-8") as f:
        json.dump(vocab_data, f, ensure_ascii=False, indent=2)

    print(f"\nSaved model to: {model_path}")
    print(f"Saved vocab to: {vocab_path}")


if __name__ == "__main__":
    main()