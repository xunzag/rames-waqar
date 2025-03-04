import { Suspense } from "react"
import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import FeaturedWork from "@/components/FeaturedWork"
import AboutSection from "@/components/AboutSection"
import ToolsSection from "@/components/ToolsSection"
import Footer from "@/components/Footer"
import ParticleBackground from "@/components/ParticleBackground"
import LoadingScreen from "@/components/LoadingScreen"
import VideoBackground from "@/components/VideoBackground"
import ContactCTA from "@/components/ContactCTA"

export default function Home() {
  return (
    <main className="relative bg-black text-white overflow-hidden">
      <Suspense fallback={<LoadingScreen />}>
        <VideoBackground />
        <ParticleBackground />
        <Header />
        <HeroSection />
        <FeaturedWork />
        <AboutSection />
        <ToolsSection />
        <ContactCTA />
        <Footer />
      </Suspense>
    </main>
  )
}

