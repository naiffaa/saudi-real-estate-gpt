from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.data_loader import load_properties
from src.interface import understand_query_with_model
from src.search import search_properties

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://saudi-real-estate-makani.vercel.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
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
        filters = understand_query_with_model(query)
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