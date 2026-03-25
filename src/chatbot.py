from src.data_loader import load_properties
from src.interface import understand_query_with_model
from src.search import search_properties
from src.formatter import format_results


def answer_user_query(user_query: str) -> str:
    df = load_properties()
    filters = understand_query_with_model(user_query)
    results = search_properties(df, filters)
    return format_results(results, filters)