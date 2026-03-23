# src/preprocess.py

from src.text_tokenizer import tokenize

def preprocess_text(text: str):
    return tokenize(text)

if __name__ == "__main__":
    sample = "شقة للبيع في جدة حي السلامة بسعر 500000 ريال"
    print(preprocess_text(sample))