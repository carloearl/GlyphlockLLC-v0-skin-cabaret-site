"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Calendar, Clock, Users, Crown } from "lucide-react"
import Image from "next/image"

interface Performer {
  id: number
  name: string
  stage_name: string
  specialty: string
  experience: string
  schedule: string[]
  rating: number
  featured: boolean
  image: string
  bio: string
  stats: {
    shows: number
    rating: number
    experience_years: number
  }
}

// Placeholder performer data - in real implementation, this would come from CMS/database
const performers: Performer[] = [
  {
    id: 1,
    name: "Coming Soon",
    stage_name: "Featured Performer",
    specialty: "Premium Entertainment",
    experience: "Professional",
    schedule: ["Friday", "Saturday", "Sunday"],
    rating: 5,
    featured: true,
    image: "/professional-performer-silhouette.png",
    bio: "World-class entertainment experience with years of professional training.",
    stats: { shows: 500, rating: 4.9, experience_years: 5 },
  },
  {
    id: 2,
    name: "Coming Soon",
    stage_name: "VIP Entertainer",
    specialty: "VIP Experience",
    experience: "Elite",
    schedule: ["Thursday", "Friday", "Saturday"],
    rating: 5,
    featured: true,
    image: "/elegant-performer-silhouette.png",
    bio: "Exclusive VIP entertainment with personalized attention and premium service.",
    stats: { shows: 300, rating: 4.8, experience_years: 3 },
  },
  {
    id: 3,
    name: "Coming Soon",
    stage_name: "Special Guest",
    specialty: "Guest Performances",
    experience: "Featured",
    schedule: ["Saturday", "Sunday"],
    rating: 5,
    featured: false,
    image: "/glamorous-performer-silhouette.png",
    bio: "Special guest appearances and featured performances for exclusive events.",
    stats: { shows: 200, rating: 4.7, experience_years: 4 },
  },
  {
    id: 4,
    name: "Coming Soon",
    stage_name: "Premium Talent",
    specialty: "Bachelor Parties",
    experience: "Specialist",
    schedule: ["Wednesday", "Thursday", "Friday"],
    rating: 5,
    featured: false,
    image: "/professional-entertainer-silhouette.png",
    bio: "Specialized in bachelor party entertainment and group celebrations.",
    stats: { shows: 400, rating: 4.9, experience_years: 6 },
  },
  {
    id: 5,
    name: "Coming Soon",
    stage_name: "Elite Performer",
    specialty: "Corporate Events",
    experience: "Executive",
    schedule: ["Monday", "Tuesday", "Wednesday"],
    rating: 5,
    featured: false,
    image: "/sophisticated-performer-silhouette.png",
    bio: "High-end corporate entertainment with professional presentation.",
    stats: { shows: 250, rating: 4.8, experience_years: 4 },
  },
  {
    id: 6,
    name: "Coming Soon",
    stage_name: "Featured Artist",
    specialty: "Special Events",
    experience: "Premium",
    schedule: ["Friday", "Saturday"],
    rating: 5,
    featured: false,
    image: "/artistic-performer-silhouette.png",
    bio: "Artistic performances for special occasions and themed events.",
    stats: { shows: 350, rating: 4.7, experience_years: 5 },
  },
]

const specialties = [
  "All",
  "Premium Entertainment",
  "VIP Experience",
  "Bachelor Parties",
  "Corporate Events",
  "Special Events",
]

