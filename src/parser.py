import re


KNOWN_CITIES = [
    "الرياض",
    "جده",
    "جدة",
    "الدمام",
    "الخبر",
    "مكه",
    "مكة",
    "المدينه",
    "المدينة",
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
    "عمارة",
    "استراحه",
    "استراحة",
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


def detect_property_type(text: str):
    # 🔥 أهم تعديل: دعم الجمع والمفرد وكل الصيغ
    if any(word in text for word in ["شقه", "شقة", "شقق"]):
        return "شقه|شقة|شقق"

    if any(word in text for word in ["فيلا", "فلل", "فله", "فلة"]):
        return "فيلا|فلل|فله|فلة"

    if any(word in text for word in ["ارض", "أرض", "اراضي", "أراضي"]):
        return "ارض|أرض|اراضي|أراضي"

    if "دور" in text:
        return "دور"

    if any(word in text for word in ["عماره", "عمارة"]):
        return "عماره|عمارة"

    if any(word in text for word in ["استراحه", "استراحة"]):
        return "استراحه|استراحة"

    return None


def parse_user_query(user_query: str):
    text = normalize_text(user_query)

    # المدينة
    city = next((c for c in KNOWN_CITIES if normalize_text(c) in text), None)

    # نوع العقار (🔥 الجديد)
    property_type = detect_property_type(text)

    # الحي
    district = None
    district_match = re.search(r"حي\s+([^\s]+(?:\s+[^\s]+)?)", text)
    if district_match:
        district = "حي " + district_match.group(1).strip()

    # السعر
    max_price = extract_price_limit(text)

    # عدد الغرف
    min_bedrooms = extract_bedrooms(text)

    # هل يبغى كل الأنواع؟
    wants_all_types = any(
        word in text for word in ["عروض", "عقار", "عقارات", "كل", "الكل"]
    )

    # نوع العملية
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