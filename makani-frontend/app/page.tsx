import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ExampleQueries } from "@/components/example-queries"
import { Features } from "@/components/features"
import { Footer } from "@/components/Footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header activePage="home" />
      <div className="pt-16">
        <Hero />
        <ExampleQueries />
        <Features />
      </div>
      <Footer />
    </main>
  )
}
