"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, Star, Users, Music, Sparkles } from "lucide-react"
import Image from "next/image"

interface Event {
  id: number
  title: string
  date: string
  time: string
  description: string
  type: "special" | "regular" | "featured"
  image: string
  price?: string
}

const upcomingEvents: Event[] = [
  {
    id: 1,
    title: "VIP Grand Opening Night",
    date: "2025-02-01",
    time: "9:00 PM",
    description: "Exclusive VIP experience with premium entertainment and bottle service specials",
    type: "featured",
    image: "/images/vip-booth.jpeg",
    price: "Premium",
  },
  {
    id: 2,
    title: "Bachelor Party Blowout",
    date: "2025-02-03",
    time: "8:00 PM",
    description: "Ultimate bachelor party experience with group packages and free shuttle service",
    type: "special",
    image: "/images/bachelor-party.jpeg",
    price: "Group Rates",
  },
  {
    id: 3,
    title: "Neon Nights",
    date: "2025-02-05",
    time: "10:00 PM",
    description: "Electric atmosphere with neon lighting and premium entertainment",
    type: "regular",
    image: "/images/neon-lights.jpeg",
  },
  {
    id: 4,
    title: "Red Carpet Experience",
    date: "2025-02-07",
    time: "9:30 PM",
    description: "Luxury VIP treatment with red carpet service and exclusive access",
    type: "featured",
    image: "/images/red-leather.jpeg",
    price: "VIP Only",
  },
  {
    id: 5,
    title: "Weekend Warriors",
    date: "2025-02-08",
    time: "8:30 PM",
    description: "High-energy weekend entertainment with special performances",
    type: "regular",
    image: "/images/club-atmosphere.jpeg",
  },
  {
    id: 6,
    title: "Diamond Elite Night",
    date: "2025-02-10",
    time: "9:00 PM",
    description: "Premium diamond-tier experience with exclusive entertainment",
    type: "featured",
    image: "/images/skin-choker.jpeg",
    price: "Elite",
  },
]

const eventTypes = ["All", "Featured", "Special", "Regular"]

