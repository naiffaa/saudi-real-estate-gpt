import { SearchX } from "lucide-react"

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6">
      <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-6">
        <SearchX className="w-10 h-10 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-2">
        ما لقينا طلبك
      </h3>
      <p className="text-muted-foreground text-center max-w-md">
        جرب تبحث بكلمات ثانية أو غيّر الفلاتر.
      </p>
    </div>
  )
}
