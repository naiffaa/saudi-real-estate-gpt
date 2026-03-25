from parser import parse_query

def search_properties(query, df):
    filters = parse_query(query)

    results = df.copy()

    if filters["city"]:
        results = results[results["city"].str.contains(filters["city"], case=False, na=False)]

    if filters["district"]:
        results = results[results["district"].str.contains(filters["district"], case=False, na=False)]

    if filters["type"]:
        results = results[results["type"] == filters["type"]]

    return results.to_dict(orient="records")