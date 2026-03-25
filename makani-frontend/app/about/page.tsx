import { Header } from "@/components/header"
import { Footer } from "@/components/Footer"
import { Brain, Languages, Zap, Mail, Linkedin, GraduationCap, Building2, Sparkles, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const features = [
  {
    icon: Brain,
    title: "بحث ذكي",
    description: "نظام بحث يفهم متطلباتك بلغتك الطبيعية ويحللها بدقة عالية.",
    highlight: "معالجة لغوية متقدمة",
  },
  {
    icon: Languages,
    title: "تجربة عربية أولاً",
    description: "مصمم خصيصاً للمستخدم السعودي مع دعم كامل للهجات المحلية.",
    highlight: "يفهم لهجتك النجدية",
  },
  {
    icon: Zap,
    title: "نتائج سريعة وبسيطة",
    description: "احصل على نتائج دقيقة في ثوانٍ معدودة بدون تعقيد.",
    highlight: "أقل من ثانية",
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header activePage="about" />
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden py-24">
          {/* Background decoration */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-10 right-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-6 text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4" />
              <span>تعرف علينا</span>
            </div>

            {/* Main heading */}
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight text-balance">
              وش سالفة مكاني؟
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
              مكاني هي منصة بحث عقاري ذكية تستخدم الذكاء الاصطناعي لفهم احتياجاتك بلغتك الطبيعية. 
              بدل ما تعبي فلاتر معقدة، كلمنا زي ما تكلم صاحبك ونجيبلك اللي تدور عليه.
            </p>
          </div>
        </section>

        {/* About the Product */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="bg-background border border-border rounded-3xl p-8 md:p-12 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    كيف يعمل مكاني؟
                  </h2>
                </div>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  مكاني يستخدم تقنيات معالجة اللغة الطبيعية (NLP) المتقدمة لفهم طلبات البحث العقاري باللغة العربية الفصحى والعامية السعودية. 
                  بدلاً من استخدام فلاتر معقدة، يمكنك ببساطة كتابة ما تريده كما لو كنت تتحدث مع شخص.
                </p>

                {/* Example query */}
                <div className="bg-muted/50 border border-border rounded-2xl p-6">
                  <p className="text-sm text-muted-foreground mb-3">مثال على طريقة البحث:</p>
                  <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="flex-1 bg-background border border-border rounded-xl p-4">
                      <p className="text-foreground font-medium">
                        &ldquo;أبي فلة في الرياض حي النرجس، ٤ غرف، ميزانيتي مليونين&rdquo;
                      </p>
                    </div>
                    <ArrowLeft className="w-6 h-6 text-primary hidden md:block rotate-180" />
                    <div className="flex-1 bg-primary/10 border border-primary/20 rounded-xl p-4">
                      <p className="text-foreground font-medium text-primary">
                        النظام يفهم ويعرض فلل مطابقة للمواصفات
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            {/* Section header */}
            <div className="text-center mb-16">
              <span className="inline-block text-sm font-medium text-primary bg-primary/10 px-4 py-2 rounded-full mb-4">
                المميزات
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                ليش تختار مكاني؟
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl mx-auto">
                ثلاث مميزات تخلي تجربة البحث العقاري أسهل وأسرع
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

        {/* About the Project */}
        <section className="py-20 bg-card">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                <GraduationCap className="w-4 h-4" />
                <span>عن المشروع</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                مشروع أكاديمية SDAIA
              </h2>
              
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                مكاني هو مشروع تخرج تم تطويره ضمن برنامج أكاديمية سدايا (SDAIA) للذكاء الاصطناعي. 
                يهدف المشروع إلى تطبيق تقنيات معالجة اللغة الطبيعية في المجال العقاري السعودي، 
                مما يسهل على المستخدمين العثور على العقارات المناسبة باستخدام لغتهم اليومية.
              </p>
              
              <p className="text-lg text-muted-foreground leading-relaxed">
                يجمع المشروع بين أحدث تقنيات الذكاء الاصطناعي وفهم عميق للسوق العقاري المحلي، 
                مع التركيز على دعم اللهجة السعودية والمصطلحات العقارية المحلية.
              </p>
            </div>
          </div>
        </section>

        {/* About the Developer */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-2xl mx-auto">
              <div className="bg-card border border-border rounded-3xl p-8 md:p-10 text-center shadow-sm hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                {/* Avatar placeholder */}
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl font-bold text-primary">ن</span>
                </div>
                
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  نايفة العريفي
                </h3>
                
                <p className="text-primary font-medium mb-4">
                  مطورة ذكاء اصطناعي
                </p>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  طالبة في أكاديمية سدايا، شغوفة بتطوير حلول ذكية تخدم المجتمع السعودي. 
                  مهتمة بمعالجة اللغة الطبيعية وتطبيقاتها في تحسين تجربة المستخدم.
                </p>
                
                {/* Social links */}
                <div className="flex items-center justify-center gap-4">
                  <a
                    href="mailto:nayfah@example.com"
                    className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    aria-label="البريد الإلكتروني"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                    aria-label="لينكدإن"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-24 bg-primary/5">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="relative">
                {/* Decorative quotes */}
                <span className="absolute -top-8 right-0 text-8xl text-primary/20 font-serif leading-none">
                  &ldquo;
                </span>
                <blockquote className="text-3xl md:text-4xl font-bold text-foreground leading-relaxed relative z-10">
                  مكاني.. عقارك بلمسة ذكية ولهجة نجْدية
                </blockquote>
                <span className="absolute -bottom-16 left-0 text-8xl text-primary/20 font-serif leading-none">
                  &rdquo;
                </span>
              </div>
              
              {/* CTA */}
              <div className="mt-16">
                <Link href="/search">
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30"
                  >
                    جرب البحث الآن
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
