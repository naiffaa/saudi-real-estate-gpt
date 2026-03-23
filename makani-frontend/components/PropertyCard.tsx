import { MapPin, Maximize, Tag, BedDouble, Bath } from "lucide-react";

type Property = {
  id?: string | number;
  title?: string;
  category_name?: string;
  city?: string;
  district?: string;
  area_sqm?: number;
  price?: number;
  num_bedrooms?: number;
  num_bathrooms?: number;
  description?: string;
  url?: string;
};

interface PropertyCardProps {
  property: Property;
}

export function PropertyCard({ property }: PropertyCardProps) {
  const formatPrice = (price?: number) => {
    if (!price) return "-";
    return new Intl.NumberFormat("ar-SA").format(price) + " ريال";
  };

  return (
    <div className="overflow-hidden rounded-[28px] bg-white border border-[#d7ddd7] shadow-[0_12px_28px_rgba(0,0,0,0.06)] hover:shadow-[0_18px_36px_rgba(0,0,0,0.08)] transition-all">
      <div className="p-6">
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-2 text-[#5f7f59]">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-semibold">
              {property.city || "-"} - {property.district || "-"}
            </span>
          </div>

          <span className="bg-[#5f7f59] text-white text-sm px-3 py-1 rounded-full font-bold whitespace-nowrap">
            {property.category_name || "عقار"}
          </span>
        </div>

        <h3 className="font-bold text-lg mb-3 leading-8 min-h-[60px]">
          {property.title || "بدون عنوان"}
        </h3>

        <p className="text-[#7a877c] text-sm line-clamp-2 mb-6 leading-relaxed min-h-[48px]">
          {property.description || "لا يوجد وصف متاح لهذا العقار."}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <Maximize className="w-4 h-4 text-[#4e6c49]" />
            <span>{property.area_sqm ? `${property.area_sqm} م²` : "-"}</span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Tag className="w-4 h-4 text-[#4e6c49]" />
            <span className="font-bold text-[#5f7f59]">{formatPrice(property.price)}</span>
          </div>
        </div>

        {(property.num_bedrooms || property.num_bathrooms) && (
          <div className="flex items-center gap-4 text-sm text-[#7a877c] mb-2">
            {property.num_bedrooms ? (
              <div className="flex items-center gap-2">
                <BedDouble className="w-4 h-4 text-[#5f7f59]" />
                <span>{property.num_bedrooms} غرف</span>
              </div>
            ) : null}

            {property.num_bathrooms ? (
              <div className="flex items-center gap-2">
                <Bath className="w-4 h-4 text-[#5f7f59]" />
                <span>{property.num_bathrooms} حمام</span>
              </div>
            ) : null}
          </div>
        )}
      </div>

      {property.url ? (
        <a
          href={property.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full py-3 text-center bg-[#e7eee8] text-[#5f7f59] font-bold hover:bg-[#5f7f59] hover:text-white transition-colors"
        >
          التفاصيل
        </a>
      ) : (
        <button className="w-full py-3 bg-[#e7eee8] text-[#5f7f59] font-bold">
          التفاصيل
        </button>
      )}
    </div>
  );
}