import { MapPin, Maximize, BedDouble, Bath } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface Property {
  id: string
  title: string
  city: string
  district: string
  type: "land" | "apartment" | "villa"
  description: string
  area: number
  price: number
  bedrooms?: number
  bathrooms?: number
  url?: string
}

interface PropertyCardProps {
  property: Property
}

const typeLabels: Record<string, string> = {
  land: "أرض",
  apartment: "شقة",
  villa: "فيلا",
}

const typeColors: Record<string, string> = {
  land: "bg-amber-100 text-amber-700",
  apartment: "bg-blue-100 text-blue-700",
  villa: "bg-emerald-100 text-emerald-700",
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("ar-SA", {
    style: "currency",
    currency: "SAR",
    maximumFractionDigits: 0,
  }).format(price)
}

function formatNumber(num: number): string {
  return new Intl.NumberFormat("ar-SA").format(num)
}

export function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="group bg-card rounded-2xl border border-border p-6 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/30 transition-all duration-300">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center gap-1.5 text-muted-foreground text-sm">
            <MapPin className="w-4 h-4" />
            <span>
              {property.city}، {property.district}
            </span>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            typeColors[property.type]
          }`}
        >
          {typeLabels[property.type]}
        </span>
      </div>

      <p className="text-muted-foreground text-sm leading-relaxed mb-5 line-clamp-2">
        {property.description}
      </p>

      <div className="flex items-center gap-4 mb-5 flex-wrap">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Maximize className="w-4 h-4" />
          <span>{formatNumber(property.area)} م²</span>
        </div>
        {property.bedrooms !== undefined && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <BedDouble className="w-4 h-4" />
            <span>{property.bedrooms} غرف</span>
          </div>
        )}
        {property.bathrooms !== undefined && (
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Bath className="w-4 h-4" />
            <span>{property.bathrooms} حمامات</span>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="text-xl font-bold text-primary">
          {formatPrice(property.price)}
        </div>

        {property.url ? (
          <a
            href={property.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              className="rounded-xl border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              التفاصيل
            </Button>
          </a>
        ) : (
          <Button
            variant="outline"
            className="rounded-xl border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            التفاصيل
          </Button>
        )}
      </div>
    </article>
  )
}