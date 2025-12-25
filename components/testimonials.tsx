"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Award, TrendingUp } from "lucide-react"
import Image from "next/image"

interface Testimonial {
  id: number
  name: string
  location: string
  rating: number
  review: string
  experience: string
  avatar: string
  source: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marcus Rodriguez",
    location: "Denver, CO",
    rating: 5,
    review:
      "Best bachelor party experience ever! Flew in from Colorado and this place exceeded all expectations. The VIP treatment and free shuttle service made everything perfect.",
    experience: "Bachelor Party",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    source: "Google Reviews",
  },
  {
    id: 2,
    name: "David Thompson",
    location: "Las Vegas, NV",
    rating: 5,
    review:
      "I've been to venues all over Vegas and this place in Scottsdale is hands down the best. World-class performers, amazing atmosphere, and the VIP service is unmatched.",
    experience: "VIP Experience",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    source: "Yelp",
  },
  {
    id: 3,
    name: "Jake Morrison",
    location: "Dallas, TX",
    rating: 5,
    review:
      "Brought my whole crew from Texas for a weekend and Skin Cabaret was the highlight. The private areas are luxurious and the entertainment is top-tier.",
    experience: "Group Event",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    source: "Google Reviews",
  },
  {
    id: 4,
    name: "Ryan Thompson",
    location: "San Diego, CA",
    rating: 5,
    review:
      "Incredible night out! The bottle service was premium, atmosphere was electric, and the staff treated us like royalty. Best entertainment venue on the West Coast!",
    experience: "Night Out",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
    source: "Yelp",
  },
  {
    id: 5,
    name: "Chris Bradley",
    location: "Chicago, IL",
    rating: 5,
    review:
      "Flew in for my buddy's bachelor party and wow! The champagne service was incredible, performers were stunning, and the whole experience was unforgettable.",
    experience: "Bachelor Party",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
    source: "Google Reviews",
  },
  {
    id: 6,
    name: "Michael Kennedy",
    location: "Miami, FL",
    rating: 5,
    review:
      "Coming from Miami's nightlife scene, I was impressed! The VIP booths are luxurious, staff is professional, and the entertainment quality is world-class.",
    experience: "VIP Experience",
    avatar: "https://images.unsplash.com/photo-1558222218-b7b54eede3f3?w=150&h=150&fit=crop&crop=face",
    source: "Yelp",
  },
  {
    id: 7,
    name: "Tony Sullivan",
    location: "New York, NY",
    rating: 5,
    review:
      "Best gentlemen's club I've been to outside of NYC. The atmosphere is electric, performers are top-notch, and the customer service is exceptional.",
    experience: "Business Entertainment",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&h=150&fit=crop&crop=face",
    source: "Google Reviews",
  },
  {
    id: 8,
    name: "Brad Williams",
    location: "Seattle, WA",
    rating: 5,
    review:
      "Waste Management corporate event was handled perfectly! Private area, premium service, and entertainment that impressed all our clients. Highly professional.",
    experience: "Corporate Event",
    avatar: "https://images.unsplash.com/photo-1563453091185-61582044d556?w=150&h=150&fit=crop&crop=face",
    source: "Yelp",
  },
  {
    id: 9,
    name: "Alex Patterson",
    location: "Portland, OR",
    rating: 5,
    review:
      "The Sunday Night Football experience here is unmatched! Great food, amazing atmosphere, and the entertainment during halftime was incredible.",
    experience: "Sunday Football",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face",
    source: "Google Reviews",
  },
  {
    id: 10,
    name: "Jordan Harris",
    location: "Austin, TX",
    rating: 5,
    review:
      "Champagne Saturdays are legendary! The bottle service, the atmosphere, and the performers create an experience you can't find anywhere else.",
    experience: "Champagne Saturday",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150&h=150&fit=crop&crop=face",
    source: "Yelp",
  },
  {
    id: 11,
    name: "Kevin Rodriguez",
    location: "San Antonio, TX",
    rating: 5,
    review:
      "Brought my bachelor party group here and it was perfect! The shuttle service, VIP treatment, and entertainment exceeded every expectation.",
    experience: "Bachelor Party",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face",
    source: "Google Reviews",
  },
  {
    id: 12,
    name: "Steve Martinez",
    location: "Phoenix, AZ",
    rating: 5,
    review:
      "Local here and this is hands down the best venue in Arizona. The quality of entertainment, service, and atmosphere is consistently outstanding.",
    experience: "Regular Customer",
    avatar: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=150&h=150&fit=crop&crop=face",
    source: "Yelp",
  },
  {
    id: 13,
    name: "Carlos Davis",
    location: "Los Angeles, CA",
    rating: 5,
    review:
      "Coming from LA's entertainment scene, I was blown away! The performers are world-class, the VIP service is impeccable, and the whole experience is unforgettable.",
    experience: "VIP Experience",
    avatar: "https://images.unsplash.com/photo-1558222218-b7b54eede3f3?w=150&h=150&fit=crop&crop=face",
    source: "Google Reviews",
  },
  {
    id: 14,
    name: "Robert Foster",
    location: "Houston, TX",
    rating: 5,
    review:
      "Corporate entertainment at its finest! Brought clients here and they were thoroughly impressed. Professional staff, premium service, and world-class entertainment.",
    experience: "Corporate Event",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    source: "Yelp",
  },
  {
    id: 15,
    name: "Daniel Torres",
    location: "Nashville, TN",
    rating: 5,
    review:
      "Best bachelor party destination! The private booths, champagne service, and entertainment quality made it an unforgettable night for the whole group.",
    experience: "Bachelor Party",
    avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face",
    source: "Google Reviews",
  },
]

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => (prev + 1) % testimonials.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star key={i} className={`w-5 h-5 ${i < rating ? "text-white fill-white" : "text-white/30"}`} />
    ))
  }

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-5xl font-black text-center mb-16 text-white animate-glow hover:scale-105 transition-transform duration-300">
          WHAT OUR CUSTOMERS SAY
        </h2>

        <div className="mb-16 overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${scrollPosition * 320}px)` }}
          >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <Card
                key={`${testimonial.id}-${index}`}
                className="flex-shrink-0 w-80 bg-gradient-to-br from-red-900/20 to-black border-red-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 animate-shimmer"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="rounded-full mr-4 border-2 border-red-500/50"
                    />
                    <div>
                      <div className="font-bold text-white">{testimonial.name}</div>
                      <div className="text-sm text-white/70">{testimonial.location}</div>
                      <div className="text-xs text-red-400 font-semibold">{testimonial.source}</div>
                    </div>
                  </div>

                  <div className="flex mb-4">{renderStars(testimonial.rating)}</div>

                  <blockquote className="text-sm leading-relaxed mb-4 text-white/90 line-clamp-4">
                    "{testimonial.review}"
                  </blockquote>

                  <span className="inline-block px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-bold uppercase tracking-wide">
                    {testimonial.experience}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Awards & Recognition */}
        <div className="mt-16">
          <h3 className="text-3xl font-black text-center mb-8 text-white">AWARDS & RECOGNITION</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-red-900/20 to-black border-red-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 animate-shimmer">
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 mx-auto mb-4 text-red-400" />
                <h4 className="text-xl font-bold mb-2 text-white">Best in AZ</h4>
                <p className="text-white/70">5 Years in a Row</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-900/20 to-black border-red-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 animate-shimmer">
              <CardContent className="p-6 text-center">
                <Star className="w-12 h-12 mx-auto mb-4 text-red-400" />
                <h4 className="text-xl font-bold mb-2 text-white">5-Star Customer Service</h4>
                <p className="text-white/70">Arizona Business Excellence</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-900/20 to-black border-red-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 animate-shimmer">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 text-red-400" />
                <h4 className="text-xl font-bold mb-2 text-white">Top Rated Venue</h4>
                <p className="text-white/70">Phoenix Entertainment Guide</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
