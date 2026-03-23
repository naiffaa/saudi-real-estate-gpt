"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { LayoutGrid, Search as SearchIcon } from "lucide-react";
import { Footer } from "../components/Footer";
import { PropertyCard } from "../components/PropertyCard";
import { SearchSection } from "../components/SearchSection";
import { Filters } from "../components/Filters";

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

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Property[]>([]);
  const [filterType, setFilterType] = useState("الكل");
  const [sortBy, setSortBy] = useState("newest");

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch(
        `https://saudi-real-estate-makani.onrender.com/search?query=${encodeURIComponent(query)}`
      );

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      const data = await res.json();
      setResults(data.results || []);
    } catch (error) {
      console.error("Search failed:", error);
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredResults = useMemo(() => {
    const filtered = [...results];

    if (filterType !== "الكل") {
      const byType = filtered.filter((p) => {
        const category = p.category_name || "";
        return category.includes(filterType);
      });
      filtered.length = 0;
      filtered.push(...byType);
    }

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case "price-desc":
        filtered.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "area-desc":
        filtered.sort((a, b) => (b.area_sqm || 0) - (a.area_sqm || 0));
        break;
      default:
        break;
    }

    return filtered;
  }, [results, filterType, sortBy]);

  return (
    <>
      <header className="site-header">
        <div className="container-shell px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-[#5f7f59] rounded-xl flex items-center justify-center text-white font-bold">
              م
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#5f7f59]">
              مكاني
            </h1>
          </Link>

          <nav className="flex items-center">
            <div className="flex items-center gap-4 bg-white/70 backdrop-blur-md border border-[#d7ddd7] rounded-full px-4 py-2 shadow-sm">
              <Link
                href="/"
                className="px-6 py-2 rounded-full text-[#5f7f59] font-bold hover:bg-[#5f7f59] hover:text-white transition-all duration-200"
              >
                الرئيسية
              </Link>

              <Link
                href="/about"
                className="px-6 py-2 rounded-full text-[#7a877c] font-medium hover:bg-[#5f7f59] hover:text-white transition-all duration-200"
              >
                عن مكاني
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-grow py-12">
        <div className="container-shell px-4">
          <section className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-[#5f7f59] mb-4">
              ودك تلقى عقارك؟
            </h2>
            <p className="text-[#7a877c] text-lg max-w-xl mx-auto">
              مكاني يساعدك تلقى عقارك بكل سهولة.. بس قلنا وش في خاطرك!
            </p>
          </section>

          <SearchSection onSearch={handleSearch} isLoading={isLoading} />

          <Filters
            propertyType={filterType}
            onTypeChange={setFilterType}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <div className="flex items-center gap-2 mb-8">
            <LayoutGrid className="w-5 h-5 text-[#5f7f59]" />
            <h3 className="text-xl font-bold">العروض المتاحة</h3>
            <span className="text-[#7a877c] mr-auto">
              ({filteredResults.length} عرض)
            </span>
          </div>

          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredResults.map((property, index) => (
                <PropertyCard
                  key={property.url || property.id || index}
                  property={property}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-[#d7ddd7]">
              <div className="mb-4 text-[#5f7f59] opacity-20 flex justify-center">
                <SearchIcon className="w-20 h-20" />
              </div>
              <h4 className="text-2xl font-bold text-[#5f7f59] mb-2">
                ما لقينا طلبك
              </h4>
              <p className="text-[#7a877c]">
                جرب تبحث بكلمات ثانية أو غيّر الفلاتر.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}