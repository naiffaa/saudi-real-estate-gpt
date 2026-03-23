import re


KNOWN_CITIES = ["الرياض", "جده", "الدمام", "الخبر", "مكه", "المدينه"]
PROPERTY_TYPES = ["شقه", "فيلا", "ارض", "دور", "عماره", "استراحه"]


def normalize_text(text: str) -> str:
    text = text.strip()
    text = text.replace("أ", "ا").replace("إ", "ا").replace("آ", "ا")
    text = text.replace("ى", "ي")
    text = text.replace("ة", "ه")
    return text


def extract_price_limit(text: str):
    match = re.search(r"(اقل من|تحت|بحدود)\s+(\d+)", text)
    if match:
        return int(match.group(2))
    return None


def extract_bedrooms(text: str):
    match = re.search(r"(\d+)\s*(غرف|غرفه|غرفة)", text)
    if match:
        return int(match.group(1))
    return None


def parse_user_query(user_query: str):
    text = normalize_text(user_query)

    city = next((c for c in KNOWN_CITIES if c in text), None)
    property_type = next((p for p in PROPERTY_TYPES if p in text), None)

    district = None
    district_match = re.search(r"حي\s+([^\s]+)", text)
    if district_match:
        district = "حي " + district_match.group(1)

    max_price = extract_price_limit(text)
    min_bedrooms = extract_bedrooms(text)

    wants_all_types = any(word in text for word in ["عروض", "عقار", "عقارات", "كل", "الكل"])

    listing_type = None
    if "ايجار" in text or "للايجار" in text:
        listing_type = "rental"
    elif "بيع" in text or "للبيع" in text:
        listing_type = "sale"

    return {
        "city": city,
        "district": district,
        "property_type": None if wants_all_types else property_type,
        "max_price": max_price,
        "min_bedrooms": min_bedrooms,
        "listing_type": listing_type,
        "wants_all_types": wants_all_types,
    }