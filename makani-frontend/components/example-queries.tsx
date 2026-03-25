"use client"

import { MessageSquare } from "lucide-react"

const queries = [
  {
    text: "أبي شقة في الرياض قريبة من المدارس",
    category: "سكني",
  },
  {
    text: "محل تجاري في جدة بإيجار أقل من ٥٠ ألف",
    category: "تجاري",
  },
  {
    text: "فيلا بمسبح في الدمام حي الفيصلية",
    category: "فلل",
  },
  {
    text: "أرض استثمارية شمال الرياض",
    category: "أراضي",
  },
]

export function ExampleQueries() {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            جرب تسأل مكاني
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            اكتب بالطريقة اللي تحبها، ومكاني يفهمك
          </p>
        </div>

        {/* Query cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {queries.map((query, index) => (
            <div
              key={index}
              className="group relative bg-background border border-border rounded-2xl p-6 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <span className="inline-block text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-full mb-2">
                    {query.category}
                  </span>
                  <p className="text-foreground font-medium text-lg leading-relaxed">
                    &ldquo;{query.text}&rdquo;
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </div>
          ))}
        </div>

        {/* Hint */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          اضغط على أي مثال لتجربته مباشرة
        </p>
      </div>
    </section>
  )
}
