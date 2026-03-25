import { Brain, Languages, Zap } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "بحث ذكي",
    description:
      "نظام بحث متقدم يفهم متطلباتك ويحللها بدقة عالية ليجد لك أفضل العقارات المناسبة.",
    highlight: "دقة ٩٥٪",
  },
  {
    icon: Languages,
    title: "معالجة اللغة العربية",
    description:
      "تقنية متطورة لفهم اللهجات العربية المختلفة والعامية السعودية بشكل طبيعي.",
    highlight: "يفهم لهجتك",
  },
  {
    icon: Zap,
    title: "نتائج فورية",
    description:
      "احصل على نتائج البحث في ثوانٍ معدودة مع تصفية ذكية وترتيب حسب الأولوية.",
    highlight: "أقل من ثانية",
  },
]

export function Features() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full mb-4">
            المميزات
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            ليش مكاني؟
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            نجمع بين أحدث تقنيات الذكاء الاصطناعي وفهم عميق للسوق العقاري السعودي
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="relative bg-card border border-border rounded-3xl p-8 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-7 h-7 text-primary" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Highlight badge */}
                <span className="inline-block text-sm font-semibold text-primary">
                  {feature.highlight}
                </span>

                {/* Decorative corner */}
                <div className="absolute top-0 left-0 w-20 h-20 bg-primary/5 rounded-br-[3rem] rounded-tl-3xl -z-10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
