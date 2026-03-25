import re


KNOWN_CITIES = [
    "الرياض",
    "جده",
    "الدمام",
    "الخبر",
    "مكه",
    "المدينه",
]

PROPERTY_TYPES = [
    "شقه",
    "شقة",
    "شقق",
    "فيلا",
    "فلل",
    "فله",
    "فلة",
    "ارض",
    "أرض",
    "اراضي",
    "أراضي",
    "دور",
    "عماره",
    "استراحه",
]


def normalize_text(text: str) -> str:
    text = text.strip().lower()
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

    city = next((c for c in KNOWN_CITIES if normalize_text(c) in text), None)
    property_type = next((p for p in PROPERTY_TYPES if normalize_text(p) in text), None)

    # توحيد صيغ نوع العقار
    if property_type in ["فيلا", "فلل", "فله", "فلة"]:
        property_type = "فيلا|فلل|فله|فلة"
    elif property_type in ["شقه", "شقة", "شقق"]:
        property_type = "شقه|شقة|شقق"
    elif property_type in ["ارض", "أرض", "اراضي", "أراضي"]:
        property_type = "ارض|أرض|اراضي|أراضي"

    district = None
    district_match = re.search(r"حي\s+([^\s]+(?:\s+[^\s]+)?)", text)
    if district_match:
        district = "حي " + district_match.group(1).strip()

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