export default function PerformerGallery() {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All")
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false)

  const filteredPerformers = performers.filter((performer) => {
    const specialtyMatch = selectedSpecialty === "All" || performer.specialty === selectedSpecialty
    const featuredMatch = !showFeaturedOnly || performer.featured
    return specialtyMatch && featuredMatch
  })

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-4 h-4 ${i < rating ? "text-secondary fill-secondary" : "text-muted-foreground"}`} />
    ))
  }

  return (
    <section className="py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-black mb-6 text-secondary animate-glow hover:scale-105 transition-transform duration-300">
            FEATURED PERFORMERS
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Meet our world-class entertainers who bring unparalleled talent and professionalism to every performance.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-12 justify-center items-center">
          <div className="flex flex-wrap gap-2 justify-center">
            {specialties.map((specialty) => (
              <Button
                key={specialty}
                variant={selectedSpecialty === specialty ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedSpecialty(specialty)}
                className={`${
                  selectedSpecialty === specialty
                    ? "bg-secondary text-secondary-foreground"
                    : "border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
                } transition-all duration-300 hover:scale-105`}
              >
                {specialty}
              </Button>
            ))}
          </div>

          <Button
            variant={showFeaturedOnly ? "default" : "outline"}
            size="sm"
            onClick={() => setShowFeaturedOnly(!showFeaturedOnly)}
            className={`${
              showFeaturedOnly
                ? "bg-primary text-primary-foreground"
                : "border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
            } transition-all duration-300 hover:scale-105`}
          >
            <Crown className="w-4 h-4 mr-2" />
            Featured Only
          </Button>
        </div>

        {/* Performer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPerformers.map((performer, index) => (
            <Card
              key={performer.id}
              className="group relative overflow-hidden bg-card/90 backdrop-blur-sm border-border/50 hover:border-secondary/50 transition-all duration-500 hover:scale-105 animate-float cursor-pointer"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative">
                <Image
                  src={performer.image || "/placeholder.svg"}
                  alt={performer.stage_name}
                  width={300}
                  height={400}
                  className="w-full h-64 sm:h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Featured Badge */}
                {performer.featured && (
                  <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
                    <Crown className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}

                {/* Rating */}
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
                  <Star className="w-3 h-3 text-secondary fill-secondary" />
                  <span className="text-xs font-bold text-white">{performer.rating}.0</span>
                </div>

                {/* Overlay Content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-sm text-white/90 mb-2">{performer.bio}</p>
                  <div className="flex items-center justify-between text-xs text-white/70">
                    <span>{performer.stats.shows}+ Shows</span>
                    <span>{performer.stats.experience_years} Years</span>
                  </div>
                </div>
              </div>

              <CardContent className="p-4 sm:p-6">
                <div className="mb-3">
                  <h3 className="text-lg sm:text-xl font-bold text-secondary group-hover:animate-glow">
                    {performer.stage_name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{performer.name}</p>
                </div>

                <div className="mb-3">
                  <Badge variant="outline" className="border-primary text-primary">
                    {performer.specialty}
                  </Badge>
                </div>

                <div className="flex items-center mb-3">
                  {renderStars(performer.rating)}
                  <span className="ml-2 text-sm text-muted-foreground">({performer.stats.rating})</span>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>{performer.schedule.join(", ")}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{performer.experience} Level</span>
                  </div>
                </div>

                <Button
                  className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105"
                  onClick={() => (window.location.href = "tel:+14804257546")}
                >
                  Request Booking
                </Button>
              </CardContent>

              {/* Logo Watermark */}
              <div className="absolute bottom-4 right-4 opacity-30">
                <Image src="/images/skin-logo-red-silhouette.png" alt="Skin Cabaret" width={20} height={20} />
              </div>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16">
          <h3 className="text-2xl sm:text-3xl font-black mb-6 text-secondary">BOOK YOUR PREFERRED ENTERTAINER</h3>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Call us to request specific performers for your event or let our team recommend the perfect entertainment
            for your celebration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-bold tracking-wide uppercase transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-primary/50"
              onClick={() => (window.location.href = "tel:+14804257546")}
            >
              <Clock className="w-5 h-5 mr-2" />
              Call Now
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-4 text-lg font-bold tracking-wide uppercase transform hover:scale-110 transition-all duration-300 bg-transparent"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Schedule Consultation
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 sm:mt-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {[
              { label: "Professional Performers", value: "15+" },
              { label: "Years Experience", value: "10+" },
              { label: "Customer Satisfaction", value: "98%" },
              { label: "Events Monthly", value: "200+" },
            ].map((stat, index) => (
              <Card
                key={index}
                className="bg-gradient-to-br from-primary/10 to-secondary/10 border-secondary/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 group text-center"
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="text-2xl sm:text-3xl font-black text-secondary mb-2 group-hover:animate-glow">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold uppercase tracking-wide text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
