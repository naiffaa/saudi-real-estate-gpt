"use client"

import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SearchFiltersProps {
  activeType: string
  sortBy: string
  onTypeChange: (type: string) => void
  onSortChange: (sort: string) => void
}

const propertyTypes = [
  { value: "all", label: "الكل" },
  { value: "land", label: "أرض" },
  { value: "apartment", label: "شقة" },
  { value: "villa", label: "فيلا" },
]

const sortOptions = [
  { value: "newest", label: "الأحدث أولاً" },
  { value: "price-asc", label: "السعر من الأقل للأعلى" },
  { value: "price-desc", label: "السعر من الأعلى للأقل" },
  { value: "area-desc", label: "المساحة من الأكبر للأصغر" },
]

export function SearchFilters({
  activeType,
  sortBy,
  onTypeChange,
  onSortChange,
}: SearchFiltersProps) {
  const currentSort = sortOptions.find((opt) => opt.value === sortBy)

  return (
    <section className="py-6 border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Property Type Tabs */}
          <div className="flex items-center gap-2 flex-wrap">
            {propertyTypes.map((type) => (
              <Button
                key={type.value}
                variant={activeType === type.value ? "default" : "outline"}
                onClick={() => onTypeChange(type.value)}
                className={`rounded-full px-5 ${
                  activeType === type.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border-border hover:bg-accent"
                }`}
              >
                {type.label}
              </Button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="rounded-xl bg-card border-border hover:bg-accent gap-2"
              >
                <span className="text-muted-foreground">ترتيب:</span>
                <span>{currentSort?.label}</span>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {sortOptions.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => onSortChange(option.value)}
                  className={sortBy === option.value ? "bg-accent" : ""}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </section>
  )
}
