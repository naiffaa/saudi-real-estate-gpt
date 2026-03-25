"use client"

import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SearchHeroProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  onSearch: () => void
}

const exampleQueries = [
  "فلل في الرياض حي النرجس",
  "شقق في جدة",
  "أراضي في حي العارض بالرياض",
]

export function SearchHero({ searchQuery, onSearchChange, onSearch }: SearchHeroProps) {
  return (
    <section className="pt-28 pb-12 bg-gradient-to-b from-accent/50 to-background">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            ابحث عن عقارك
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            اكتب ما تبحث عنه بلغتك الطبيعية وخلّنا نلقى لك
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && onSearch()}
                placeholder="مثال: فيلا في الرياض حي النرجس..."
                className="w-full h-14 px-5 pr-12 rounded-2xl bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            </div>
            <Button
              onClick={onSearch}
              className="h-14 px-8 rounded-2xl bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              ابحث
            </Button>
          </div>

          {/* Example Suggestions */}
          <div className="flex flex-wrap justify-center gap-2">
            <span className="text-sm text-muted-foreground">جرب:</span>
            {exampleQueries.map((query, index) => (
              <button
                key={index}
                onClick={() => {
                  onSearchChange(query)
                  onSearch()
                }}
                className="text-sm px-3 py-1.5 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
              >
                {query}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
