import { MapPin } from "lucide-react"

const footerLinks = {
  product: {
    title: "المنتج",
    links: [
      { label: "المميزات", href: "#" },
      { label: "الأسعار", href: "#" },
      { label: "التحديثات", href: "#" },
    ],
  },
  company: {
    title: "الشركة",
    links: [
      { label: "من نحن", href: "#" },
      { label: "تواصل معنا", href: "#" },
      { label: "الوظائف", href: "#" },
    ],
  },
  legal: {
    title: "قانوني",
    links: [
      { label: "سياسة الخصوصية", href: "#" },
      { label: "الشروط والأحكام", href: "#" },
    ],
  },
}

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">مكاني</span>
            </div>
            <p className="text-background/70 leading-relaxed">
              منصة البحث العقاري الذكية التي تفهم احتياجاتك وتجد لك عقارك المثالي.
            </p>
          </div>

          {/* Links columns */}
          {Object.values(footerLinks).map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-background/70 hover:text-background transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/60 text-sm">
              © {new Date().getFullYear()} developed by Naifa Alarifi.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://www.linkedin.com/in/naifa-al-arifi-64602229b"
                className="text-background/60 hover:text-background text-sm transition-colors"
              >
               Linkedin
              </a>
              <a
                href="naifa.arifi@gmail.com"
                className="text-background/60 hover:text-background text-sm transition-colors"
              >
                email
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
