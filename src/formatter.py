import pandas as pd


def clean_value(value, default="-"):
    if pd.isna(value):
        return default
    if isinstance(value, float) and value.is_integer():
        return int(value)
    return value


def format_property(row, index):
    return (
        f"{index}) {clean_value(row.get('title'), 'بدون عنوان')}\n"
        f"السعر: {clean_value(row.get('price'))} ريال\n"
        f"المساحة: {clean_value(row.get('area_sqm'))} م²\n"
        f"غرف النوم: {clean_value(row.get('num_bedrooms'))}\n"
        f"دورات المياه: {clean_value(row.get('num_bathrooms'))}\n"
        f"الرابط: {clean_value(row.get('url'))}\n"
    )


def format_results(df, filters, limit_per_type=3):
    if df.empty:
        return "ما لقيت نتائج مطابقة."

    city = filters.get("city") or "غير محددة"
    district = filters.get("district") or "غير محدد"

    lines = [f"لقيت {len(df)} عقار مطابق في {city} - {district}.\n"]

    if filters.get("wants_all_types"):
        grouped = df.groupby("category_name", dropna=True)

        lines.append("ملخص الأنواع:")
        for property_type, group in grouped:
            lines.append(f"- {property_type}: {len(group)}")
        lines.append("")

        grouped = df.groupby("category_name", dropna=True)
        for property_type, group in grouped:
            lines.append(f"--- {property_type} ---")
            for i, (_, row) in enumerate(group.head(limit_per_type).iterrows(), start=1):
                lines.append(format_property(row, i))
    else:
        for i, (_, row) in enumerate(df.head(10).iterrows(), start=1):
            lines.append(format_property(row, i))

    return "\n".join(lines)