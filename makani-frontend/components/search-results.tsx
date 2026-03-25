import { PropertyCard, type Property } from "./property-card"
import { EmptyState } from "./empty-state"

interface SearchResultsProps {
  properties: Property[]
  isLoading?: boolean
}

export function SearchResults({ properties, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <section className="py-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-card rounded-2xl border border-border p-6 animate-pulse"
              >
                <div className="h-6 bg-muted rounded-lg w-3/4 mb-4" />
                <div className="h-4 bg-muted rounded-lg w-1/2 mb-6" />
                <div className="h-4 bg-muted rounded-lg w-full mb-2" />
                <div className="h-4 bg-muted rounded-lg w-2/3 mb-6" />
                <div className="flex gap-4 mb-6">
                  <div className="h-4 bg-muted rounded-lg w-16" />
                  <div className="h-4 bg-muted rounded-lg w-16" />
                </div>
                <div className="flex justify-between pt-4 border-t border-border">
                  <div className="h-6 bg-muted rounded-lg w-24" />
                  <div className="h-10 bg-muted rounded-xl w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (properties.length === 0) {
    return (
      <section className="py-10">
        <div className="container mx-auto px-6">
          <EmptyState />
        </div>
      </section>
    )
  }

  return (
    <section className="py-10">
      <div className="container mx-auto px-6">
        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold text-foreground">
            العروض المتاحة
            <span className="text-muted-foreground font-normal mr-2">
              ({properties.length})
            </span>
          </h2>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  )
}
