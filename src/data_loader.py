from pathlib import Path
import pandas as pd


def load_properties(file_path="data/processed/properties_sale_clean.csv"):
    path = Path(file_path)
    if not path.exists():
        raise FileNotFoundError(f"File not found: {file_path}")

    df = pd.read_csv(path)
    return df