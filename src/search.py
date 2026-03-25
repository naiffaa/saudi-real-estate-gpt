from src.parser import parse_user_query


def search_properties(df, filters):
    results = df.copy()

    city = filters.get("city")
    district = filters.get("district")
    property_type = filters.get("property_type")
    max_price = filters.get("max_price")
    min_bedrooms = filters.get("min_bedrooms")
    listing_type = filters.get("listing_type")

    if city:
        results = results[results["city"].astype(str).str.contains(city, case=False, na=False)]

    if district:
        results = results[results["district"].astype(str).str.contains(district, case=False, na=False)]

    if property_type:
        results = results[
            results["category_name"].astype(str).str.contains(property_type, case=False, na=False, regex=True)
        ]

    if max_price is not None:
        results = results[results["price"] <= max_price]

    if min_bedrooms is not None:
        results = results[results["num_bedrooms"] >= min_bedrooms]

    if listing_type == "sale":
        if "is_sale" in results.columns:
            results = results[results["is_sale"] == True]
    elif listing_type == "rental":
        if "is_rental" in results.columns:
            results = results[results["is_rental"] == True]

    return results


def search_properties_from_query(df, query: str):
    filters = parse_user_query(query)
    return search_properties(df, filters)