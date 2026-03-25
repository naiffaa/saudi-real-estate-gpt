"use client"

import { Button } from "@/components/ui/button"
import { Search, Sparkles } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 right-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
          <Sparkles className="w-4 h-4" />
          <span>مدعوم بالذكاء الاصطناعي</span>
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight text-balance">
          ودك تلقى عقارك؟
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
          ابحث عن عقارك المثالي بلهجتك. تكلم زي ما تتكلم مع صاحبك، ومكاني يفهمك ويجيبلك اللي تبيه.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/search">
            <Button
              size="lg"
              className="text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
            >
              <Search className="w-5 h-5 ml-2" />
              ابدأ البحث
            </Button>
          </Link>

          {/* زر عن مكاني */}
          <Link href="/about">
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6 rounded-full border-2 hover:bg-accent"
            >
              عن مكاني
            </Button>
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <p className="text-sm text-muted-foreground">موثوق من قبل</p>
          <div className="flex items-center gap-8 opacity-60">
            <span className="text-lg font-semibold text-foreground">+2 مستخدم</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span className="text-lg font-semibold text-foreground">+١٠٠٠٠ عقار</span>
            <span className="w-1 h-1 rounded-full bg-muted-foreground" />
            <span className="text-lg font-semibold text-foreground">+٥٠ مدينة</span>
          </div>
        </div>
      </div>
    </section>
  )
}