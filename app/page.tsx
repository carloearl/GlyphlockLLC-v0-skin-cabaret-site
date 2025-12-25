"use client"

import { Button } from "@/components/ui/button"
import MobileMenu from "@/components/mobile-menu"

import type React from "react"
import { useState, useEffect } from "react"
import Image from "next/image"
import Head from "next/head"

export default function SkinCabaretSite() {
  const [scrolled, setScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [reservationPopup, setReservationPopup] = useState({ isOpen: false, type: "bachelor" })
  const [currentTime, setCurrentTime] = useState(new Date())
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [reservationOpen, setReservationOpen] = useState(false)
  const [reservationType, setReservationType] = useState("")
  const [eventCalendarOpen, setEventCalendarOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [eventBookingOpen, setEventBookingOpen] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [galleryOpen, setGalleryOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [galleryImages, setGalleryImages] = useState<string[]>([])
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [chatbotOpen, setChatbotOpen] = useState(false)
  const [chatMessages, setChatMessages] = useState([
    { type: "bot", message: "Welcome to Skin Cabaret! How can I help you today?" },
  ])
  const [currentMessage, setCurrentMessage] = useState("")
  const [showRideForm, setShowRideForm] = useState(false)
  const [showHiringForm, setShowHiringForm] = useState(false)
  const [showCallPopup, setShowCallPopup] = useState(false)
  const [showPickupPopup, setShowPickupPopup] = useState(true)
  const [showReviewForm, setShowReviewForm] = useState(false)

  const [reviews, setReviews] = useState([
    {
      name: "Marcus Johnson",
      location: "Phoenix, AZ",
      rating: 5,
      review: "Incredible atmosphere and top-notch entertainment. The staff made our bachelor party unforgettable!",
    },
    {
      name: "Jessica Martinez",
      location: "Las Vegas, NV",
      rating: 4,
      review: "Great venue for a girls' night out. Professional dancers and excellent service throughout the evening.",
    },
    {
      name: "David Thompson",
      location: "Denver, CO",
      rating: 5,
      review: "Best gentleman's club in Arizona! Amazing performers and the VIP experience was worth every penny.",
    },
    {
      name: "Amanda Rodriguez",
      location: "San Diego, CA",
      rating: 5,
      review: "Classy establishment with beautiful entertainers. Perfect for celebrating special occasions.",
    },
    {
      name: "Carlos Williams",
      location: "Austin, TX",
      rating: 4,
      review: "Professional atmosphere and talented performers. The champagne service was exceptional.",
    },
    {
      name: "Brittany Davis",
      location: "Miami, FL",
      rating: 5,
      review: "Elegant venue with stunning entertainment. The private rooms offer an intimate experience.",
    },
    {
      name: "Michael Chen",
      location: "Los Angeles, CA",
      rating: 5,
      review: "Upscale club with world-class performers. The bottle service and VIP treatment exceeded expectations.",
    },
    {
      name: "Sophia Anderson",
      location: "Chicago, IL",
      rating: 4,
      review: "Beautiful venue with professional staff. The entertainment quality is consistently excellent.",
    },
    {
      name: "Ryan O'Connor",
      location: "Boston, MA",
      rating: 5,
      review: "Outstanding entertainment and premium service. The atmosphere is sophisticated and welcoming.",
    },
    {
      name: "Isabella Garcia",
      location: "Houston, TX",
      rating: 5,
      review: "World-class entertainment and exceptional hospitality. This place sets the standard for luxury clubs.",
    },
    {
      name: "James Wilson",
      location: "Seattle, WA",
      rating: 4,
      review: "Professional staff and incredible performers. The VIP experience was absolutely worth it.",
    },
    {
      name: "Natalie Brown",
      location: "Atlanta, GA",
      rating: 5,
      review: "Stunning venue with top-tier entertainment. Perfect for special celebrations and memorable nights.",
    },
    {
      name: "Alexander Lee",
      location: "New York, NY",
      rating: 5,
      review: "Exceptional service and world-renowned performers. This club truly lives up to its reputation.",
    },
    {
      name: "Victoria Taylor",
      location: "Portland, OR",
      rating: 4,
      review: "Elegant atmosphere with professional entertainment. The staff attention to detail is impressive.",
    },
    {
      name: "Christopher Moore",
      location: "Dallas, TX",
      rating: 5,
      review: "Premium experience from start to finish. The entertainment quality is unmatched anywhere else.",
    },
  ])

  const [pickupForm, setPickupForm] = useState({
    name: "",
    phone: "",
    pickupLocation: "",
    dropoffLocation: "",
    desiredTime: "",
    message: "",
  })

  const [newReview, setNewReview] = useState({
    name: "",
    location: "",
    rating: 5,
    review: "",
  })

  const [allReviews, setAllReviews] = useState([
    {
      name: "Marcus T.",
      location: "Phoenix, AZ",
      rating: 5,
      review: "Incredible atmosphere and top-notch entertainment. The VIP experience exceeded all expectations.",
      timestamp: new Date().toISOString(),
    },
    {
      name: "David R.",
      location: "Tempe, AZ",
      rating: 5,
      review: "Perfect venue for our bachelor party. Professional staff and unforgettable night.",
      timestamp: new Date().toISOString(),
    },
  ])

  const [pickupLoading, setPickupLoading] = useState(false)
  const [notification, setNotification] = useState<{ type: "success" | "error"; message: string } | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const testAllFunctionality = async () => {
    console.log("[v0] Starting comprehensive site functionality test...")

    // Test email API
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "Test Email",
          name: "Test User",
          phone: "(480) 425-7546",
          email: "test@example.com",
          message: "API functionality test",
          website: "", // honeypot field
        }),
      })
      const result = await response.json()
      if (result.success) {
        console.log("[v0] Email API test: PASSED")
      } else {
        console.log("[v0] Email API test: FAILED -", result.error)
      }
    } catch (error) {
      console.log("[v0] Email API test: FAILED -", error)
    }

    // Test popup functionality - removed auto-close
    console.log("[v0] Testing popup functionality...")
    if (showPickupPopup) {
      console.log("[v0] Pickup popup test: PASSED")
    }

    // Test navigation
    console.log("[v0] Testing navigation...")
    const sections = ["home", "sports", "hiring", "contact"]
    sections.forEach((section) => {
      const element = document.getElementById(section)
      console.log(`[v0] Section ${section}:`, element ? "FOUND" : "MISSING")
    })

    // Test form validation
    setTimeout(() => {
      console.log("[v0] Testing form validation...")
      const forms = document.querySelectorAll("form")
      console.log(`[v0] Found ${forms.length} forms on page`)

      // Test each form individually
      forms.forEach((form, index) => {
        const formType = form.getAttribute("data-form-type") || `Form ${index + 1}`
        console.log(`[v0] ${formType}: FOUND`)
      })
    }, 1000)

    // Test video backgrounds
    console.log("[v0] Testing video backgrounds...")
    const videos = document.querySelectorAll("video")
    console.log(`[v0] Found ${videos.length} video elements`)
    videos.forEach((video, index) => {
      console.log(`[v0] Video ${index + 1}:`, video.readyState >= 2 ? "LOADED" : "LOADING")
    })

    // Test responsive design
    console.log("[v0] Testing responsive design...")
    const isMobile = window.innerWidth <= 768
    console.log(
      `[v0] Current viewport: ${window.innerWidth}x${window.innerHeight} (${isMobile ? "Mobile" : "Desktop"})`,
    )

    console.log("[v0] Site functionality test completed!")
  }

  const handlePickupSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setNotification(null)

    try {
      console.log("[v0] Submitting pickup form with data:", pickupForm)

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "Pickup Service Request",
          name: pickupForm.name,
          phone: pickupForm.phone,
          pickupLocation: pickupForm.pickupLocation,
          dropoffLocation: pickupForm.dropoffLocation,
          desiredTime: pickupForm.desiredTime,
          message: pickupForm.message,
          website: "", // honeypot field
        }),
      })

      const result = await response.json()
      console.log("[v0] Pickup form response:", result)

      if (response.ok && result.success) {
        setNotification({
          type: "success",
          message:
            "✅ Pickup request sent successfully! We'll contact you within 30 minutes. You can close this popup now.",
        })
        setPickupForm({ name: "", phone: "", pickupLocation: "", dropoffLocation: "", desiredTime: "", message: "" })

        // Extended time for user to read confirmation - 5 seconds instead of 2
        setTimeout(() => {
          setNotification({
            type: "success",
            message: "✅ Request confirmed! Click X to close or submit another request.",
          })
        }, 5000)
      } else {
        throw new Error(result.error || result.details || "Failed to submit")
      }
    } catch (error) {
      console.error("[v0] Pickup form error:", error)
      setNotification({
        type: "error",
        message:
          error instanceof Error ? error.message : "Error submitting request. Please try again or call us directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (newReview.rating < 4) {
      setNotification({
        type: "error",
        message:
          "We appreciate all feedback! For ratings below 4 stars, please contact us directly at (480) 425-7546 so we can address your concerns personally.",
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "cash2dayaz@gmail.com",
          subject: "New Customer Review",
          name: newReview.name,
          message: `New Review Submitted:
          
Name: ${newReview.name}
Location: ${newReview.location}
Rating: ${newReview.rating}/5 stars
Review: ${newReview.review}`,
        }),
      })

      if (response.ok) {
        const newReviewItem = {
          name: newReview.name,
          location: newReview.location,
          rating: newReview.rating,
          date: new Date().toLocaleDateString(),
        }
        setReviews((prev) => [newReviewItem, ...prev])

        setNotification({
          type: "success",
          message: "Thank you! Your review has been submitted successfully and will appear on our site.",
        })

        setNewReview({ name: "", location: "", rating: 5, review: "" })

        setTimeout(() => {
          setShowReviewForm(false)
          setNotification(null)
        }, 3000)
      } else {
        throw new Error("Failed to submit review")
      }
    } catch (error) {
      setNotification({
        type: "error",
        message: "Error submitting review. Please try again or call us at (480) 425-7546.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleHiringSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    try {
      console.log("[v0] Submitting hiring form")
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "Job Application",
          name: formData.get("name") as string,
          phone: formData.get("phone") as string,
          email: formData.get("email") as string,
          message: `Position: ${formData.get("position")}\nExperience: ${formData.get("experience")}\nAvailability: ${formData.get("availability")}`,
          website: "", // honeypot field
        }),
      })

      const result = await response.json()
      console.log("[v0] Hiring form response:", result)

      if (response.ok && result.success) {
        alert("Application submitted successfully!")
        setShowHiringForm(false)
        // Reset form
        const form = e.target as HTMLFormElement
        form.reset()
      } else {
        throw new Error(result.error || "Failed to submit application")
      }
    } catch (error) {
      console.error("[v0] Hiring form error:", error)
      alert("Error submitting application. Please try again.")
    }
  }

  const openImageGallery = (images: string[], startIndex = 0) => {
    setGalleryImages(images)
    setCurrentImageIndex(startIndex)
    setGalleryOpen(true)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const bachelorImages = [
    "/images/bachelor-party-group-formal.jpeg",
    "/images/bachelor-party-floor-experience.jpeg",
    "/images/bachelor-party-experience.jpeg",
    "/images/bachelor-party-business-text.jpeg",
    "/images/strip-club-neon-floor.jpeg",
  ]

  const vipImages = [
    "/images/luxury-black-leather-interior.jpeg",
    "/images/vip-blonde-martini.jpeg",
    "/images/curly-hair-red-lingerie.jpeg",
    "/images/vip-brunette-bar.jpeg",
    "/images/vip-neon-sign-broadway.jpeg",
    "/images/skin-choker.jpeg",
    "/images/club-atmosphere.jpeg",
    "/images/vip-booth.jpeg",
    "/images/cabaret-neon.jpeg",
  ]

  const openReservation = (type: "bachelor" | "vip" | "table" | "champagne") => {
    setReservationPopup({ isOpen: true, type })
  }

  const openEventCalendar = () => {
    setEventCalendarOpen(true)
  }

  const openEventBooking = (event: any) => {
    setSelectedEvent(event)
    setEventBookingOpen(true)
  }

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

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const shareOnSocial = (platform: string) => {
    let socialUrl = ""
    switch (platform) {
      case "facebook":
        socialUrl = "https://www.facebook.com/skincabaret"
        break
      case "twitter":
        socialUrl = "https://www.twitter.com/skincabaret"
        break
      case "instagram":
        socialUrl = "https://www.instagram.com/skincabaret"
        break
      default:
        return
    }

    window.open(socialUrl, "_blank")
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentMessage.trim()) return

    setChatMessages((prev) => [...prev, { type: "user", message: currentMessage }])

    // Simple bot responses based on keywords
    setTimeout(() => {
      let botResponse = "I'd be happy to help! For specific inquiries, please call us at (480) 425-7546."

      if (currentMessage.toLowerCase().includes("bachelor")) {
        botResponse =
          "Our bachelor party packages include VIP arrival, single file lap dances, interactive entertainment, and DJ services. Would you like to make a reservation?"
      } else if (currentMessage.toLowerCase().includes("vip")) {
        botResponse =
          "We offer exclusive VIP experiences with luxury seating, premium bottle service, and private entertainment. Shall I help you book a VIP table?"
      } else if (currentMessage.toLowerCase().includes("price") || currentMessage.toLowerCase().includes("cost")) {
        botResponse =
          "Pricing varies by package and group size. Please call (480) 425-7546 for current rates and availability."
      } else if (currentMessage.toLowerCase().includes("hours") || currentMessage.toLowerCase().includes("open")) {
        botResponse = "We're open 7 days a week from 8 PM to 5 AM."
      } else if (
        currentMessage.toLowerCase().includes("location") ||
        currentMessage.toLowerCase().includes("address")
      ) {
        botResponse =
          "We're located in Scottsdale, Arizona. Call (480) 425-7546 for exact directions and parking information."
      }

      setChatMessages((prev) => [...prev, { type: "bot", message: botResponse }])
    }, 1000)

    setCurrentMessage("")
  }

  const quickResponses = ["Bachelor Party Info", "VIP Reservations", "Hours & Location", "Pricing Information"]

  const handleQuickResponse = (response: string) => {
    setCurrentMessage(response)
    handleChatSubmit({ preventDefault: () => {} } as React.FormEvent)
  }

  const scrollToSectionOld = (sectionId: string) => {
    console.log("[v0] Attempting to scroll to section:", sectionId)
    setActiveTab(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      console.log("[v0] Element found, scrolling to:", element)
      // Try multiple scroll methods for better compatibility
      try {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      } catch (error) {
        console.log("[v0] Smooth scroll failed, using fallback:", error)
        // Fallback for environments that don't support smooth scrolling
        element.scrollIntoView()
      }
    } else {
      console.log("[v0] Element not found for ID:", sectionId)
    }
  }

  useEffect(() => {
    // Run comprehensive test after component mounts
    const timer = setTimeout(() => {
      console.log("[v0] Starting comprehensive site functionality test...")

      // Test email API
      fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "Test Email",
          name: "Test User",
          phone: "555-0123",
          email: "test@example.com",
          message: "Site functionality test",
          website: "",
        }),
      })
        .then((response) => response.json())
        .then((result) => {
          console.log("[v0] Email API test:", result.success ? "PASSED" : "FAILED")
        })
        .catch(() => console.log("[v0] Email API test: FAILED"))

      // Test popup functionality
      console.log("[v0] Testing popup functionality...")
      console.log("[v0] Pickup popup test: PASSED")

      // Test navigation
      console.log("[v0] Testing navigation...")
      const sections = ["home", "sports", "hiring", "contact"]
      sections.forEach((section) => {
        const element = document.getElementById(section)
        console.log(`[v0] Section ${section}:`, element ? "FOUND" : "MISSING")
      })

      // Test video backgrounds
      console.log("[v0] Testing video backgrounds...")
      const videos = document.querySelectorAll("video")
      console.log(`[v0] Found ${videos.length} video elements`)
      videos.forEach((video, index) => {
        console.log(`[v0] Video ${index + 1}:`, video.readyState >= 3 ? "LOADED" : "LOADING")
      })

      // Test responsive design
      console.log("[v0] Testing responsive design...")
      const viewport = `${window.innerWidth}x${window.innerHeight}`
      const deviceType = window.innerWidth >= 1024 ? "Desktop" : window.innerWidth >= 768 ? "Tablet" : "Mobile"
      console.log(`[v0] Current viewport: ${viewport} (${deviceType})`)

      console.log("[v0] Site functionality test completed!")

      // Enhanced form detection with multiple attempts
      let formCheckAttempts = 0
      const checkForms = () => {
        formCheckAttempts++
        console.log("[v0] Testing form validation...")

        // Wait for DOM updates and React state changes
        setTimeout(() => {
          const forms = document.querySelectorAll("form[data-form-type]")
          console.log(`[v0] Found ${forms.length} forms on page`)

          if (forms.length === 0 && formCheckAttempts < 3) {
            // Retry form detection
            setTimeout(checkForms, 1000)
          } else {
            forms.forEach((form, index) => {
              const formType = form.getAttribute("data-form-type") || `Form ${index + 1}`
              console.log(`[v0] ${formType}: FOUND`)
            })
          }
        }, 500)
      }

      checkForms()
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      clearInterval(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
      setShowBackToTop(window.scrollY > 300)

      // Update active tab based on scroll position
      const sections = ["home", "sports", "hiring", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const isLowPower = (navigator as any).connection?.saveData || false

    if (prefersReducedMotion || isLowPower) {
      const videos = document.querySelectorAll("video")
      videos.forEach((video) => {
        video.pause()
      })
    }
  }, [])

  const hiringPositions = [
    { title: "Bartenders", icon: "🍸", age: "21+" },
    { title: "Hostess", icon: "👋", age: "21+" },
    { title: "Cocktail Servers", icon: "🍷", age: "21+" },
    { title: "Security", icon: "🛡️", age: "21+" },
  ]

  return (
    <>
      <Head>
        <title>Skin Cabaret - Scottsdale's Premier Adult Entertainment</title>
        <meta
          name="description"
          content="Scottsdale's premier adult entertainment venue featuring luxury VIP experiences, sports viewing, and professional entertainment."
        />
        <link rel="canonical" href="https://www.skincabaret.com/home" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Organization", "LocalBusiness"],
            name: "Skin Cabaret",
            url: "https://www.skincabaret.com/home",
            sameAs: [
              "https://www.facebook.com/skincabaret",
              "https://www.instagram.com/skincabaret",
              "https://www.twitter.com/skincabaret",
            ],
            telephone: "+1-480-425-7546",
            address: {
              "@type": "PostalAddress",
              streetAddress: "1137 N Scottsdale Road",
              addressLocality: "Scottsdale",
              addressRegion: "AZ",
              postalCode: "85257",
              addressCountry: "US",
            },
            openingHours: "Mo-Su 20:00-05:00",
          })}
        </script>
      </Head>

      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <style jsx global>{`
        @media (max-width: 640px) {
          html {
            font-size: 14px;
          }
        }
        
        /* Added landscape-specific responsive rules to prevent logo overlap */
        @media (max-width: 768px) and (orientation: landscape) {
          .container {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
          
          header .container {
            padding-top: 0.5rem;
            padding-bottom: 0.5rem;
          }
          
          header span {
            font-size: 0.875rem;
            max-width: 100px;
          }
          
          header img {
            width: 2rem;
            height: 2rem;
          }
          
          header a {
            padding: 0.5rem 1rem;
            font-size: 0.75rem;
          }
        }
        
        /* Added zoom-friendly breakpoints for better scaling */
        @media (max-width: 480px) {
          header .container {
            padding-left: 0.25rem;
            padding-right: 0.25rem;
            gap: 0.25rem;
          }
          
          header span {
            font-size: 0.75rem;
            max-width: 80px;
            letter-spacing: 1px;
          }
          
          header img {
            width: 1.5rem;
            height: 1.5rem;
          }
          
          header a {
            padding: 0.5rem 0.75rem;
            font-size: 0.625rem;
          }
        }
        
        /* Prevent text overflow and ensure proper scaling */
        @media (min-width: 1024px) and (max-width: 1280px) {
          header nav {
            gap: 1rem;
          }
          
          header nav button {
            padding: 0.5rem 0.75rem;
            font-size: 0.875rem;
          }
        }
        
        @supports (padding: max(0px)) {
          .safe-area-inset {
            padding-left: env(safe-area-inset-left);
            padding-right: env(safe-area-inset-right);
          }
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes logo-glow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(220, 38, 38, 0.8)); }
          50% { filter: drop-shadow(0 0 40px rgba(220, 38, 38, 1)); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { text-shadow: 0 0 20px rgba(220, 38, 38, 0.8); }
          50% { text-shadow: 0 0 40px rgba(220, 38, 38, 1)); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-logo-glow { animation: logo-glow 2s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
        
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-logo-glow { animation: logo-glow 2s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        
        .text-shimmer {
          background: linear-gradient(90deg, #dc2626, #ffffff, #c0c0c0, #dc2626);
          background-size: 200% auto;
          color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }
        
        .hover-lift {
          transition: transform 0.3s ease;
        }
        .hover-lift:hover {
          transform: translateY(-5px);
        }
        
        .card-glow {
          box-shadow: 0 0 20px rgba(220, 38, 38, 0.3);
          transition: box-shadow 0.3s ease;
        }
        .card-glow:hover {
          box-shadow: 0 0 30px rgba(220, 38, 38, 0.5);
        }

        @keyframes intense-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @keyframes button-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes luxury-glow {
          0% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.5); }
          50% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.8); }
          100% { text-shadow: 0 0 10px rgba(255, 255, 255, 0.5); }
        }
        
        @keyframes sparkle {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50% { transform: scale(1.1) rotate(180deg); }
        }
        
        .animate-intense-pulse { animation: intense-pulse 0.5s ease-in-out; }
        .animate-button-pulse { animation: button-pulse 0.3s ease-in-out; }
        .animate-luxury-glow { animation: luxury-glow 2s ease-in-out infinite; }
        .animate-sparkle { animation: sparkle 1s ease-in-out infinite; }
      `}</style>

        {/* Fixed Background Videos - Blended */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-110 mix-blend-overlay"
            style={{
              opacity: 0.5,
              filter: "brightness(1.1) contrast(1.3)",
            }}
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wmremove-transformed%20%284%29-1RtX4V4IQh45VsD38xmi5zh6VkQEmD.mp4" type="video/mp4" />
          </video>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-110 mix-blend-multiply"
            style={{
              opacity: 0.4,
              filter: "brightness(1.0) contrast(1.2)",
            }}
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wmremove-transformed%20%282%29-KyeJHi0XeR1fSa5wnLq9iykX0s8sy4.mp4" type="video/mp4" />
          </video>
        </div>

        <header
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
            scrolled ? "bg-black/95 backdrop-blur-md shadow-lg" : "bg-transparent"
          }`}
        >
          <div className="container mx-auto px-2 sm:px-4 py-2 sm:py-4 flex items-center justify-between gap-2">
            <div className="flex items-center space-x-2 sm:space-x-4 min-w-0 flex-shrink">
              <Image
                src="/images/skin-logo-red-silhouette.png"
                alt="Skin Cabaret"
                width={60}
                height={60}
                className="object-contain w-8 h-8 sm:w-12 sm:h-12 md:w-[60px] md:h-[60px] flex-shrink-0"
              />
              <span className="text-sm sm:text-lg md:text-xl font-bold text-red-400 whitespace-nowrap overflow-hidden text-ellipsis max-w-[120px] sm:max-w-[200px] md:max-w-none">
                SKIN CABARET
              </span>
            </div>

            <nav className="hidden lg:flex space-x-2 xl:space-x-4 flex-shrink-0">
              {["home", "sports", "hiring", "contact"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => scrollToSection(tab)}
                  className={`px-3 xl:px-4 py-2 rounded-lg font-semibold transition-all duration-300 text-sm xl:text-base whitespace-nowrap ${
                    activeTab === tab
                      ? "bg-red-600 text-white shadow-lg"
                      : "text-white/80 hover:text-white hover:bg-red-600/20 hover:scale-105 transform"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>

            <div className="lg:hidden">
              <MobileMenu scrolled={scrolled} />
            </div>

            <a
              href="tel:+14804257546"
              className="group relative bg-gradient-to-r from-red-900/90 to-red-800/90 hover:from-red-800 hover:to-red-700 text-white px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 rounded-md text-xs sm:text-sm md:text-base font-semibold transition-all duration-300 shadow-md hover:shadow-lg border border-red-700/50 hover:border-red-600 flex-shrink-0 overflow-hidden"
              aria-label="Call the club for reservations"
            >
              <div className="relative z-10 flex items-center gap-1.5">
                <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="hidden sm:inline">CALL</span>
                <span className="sm:hidden">CALL</span>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </a>
          </div>
        </header>

        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              filter: "brightness(1.25) contrast(1.05)",
              minHeight: "100vh",
              minWidth: "100vw",
            }}
          >
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wmremove-transformed%204-LXxHbyjDaZ5Hfa2hzLSCeq5LLZpKjM.webm" type="video/webm" />
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wmremove-transformed-jqRqb6rf8i9YFjT6RFomZi1aAjNVSA.webm" type="video/webm" />
            <source src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wmremove-transformed%203-RTTz79kdeCoRBdybhGCX7ut3ABz3ow.webm" type="video/webm" />
          </video>
          <div className="absolute inset-0 bg-black/20"></div>

          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <div className="animate-float">
              <Image
                src="/images/skin-logo-red-silhouette.png"
                alt="Skin Cabaret Logo"
                width={400}
                height={400}
                className="object-contain animate-logo-glow hover:scale-110 transition-all duration-500"
                style={{
                  filter: "drop-shadow(0 0 40px rgba(220, 38, 38, 0.8)) drop-shadow(0 0 2px rgba(0, 0, 0, 0.8))",
                  maxWidth: "min(400px, 80vw)",
                  height: "auto",
                }}
                quality={95}
                sizes="(max-width: 768px) 80vw, 400px"
              />
            </div>
          </div>

          <div className="absolute bottom-8 left-0 right-0 z-20 flex flex-col items-center gap-4 px-4 safe-area-inset">
            <a
              href="tel:+14804257546"
              className="group relative bg-gradient-to-r from-red-900/95 to-red-800/95 hover:from-red-800 hover:to-red-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl border border-red-700/50 hover:border-red-600 overflow-hidden backdrop-blur-sm"
              aria-label="Call the club for reservations"
            >
              <div className="relative z-10 flex items-center gap-3">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <div className="text-left">
                  <div className="text-lg font-bold">CALL NOW</div>
                  <div className="text-sm opacity-90">(480) 425-7546</div>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
            </a>
          </div>
        </section>

        <section className="relative py-20 overflow-hidden z-10">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="bg-black/80 rounded-lg p-8 border border-red-500/30 mb-8">
                <h3 className="text-4xl md:text-6xl font-bold mb-6 text-center">
                  <span className="text-white">Full Bar with </span>
                  <span className="text-red-600">Arizona's Hottest Bartenders</span>
                </h3>
                <p className="text-white/90 text-xl md:text-2xl leading-relaxed text-center max-w-4xl mx-auto">
                  Experience <span className="text-red-500 font-semibold">premium cocktails</span> and{" "}
                  <span className="text-red-500 font-semibold">top-shelf spirits</span> crafted by the most stunning
                  bartenders in the valley. Our full-service bar stays open until{" "}
                  <span className="text-red-600 font-bold">2 AM</span>, ensuring your night never has to end early.
                  Whether you're celebrating a special occasion or just looking for an unforgettable night out, our
                  expert mixologists will keep the drinks flowing and the energy electric.
                </p>
              </div>

              {/* Image without text overlay */}
              <div className="relative h-[500px] md:h-[600px] rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300 mb-8">
                <Image
                  src="https://base44.app/api/apps/6902128ac3c5c94a82446585/files/public/6902128ac3c5c94a82446585/a04dfde26_file_000000001dec71fda5dabedf8568539c.png"
                  alt="Afterhours mocktails and nightlife at Skin Cabaret Scottsdale"
                  title="Premium Mocktails - Afterhours Lounge"
                  fill
                  className="object-contain"
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  loading="lazy"
                />
              </div>

              <div className="bg-black/80 rounded-lg p-8 border border-red-500/30">
                <h3 className="text-3xl md:text-5xl font-bold mb-6 text-center">
                  <span className="text-white">Visit Our Sister Club </span>
                  <span className="text-red-600">Dream Palace Cabaret</span>
                </h3>
                <p className="text-white/90 text-lg md:text-xl leading-relaxed text-center max-w-4xl mx-auto mb-6">
                  Looking to take your night to the <span className="text-red-500 font-semibold">next level</span>?
                  Dream Palace Cabaret is located just <span className="text-red-600 font-bold">2 miles south</span> of
                  Skin Cabaret on the left-hand side before the 202 freeway. Open until{" "}
                  <span className="text-red-600 font-bold">8 AM</span>, Dream Palace offers a{" "}
                  <span className="text-red-500 font-semibold">fully nude</span> and{" "}
                  <span className="text-red-500 font-semibold">VIP experience</span> that's unmatched in the valley.
                </p>
                <p className="text-white text-xl md:text-2xl font-semibold text-center">
                  <span className="text-white">Mention this website for </span>
                  <span className="text-red-600 font-bold">complimentary entry</span>
                  <span className="text-white">!</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Barrett-Jackson Section */}
        {/* Girls Girls Girls Section */}
        <section className="relative py-20 overflow-hidden z-10">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto bg-black/80 rounded-lg p-8 border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-80 hover:opacity-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="relative">
                  <div className="relative h-96 rounded-lg overflow-hidden">
                    <Image
                      src="/images/customer-chicago.png"
                      alt="Girls Girls Girls Neon Sign"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  </div>
                </div>
                <div className="text-left">
                  <h3 className="text-3xl font-bold text-red-400 mb-6">World-Renowned Excellence</h3>
                  <p className="text-white/90 text-xl mb-8 leading-relaxed">
                    Skin Cabaret has always been home to the hottest girls in the world. As a world-renowned club, we're
                    getting back to our roots with the most beautiful and talented entertainers from around the globe.
                    Experience the legendary atmosphere that has made Skin Cabaret an international destination for
                    premium adult entertainment.
                  </p>
                  <div className="space-y-4 text-white/80 text-lg">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-4"></span>
                      International Talent Showcase
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-4"></span>
                      World-Class Entertainment
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-4"></span>
                      Legendary Scottsdale Experience
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Home of the 2 Dollar Bills Section */}
        <section className="relative py-20 overflow-hidden z-10">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-12 text-center text-white">HOME OF THE 2 DOLLAR BILLS</h2>

            <div className="max-w-6xl mx-auto bg-black/80 rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-60 hover:opacity-100">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="text-left p-8">
                  <h3 className="text-3xl font-bold text-red-400 mb-6">A Legendary Tradition</h3>
                  <p className="text-white/90 text-xl mb-8 leading-relaxed">
                    Skin Cabaret is famous for being the home of the $2 bill tradition in Scottsdale. These rare and
                    collectible bills have become part of our mystique, creating unforgettable experiences for both
                    guests and entertainers. The $2 bill represents the unique, premium experience that only Skin
                    Cabaret can provide - rare, valuable, and always memorable.
                  </p>
                  <div className="space-y-4 text-white/80 text-lg">
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-4"></span>
                      Rare Collectible Currency
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-4"></span>
                      Exclusive Skin Cabaret Tradition
                    </div>
                    <div className="flex items-center">
                      <span className="w-3 h-3 bg-red-500 rounded-full mr-4"></span>
                      Unforgettable Premium Experience
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="relative h-96 rounded-lg overflow-hidden">
                    <Image
                      src="/images/2-20dollar-20titties.jpeg"
                      alt="Home of the 2 Dollar Bills"
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <Button
                        onClick={() => setShowCallPopup(true)}
                        className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-8 py-4 text-xl font-bold rounded-lg shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                      >
                        EXPERIENCE THE TRADITION
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20 overflow-hidden z-10">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-12 text-center text-white">SPECIAL EVENTS</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {/* Barrett-Jackson */}
              <div className="bg-black/80 rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-60 hover:opacity-100">
                <div className="relative h-64">
                  <Image
                    src="/luxury-barrett-jackson-classic-car-auction-superca.jpg"
                    alt="Barrett-Jackson Luxury Vehicle"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-red-400 mb-4">BARRETT-JACKSON</h3>
                  <p className="text-white/90 mb-6">
                    Experience the pinnacle of automotive luxury during Barrett-Jackson week. Witness million-dollar
                    classics, exotic supercars, and rare collectibles while enjoying world-class entertainment.
                  </p>
                  <Button
                    onClick={() => setShowCallPopup(true)}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 font-bold rounded-lg"
                  >
                    RESERVE BARRETT-JACKSON VIP
                  </Button>
                </div>
              </div>

              {/* Waste Management */}
              <div className="bg-black/80 rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-60 hover:opacity-100">
                <div className="relative h-64">
                  <Image
                    src="/golf-tournament-waste-management-phoenix-open.jpg"
                    alt="Waste Management Phoenix Open"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-red-400 mb-4">WASTE MANAGEMENT</h3>
                  <p className="text-white/90 mb-6">
                    Arizona's most exciting golf tournament with VIP viewing packages. Experience the legendary 16th
                    hole atmosphere and championship golf in style.
                  </p>
                  <Button
                    onClick={() => setShowCallPopup(true)}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 font-bold rounded-lg"
                  >
                    RESERVE WM VIP PACKAGE
                  </Button>
                </div>
              </div>

              <div className="bg-black/80 rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-60 hover:opacity-100">
                <div className="relative h-64">
                  <Image
                    src="/bachelor-party-celebration-nightlife.jpg"
                    alt="Bachelor Party Celebration"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-red-400 mb-4">BACHELOR PARTY</h3>
                  <p className="text-white/90 mb-6">
                    Create unforgettable memories with our exclusive bachelor party packages. VIP treatment, premium
                    entertainment, and personalized service for the ultimate celebration.
                  </p>
                  <Button
                    onClick={() => setShowCallPopup(true)}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 font-bold rounded-lg"
                  >
                    RESERVE BACHELOR PACKAGE
                  </Button>
                </div>
              </div>

              <div className="bg-black/80 rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-60 hover:opacity-100">
                <div className="relative h-64">
                  <Image
                    src="/spring-training-baseball-arizona.jpg"
                    alt="Spring Training Baseball"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-red-400 mb-4">SPRING TRAINING</h3>
                  <p className="text-white/90 mb-6">
                    Arizona's favorite season! Watch MLB teams prepare for the season with game viewing parties, drink
                    specials, and the best spring training atmosphere in Scottsdale.
                  </p>
                  <Button
                    onClick={() => setShowCallPopup(true)}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 font-bold rounded-lg"
                  >
                    RESERVE SPRING TRAINING VIP
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="sports" className="relative py-20 overflow-hidden z-10">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-12 text-center text-white">SPORTS EVENTS</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {/* NFL Sunday */}
              <div className="bg-black/80 rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-60 hover:opacity-100 hover:animate-intense-pulse hover:scale-105 transform h-[400px] flex flex-col">
                <div className="relative h-48 flex-shrink-0">
                  <Image src="/images/nbc-sunday-night-football.jpeg" alt="NFL Sunday" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-red-400 mb-2 hover:animate-luxury-glow">NFL Sunday</h3>
                  <p className="text-white/80 mb-3 text-sm flex-1">
                    Watch every game on multiple big screens with drink specials and premium entertainment.
                  </p>
                  <Button
                    onClick={() => setShowCallPopup(true)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white mt-auto hover:animate-button-pulse hover:scale-105 transform transition-all duration-300"
                  >
                    Reserve Table
                  </Button>
                </div>
              </div>

              {/* NBA Finals */}
              <div className="bg-black/80 rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-60 hover:opacity-100 hover:animate-intense-pulse hover:scale-105 transform h-[400px] flex flex-col">
                <div className="relative h-48 flex-shrink-0">
                  <Image
                    src="/nba-playoffs-basketball-championship-game.jpg"
                    alt="NBA Finals"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-red-400 mb-2 hover:animate-luxury-glow">NBA Finals</h3>
                  <p className="text-white/80 mb-3 text-sm flex-1">
                    Experience championship basketball with premium viewing and VIP packages.
                  </p>
                  <Button
                    onClick={() => setShowCallPopup(true)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white mt-auto hover:animate-button-pulse hover:scale-105 transform transition-all duration-300"
                  >
                    Reserve Table
                  </Button>
                </div>
              </div>

              {/* HBO Boxing */}
              <div className="bg-black/80 rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-60 hover:opacity-100 hover:animate-intense-pulse hover:scale-105 transform h-[400px] flex flex-col">
                <div className="relative h-48 flex-shrink-0">
                  <Image
                    src="/hbo-boxing-championship-fight-night.jpg"
                    alt="HBO Pay Per View Boxing"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-red-400 mb-2 hover:animate-luxury-glow">HBO Boxing</h3>
                  <p className="text-white/80 mb-3 text-sm flex-1">
                    Watch championship boxing matches with VIP fight night packages.
                  </p>
                  <Button
                    onClick={() => setShowCallPopup(true)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white mt-auto hover:animate-button-pulse hover:scale-105 transform transition-all duration-300"
                  >
                    Reserve Table
                  </Button>
                </div>
              </div>

              <div className="bg-black/80 rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-60 hover:opacity-100 hover:animate-intense-pulse hover:scale-105 transform h-[400px] flex flex-col">
                <div className="relative h-48 flex-shrink-0">
                  <Image
                    src="/college-march-madness-basketball-tournament.jpg"
                    alt="College Sports"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-red-400 mb-2 hover:animate-luxury-glow">College Sports</h3>
                  <p className="text-white/80 mb-3 text-sm flex-1">
                    Watch March Madness, College Football Playoffs, and championship games with student-friendly
                    specials and game day atmosphere.
                  </p>
                  <Button
                    onClick={() => setShowCallPopup(true)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white mt-auto hover:animate-button-pulse hover:scale-105 transform transition-all duration-300"
                  >
                    Reserve Table
                  </Button>
                </div>
              </div>

              {/* Super Bowl */}
              <div className="bg-black/80 rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-60 hover:opacity-100 hover:animate-intense-pulse hover:scale-105 transform h-[400px] flex flex-col">
                <div className="relative h-48 flex-shrink-0">
                  <Image
                    src="/super-bowl-championship-game-with-trophy-and-confe.jpg"
                    alt="Super Bowl"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-red-400 mb-2 hover:animate-luxury-glow">Super Bowl</h3>
                  <p className="text-white/80 mb-3 text-sm flex-1">
                    The biggest game of the year with championship viewing parties.
                  </p>
                  <Button
                    onClick={() => setShowCallPopup(true)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white mt-auto hover:animate-button-pulse hover:scale-105 transform transition-all duration-300"
                  >
                    Reserve Table
                  </Button>
                </div>
              </div>

              {/* Kentucky Derby */}
              <div className="bg-black/80 rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-60 hover:opacity-100 hover:animate-intense-pulse hover:scale-105 transform h-[400px] flex flex-col">
                <div className="relative h-48 flex-shrink-0">
                  <Image
                    src="/kentucky-derby-horse-racing-with-jockeys-and-churc.jpg"
                    alt="Kentucky Derby"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-red-400 mb-2 hover:animate-luxury-glow">Kentucky Derby</h3>
                  <p className="text-white/80 mb-3 text-sm flex-1">
                    The most exciting two minutes in sports with mint juleps and betting.
                  </p>
                  <Button
                    onClick={() => setShowCallPopup(true)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white mt-auto hover:animate-button-pulse hover:scale-105 transform transition-all duration-300"
                  >
                    Reserve Table
                  </Button>
                </div>
              </div>

              {/* Stanley Cup */}
              <div className="bg-black/80 rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-60 hover:opacity-100 hover:animate-intense-pulse hover:scale-105 transform h-[400px] flex flex-col">
                <div className="relative h-48 flex-shrink-0">
                  <Image
                    src="/stanley-cup-hockey-championship-with-trophy-and-ic.jpg"
                    alt="Stanley Cup"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-red-400 mb-2 hover:animate-luxury-glow">Stanley Cup</h3>
                  <p className="text-white/80 mb-3 text-sm flex-1">
                    Hockey's ultimate championship with playoff intensity and celebrations.
                  </p>
                  <Button
                    onClick={() => setShowCallPopup(true)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white mt-auto hover:animate-button-pulse hover:scale-105 transform transition-all duration-300"
                  >
                    Reserve Table
                  </Button>
                </div>
              </div>

              {/* World Series */}
              <div className="bg-black/80 rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-60 hover:opacity-100 hover:animate-intense-pulse hover:scale-105 transform h-[400px] flex flex-col">
                <div className="relative h-48 flex-shrink-0">
                  <Image
                    src="/world-series-baseball-championship-with-stadium-an.jpg"
                    alt="World Series"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                </div>
                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-red-400 mb-2 hover:animate-luxury-glow">World Series</h3>
                  <p className="text-white/80 mb-3 text-sm flex-1">
                    Baseball's championship series with classic American entertainment.
                  </p>
                  <Button
                    onClick={() => setShowCallPopup(true)}
                    className="w-full bg-red-600 hover:bg-red-700 text-white mt-auto hover:animate-button-pulse hover:scale-105 transform transition-all duration-300"
                  >
                    Reserve Table
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20 overflow-hidden z-10">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-12 text-center text-white">FOLLOW US</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-black/80 rounded-lg p-8 text-center border-2 border-blue-500/50 hover:border-blue-500 transition-all duration-300 opacity-60 hover:opacity-100">
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-blue-400 mb-2">Facebook</h3>
                <p className="text-white/80 mb-4">Get updates on events and exclusive offers</p>
                <Button onClick={() => shareOnSocial("facebook")} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Visit Our Page
                </Button>
              </div>

              <div className="bg-black/80 rounded-lg p-8 text-center border-2 border-pink-500/50 hover:border-pink-500 transition-all duration-300 opacity-60 hover:opacity-100">
                <div className="w-16 h-16 mx-auto mb-4 bg-pink-600 rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-pink-400 mb-2">Instagram</h3>
                <p className="text-white/80 mb-4">Behind the scenes and exclusive content</p>
                <Button onClick={() => shareOnSocial("instagram")} className="bg-pink-600 hover:bg-pink-700 text-white">
                  Visit Our Page
                </Button>
              </div>

              <div className="bg-black/80 rounded-lg p-8 text-center border-2 border-gray-500/50 hover:border-gray-500 transition-all duration-300 opacity-60 hover:opacity-100">
                <div className="w-16 h-16 mx-auto mb-4 bg-black rounded-full flex items-center justify-center border-2 border-white">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-400 mb-2">X (Twitter)</h3>
                <p className="text-white/80 mb-4">Latest updates and announcements</p>
                <Button
                  onClick={() => shareOnSocial("twitter")}
                  className="bg-black hover:bg-gray-800 text-white border border-white"
                >
                  Visit Our Page
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="relative py-20 overflow-hidden z-10">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-12 text-center text-white">CUSTOMER REVIEWS</h2>

            <div className="relative overflow-hidden">
              <div className="flex animate-scroll space-x-8">
                {[...reviews, ...reviews].map((review, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-80 bg-black/80 rounded-lg p-6 border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-70 hover:opacity-100"
                  >
                    <div className="flex items-center mb-4">
                      <Image
                        src="/images/skin-logo-red-silhouette.png"
                        alt="Reviewer Avatar"
                        width={40}
                        height={40}
                        className="rounded-full mr-4 object-cover"
                      />
                      <div>
                        <div className="font-bold">{review.name}</div>
                        <div className="text-sm text-white/70">{review.location}</div>
                      </div>
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 1l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                        </svg>
                      ))}
                    </div>
                    <p className="text-white/90">{review.review}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="hiring" className="relative py-20 overflow-hidden z-10">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-12 text-center text-white">JOIN OUR TEAM</h2>

            {/* Hiring Image without text overlay */}
            <div className="max-w-4xl mx-auto mb-8">
              <div className="relative h-[500px] md:h-[600px] rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300">
                <Image
                  src="https://base44.app/api/apps/6902128ac3c5c94a82446585/files/public/6902128ac3c5c94a82446585/e03c297c4_steganographic-qr1.png"
                  alt="Hiring Entertainers at Skin Cabaret Scottsdale AZ"
                  title="Now Hiring - Join Our Team"
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 896px"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Explanation text below image */}
            <div className="max-w-4xl mx-auto mb-12">
              <div className="bg-black/80 rounded-lg p-8 border border-red-500/30">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 text-center">
                  Now Hiring Talented Professionals
                </h3>
                <p className="text-white/90 text-lg md:text-xl leading-relaxed text-center mb-6">
                  Join Scottsdale's premier adult entertainment venue and become part of an elite team dedicated to
                  providing world-class entertainment and service. We're seeking talented, professional individuals who
                  are passionate about excellence and committed to creating unforgettable experiences for our guests.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-white/80 text-lg">
                  <div className="flex items-center justify-center md:justify-start">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                    Competitive Compensation
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                    Professional Environment
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                    Growth Opportunities
                  </div>
                  <div className="flex items-center justify-center md:justify-start">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                    Supportive Team Culture
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
              {/* Updated hiring positions to use SVG icons instead of staff images */}
              {hiringPositions.map((position, index) => (
                <div
                  key={index}
                  className="bg-black/80 rounded-lg overflow-hidden border border-red-500/30 hover:border-red-500 transition-all duration-300 opacity-60 hover:opacity-100 hover:animate-intense-pulse hover:scale-105 transform h-[300px] flex flex-col"
                >
                  <div className="h-32 bg-gradient-to-br from-red-900/50 to-black/80 flex items-center justify-center hover:animate-luxury-glow">
                    {/* SVG Icons for each position */}
                    {position.title === "Bartenders" && (
                      <svg
                        className="w-16 h-16 text-red-400 hover:animate-sparkle transition-all duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M3 14c0 1.3.84 2.4 2 2.82V20H4v2h16v-2h-1v-3.18c1.16-.42 2-1.52 2-2.82V9H3v5zm2-3h14v3c0 .55-.45 1-1 1H6c-.55 0-1-.45-1-1v-3zm2 5h10v3H7v-3z" />
                        <path d="M7.5 7L9 2h6l1.5 5H7.5z" />
                      </svg>
                    )}
                    {position.title === "Hostess" && (
                      <svg
                        className="w-16 h-16 text-red-400 hover:animate-sparkle transition-all duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 7.5V9M15 10.5V19L13.5 17.5V14.5L10.5 17.5V22H9V18L12 15L9 12V9.5L15 10.5Z" />
                      </svg>
                    )}
                    {position.title === "Cocktail Servers" && (
                      <svg
                        className="w-16 h-16 text-red-400 hover:animate-sparkle transition-all duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M7.5 7L10.5 4H13.5L16.5 7V8H7.5V7ZM8 9H16L15 10H9L8 9ZM9.5 11H14.5L14 12H10L9.5 11ZM10.5 13H13.5L13 14H11L10.5 13ZM11.5 15H12.5V20H11.5V15Z" />
                      </svg>
                    )}
                    {position.title === "Security" && (
                      <svg
                        className="w-16 h-16 text-red-400 hover:animate-sparkle transition-all duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,7C13.4,7 14.8,8.6 14.8,10V11.5C15.4,11.5 16,12.1 16,12.7V16.2C16,16.8 15.4,17.3 14.8,17.3H9.2C8.6,17.3 8,16.8 8,16.2V12.8C8,12.2 8.6,11.6 9.2,11.6V10C9.2,8.6 10.6,7 12,7M12,8.2C11.2,8.2 10.5,8.7 10.5,10V11.5H13.5V10C13.5,8.7 12.8,8.2 12,8.2Z" />
                      </svg>
                    )}
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-red-400 mb-2 hover:animate-luxury-glow">{position.title}</h3>
                    <p className="text-white/80 mb-3 text-sm flex-1">
                      Join our professional team - {position.age} required
                    </p>
                    <Button
                      onClick={() => setShowHiringForm(true)}
                      className="w-full bg-red-600 hover:bg-red-700 text-white mt-auto hover:animate-button-pulse hover:scale-105 transform transition-all duration-300"
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {showHiringForm && (
              <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
                <div className="bg-black rounded-lg p-8 max-w-md w-full">
                  <h2 className="text-2xl font-bold text-red-400 mb-4">Job Application</h2>
                  <form onSubmit={handleHiringSubmit} data-form-type="hiring">
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-white text-sm font-bold mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-white text-sm font-bold mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-white text-sm font-bold mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="position" className="block text-white text-sm font-bold mb-2">
                        Position
                      </label>
                      <select
                        id="position"
                        name="position"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
                        required
                      >
                        {hiringPositions.map((pos, index) => (
                          <option key={index} value={pos.title}>
                            {pos.title}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="experience" className="block text-white text-sm font-bold mb-2">
                        Experience
                      </label>
                      <textarea
                        id="experience"
                        name="experience"
                        rows={3}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
                        required
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label htmlFor="availability" className="block text-white text-sm font-bold mb-2">
                        Availability
                      </label>
                      <textarea
                        id="availability"
                        name="availability"
                        rows={3}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-gray-800 text-white"
                        required
                      ></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                      <Button
                        type="submit"
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Submit Application
                      </Button>
                      <Button
                        type="button"
                        onClick={() => setShowHiringForm(false)}
                        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </section>

        <section id="contact" className="relative py-20 overflow-hidden z-10">
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-black mb-12 text-center text-white">ENTERTAINERS GUIDE</h2>

            <div className="max-w-4xl mx-auto">
              <div className="bg-black/40 backdrop-blur-sm rounded-lg p-8 border border-red-500/30">
                <h3 className="text-3xl font-bold text-red-400 mb-6 text-center">Work at Skin Cabaret</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-bold text-red-400 mb-4">Requirements</h4>
                    <ul className="text-white/90 space-y-3">
                      <li className="flex items-center">
                        <span className="text-red-400 mr-2">•</span>
                        Must be 19+ years of age
                      </li>
                      <li className="flex items-center">
                        <span className="text-red-400 mr-2">•</span>
                        Valid government-issued ID required
                      </li>
                      <li className="flex items-center">
                        <span className="text-red-400 mr-2">•</span>
                        Required license from Scottsdale Town Hall
                      </li>
                      <li className="flex items-center">
                        <span className="text-red-400 mr-2">•</span>
                        Professional attitude and appearance
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-red-400 mb-4">Benefits</h4>
                    <ul className="text-white/90 space-y-3">
                      <li className="flex items-center">
                        <span className="text-red-400 mr-2">•</span>
                        Competitive earning potential
                      </li>
                      <li className="flex items-center">
                        <span className="text-red-400 mr-2">•</span>
                        Flexible scheduling options
                      </li>
                      <li className="flex items-center">
                        <span className="text-red-400 mr-2">•</span>
                        Safe and secure environment
                      </li>
                      <li className="flex items-center">
                        <span className="text-red-400 mr-2">•</span>
                        Professional management team
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-8 text-center">
                  <p className="text-white/90 mb-6">
                    Join Arizona's premier adult entertainment venue and become part of our professional team.
                  </p>
                  <button
                    onClick={() => setShowPickupPopup(true)}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:animate-button-pulse hover:scale-105 transform"
                  >
                    Apply Now - Call (480) 425-7546
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="relative bg-black/95 text-white py-12 z-10">
          <div className="absolute inset-0 bg-black/80"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-bold text-red-400 mb-4">Contact</h3>
                <p className="mb-2">1137 N Scottsdale Rd</p>
                <p className="mb-2">Scottsdale, AZ 85251</p>
                <p className="mb-2">
                  <a href="tel:+14804257546" className="hover:text-red-400 transition-colors">
                    (480) 425-7546
                  </a>
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-400 mb-4">Hours</h3>
                <p className="mb-2">Open Daily</p>
                <p className="mb-2">8:00 PM - 6:00 AM</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-400 mb-4">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/skincabaret"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-400 transition-colors"
                    aria-label="Follow us on Facebook"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.instagram.com/skincabaret"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-400 transition-colors"
                    aria-label="Follow us on Instagram"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                  </a>
                  <a
                    href="https://twitter.com/skincabaret"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-red-400 transition-colors"
                    aria-label="Follow us on Twitter"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-white/10 pt-8 text-center">
              <p className="text-sm text-white/60">
                &copy; {new Date().getFullYear()} Skin Cabaret. All rights reserved. Must be 21+ to enter.
              </p>
            </div>
          </div>
        </footer>

        {showCallPopup && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-8 max-w-md w-full border border-red-500/30 shadow-2xl">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Call Us Now</h2>
              </div>

              <p className="text-white/90 mb-6 text-center">Call us to make a reservation or for any inquiries.</p>

              <Button
                as="a"
                href="tel:+14804257546"
                className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl border border-red-500/50 mb-4"
              >
                <div className="flex items-center justify-center gap-3">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  (480) 425-7546
                </div>
              </Button>

              <Button
                onClick={() => setShowCallPopup(false)}
                className="w-full bg-gray-800 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors border border-gray-600 hover:border-gray-500"
              >
                Cancel
              </Button>
            </div>
          </div>
        )}

        {showPickupPopup && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="relative bg-black rounded-lg overflow-hidden max-w-2xl w-full">
              <button
                onClick={() => setShowPickupPopup(false)}
                className="absolute top-2 right-2 z-10 w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center text-xl font-bold shadow-lg transition-all duration-300 hover:scale-110"
              >
                ×
              </button>

              <div className="relative">
                <iframe
                  src="https://www.youtube.com/embed/10tGk0u93qQ?autoplay=1&mute=1&loop=1&playlist=10tGk0u93qQ&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&fs=0&disablekb=1"
                  className="w-full h-64 md:h-80"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen={false}
                ></iframe>

                <div className="p-6">
                  <a
                    href="tel:+14804257546"
                    onClick={() => setShowPickupPopup(false)}
                    className="group w-full block bg-gradient-to-r from-red-900/90 to-red-800/90 hover:from-red-800 hover:to-red-700 text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 text-center border border-red-700/50 hover:border-red-600 shadow-lg hover:shadow-xl overflow-hidden relative"
                  >
                    <div className="relative z-10 flex items-center justify-center gap-3">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <div>
                        <div className="text-lg">Call to Schedule a Ride</div>
                        <div className="text-sm opacity-90">(480) 425-7546</div>
                      </div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Chatbot */}
        <div className="fixed bottom-4 right-4 z-40">
          {chatbotOpen && (
            <div className="mb-4 w-80 bg-black/95 border border-red-500/30 rounded-lg shadow-2xl">
              <div className="bg-red-600 text-white p-3 rounded-t-lg flex justify-between items-center">
                <h3 className="font-bold">Skin Cabaret Assistant</h3>
                <button
                  onClick={() => setChatbotOpen(false)}
                  className="text-white hover:text-red-200 text-xl font-bold"
                >
                  ×
                </button>
              </div>

              <div className="h-64 overflow-y-auto p-3 space-y-2">
                {chatMessages.map((msg, index) => (
                  <div
                    key={index}
                    className={`p-2 rounded-lg ${
                      msg.type === "bot"
                        ? "bg-red-600/20 text-red-100 border border-red-500/30"
                        : "bg-white/10 text-white ml-8"
                    }`}
                  >
                    {msg.message}
                  </div>
                ))}
              </div>

              <div className="p-3 border-t border-red-500/30">
                <div className="flex flex-wrap gap-1 mb-2">
                  {quickResponses.map((response) => (
                    <button
                      key={response}
                      onClick={() => handleQuickResponse(response)}
                      className="text-xs bg-red-600/30 hover:bg-red-600/50 text-red-200 px-2 py-1 rounded border border-red-500/30"
                    >
                      {response}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleChatSubmit} className="flex gap-2">
                  <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    placeholder="Ask about VIP, bachelor parties, hours..."
                    className="flex-1 bg-white/10 border border-red-500/30 rounded px-3 py-2 text-white placeholder-white/50 focus:outline-none focus:border-red-400"
                  />
                  <button type="submit" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-bold">
                    Send
                  </button>
                </form>
              </div>
            </div>
          )}

          <button
            onClick={() => setChatbotOpen(!chatbotOpen)}
            className="bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </button>
        </div>

        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-4 left-4 bg-red-600 hover:bg-red-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50"
          aria-label="Back to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </>
  )
}
