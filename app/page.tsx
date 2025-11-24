import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { FeaturedMenu } from "@/components/featured-menu"
import { About } from "@/components/about"
import { Testimonials } from "@/components/testimonials"
import { ReservationForm } from "@/components/reservation-form"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="bg-background">
      <Navbar />
      <Hero />
      <FeaturedMenu />
      <About />
      <Testimonials />
      <ReservationForm />
      <Footer />
    </main>
  )
}
