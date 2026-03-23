from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.data_loader import load_properties
from src.parser import parse_user_query
from src.search import search_properties

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Saudi Real Estate API is running"}

@app.get("/search")
def search(query: str):
    try:
        filters = parse_user_query(query)
        df = load_properties()
        results = search_properties(df, filters)

        records = results.head(20).fillna("").to_dict(orient="records")

        return {
            "success": True,
            "query": query,
            "filters": filters,
            "count": len(results),
            "results": records,
        }

    except Exception as e:
        return {
            "success": False,
            "error": str(e),
            "results": [],
        }