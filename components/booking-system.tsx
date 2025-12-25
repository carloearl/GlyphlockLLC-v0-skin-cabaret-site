"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Users, Crown, Star, Phone, User, Check, X } from "lucide-react"
import Image from "next/image"

interface BookingData {
  firstName: string
  lastName: string
  email: string
  phone: string
  date: string
  time: string
  partySize: string
  eventType: string
  packageType: string
  specialRequests: string
}

const eventTypes = [
  { value: "bachelor", label: "Bachelor Party", icon: Users },
  { value: "birthday", label: "Birthday Celebration", icon: Star },
  { value: "corporate", label: "Corporate Event", icon: Crown },
  { value: "night-out", label: "Night Out", icon: Clock },
  { value: "special", label: "Special Occasion", icon: Star },
]

const packageTypes = [
  {
    value: "standard",
    label: "Standard Experience",
    price: "Starting at $200",
    features: ["Premium seating", "Bottle service available", "Professional service"],
  },
  {
    value: "vip",
    label: "VIP Experience",
    price: "Starting at $500",
    features: ["Private VIP area", "Premium bottle service", "Dedicated host", "Skip the line"],
  },
  {
    value: "elite",
    label: "Elite Package",
    price: "Starting at $1000",
    features: ["Exclusive VIP booth", "Top-shelf bottle service", "Personal concierge", "Complimentary shuttle"],
  },
]

const timeSlots = [
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
  "11:30 PM",
  "12:00 AM",
  "12:30 AM",
]

