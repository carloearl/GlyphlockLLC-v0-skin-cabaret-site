"use client"

import { useState } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface GalleryImage {
  src: string
  alt: string
  category: string
}

const galleryImages: GalleryImage[] = [
  { src: "/images/hero-portrait.jpeg", alt: "Glamour Portrait", category: "Atmosphere" },
  { src: "/images/skin-choker.jpeg", alt: "VIP Experience", category: "VIP" },
  { src: "/images/club-atmosphere.jpeg", alt: "Club Atmosphere", category: "Atmosphere" },
  { src: "/images/vip-booth.jpeg", alt: "VIP Booth", category: "VIP" },
  { src: "/images/bachelor-party.jpeg", alt: "Bachelor Party", category: "Events" },
  { src: "/images/neon-lights.jpeg", alt: "Neon Atmosphere", category: "Atmosphere" },
  { src: "/images/blue-neon.jpeg", alt: "Blue Neon", category: "Atmosphere" },
  { src: "/images/red-leather.jpeg", alt: "Red Leather VIP", category: "VIP" },
]

const categories = ["All", "Atmosphere", "VIP", "Events"]

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const filteredImages =
    selectedCategory === "All" ? galleryImages : galleryImages.filter((img) => img.category === selectedCategory)

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
  }

  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-background to-card/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-5xl font-black text-center mb-12 sm:mb-16 text-secondary animate-glow hover:scale-105 transition-transform duration-300">
          GALLERY
        </h2>

        {/* Category Filter */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-base font-bold uppercase tracking-wide transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground scale-105"
                    : "border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground hover:scale-105"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredImages.map((image, index) => (
            <Card
              key={index}
              className="group relative overflow-hidden bg-card/50 border-border/50 hover:border-secondary/50 transition-all duration-500 cursor-pointer hover:scale-105"
              onClick={() => openLightbox(index)}
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white font-bold text-sm sm:text-lg">{image.alt}</p>
                  <p className="text-secondary text-xs sm:text-sm uppercase tracking-wide">{image.category}</p>
                </div>
                <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 opacity-60">
                  <Image
                    src="/images/skin-logo-red-silhouette.png"
                    alt="Skin Cabaret"
                    width={20}
                    height={20}
                    className="sm:w-6 sm:h-6"
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Lightbox */}
        {lightboxOpen && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <div className="relative max-w-4xl max-h-full w-full">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 text-white hover:bg-white/20"
                onClick={closeLightbox}
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={prevImage}
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                onClick={nextImage}
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </Button>

              <div className="relative">
                <Image
                  src={filteredImages[currentImageIndex]?.src || "/placeholder.svg"}
                  alt={filteredImages[currentImageIndex]?.alt}
                  width={800}
                  height={1000}
                  className="max-w-full max-h-[90vh] object-contain rounded-lg mx-auto"
                />
                <div className="absolute bottom-4 left-4 right-4 text-center">
                  <p className="text-white font-bold text-lg sm:text-xl mb-2">
                    {filteredImages[currentImageIndex]?.alt}
                  </p>
                  <p className="text-secondary text-sm uppercase tracking-wide">
                    {filteredImages[currentImageIndex]?.category}
                  </p>
                </div>
              </div>

              <div className="flex justify-center mt-4 space-x-2">
                {filteredImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                      index === currentImageIndex ? "bg-secondary scale-125" : "bg-white/50 hover:bg-white/75"
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
