import pandas as pd


def search_properties(df: pd.DataFrame, filters: dict) -> pd.DataFrame:
    results = df.copy()

    if filters.get("city"):
        results = results[results["city"].astype(str).str.contains(filters["city"], na=False)]

    if filters.get("district"):
        results = results[results["district"].astype(str).str.contains(filters["district"], na=False)]

    if filters.get("property_type"):
        results = results[results["category_name"].astype(str).str.contains(filters["property_type"], na=False)]

    if filters.get("max_price") is not None:
        results = results[results["price"] <= filters["max_price"]]

    if filters.get("min_bedrooms") is not None:
        results = results[results["num_bedrooms"] >= filters["min_bedrooms"]]

    if filters.get("listing_type") == "sale" and "is_sale" in results.columns:
        results = results[results["is_sale"] == True]

    if filters.get("listing_type") == "rental" and "is_rental" in results.columns:
        results = results[results["is_rental"] == True]

    dedup_cols = ["title", "price", "area_sqm", "district", "category_name"]
    existing_cols = [col for col in dedup_cols if col in results.columns]
    if existing_cols:
        results = results.drop_duplicates(subset=existing_cols)

    return results.sort_values(by=["category_name", "price"], ascending=[True, True])