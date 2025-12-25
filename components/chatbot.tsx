"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Send, X, Calendar, Car, Users, Crown } from "lucide-react"
import Image from "next/image"

interface Message {
  id: number
  text: string
  sender: "user" | "bot"
  timestamp: Date
  options?: string[]
  type?: "text" | "booking" | "ride" | "party"
}

interface ChatbotState {
  currentFlow: "greeting" | "booking" | "ride" | "party" | "waste_management" | "general"
  bookingData: {
    name?: string
    phone?: string
    date?: string
    time?: string
    partySize?: string
    eventType?: string
    specialRequests?: string
  }
  rideData: {
    name?: string
    phone?: string
    pickupLocation?: string
    pickupTime?: string
    partySize?: string
  }
}

const quickActions = [
  { label: "Book Party", icon: Users, flow: "party" },
  { label: "Schedule Ride", icon: Car, flow: "ride" },
  { label: "VIP Booking", icon: Crown, flow: "booking" },
  { label: "Waste Management Event", icon: Calendar, flow: "waste_management" },
]

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [chatState, setChatState] = useState<ChatbotState>({
    currentFlow: "greeting",
    bookingData: {},
    rideData: {},
  })

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage(
        "Welcome to Skin Cabaret! 🌟 I'm here to help you with bookings, rides, and special events. How can I assist you tonight?",
        ["Book a Party", "Schedule Ride", "VIP Experience", "Waste Management Event", "General Info"],
      )
    }
  }, [isOpen])

  const addBotMessage = (text: string, options?: string[], type?: "text" | "booking" | "ride" | "party") => {
    setIsTyping(true)
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now(),
        text,
        sender: "bot",
        timestamp: new Date(),
        options,
        type,
      }
      setMessages((prev) => [...prev, newMessage])
      setIsTyping(false)
    }, 1000)
  }

  const addUserMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    addUserMessage(inputValue)
    processUserInput(inputValue)
    setInputValue("")
  }

  const handleOptionClick = (option: string) => {
    addUserMessage(option)
    processUserInput(option)
  }

  const processUserInput = (input: string) => {
    const lowerInput = input.toLowerCase()

    // Handle different flows based on current state and input
    switch (chatState.currentFlow) {
      case "greeting":
        handleGreetingFlow(lowerInput)
        break
      case "booking":
        handleBookingFlow(lowerInput)
        break
      case "ride":
        handleRideFlow(lowerInput)
        break
      case "party":
        handlePartyFlow(lowerInput)
        break
      case "waste_management":
        handleWasteManagementFlow(lowerInput)
        break
      default:
        handleGeneralFlow(lowerInput)
    }
  }

  const handleGreetingFlow = (input: string) => {
    if (input.includes("book") || input.includes("party") || input.includes("bachelor")) {
      setChatState((prev) => ({ ...prev, currentFlow: "party" }))
      addBotMessage("Perfect! I'll help you book an amazing party experience. Let me get some details from you.", [
        "Bachelor Party",
        "Birthday Party",
        "Corporate Event",
        "VIP Experience",
      ])
    } else if (input.includes("ride") || input.includes("shuttle") || input.includes("transport")) {
      setChatState((prev) => ({ ...prev, currentFlow: "ride" }))
      addBotMessage("Great! Our free VIP shuttle service is available until 5 AM. Let me arrange your pickup.", [
        "Schedule Now",
        "Later Tonight",
        "Tomorrow",
      ])
    } else if (input.includes("vip")) {
      setChatState((prev) => ({ ...prev, currentFlow: "booking" }))
      addBotMessage(
        "Excellent choice! Our VIP experience includes private areas, premium bottle service, and dedicated hosts. When would you like to visit?",
        ["Tonight", "This Weekend", "Next Week", "Custom Date"],
      )
    } else if (input.includes("waste management")) {
      setChatState((prev) => ({ ...prev, currentFlow: "waste_management" }))
      addBotMessage(
        "Welcome! We're excited to host the annual Waste Management event again this year. Are you looking to book for the upcoming event or get information about our special packages?",
        ["Book for 2025 Event", "Package Information", "Group Rates", "Contact Event Coordinator"],
      )
    } else {
      handleGeneralFlow(input)
    }
  }

  const handlePartyFlow = (input: string) => {
    if (!chatState.bookingData.eventType) {
      setChatState((prev) => ({
        ...prev,
        bookingData: { ...prev.bookingData, eventType: input },
      }))
      addBotMessage("Great choice! What's your name?")
    } else if (!chatState.bookingData.name) {
      setChatState((prev) => ({
        ...prev,
        bookingData: { ...prev.bookingData, name: input },
      }))
      addBotMessage("Nice to meet you! What's the best phone number to reach you?")
    } else if (!chatState.bookingData.phone) {
      setChatState((prev) => ({
        ...prev,
        bookingData: { ...prev.bookingData, phone: input },
      }))
      addBotMessage("Perfect! How many people will be in your group?")
    } else if (!chatState.bookingData.partySize) {
      setChatState((prev) => ({
        ...prev,
        bookingData: { ...prev.bookingData, partySize: input },
      }))
      addBotMessage("Excellent! When are you planning to visit?", ["Tonight", "Tomorrow", "This Weekend", "Next Week"])
    } else if (!chatState.bookingData.date) {
      setChatState((prev) => ({
        ...prev,
        bookingData: { ...prev.bookingData, date: input },
      }))
      addBotMessage("What time works best for you?", ["8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM", "Later"])
    } else if (!chatState.bookingData.time) {
      setChatState((prev) => ({
        ...prev,
        bookingData: { ...prev.bookingData, time: input },
      }))
      addBotMessage("Any special requests or preferences for your visit?")
    } else {
      // Complete booking
      setChatState((prev) => ({
        ...prev,
        bookingData: { ...prev.bookingData, specialRequests: input },
      }))
      completeBooking()
    }
  }

  const handleRideFlow = (input: string) => {
    if (!chatState.rideData.name) {
      addBotMessage("What's your name?")
      setChatState((prev) => ({
        ...prev,
        rideData: { ...prev.rideData, name: input },
      }))
    } else if (!chatState.rideData.phone) {
      setChatState((prev) => ({
        ...prev,
        rideData: { ...prev.rideData, phone: input },
      }))
      addBotMessage("What's your phone number?")
    } else if (!chatState.rideData.pickupLocation) {
      setChatState((prev) => ({
        ...prev,
        rideData: { ...prev.rideData, pickupLocation: input },
      }))
      addBotMessage("Where should we pick you up? (Hotel, address, or landmark)")
    } else if (!chatState.rideData.pickupTime) {
      setChatState((prev) => ({
        ...prev,
        rideData: { ...prev.rideData, pickupTime: input },
      }))
      addBotMessage("What time do you need pickup?", ["Now", "30 minutes", "1 hour", "2 hours", "Custom time"])
    } else if (!chatState.rideData.partySize) {
      setChatState((prev) => ({
        ...prev,
        rideData: { ...prev.rideData, partySize: input },
      }))
      addBotMessage("How many people in your group?")
    } else {
      completeRideBooking()
    }
  }

  const handleWasteManagementFlow = (input: string) => {
    if (input.includes("book") || input.includes("2025")) {
      addBotMessage(
        "Fantastic! The 2025 Waste Management event is scheduled for February. We offer exclusive packages for this special event. I'll connect you with our event coordinator who handles all Waste Management bookings.",
        ["Call Event Coordinator", "Email Information", "Schedule Consultation"],
      )
    } else if (input.includes("package") || input.includes("information")) {
      addBotMessage(
        "Our Waste Management packages include:\n\n• VIP Tables with premium bottle service\n• Dedicated event host\n• Special event pricing\n• Group transportation coordination\n• Custom catering options\n\nWould you like to speak with our coordinator for detailed pricing?",
        ["Yes, call me", "Email details", "Schedule meeting"],
      )
    } else if (input.includes("group") || input.includes("rates")) {
      addBotMessage(
        "We offer special group rates for Waste Management events! Groups of 10+ receive significant discounts and additional perks. Our coordinator can provide exact pricing based on your group size.",
        ["Get Group Quote", "Call Coordinator", "More Information"],
      )
    } else {
      addBotMessage(
        "I'll connect you directly with our Waste Management event coordinator. They handle all special arrangements for this annual event.",
        ["Call Now: (480) 425-7546", "Request Callback", "Email Coordinator"],
      )
    }
  }

  const handleGeneralFlow = (input: string) => {
    if (input.includes("hours") || input.includes("open")) {
      addBotMessage("We're open daily from 8:00 PM to 6:00 AM! Happy hour is 8-10 PM with special pricing.")
    } else if (input.includes("location") || input.includes("address")) {
      addBotMessage("We're located at 1137 N Scottsdale Rd, Scottsdale, AZ 85257. Free shuttle service available!")
    } else if (input.includes("price") || input.includes("cost")) {
      addBotMessage(
        "Our pricing varies by package and day. VIP experiences start at $500. Would you like me to connect you with someone for detailed pricing?",
        ["Yes, call me", "Email pricing", "Book consultation"],
      )
    } else {
      addBotMessage(
        "I can help you with bookings, rides, VIP experiences, or general information. What would you like to know?",
        ["Book Party", "Schedule Ride", "VIP Info", "Contact Info"],
      )
    }
  }

  const completeBooking = () => {
    const { name, phone, eventType, partySize, date, time, specialRequests } = chatState.bookingData

    addBotMessage(
      `Perfect! Here's your booking summary:\n\n• Name: ${name}\n• Phone: ${phone}\n• Event: ${eventType}\n• Party Size: ${partySize}\n• Date: ${date}\n• Time: ${time}\n• Special Requests: ${specialRequests || "None"}\n\nOur team will call you within 30 minutes to confirm details and process your reservation!`,
      ["Call Me Now", "Text Confirmation", "Email Details"],
    )

    // Send booking data to backend
    fetch("/api/chatbot-booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "party_booking",
        data: chatState.bookingData,
        timestamp: new Date().toISOString(),
      }),
    })

    setChatState((prev) => ({ ...prev, currentFlow: "general" }))
  }

  const completeRideBooking = () => {
    const { name, phone, pickupLocation, pickupTime, partySize } = chatState.rideData

    addBotMessage(
      `Ride confirmed! Here are the details:\n\n• Name: ${name}\n• Phone: ${phone}\n• Pickup: ${pickupLocation}\n• Time: ${pickupTime}\n• Group Size: ${partySize}\n\nOur driver will call you 15 minutes before pickup. The ride is completely free!`,
      ["Track My Ride", "Call Driver", "Modify Pickup"],
    )

    // Send ride data to backend
    fetch("/api/chatbot-booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "ride_booking",
        data: chatState.rideData,
        timestamp: new Date().toISOString(),
      }),
    })

    setChatState((prev) => ({ ...prev, currentFlow: "general" }))
  }

  const handleQuickAction = (flow: string) => {
    setChatState((prev) => ({ ...prev, currentFlow: flow as any }))

    switch (flow) {
      case "party":
        addUserMessage("Book Party")
        handlePartyFlow("book party")
        break
      case "ride":
        addUserMessage("Schedule Ride")
        handleRideFlow("schedule ride")
        break
      case "booking":
        addUserMessage("VIP Booking")
        handleBookingFlow("vip booking")
        break
      case "waste_management":
        addUserMessage("Waste Management Event")
        handleWasteManagementFlow("waste management event")
        break
    }
  }

  const handleBookingFlow = (input: string) => {
    addBotMessage(
      "I'll help you book a VIP experience! Let me transfer you to our booking system for the best service.",
      ["Open Booking Form", "Call Directly", "Continue in Chat"],
    )
  }

  return (
    <>
      {/* Chatbot Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-20 left-6 sm:bottom-24 sm:left-8 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-secondary hover:bg-secondary/90 text-secondary-foreground shadow-2xl hover:shadow-secondary/50 animate-float z-50 hover:scale-110 transition-transform duration-300"
        style={{ animationDelay: "0.5s" }}
      >
        {isOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />}
      </Button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-36 left-6 sm:bottom-44 sm:left-8 w-80 sm:w-96 h-96 z-50">
          <Card className="h-full bg-card/95 backdrop-blur-sm border-secondary/50 shadow-2xl">
            <CardHeader className="p-4 border-b border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Image
                    src="/images/skin-logo-red-silhouette.png"
                    alt="Skin Cabaret"
                    width={32}
                    height={32}
                    className="animate-glow"
                  />
                  <div>
                    <CardTitle className="text-lg font-bold text-secondary">Skin Cabaret</CardTitle>
                    <p className="text-xs text-muted-foreground">Always here to help</p>
                  </div>
                </div>
                <Badge className="bg-green-500 text-white">Online</Badge>
              </div>
            </CardHeader>

            <CardContent className="p-0 h-full flex flex-col">
              {/* Quick Actions */}
              <div className="p-3 border-b border-border">
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickAction(action.flow)}
                      className="border-secondary/30 text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent text-xs"
                    >
                      <action.icon className="w-3 h-3 mr-1" />
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      {message.options && (
                        <div className="mt-2 space-y-1">
                          {message.options.map((option, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleOptionClick(option)}
                              className="w-full text-xs border-secondary/30 text-secondary hover:bg-secondary hover:text-secondary-foreground bg-transparent"
                            >
                              {option}
                            </Button>
                          ))}
                        </div>
                      )}
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-foreground p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-secondary rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-secondary rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-secondary rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <div className="flex space-x-2">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