export default function BookingSystem() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [bookingData, setBookingData] = useState<BookingData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    partySize: "",
    eventType: "",
    packageType: "",
    specialRequests: "",
  })

  const openBooking = () => {
    setIsOpen(true)
    setCurrentStep(1)
    setIsSubmitted(false)
  }

  const closeBooking = () => {
    setIsOpen(false)
    setCurrentStep(1)
    setBookingData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      date: "",
      time: "",
      partySize: "",
      eventType: "",
      packageType: "",
      specialRequests: "",
    })
  }

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleInputChange = (field: keyof BookingData, value: string) => {
    setBookingData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Create booking data with timestamp
      const bookingPayload = {
        ...bookingData,
        timestamp: new Date().toISOString(),
        source: "website",
        status: "pending",
      }

      // Send to backend API (WordPress REST API format)
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingPayload),
      })

      if (response.ok) {
        // Send confirmation email
        await fetch("/api/send-confirmation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: bookingData.email,
            bookingData: bookingPayload,
          }),
        })

        // Send SMS notification to venue
        await fetch("/api/send-sms", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: "+14804257546",
            message: `New booking: ${bookingData.firstName} ${bookingData.lastName} - ${bookingData.eventType} for ${bookingData.partySize} people on ${bookingData.date} at ${bookingData.time}`,
          }),
        })

        setIsSubmitted(true)
      } else {
        throw new Error("Booking submission failed")
      }
    } catch (error) {
      console.error("Booking error:", error)
      alert("There was an error submitting your booking. Please call us directly at (480) 425-7546.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const isStepValid = (step: number) => {
    switch (step) {
      case 1:
        return bookingData.firstName && bookingData.lastName && bookingData.email && bookingData.phone
      case 2:
        return bookingData.date && bookingData.time && bookingData.partySize && bookingData.eventType
      case 3:
        return bookingData.packageType
      default:
        return false
    }
  }

  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split("T")[0]
  }

  const selectedPackage = packageTypes.find((pkg) => pkg.value === bookingData.packageType)
  const selectedEventType = eventTypes.find((event) => event.value === bookingData.eventType)

  return (
    <>
      {/* Booking Trigger Button */}
      <div className="text-center">
        <Button
          size="lg"
          onClick={openBooking}
          className="bg-secondary hover:bg-secondary/90 text-secondary-foreground px-12 py-4 text-xl font-bold tracking-wide uppercase transform hover:scale-110 transition-all duration-300 shadow-2xl hover:shadow-secondary/50"
        >
          <Calendar className="w-6 h-6 mr-2" />
          Book Your Experience
        </Button>
      </div>

      {/* Booking Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full bg-card/95 backdrop-blur-sm border-secondary/50 max-h-[90vh] overflow-y-auto">
            <CardHeader className="relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Image
                    src="/images/skin-logo.webp"
                    alt="Skin Cabaret Logo"
                    width={40}
                    height={40}
                    className="animate-glow"
                  />
                  <CardTitle className="text-2xl font-black text-secondary">
                    {isSubmitted ? "Booking Confirmed!" : "Reserve Your Experience"}
                  </CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeBooking}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {!isSubmitted && (
                <div className="flex items-center space-x-4 mt-4">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                          step === currentStep
                            ? "bg-secondary text-secondary-foreground scale-110"
                            : step < currentStep
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {step < currentStep ? <Check className="w-4 h-4" /> : step}
                      </div>
                      {step < 3 && (
                        <div
                          className={`w-12 h-1 mx-2 transition-all duration-300 ${
                            step < currentStep ? "bg-primary" : "bg-muted"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardHeader>

            <CardContent className="p-6">
              {isSubmitted ? (
                <div className="text-center space-y-6">
                  <div className="w-20 h-20 mx-auto bg-primary rounded-full flex items-center justify-center">
                    <Check className="w-10 h-10 text-primary-foreground" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-secondary mb-2">Thank You!</h3>
                    <p className="text-muted-foreground mb-4">
                      Your booking request has been submitted successfully. Our team will contact you within 24 hours to
                      confirm your reservation and process payment.
                    </p>
                  </div>

                  <div className="bg-card/50 rounded-lg p-4 text-left space-y-2">
                    <h4 className="font-bold text-secondary mb-3">Booking Summary:</h4>
                    <p>
                      <span className="font-semibold">Name:</span> {bookingData.firstName} {bookingData.lastName}
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span> {bookingData.email}
                    </p>
                    <p>
                      <span className="font-semibold">Phone:</span> {bookingData.phone}
                    </p>
                    <p>
                      <span className="font-semibold">Date:</span> {new Date(bookingData.date).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold">Time:</span> {bookingData.time}
                    </p>
                    <p>
                      <span className="font-semibold">Party Size:</span> {bookingData.partySize} people
                    </p>
                    <p>
                      <span className="font-semibold">Event Type:</span> {selectedEventType?.label}
                    </p>
                    <p>
                      <span className="font-semibold">Package:</span> {selectedPackage?.label}
                    </p>
                    {bookingData.specialRequests && (
                      <p>
                        <span className="font-semibold">Special Requests:</span> {bookingData.specialRequests}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      className="bg-primary hover:bg-primary/90 text-primary-foreground flex-1"
                      onClick={() => (window.location.href = "tel:+14804257546")}
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Us Now
                    </Button>
                    <Button
                      variant="outline"
                      className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground flex-1 bg-transparent"
                      onClick={closeBooking}
                    >
                      Close
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Step 1: Personal Information */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-secondary mb-4 flex items-center">
                        <User className="w-5 h-5 mr-2" />
                        Personal Information
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-semibold">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          value={bookingData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="mt-1"
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-sm font-semibold">
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          value={bookingData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="mt-1"
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm font-semibold">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={bookingData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="mt-1"
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm font-semibold">
                        Phone Number *
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={bookingData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="mt-1"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  {/* Step 2: Event Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-secondary mb-4 flex items-center">
                        <Calendar className="w-5 h-5 mr-2" />
                        Event Details
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="date" className="text-sm font-semibold">
                          Preferred Date *
                        </Label>
                        <Input
                          id="date"
                          type="date"
                          value={bookingData.date}
                          onChange={(e) => handleInputChange("date", e.target.value)}
                          className="mt-1"
                          min={getMinDate()}
                        />
                      </div>
                      <div>
                        <Label htmlFor="time" className="text-sm font-semibold">
                          Preferred Time *
                        </Label>
                        <Select value={bookingData.time} onValueChange={(value) => handleInputChange("time", value)}>
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            {timeSlots.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="partySize" className="text-sm font-semibold">
                          Party Size *
                        </Label>
                        <Select
                          value={bookingData.partySize}
                          onValueChange={(value) => handleInputChange("partySize", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select party size" />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 20 }, (_, i) => i + 1).map((size) => (
                              <SelectItem key={size} value={size.toString()}>
                                {size} {size === 1 ? "person" : "people"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="eventType" className="text-sm font-semibold">
                          Event Type *
                        </Label>
                        <Select
                          value={bookingData.eventType}
                          onValueChange={(value) => handleInputChange("eventType", value)}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select event type" />
                          </SelectTrigger>
                          <SelectContent>
                            {eventTypes.map((event) => (
                              <SelectItem key={event.value} value={event.value}>
                                {event.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Package Selection */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-secondary mb-4 flex items-center">
                        <Crown className="w-5 h-5 mr-2" />
                        Select Your Package
                      </h3>
                    </div>

                    <div className="space-y-4">
                      {packageTypes.map((pkg) => (
                        <Card
                          key={pkg.value}
                          className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                            bookingData.packageType === pkg.value
                              ? "border-secondary bg-secondary/10"
                              : "border-border hover:border-secondary/50"
                          }`}
                          onClick={() => handleInputChange("packageType", pkg.value)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className="text-lg font-bold text-secondary">{pkg.label}</h4>
                                <p className="text-primary font-semibold">{pkg.price}</p>
                              </div>
                              <div
                                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                  bookingData.packageType === pkg.value
                                    ? "border-secondary bg-secondary"
                                    : "border-muted-foreground"
                                }`}
                              >
                                {bookingData.packageType === pkg.value && (
                                  <Check className="w-3 h-3 text-secondary-foreground" />
                                )}
                              </div>
                            </div>
                            <ul className="space-y-1">
                              {pkg.features.map((feature, index) => (
                                <li key={index} className="text-sm text-muted-foreground flex items-center">
                                  <Check className="w-3 h-3 text-primary mr-2" />
                                  {feature}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div>
                      <Label htmlFor="specialRequests" className="text-sm font-semibold">
                        Special Requests (Optional)
                      </Label>
                      <Textarea
                        id="specialRequests"
                        value={bookingData.specialRequests}
                        onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                        className="mt-1"
                        placeholder="Any special requests or notes for your visit..."
                        rows={3}
                      />
                    </div>
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 pt-6 border-t border-border">
                    <Button
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
                    >
                      Previous
                    </Button>

                    {currentStep < 3 ? (
                      <Button
                        onClick={nextStep}
                        disabled={!isStepValid(currentStep)}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      >
                        Next
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        disabled={!isStepValid(currentStep) || isSubmitting}
                        className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                      >
                        {isSubmitting ? "Submitting..." : "Submit Booking"}
                      </Button>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
