import { PropertyCard, type Property } from "@/components/property-card"
import { EmptyState } from "@/components/empty-state"

interface SearchResultsProps {
  properties: Property[]
  hasSearched: boolean
  isLoading: boolean
}

export function SearchResults({
  properties,
  hasSearched,
  isLoading,
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-muted-foreground">جاري البحث...</div>
        </div>
      </section>
    )
  }

  if (!hasSearched) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <EmptyState />
        </div>
      </section>
    )
  }

  if (properties.length === 0) {
    return (
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-muted-foreground">
            لم يتم العثور على نتائج مطابقة
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  )
}