"use client";

import { useState } from "react";
import { Search, Loader2 } from "lucide-react";

interface SearchSectionProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export function SearchSection({ onSearch, isLoading }: SearchSectionProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-10">
      <form
        onSubmit={handleSubmit}
        className="glass-card rounded-[28px] p-3"
      >
        <div className="flex items-center gap-3">
          <button
            type="submit"
            disabled={isLoading}
            className="shrink-0 h-12 px-7 rounded-2xl bg-[#5f7f59] text-white font-extrabold text-lg hover:bg-[#4e6c49] transition"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "ابحث"}
          </button>

          <div className="relative flex-1 min-w-0">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="وش تدور عليه؟ مثال: فلل في الرياض حي النرجس"
              className="w-full h-12 rounded-2xl bg-white/80 px-4 pr-12 text-lg text-[#243b2c] placeholder:text-[#7a877c]"
              dir="rtl"
            />
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#5f7f59] w-5 h-5" />
          </div>
        </div>
      </form>

      <p className="mt-4 text-center text-[#7a877c] text-base font-medium">
        جرب:
        <span className="text-[#5f7f59] italic font-bold"> "أراضي في حي العارض بالرياض" </span>
        أو
        <span className="text-[#5f7f59] italic font-bold"> "شقق للإيجار في جدة"</span>
      </p>
    </div>
  );
}