export default function EventsCalendar() {
  const [selectedType, setSelectedType] = useState("All")
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)

  const filteredEvents =
    selectedType === "All"
      ? upcomingEvents
      : upcomingEvents.filter((event) => event.type === selectedType.toLowerCase())

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getEventIcon = (type: string) => {
    switch (type) {
      case "featured":
        return <Star className="w-5 h-5" />
      case "special":
        return <Sparkles className="w-5 h-5" />
      default:
        return <Music className="w-5 h-5" />
    }
  }

  const getEventColor = (type: string) => {
    switch (type) {
      case "featured":
        return "from-secondary/20 to-primary/20 border-secondary/50"
      case "special":
        return "from-primary/20 to-secondary/20 border-primary/50"
      default:
        return "from-card/50 to-card/70 border-border/50"
    }
  }

  return (
    <section className="py-24 bg-gradient-to-b from-card/30 to-background relative">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-black text-center mb-16 text-secondary animate-glow hover:scale-105 transition-transform duration-300">
          UPCOMING EVENTS
        </h2>

        {/* Event Type Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap gap-4">
            {eventTypes.map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                className={`px-8 py-3 font-bold uppercase tracking-wide transition-all duration-300 ${
                  selectedType === type
                    ? "bg-primary hover:bg-primary/90 text-primary-foreground scale-105"
                    : "border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground hover:scale-105"
                }`}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </Button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <Card
              key={event.id}
              className={`group relative overflow-hidden bg-gradient-to-br ${getEventColor(event.type)} backdrop-blur-sm hover:border-secondary/70 transition-all duration-500 cursor-pointer hover:scale-105 animate-float`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => setSelectedEvent(event)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={event.image || "/placeholder.svg"}
                  alt={event.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />

                {/* Event Type Badge */}
                <div
                  className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-2 ${
                    event.type === "featured"
                      ? "bg-secondary text-secondary-foreground"
                      : event.type === "special"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card text-foreground"
                  }`}
                >
                  {getEventIcon(event.type)}
                  {event.type}
                </div>

                {/* Price Badge */}
                {event.price && (
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-background/80 backdrop-blur-sm text-xs font-bold uppercase tracking-wide">
                    {event.price}
                  </div>
                )}

                <div className="absolute bottom-4 right-4 opacity-60">
                  <Image src="/images/skin-logo-red-silhouette.png" alt="Skin Cabaret" width={24} height={24} />
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3 text-secondary group-hover:animate-glow">{event.title}</h3>

                <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(event.date)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{event.description}</p>

                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold uppercase tracking-wide transition-all duration-300 hover:scale-105"
                  onClick={(e) => {
                    e.stopPropagation()
                    window.location.href = "tel:4804257546"
                  }}
                >
                  Reserve Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Event Spotlight */}
        <div className="mt-16">
          <h3 className="text-3xl font-black text-center mb-8 text-secondary">THIS WEEK'S SPOTLIGHT</h3>

          <Card className="bg-gradient-to-r from-secondary/10 via-primary/10 to-secondary/10 border-secondary/30 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="relative">
                  <Image
                    src="/images/vip-booth.jpeg"
                    alt="VIP Grand Opening"
                    width={500}
                    height={400}
                    className="rounded-lg shadow-2xl"
                  />
                  <div className="absolute bottom-4 right-4 opacity-60">
                    <Image src="/images/skin-logo-red-silhouette.png" alt="Skin Cabaret" width={30} height={30} />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <Star className="w-6 h-6 text-secondary" />
                    <span className="text-sm font-bold uppercase tracking-wide text-secondary">Featured Event</span>
                  </div>

                  <h4 className="text-4xl font-black mb-4 text-secondary animate-glow">VIP Grand Opening Night</h4>

                  <div className="flex items-center gap-6 mb-6 text-lg">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-5 h-5 text-secondary" />
                      <span>February 1st, 2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-secondary" />
                      <span>9:00 PM</span>
                    </div>
                  </div>

                  <p className="text-lg leading-relaxed mb-8 text-muted-foreground">
                    Experience the ultimate VIP treatment at our grand opening celebration. Enjoy premium bottle
                    service, exclusive entertainment, and luxury amenities in our newly renovated VIP areas.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-bold uppercase tracking-wide hover:scale-105 transition-all duration-300"
                      onClick={() => (window.location.href = "tel:4804257546")}
                    >
                      <Users className="w-5 h-5 mr-2" />
                      Reserve VIP Table
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-4 text-lg font-bold uppercase tracking-wide hover:scale-105 transition-all duration-300 bg-transparent"
                      onClick={() => (window.location.href = "tel:4804257546")}
                    >
                      Get Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Event Details Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
            <Card className="max-w-2xl w-full bg-card/95 backdrop-blur-sm border-secondary/50">
              <CardContent className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-3">
                    {getEventIcon(selectedEvent.type)}
                    <span className="text-sm font-bold uppercase tracking-wide text-secondary">
                      {selectedEvent.type}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setSelectedEvent(null)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </Button>
                </div>

                <h3 className="text-3xl font-black mb-4 text-secondary">{selectedEvent.title}</h3>

                <div className="flex items-center gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-secondary" />
                    <span>{formatDate(selectedEvent.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5 text-secondary" />
                    <span>{selectedEvent.time}</span>
                  </div>
                </div>

                <div className="relative mb-6">
                  <Image
                    src={selectedEvent.image || "/placeholder.svg"}
                    alt={selectedEvent.title}
                    width={600}
                    height={300}
                    className="rounded-lg shadow-xl w-full"
                  />
                  <div className="absolute bottom-4 right-4 opacity-60">
                    <Image src="/images/skin-logo-red-silhouette.png" alt="Skin Cabaret" width={30} height={30} />
                  </div>
                </div>

                <p className="text-lg leading-relaxed mb-8 text-muted-foreground">{selectedEvent.description}</p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 font-bold uppercase tracking-wide hover:scale-105 transition-all duration-300"
                    onClick={() => (window.location.href = "tel:4804257546")}
                  >
                    Reserve Now
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground px-8 py-4 font-bold uppercase tracking-wide hover:scale-105 transition-all duration-300 bg-transparent"
                    onClick={() => setSelectedEvent(null)}
                  >
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </section>
  )
}
