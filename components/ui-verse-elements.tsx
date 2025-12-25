"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Sparkles, Crown, Diamond } from "lucide-react"
import Image from "next/image"

export function OrnateFrameCard({
  children,
  frameImage,
  className = "",
}: {
  children: React.ReactNode
  frameImage: string
  className?: string
}) {
  return (
    <div className={`relative group ${className}`}>
      <div className="absolute inset-0">
        <Image src={frameImage || "/placeholder.svg"} alt="Ornate Frame" fill className="object-contain" />
      </div>
      <div className="relative z-10 p-8 m-4">{children}</div>
    </div>
  )
}

export function NeonGlowCard({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <Card
      className={`bg-black/80 border-red-500 shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:shadow-[0_0_30px_rgba(239,68,68,0.8)] transition-all duration-300 ${className}`}
    >
      <CardContent className="p-6">{children}</CardContent>
    </Card>
  )
}

export function PulsingButton({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode
  onClick: () => void
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      className={`bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-lg shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:shadow-[0_0_30px_rgba(239,68,68,0.8)] transform hover:scale-105 transition-all duration-300 animate-pulse ${className}`}
    >
      {children}
    </button>
  )
}

export function PremiumCounterCard({
  title,
  count,
  suffix = "",
  icon: Icon,
  color = "red",
}: {
  title: string
  count: number
  suffix?: string
  icon: React.ComponentType<{ className?: string }>
  color?: "red" | "gold" | "silver"
}) {
  const [displayCount, setDisplayCount] = useState(0)

  useEffect(() => {
    const duration = 2000
    const steps = 60
    const increment = count / steps
    let current = 0

    const timer = setInterval(() => {
      current += increment
      if (current >= count) {
        setDisplayCount(count)
        clearInterval(timer)
      } else {
        setDisplayCount(Math.floor(current))
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [count])

  const colorClasses = {
    red: "from-red-600/20 to-red-900/20 border-red-500/30 text-red-400",
    gold: "from-gold/20 to-gold-dark/20 border-gold/30 text-gold",
    silver: "from-silver/20 to-silver-dark/20 border-silver/30 text-silver",
  }

  return (
    <Card
      className={`bg-gradient-to-br ${colorClasses[color]} backdrop-blur-sm hover:scale-105 transition-all duration-300`}
    >
      <CardContent className="p-6 text-center">
        <Icon className={`w-12 h-12 mx-auto mb-4 ${colorClasses[color].split(" ")[3]}`} />
        <div className={`text-3xl font-black mb-2 ${colorClasses[color].split(" ")[3]}`}>
          {displayCount.toLocaleString()}
          {suffix}
        </div>
        <div className="text-white/80 font-semibold">{title}</div>
      </CardContent>
    </Card>
  )
}

export function FloatingPerformerCard({
  name,
  specialty,
  image,
  isLive = false,
}: {
  name: string
  specialty: string
  image: string
  isLive?: boolean
}) {
  return (
    <div className="relative group">
      <Card className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/30 hover:border-gold/50 transition-all duration-300 overflow-hidden">
        <CardContent className="p-0">
          <div className="relative h-48">
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            {isLive && (
              <div className="absolute top-3 right-3 flex items-center space-x-1 bg-red-600 px-2 py-1 rounded-full">
                <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                <span className="text-white text-xs font-bold">LIVE</span>
              </div>
            )}

            <div className="absolute bottom-3 left-3">
              <h4 className="text-white font-bold text-lg">{name}</h4>
              <p className="text-gold text-sm">{specialty}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function PremiumFeatureShowcase({
  title,
  features,
  image,
  ctaText,
  onCTAClick,
}: {
  title: string
  features: string[]
  image: string
  ctaText: string
  onCTAClick: () => void
}) {
  return (
    <Card className="bg-gradient-to-br from-black via-red-900/10 to-black border-2 border-gold/30 overflow-hidden group hover:border-gold/60 transition-all duration-500">
      <CardContent className="p-0">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative h-64 lg:h-full">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
          </div>

          <div className="p-8 space-y-6">
            <div className="flex items-center space-x-3">
              <Crown className="w-8 h-8 text-gold" />
              <h3 className="text-2xl font-black text-white">{title}</h3>
            </div>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Diamond className="w-4 h-4 text-gold flex-shrink-0" />
                  <span className="text-white/90">{feature}</span>
                </div>
              ))}
            </div>

            <button
              onClick={onCTAClick}
              className="w-full bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-black font-bold py-3 px-6 rounded-lg shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] transition-all duration-300 transform hover:scale-105"
            >
              {ctaText}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function InteractiveTestimonialCard({
  testimonial,
  onExpand,
}: {
  testimonial: {
    name: string
    location: string
    rating: number
    review: string
    experience: string
    avatar: string
    source: string
  }
  onExpand: () => void
}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Card
      className="bg-gradient-to-br from-red-900/20 to-black border border-red-500/30 hover:border-gold/50 transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-[0_0_25px_rgba(255,215,0,0.3)]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onExpand}
    >
      <CardContent className="p-6">
        <div className="flex items-center mb-4">
          <div className="relative">
            <Image
              src={testimonial.avatar || "/placeholder.svg"}
              alt={testimonial.name}
              width={50}
              height={50}
              className="rounded-full border-2 border-red-500/50"
            />
            {isHovered && (
              <div className="absolute -top-1 -right-1">
                <Sparkles className="w-4 h-4 text-gold animate-pulse" />
              </div>
            )}
          </div>
          <div className="ml-4 flex-1">
            <div className="font-bold text-white">{testimonial.name}</div>
            <div className="text-sm text-white/70">{testimonial.location}</div>
            <div className="text-xs text-gold font-semibold">{testimonial.source}</div>
          </div>
        </div>

        <div className="flex mb-4">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < testimonial.rating ? "text-gold fill-gold" : "text-white/30"} ${isHovered ? "animate-pulse" : ""}`}
            />
          ))}
        </div>

        <blockquote className="text-sm leading-relaxed mb-4 text-white/90 line-clamp-3">
          "{testimonial.review}"
        </blockquote>

        <div className="flex justify-between items-center">
          <span className="inline-block px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold uppercase tracking-wide">
            {testimonial.experience}
          </span>
          {isHovered && <span className="text-gold text-xs font-semibold animate-pulse">Click to expand</span>}
        </div>
      </CardContent>
    </Card>
  )
}

export function PremiumStatsBar({
  stats,
}: {
  stats: Array<{
    label: string
    value: string
    icon: React.ComponentType<{ className?: string }>
    color: "red" | "gold" | "silver"
  }>
}) {
  const colorClasses = {
    red: "text-red-400",
    gold: "text-gold",
    silver: "text-silver",
  }

  return (
    <div className="bg-gradient-to-r from-black via-red-900/10 to-black border-y border-red-600/30 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <stat.icon
                className={`w-8 h-8 mx-auto mb-3 ${colorClasses[stat.color]} group-hover:scale-110 transition-transform duration-300`}
              />
              <div className={`text-2xl font-black mb-1 ${colorClasses[stat.color]}`}>{stat.value}</div>
              <div className="text-white/80 text-sm font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function LiveEventBanner({
  event,
  timeRemaining,
}: {
  event: string
  timeRemaining: string
}) {
  return (
    <div className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white py-3 px-4 shadow-[0_0_20px_rgba(239,68,68,0.5)] animate-pulse">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
          <span className="font-black text-lg">LIVE EVENT: {event}</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm">Starts in:</span>
          <span className="font-bold text-lg">{timeRemaining}</span>
        </div>
      </div>
    </div>
  )
}
