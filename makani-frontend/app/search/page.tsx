"use client"

import { useState, useMemo } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/Footer"
import { SearchHero } from "@/components/search-hero"
import { SearchFilters } from "@/components/search-filters"
import { SearchResults } from "@/components/search-results"
import type { Property } from "@/components/property-card"

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

type BackendProperty = {
  id?: string | number
  title?: string
  city?: string
  district?: string
  category_name?: string
  description?: string
  area_sqm?: number
  price?: number
  num_bedrooms?: number
  num_bathrooms?: number
  url?: string
}

function mapCategoryToType(categoryName?: string): Property["type"] {
  const value = (categoryName || "").trim().toLowerCase()

  if (
    value.includes("فيلا") ||
    value.includes("فلل") ||
    value.includes("فله") ||
    value.includes("فلة")
  ) {
    return "villa"
  }

  if (
    value.includes("شقة") ||
    value.includes("شقه") ||
    value.includes("شقق")
  ) {
    return "apartment"
  }

  if (
    value.includes("أرض") ||
    value.includes("ارض") ||
    value.includes("أراضي") ||
    value.includes("اراضي")
  ) {
    return "land"
  }

  if (value.includes("دور")) {
    return "villa"
  }

  return "land"
}

function mapBackendProperty(property: BackendProperty, index: number): Property {
  return {
    id: property.id?.toString() || `${index}`,
    title: property.title || "بدون عنوان",
    city: property.city || "-",
    district: property.district || "-",
    type: mapCategoryToType(property.category_name),
    description: property.description || "لا يوجد وصف متاح لهذا العقار.",
    area: Number(property.area_sqm) || 0,
    price: Number(property.price) || 0,
    bedrooms:
      property.num_bedrooms !== undefined && property.num_bedrooms !== null
        ? Number(property.num_bedrooms)
        : undefined,
    bathrooms:
      property.num_bathrooms !== undefined && property.num_bathrooms !== null
        ? Number(property.num_bathrooms)
        : undefined,
    url: property.url || undefined,
  }
}

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeType, setActiveType] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [hasSearched, setHasSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<Property[]>([])

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setHasSearched(true)
      setResults([])
      return
    }

    setIsLoading(true)
    setHasSearched(true)

    try {
      const res = await fetch(
        `${API_BASE_URL}/search?query=${encodeURIComponent(searchQuery)}`
      )

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`)
      }

      const data = await res.json()

      const mappedResults: Property[] = Array.isArray(data.results)
        ? data.results.map((item: BackendProperty, index: number) =>
            mapBackendProperty(item, index)
          )
        : []

      setResults(mappedResults)
    } catch (error) {
      console.error("Search failed:", error)
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  const filteredProperties = useMemo(() => {
    let filtered = [...results]

    if (activeType !== "all") {
      filtered = filtered.filter((p) => p.type === activeType)
    }

    switch (sortBy) {
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "area-desc":
        filtered.sort((a, b) => b.area - a.area)
        break
      default:
        break
    }

    return filtered
  }, [results, activeType, sortBy])

  return (
    <div className="min-h-screen flex flex-col">
      <Header activePage="search" />

      <main className="flex-1">
        <SearchHero
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSearch={handleSearch}
        />

        <SearchFilters
          activeType={activeType}
          sortBy={sortBy}
          onTypeChange={setActiveType}
          onSortChange={setSortBy}
        />

        <SearchResults
          properties={hasSearched ? filteredProperties : []}
          hasSearched={hasSearched}
          isLoading={isLoading}
        />
      </main>

      <Footer />
    </div>
  )
}