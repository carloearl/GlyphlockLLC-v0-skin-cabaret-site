"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"

export default function EventManagerDemo() {
  const [showCalendar, setShowCalendar] = useState(false)

  const upcomingEvents = [
    {
      id: 1,
      title: "New Year's Eve Gala",
      date: "2025-12-31",
      time: "9:00 PM",
      type: "Special Event",
      price: "$150",
      description: "Ring in the New Year with champagne, premium entertainment, and exclusive VIP packages.",
      image: "/images/silver-champagne-bucket.jpeg",
      capacity: 200,
      booked: 85,
    },
    {
      id: 2,
      title: "Valentine's Day Romance",
      date: "2025-02-14",
      time: "8:00 PM",
      type: "Couples Event",
      price: "$120",
      description: "Sophisticated couples entertainment with romantic atmosphere and premium service.",
      image: "/images/vip-blonde-martini.jpeg",
      capacity: 150,
      booked: 62,
    },
    {
      id: 3,
      title: "March Madness Party",
      date: "2025-03-15",
      time: "7:00 PM",
      type: "Sports Event",
      price: "$80",
      description: "Watch March Madness games on big screens with drink specials and entertainment.",
      image: "/images/nbc-sunday-night-football.jpeg",
      capacity: 300,
      booked: 145,
    },
    {
      id: 4,
      title: "Spring Break Celebration",
      date: "2025-03-22",
      time: "9:00 PM",
      type: "Party Event",
      price: "$100",
      description: "Ultimate spring break party with DJ, special performances, and VIP packages.",
      image: "/images/bachelor-party-celebration.jpeg",
      capacity: 250,
      booked: 98,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950/20 to-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-red-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/demos" className="text-white hover:text-red-400 transition-colors">
              ← Back to Demos
            </Link>
            <h1 className="text-xl font-bold text-white">Event Manager Demo</h1>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Demo Warning */}
          <div className="bg-yellow-600/20 border border-yellow-500/50 rounded-lg p-4 mb-8 text-center">
            <span className="text-yellow-400 font-bold text-lg">🚧 DEMO PREVIEW - NOT FUNCTIONAL 🚧</span>
            <p className="text-yellow-300 mt-2">This is a preview of the upcoming event management system</p>
          </div>

          {/* Event Manager Center */}
          <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 rounded-lg p-8 opacity-60">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white/70 mb-2">Event Management Center</h3>
                <p className="text-gray-400">Browse upcoming events, check availability, and book your experience</p>
              </div>
              <div className="flex gap-4 mt-4 lg:mt-0">
                <button
                  disabled
                  className="bg-yellow-600/20 text-yellow-400 border border-yellow-500/50 px-6 py-3 rounded-lg font-semibold cursor-not-allowed opacity-60"
                >
                  Demo Calendar
                </button>
                <button
                  disabled
                  className="bg-yellow-600/20 text-yellow-400 border border-yellow-500/50 px-6 py-3 rounded-lg font-semibold cursor-not-allowed opacity-60"
                >
                  Demo Inquiry
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-yellow-500/30 rounded-lg overflow-hidden"
                >
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={event.image || "/placeholder.svg"}
                      alt="Demo Event"
                      fill
                      className="object-cover blur-md"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute top-2 left-2 bg-yellow-600 text-black px-2 py-1 rounded text-xs font-bold">
                      DEMO
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="text-white/70 font-bold text-sm mb-2">Sample Event</h4>
                    <p className="text-gray-500 text-xs mb-3">Event booking system in development</p>
                    <button
                      disabled
                      className="w-full bg-yellow-600/20 text-yellow-400 border border-yellow-500/50 py-2 rounded text-xs font-bold cursor-not-allowed opacity-60"
                    >
                      Demo Feature
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
