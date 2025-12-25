"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles } from "lucide-react"
import Image from "next/image"

interface CarouselSlide {
  id: number
  title: string
  subtitle: string
  description: string
  image: string
  cta: string
  ctaAction: () => void
}

const heroSlides: CarouselSlide[] = [
  {
    id: 1,
    title: "LUXURY VIP EXPERIENCE",
    subtitle: "Exclusive Premium Service",
    description: "Indulge in our world-class VIP treatment with premium bottle service and exclusive entertainment",
    image: "/images/luxury-table-vip.png",
    cta: "Book VIP Table",
    ctaAction: () => (window.location.href = "tel:4804257546"),
  },
  {
    id: 2,
    title: "PREMIUM BOOTH SEATING",
    subtitle: "Ultimate Comfort & Style",
    description: "Experience luxury seating in our premium booths with personalized service and prime viewing",
    image: "/images/premium-booth-seating.png",
    cta: "Reserve Booth",
    ctaAction: () => (window.location.href = "tel:4804257546"),
  },
  {
    id: 3,
    title: "EXCLUSIVE VIP AREA",
    subtitle: "Elite Entertainment Zone",
    description: "Access our most exclusive areas with top-tier entertainment and unparalleled luxury amenities",
    image: "/images/exclusive-vip-area.png",
    cta: "Join Elite",
    ctaAction: () => (window.location.href = "tel:4804257546"),
  },
]

export default function InteractiveHeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const currentSlideData = heroSlides[currentSlide]

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0">
        <Image
          src={currentSlideData.image || "/placeholder.svg"}
          alt={currentSlideData.title}
          fill
          className="object-cover transition-all duration-1000 scale-110"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/40 to-background/80" />
        <div className="absolute inset-0 luxury-gradient" />
      </div>

      {/* Luxury sparkle effects */}
      <div className="absolute top-20 left-20 animate-sparkle">
        <Sparkles className="w-6 h-6 text-primary" />
      </div>
      <div className="absolute top-40 right-32 animate-sparkle delay-1000">
        <Sparkles className="w-4 h-4 text-accent" />
      </div>
      <div className="absolute bottom-32 left-40 animate-sparkle delay-2000">
        <Sparkles className="w-5 h-5 text-secondary" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <Card className="glass-morphism border-primary/30 animate-luxury-float">
            <CardContent className="p-12">
              <div className="mb-6">
                <span className="text-sm font-bold uppercase tracking-widest text-primary animate-gold-shimmer">
                  {currentSlideData.subtitle}
                </span>
              </div>

              <h1 className="text-6xl md:text-8xl font-black mb-6 text-primary animate-luxury-glow">
                {currentSlideData.title}
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                {currentSlideData.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-primary-foreground px-12 py-4 text-xl font-black uppercase tracking-wide transition-all duration-500 hover:scale-110 animate-gold-shimmer"
                  onClick={currentSlideData.ctaAction}
                >
                  {currentSlideData.cta}
                </Button>

                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
                    onClick={() => setIsPlaying(!isPlaying)}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </Button>

                  <span className="text-sm text-muted-foreground">{isPlaying ? "Auto-playing" : "Paused"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          onClick={prevSlide}
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-primary scale-125 animate-luxury-glow"
                  : "bg-primary/30 hover:bg-primary/60"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          onClick={nextSlide}
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}
