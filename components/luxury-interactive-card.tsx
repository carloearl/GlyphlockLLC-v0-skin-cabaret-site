"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Crown, Star, Diamond } from "lucide-react"
import Image from "next/image"

interface LuxuryCardProps {
  title: string
  description: string
  image: string
  icon: React.ElementType
  price?: string
  features: string[]
  onBook?: () => void
}

export default function LuxuryInteractiveCard({
  title,
  description,
  image,
  icon: Icon,
  price,
  features,
  onBook,
}: LuxuryCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="group relative overflow-hidden glass-morphism border-primary/30 hover:border-primary transition-all duration-700 cursor-pointer animate-luxury-float"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Luxury sparkle effects */}
      <div className="absolute top-4 right-4 animate-sparkle">
        <Sparkles className="w-4 h-4 text-primary" />
      </div>
      <div className="absolute top-8 right-8 animate-sparkle delay-1000">
        <Diamond className="w-3 h-3 text-accent" />
      </div>

      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className={`object-cover transition-all duration-700 ${isHovered ? "scale-110 brightness-110" : "scale-100"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />

        {/* Luxury overlay effects */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20 transition-opacity duration-700 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Price badge */}
        {price && (
          <div className="absolute top-4 left-4 px-4 py-2 bg-primary text-primary-foreground rounded-full text-sm font-bold uppercase tracking-wide animate-gold-shimmer">
            {price}
          </div>
        )}
      </div>

      <CardContent className="p-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center animate-luxury-glow">
            <Icon className="w-6 h-6 text-primary-foreground" />
          </div>
          <h3 className="text-2xl font-black text-primary uppercase tracking-wide">{title}</h3>
        </div>

        <p className="text-muted-foreground mb-6 leading-relaxed">{description}</p>

        <div className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Star className="w-4 h-4 text-primary fill-primary" />
              <span className="text-sm font-medium">{feature}</span>
            </div>
          ))}
        </div>

        <Button
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary text-primary-foreground font-bold uppercase tracking-wide py-3 transition-all duration-500 hover:scale-105 animate-gold-shimmer"
          onClick={onBook}
        >
          <Crown className="w-4 h-4 mr-2" />
          Reserve Now
        </Button>
      </CardContent>
    </Card>
  )
}
