"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

interface HeaderProps {
  activePage?: "home" | "search" | "about"
}

const navLinks = [
  { href: "/", label: "الرئيسية", key: "home" as const },
  { href: "/search", label: "البحث", key: "search" as const },
  { href: "/about", label: "عن مكاني", key: "about" as const },
]

export function Header({ activePage = "home" }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-xl flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">مكاني</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.key}
                href={link.href}
                className={`transition-colors ${
                  activePage === link.key
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden sm:inline-flex">
              تسجيل الدخول
            </Button>
            <Button className="rounded-full bg-primary hover:bg-primary/90">
              جرب مجاناً
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
