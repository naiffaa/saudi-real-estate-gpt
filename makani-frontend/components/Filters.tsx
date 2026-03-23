"use client";

interface FiltersProps {
  propertyType: string;
  onTypeChange: (type: string) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
}

export function Filters({
  propertyType,
  onTypeChange,
  sortBy,
  onSortChange,
}: FiltersProps) {
  return (
    <div className="glass-card rounded-[28px] p-6 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
        <div>
          <p className="text-sm font-extrabold text-[#5f7f59] mb-3">ترتيب حسب</p>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full md:w-72 h-12 rounded-2xl bg-white border border-[#d7ddd7] px-4 text-[#243b2c]"
          >
            <option value="newest">الأحدث أولاً</option>
            <option value="price-asc">السعر (من الأقل للأعلى)</option>
            <option value="price-desc">السعر (من الأعلى للأقل)</option>
            <option value="area-desc">المساحة (من الأكبر للأصغر)</option>
          </select>
        </div>

        <div>
          <p className="text-sm font-extrabold text-[#5f7f59] mb-3 text-right">نوع العقار</p>
          <div className="flex flex-wrap justify-end gap-2 bg-[#e7eee8] p-2 rounded-full">
            {["الكل", "أرض", "شقة", "فيلا"].map((type) => (
              <button
                key={type}
                onClick={() => onTypeChange(type)}
                className={`px-5 py-2 rounded-full font-bold transition ${
                  propertyType === type
                    ? "bg-[#5f7f59] text-white"
                    : "text-[#5f7f59] hover:bg-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}