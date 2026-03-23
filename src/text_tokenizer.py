# src/text_tokenizer.py

import re

def normalize_text(text: str) -> str:
    text = text.strip()
    text = re.sub(r'[ًٌٍَُِّْـ]', '', text)
    text = text.replace('أ', 'ا').replace('إ', 'ا').replace('آ', 'ا')
    text = text.replace('ى', 'ي')
    return text

def tokenize(text: str):
    text = normalize_text(text)
    return text.split()

if __name__ == "__main__":
    sample = "فيلا للبيع في الرياض حي النرجس بسعر 900000 ريال"
    print(tokenize(sample))