from src.parser import parse_user_query, normalize_text


CITY_ALIASES = {
    "الرياض": "الرياض",
    "رياض": "الرياض",
    "جده": "جده",
    "جدة": "جده",
    "الدمام": "الدمام",
    "دمام": "الدمام",
    "الخبر": "الخبر",
    "خبر": "الخبر",
    "مكه": "مكه",
    "مكة": "مكه",
    "المدينه": "المدينه",
    "المدينة": "المدينه",
}

PROPERTY_TYPE_ALIASES = {
    "شقه": "شقه",
    "شقة": "شقه",
    "شقق": "شقه",
    "فيلا": "فيلا",
    "فلل": "فيلا",
    "ارض": "ارض",
    "أرض": "ارض",
    "اراضي": "ارض",
    "أراضي": "ارض",
    "دور": "دور",
    "عماره": "عماره",
    "عمارة": "عماره",
    "استراحه": "استراحه",
    "استراحة": "استراحه",
}

ALL_TYPES_WORDS = ["عروض", "عقار", "عقارات", "كل", "الكل"]
RENT_WORDS = ["ايجار", "إيجار", "للايجار", "للإيجار", "استئجار"]
SALE_WORDS = ["بيع", "للبيع"]


def _extract_city(text: str):
    for raw, normalized in CITY_ALIASES.items():
        if raw in text:
            return normalized
    return None


def _extract_property_type(text: str):
    for raw, normalized in PROPERTY_TYPE_ALIASES.items():
        if raw in text:
            return normalized
    return None


def llm_assisted_parse_user_query(user_query: str) -> dict:
    """
    هذه الطبقة هي المدخل الموحد لفهم الكويري.
    حالياً تستخدم parser الحالي + تحسينات ذكية.
    لاحقاً هنا نربط مودل الـ LLM الحقيقي بدون ما نغير api.py أو chatbot.py
    """
    text = normalize_text(user_query)

    filters = parse_user_query(user_query)

    city = _extract_city(text) or filters.get("city")
    property_type = _extract_property_type(text) or filters.get("property_type")

    wants_all_types = filters.get("wants_all_types") or any(word in text for word in ALL_TYPES_WORDS)

    listing_type = filters.get("listing_type")
    if listing_type is None:
        if any(word in text for word in RENT_WORDS):
            listing_type = "rental"
        elif any(word in text for word in SALE_WORDS):
            listing_type = "sale"

    if wants_all_types:
        property_type = None

    return {
        "city": city,
        "district": filters.get("district"),
        "property_type": property_type,
        "max_price": filters.get("max_price"),
        "min_bedrooms": filters.get("min_bedrooms"),
        "listing_type": listing_type,
        "wants_all_types": wants_all_types,
    }