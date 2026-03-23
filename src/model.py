# src/model.py

import torch
import torch.nn as nn


class SaudiRealEstateModel(nn.Module):
    def __init__(self, vocab_size: int, embed_dim: int = 64):
        super().__init__()
        self.embedding = nn.Embedding(num_embeddings=vocab_size, embedding_dim=embed_dim)
        self.linear = nn.Linear(embed_dim, vocab_size)

    def forward(self, input_ids: torch.Tensor) -> torch.Tensor:
        """
        input_ids shape: (batch_size, sequence_length)
        output shape: (batch_size, sequence_length, vocab_size)
        """
        x = self.embedding(input_ids)
        logits = self.linear(x)
        return logits


if __name__ == "__main__":
    vocab_size = 35
    model = SaudiRealEstateModel(vocab_size=vocab_size, embed_dim=64)

    sample_input = torch.tensor([
        [30, 32, 29, 17, 24, 20, 22, 11, 26, 34, 6]
    ])  # shape: (1, 11)

    output = model(sample_input)

    print("Input shape :", sample_input.shape)
    print("Output shape:", output.shape)