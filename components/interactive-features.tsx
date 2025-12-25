"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, MapPin, Car, Star } from "lucide-react"

export default function InteractiveFeatures() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Check if venue is open (8 PM - 6 AM)
    const hour = currentTime.getHours()
    setIsOpen(hour >= 20 || hour < 6)

    return () => clearInterval(timer)
  }, [currentTime])

  const handleCallNow = () => {
    window.location.href = "tel:+14804257546"
  }

  const handleGetDirections = () => {
    window.open("https://maps.google.com/?q=1137+N+Scottsdale+Rd,+Scottsdale,+AZ+85257", "_blank")
  }

  const handleRequestShuttle = () => {
    const message = encodeURIComponent(
      "Hi! I'd like to request a shuttle pickup for tonight. Please let me know the details.",
    )
    window.open(`sms:+14804257546?body=${message}`, "_blank")
  }

  const handleQuickReservation = () => {
    const message = encodeURIComponent(
      "Hi! I'd like to make a reservation for tonight. Please call me back with availability.",
    )
    window.open(`sms:+14804257546?body=${message}`, "_blank")
  }

  return (
    <div className="fixed bottom-4 left-4 z-50 space-y-3">
      {/* Status Indicator */}
      <Card className="bg-card/95 backdrop-blur-sm border-secondary/50">
        <CardContent className="p-3">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isOpen ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
            <span className="text-sm font-semibold">{isOpen ? "OPEN NOW" : "CLOSED"}</span>
          </div>
          <div className="text-xs text-muted-foreground mt-1">{currentTime.toLocaleTimeString()}</div>
        </CardContent>
      </Card>

      {/* Quick Action Buttons */}
      <div className="flex flex-col space-y-2">
        <Button
          onClick={handleCallNow}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/50 transition-all duration-300 hover:scale-105"
          size="sm"
        >
          <Phone className="w-4 h-4 mr-2" />
          Call Now
        </Button>

        <Button
          onClick={handleGetDirections}
          variant="outline"
          className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-card/95 backdrop-blur-sm shadow-lg transition-all duration-300 hover:scale-105"
          size="sm"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Directions
        </Button>

        <Button
          onClick={handleRequestShuttle}
          variant="outline"
          className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-card/95 backdrop-blur-sm shadow-lg transition-all duration-300 hover:scale-105"
          size="sm"
        >
          <Car className="w-4 h-4 mr-2" />
          Shuttle
        </Button>

        <Button
          onClick={handleQuickReservation}
          variant="outline"
          className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-card/95 backdrop-blur-sm shadow-lg transition-all duration-300 hover:scale-105"
          size="sm"
        >
          <Star className="w-4 h-4 mr-2" />
          Reserve
        </Button>
      </div>
    </div>
  )
}
