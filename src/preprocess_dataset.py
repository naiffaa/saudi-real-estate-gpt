from pathlib import Path
import pandas as pd
from datasets import load_dataset


RAW_DIR = Path("data/raw")
PROCESSED_DIR = Path("data/processed")


def normalize_arabic(text):
    if pd.isna(text):
        return ""
    text = str(text).strip()
    text = text.replace("أ", "ا").replace("إ", "ا").replace("آ", "ا")
    text = text.replace("ى", "ي")
    text = text.replace("ة", "ه")
    return text


def main():
    RAW_DIR.mkdir(parents=True, exist_ok=True)
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)

    dataset = load_dataset("afaskar/Aqar.fm-Saudi-Real-Estate-Listings", "sale")
    df = dataset["train"].to_pandas()

    keep_cols = [
        "title",
        "price",
        "area_sqm",
        "num_bedrooms",
        "num_bathrooms",
        "city",
        "district",
        "description",
        "category_name",
        "is_sale",
        "is_rental",
        "url",
    ]

    df = df[keep_cols].copy()

    for col in ["title", "city", "district", "description", "category_name"]:
        df[col] = df[col].apply(normalize_arabic)

    df = df.dropna(subset=["city", "district", "price"])
    df = df[df["price"] > 0]

    raw_path = RAW_DIR / "aqar_sale_raw.csv"
    processed_path = PROCESSED_DIR / "properties_sale_clean.csv"

    df.to_csv(raw_path, index=False, encoding="utf-8-sig")
    df.to_csv(processed_path, index=False, encoding="utf-8-sig")

    print(f"Saved raw file to: {raw_path}")
    print(f"Saved processed file to: {processed_path}")
    print(f"Rows: {len(df)}")
    print(df.head(3))


if __name__ == "__main__":
    main()