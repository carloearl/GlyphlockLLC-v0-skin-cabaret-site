"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Calendar, Clock, Users, Star, Shield, Phone, CheckCircle, CreditCard, Mail } from "lucide-react"

interface ReservationPopupProps {
  isOpen: boolean
  onClose: () => void
  type: "bachelor" | "vip" | "table" | "champagne" | "wm" | "football"
}

export default function ReservationPopup({ isOpen, onClose, type }: ReservationPopupProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    partySize: "",
    specialRequests: "",
    packageType: "",
    budget: "",
    transportation: false,
    vipUpgrade: false,
    occasion: "",
    preferredPerformer: "",
    dietaryRestrictions: "",
    paymentMethod: "card",
    depositAmount: "",
    referralSource: "",
    loyaltyMember: false,
    emergencyContact: "",
    emergencyPhone: "",
  })

  const getPackageOptions = () => {
    switch (type) {
      case "bachelor":
        return [
          {
            id: "essential",
            name: "Essential Bachelor Package",
            price: "$500",
            deposit: "$150",
            features: ["VIP Table for 6", "2 Premium Bottles", "Dedicated Host", "Photo Package"],
          },
          {
            id: "premium",
            name: "Premium Bachelor Package",
            price: "$1,000",
            deposit: "$300",
            features: [
              "Private Booth for 10",
              "4 Premium Bottles",
              "Transportation",
              "VIP Host",
              "Performer Meet & Greet",
            ],
          },
          {
            id: "platinum",
            name: "Platinum Bachelor Package",
            price: "$2,500",
            deposit: "$750",
            features: [
              "Private Room for 15",
              "Top Shelf Service",
              "Limo Service",
              "Personal Concierge",
              "Professional Photo/Video",
              "Custom Entertainment",
            ],
          },
        ]
      case "vip":
        return [
          {
            id: "gold",
            name: "Gold VIP Experience",
            price: "$300",
            deposit: "$100",
            features: ["VIP Seating", "Premium Bottle Service", "Priority Service", "Complimentary Appetizers"],
          },
          {
            id: "platinum",
            name: "Platinum VIP Experience",
            price: "$600",
            deposit: "$200",
            features: ["Private Booth", "Elite Service", "Gourmet Dinner", "Personal Host", "Champagne Service"],
          },
          {
            id: "diamond",
            name: "Diamond VIP Experience",
            price: "$1,200",
            deposit: "$400",
            features: [
              "Private Suite",
              "Ultra-Premium Service",
              "Multi-Course Dining",
              "Dedicated Concierge",
              "Exclusive Performer Access",
            ],
          },
        ]
      case "champagne":
        return [
          {
            id: "saturday",
            name: "Champagne Saturday Premium",
            price: "$200",
            deposit: "$75",
            features: [
              "Premium Champagne Service",
              "VIP Seating",
              "Saturday Night Entertainment",
              "Complimentary Appetizers",
            ],
          },
        ]
      case "wm":
        return [
          {
            id: "wm-weekend",
            name: "WM Phoenix Weekend Package",
            price: "$800",
            deposit: "$250",
            features: ["Weekend Access", "Premium Viewing", "Bottle Service", "Tournament Specials", "VIP Host"],
          },
        ]
      case "football":
        return [
          {
            id: "sunday-night",
            name: "Sunday Night Football Package",
            price: "$150",
            deposit: "$50",
            features: ["Game Viewing", "Food & Drink Specials", "Reserved Seating", "Halftime Entertainment"],
          },
        ]
      default:
        return [
          {
            id: "standard",
            name: "Standard Table",
            price: "$150",
            deposit: "$50",
            features: ["Reserved Seating", "Table Service", "Menu Access"],
          },
          {
            id: "premium",
            name: "Premium Table",
            price: "$300",
            deposit: "$100",
            features: ["VIP Seating", "Bottle Service", "Priority Access", "Dedicated Server"],
          },
        ]
    }
  }

  const getTitle = () => {
    switch (type) {
      case "bachelor":
        return "BACHELOR PARTY RESERVATION"
      case "vip":
        return "VIP EXPERIENCE BOOKING"
      case "table":
        return "TABLE RESERVATION"
      case "champagne":
        return "CHAMPAGNE EXPERIENCE BOOKING"
      case "wm":
        return "WM PHOENIX WEEKEND PACKAGE"
      case "football":
        return "SUNDAY NIGHT FOOTBALL PACKAGE"
      default:
        return "RESERVATION"
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
      return
    }

    const packageInfo = getPackageOptions().find((p) => p.id === formData.packageType)
    const message = `PREMIUM ${type.toUpperCase()} RESERVATION:

GUEST INFORMATION:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
${formData.emergencyContact ? `Emergency Contact: ${formData.emergencyContact}` : ""}

RESERVATION DETAILS:
Date: ${formData.date} at ${formData.time}
Party Size: ${formData.partySize}
${formData.occasion ? `Occasion: ${formData.occasion}` : ""}
Package: ${packageInfo?.name} (${packageInfo?.price})
Deposit: ${formData.depositAmount}
Payment Method: ${formData.paymentMethod}

PREFERENCES:
${formData.preferredPerformer ? `Preferred Performer: ${formData.preferredPerformer}` : ""}
${formData.dietaryRestrictions ? `Dietary Restrictions: ${formData.dietaryRestrictions}` : ""}
${formData.transportation ? "Transportation: YES (+$100)" : ""}
${formData.vipUpgrade ? "VIP Upgrade: YES (+$200)" : ""}
${formData.loyaltyMember ? "VIP Member: YES" : ""}

Special Requests: ${formData.specialRequests}`

    window.location.href = `sms:+14804257546?body=${encodeURIComponent(message)}`
    onClose()
  }

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Calendar className="w-6 h-6 text-gold" />
          <span className="text-gold font-bold">STEP 1: GUEST INFORMATION</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Full Name *"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-4 bg-gradient-to-r from-gray-900 to-black border-2 border-red-600 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:outline-none transition-colors"
              required
            />
          </div>
          <div className="relative">
            <Mail className="absolute left-3 top-4 w-5 h-5 text-red-400" />
            <input
              type="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-4 pl-12 bg-gradient-to-r from-gray-900 to-black border-2 border-red-600 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:outline-none transition-colors"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <Phone className="absolute left-3 top-4 w-5 h-5 text-red-400" />
            <input
              type="tel"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full p-4 pl-12 bg-gradient-to-r from-gray-900 to-black border-2 border-red-600 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:outline-none transition-colors"
              required
            />
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Emergency Contact Name"
              value={formData.emergencyContact}
              onChange={(e) => setFormData({ ...formData, emergencyContact: e.target.value })}
              className="w-full p-4 bg-gradient-to-r from-gray-900 to-black border-2 border-red-600 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:outline-none transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <Calendar className="absolute left-3 top-4 w-5 h-5 text-red-400" />
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full p-4 pl-12 bg-gradient-to-r from-gray-900 to-black border-2 border-red-600 rounded-lg text-white focus:border-gold focus:outline-none transition-colors"
              required
            />
          </div>
          <div className="relative">
            <Clock className="absolute left-3 top-4 w-5 h-5 text-red-400" />
            <select
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full p-4 pl-12 bg-gradient-to-r from-gray-900 to-black border-2 border-red-600 rounded-lg text-white focus:border-gold focus:outline-none transition-colors"
              required
            >
              <option value="">Select Time</option>
              <option value="8:00 PM">8:00 PM</option>
              <option value="9:00 PM">9:00 PM</option>
              <option value="10:00 PM">10:00 PM</option>
              <option value="11:00 PM">11:00 PM</option>
              <option value="12:00 AM">12:00 AM</option>
              <option value="1:00 AM">1:00 AM</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative">
            <Users className="absolute left-3 top-4 w-5 h-5 text-red-400" />
            <select
              value={formData.partySize}
              onChange={(e) => setFormData({ ...formData, partySize: e.target.value })}
              className="w-full p-4 pl-12 bg-gradient-to-r from-gray-900 to-black border-2 border-red-600 rounded-lg text-white focus:border-gold focus:outline-none transition-colors"
              required
            >
              <option value="">Select Party Size</option>
              <option value="2-4">2-4 People</option>
              <option value="5-8">5-8 People</option>
              <option value="9-12">9-12 People</option>
              <option value="13-20">13-20 People</option>
              <option value="21+">21+ People (Custom Package)</option>
            </select>
          </div>
          <div className="relative">
            <select
              value={formData.occasion}
              onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
              className="w-full p-4 bg-gradient-to-r from-gray-900 to-black border-2 border-red-600 rounded-lg text-white focus:border-gold focus:outline-none transition-colors"
            >
              <option value="">Occasion (Optional)</option>
              <option value="bachelor">Bachelor Party</option>
              <option value="birthday">Birthday Celebration</option>
              <option value="anniversary">Anniversary</option>
              <option value="business">Business Entertainment</option>
              <option value="celebration">General Celebration</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.loyaltyMember}
            onChange={(e) => setFormData({ ...formData, loyaltyMember: e.target.checked })}
            className="w-5 h-5 text-gold bg-gray-900 border-red-600 rounded focus:ring-gold"
          />
          <span className="text-white">I'm a Skin Cabaret VIP Member</span>
        </label>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Star className="w-6 h-6 text-gold" />
          <span className="text-gold font-bold">STEP 2: SELECT PACKAGE & PREFERENCES</span>
        </div>
      </div>

      <div className="space-y-4">
        {getPackageOptions().map((pkg) => (
          <div
            key={pkg.id}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all duration-300 ${
              formData.packageType === pkg.id
                ? "border-gold bg-gradient-to-r from-gold/20 to-gold/10"
                : "border-red-600/50 bg-gradient-to-r from-gray-900/50 to-black hover:border-gold/50"
            }`}
            onClick={() => setFormData({ ...formData, packageType: pkg.id, depositAmount: pkg.deposit })}
          >
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-lg font-bold text-white">{pkg.name}</h4>
              <div className="text-right">
                <span className="text-2xl font-black text-gold">{pkg.price}</span>
                <p className="text-sm text-white/70">Deposit: {pkg.deposit}</p>
              </div>
            </div>
            <div className="space-y-1">
              {pkg.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white/90 text-sm">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4 pt-4 border-t border-red-600/30">
        <h4 className="text-lg font-bold text-white mb-3">PREFERENCES & ADD-ONS</h4>

        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            placeholder="Preferred Performer (Optional)"
            value={formData.preferredPerformer}
            onChange={(e) => setFormData({ ...formData, preferredPerformer: e.target.value })}
            className="w-full p-4 bg-gradient-to-r from-gray-900 to-black border-2 border-red-600 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:outline-none transition-colors"
          />

          <input
            type="text"
            placeholder="Dietary Restrictions/Allergies (Optional)"
            value={formData.dietaryRestrictions}
            onChange={(e) => setFormData({ ...formData, dietaryRestrictions: e.target.value })}
            className="w-full p-4 bg-gradient-to-r from-gray-900 to-black border-2 border-red-600 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:outline-none transition-colors"
          />
        </div>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.transportation}
            onChange={(e) => setFormData({ ...formData, transportation: e.target.checked })}
            className="w-5 h-5 text-gold bg-gray-900 border-red-600 rounded focus:ring-gold"
          />
          <div className="flex-1">
            <span className="text-white font-semibold">Luxury Transportation</span>
            <p className="text-white/70 text-sm">Premium shuttle service to/from venue</p>
          </div>
          <span className="text-gold font-bold">+$100</span>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.vipUpgrade}
            onChange={(e) => setFormData({ ...formData, vipUpgrade: e.target.checked })}
            className="w-5 h-5 text-gold bg-gray-900 border-red-600 rounded focus:ring-gold"
          />
          <div className="flex-1">
            <span className="text-white font-semibold">VIP Host Upgrade</span>
            <p className="text-white/70 text-sm">Dedicated VIP host for your entire visit</p>
          </div>
          <span className="text-gold font-bold">+$200</span>
        </label>
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <CreditCard className="w-6 h-6 text-gold" />
          <span className="text-gold font-bold">STEP 3: PAYMENT & CONFIRMATION</span>
        </div>
      </div>

      <div className="bg-gradient-to-r from-red-900/20 to-black border border-red-600/30 rounded-lg p-4">
        <h4 className="text-lg font-bold text-white mb-3">RESERVATION SUMMARY</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-white/70">Guest:</span>
            <span className="text-white">{formData.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/70">Date & Time:</span>
            <span className="text-white">
              {formData.date} at {formData.time}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/70">Party Size:</span>
            <span className="text-white">{formData.partySize}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/70">Package:</span>
            <span className="text-white">{getPackageOptions().find((p) => p.id === formData.packageType)?.name}</span>
          </div>
          {formData.occasion && (
            <div className="flex justify-between">
              <span className="text-white/70">Occasion:</span>
              <span className="text-white">{formData.occasion}</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg pt-2 border-t border-red-600/30">
            <span className="text-gold">Deposit Required:</span>
            <span className="text-gold">{formData.depositAmount}</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-lg font-bold text-white">PAYMENT METHOD</h4>
        <div className="grid grid-cols-2 gap-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={formData.paymentMethod === "card"}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              className="w-5 h-5 text-gold bg-gray-900 border-red-600"
            />
            <span className="text-white">Credit/Debit Card</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={formData.paymentMethod === "cash"}
              onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
              className="w-5 h-5 text-gold bg-gray-900 border-red-600"
            />
            <span className="text-white">Cash at Venue</span>
          </label>
        </div>
      </div>

      <div>
        <textarea
          placeholder="Special Requests, Dietary Restrictions, or Additional Information"
          value={formData.specialRequests}
          onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
          className="w-full p-4 bg-gradient-to-r from-gray-900 to-black border-2 border-red-600 rounded-lg text-white placeholder-gray-400 focus:border-gold focus:outline-none h-24 resize-none transition-colors"
        />
      </div>

      <div className="bg-gradient-to-r from-gold/20 to-gold/10 border border-gold/30 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="w-5 h-5 text-gold" />
          <span className="text-gold font-bold">PREMIUM SERVICE GUARANTEE</span>
        </div>
        <p className="text-white/90 text-sm">
          Your reservation includes our premium service guarantee with professional staff, world-class entertainment,
          and exceptional service standards. Deposits are fully refundable with 48-hour notice.
        </p>
      </div>
    </div>
  )

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-black via-red-900/10 to-black border-2 border-red-600 rounded-xl max-w-2xl w-full relative shadow-[0_0_50px_rgba(239,68,68,0.5)] max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors z-10 bg-black/50 rounded-full p-2"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-black text-white mb-2">{getTitle()}</h3>
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((stepNum) => (
                <div key={stepNum} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                      step >= stepNum ? "bg-gold text-black" : "bg-gray-700 text-white"
                    }`}
                  >
                    {stepNum}
                  </div>
                  {stepNum < 3 && <div className={`w-12 h-1 mx-2 ${step > stepNum ? "bg-gold" : "bg-gray-700"}`} />}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}

            <div className="flex justify-between mt-8">
              {step > 1 && (
                <Button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  PREVIOUS
                </Button>
              )}

              <Button
                type="submit"
                className={`font-bold py-3 px-8 rounded-lg transition-all duration-300 ${
                  step === 3
                    ? "bg-gradient-to-r from-gold to-gold-dark hover:from-gold-dark hover:to-gold text-black shadow-[0_0_30px_rgba(255,215,0,0.5)]"
                    : "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-[0_0_20px_rgba(239,68,68,0.5)]"
                } ${step === 1 ? "ml-auto" : ""}`}
              >
                {step === 3 ? "CONFIRM RESERVATION" : "CONTINUE"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
