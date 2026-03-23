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
  image?: string;
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

  const getImage = () => {
  // لو عندك image مباشرة
  if (property.image) return property.image;

  // بعض الداتا يكون فيها images array
  if (property.images && property.images.length > 0) {
    return property.images[0];
  }

  // fallback صورة ثابتة
  return "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop";
};

const imageUrl = getImage();
  return (
    <div className="overflow-hidden rounded-[28px] bg-white border border-[#d7ddd7] shadow-[0_12px_28px_rgba(0,0,0,0.06)] hover:shadow-[0_18px_36px_rgba(0,0,0,0.08)] transition-all">
      <div className="relative h-56 overflow-hidden">

        <div className="absolute top-4 right-4">
          <span className="bg-[#5f7f59] text-white text-sm px-3 py-1 rounded-full font-bold">
            {property.category_name || "عقار"}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 text-[#5f7f59] mb-3">
          <MapPin className="w-4 h-4" />
          <span className="text-sm font-semibold">
            {property.city || "-"} - {property.district || "-"}
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
          <div className="flex items-center gap-4 text-sm text-[#7a877c]">
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