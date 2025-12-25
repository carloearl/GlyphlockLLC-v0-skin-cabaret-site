"use client"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function VIPMembershipDemo() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-red-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2 text-white hover:text-red-400 transition-colors">
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Main Site</span>
              </Link>
              <div className="h-6 w-px bg-red-500/30"></div>
              <Image
                src="/images/skin-logo-red-silhouette.png"
                alt="Skin Cabaret"
                width={40}
                height={40}
                className="drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
              />
            </div>
            <div className="bg-yellow-600/20 border border-yellow-500/50 rounded-lg px-4 py-2">
              <span className="text-yellow-400 font-bold text-sm">🚧 DEMO PREVIEW 🚧</span>
            </div>
          </div>
        </div>
      </nav>

      {/* VIP Membership Program Section */}
      <section className="pt-24 py-16 sm:py-24 bg-gradient-to-b from-card/30 to-background relative">
        <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20">
          <div className="text-center mb-8">
            <div className="inline-block bg-yellow-600/20 border border-yellow-500/50 rounded-lg px-6 py-3 mb-6">
              <span className="text-yellow-400 font-bold text-lg">🚧 COMING SOON - DEMO PREVIEW 🚧</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-center mb-6 text-secondary/70 animate-glow hover:scale-105 transition-transform duration-300">
              VIP MEMBERSHIP PROGRAM
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-4">
              Our VIP membership program is currently being finalized. Exclusive benefits and premium access will be
              available soon.
            </p>
            <p className="text-sm text-yellow-400 font-semibold">
              * Pricing and features shown are for demonstration purposes only
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 opacity-60">
            {/* Silver Tier */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/40 backdrop-blur-sm border border-gray-400/30 rounded-lg overflow-hidden hover:border-gray-400/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(156,163,175,0.3)]">
              <div className="bg-gradient-to-r from-gray-600 to-gray-700 p-6 text-center relative">
                <div className="absolute top-2 right-2 bg-yellow-600 text-black px-2 py-1 rounded text-xs font-bold">
                  DEMO
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">SILVER MEMBER</h3>
                <p className="text-gray-200 text-lg">Premium Access</p>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-white">$99</span>
                  <span className="text-gray-300">/month</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-3">✓</span>
                    Priority seating reservations
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-3">✓</span>
                    10% discount on all services
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-3">✓</span>
                    Complimentary valet parking
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-3">✓</span>
                    Monthly member-only events
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-3">✓</span>
                    Dedicated member support
                  </li>
                </ul>
                <button
                  disabled
                  className="w-full mt-6 bg-yellow-600/30 text-yellow-400 font-bold py-3 rounded-lg cursor-not-allowed border border-yellow-500/50"
                >
                  Coming Soon
                </button>
              </div>
            </div>

            {/* Gold Tier */}
            <div className="bg-gradient-to-br from-yellow-800/80 to-yellow-900/40 backdrop-blur-sm border border-yellow-400/50 rounded-lg overflow-hidden hover:border-yellow-400/70 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(251,191,36,0.4)] relative">
              <div className="absolute top-4 right-4 bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                DEMO
              </div>
              <div className="bg-gradient-to-r from-yellow-600 to-yellow-700 p-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">GOLD MEMBER</h3>
                <p className="text-yellow-100 text-lg">Elite Experience</p>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-white">$199</span>
                  <span className="text-yellow-200">/month</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <span className="text-yellow-400 mr-3">✓</span>
                    All Silver benefits included
                  </li>
                  <li className="flex items-center">
                    <span className="text-yellow-400 mr-3">✓</span>
                    20% discount on all services
                  </li>
                  <li className="flex items-center">
                    <span className="text-yellow-400 mr-3">✓</span>
                    VIP booth access & priority
                  </li>
                  <li className="flex items-center">
                    <span className="text-yellow-400 mr-3">✓</span>
                    Complimentary bottle service monthly
                  </li>
                  <li className="flex items-center">
                    <span className="text-yellow-400 mr-3">✓</span>
                    Private performer meet & greets
                  </li>
                  <li className="flex items-center">
                    <span className="text-yellow-400 mr-3">✓</span>
                    Exclusive Gold member events
                  </li>
                </ul>
                <button
                  disabled
                  className="w-full mt-6 bg-yellow-600/30 text-yellow-400 font-bold py-3 rounded-lg cursor-not-allowed border border-yellow-500/50"
                >
                  Coming Soon
                </button>
              </div>
            </div>

            {/* Platinum Tier */}
            <div className="bg-gradient-to-br from-purple-800/80 to-purple-900/40 backdrop-blur-sm border border-purple-400/50 rounded-lg overflow-hidden hover:border-purple-400/70 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-center relative">
                <div className="absolute top-2 right-2 bg-yellow-600 text-black px-2 py-1 rounded text-xs font-bold">
                  DEMO
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">PLATINUM MEMBER</h3>
                <p className="text-purple-100 text-lg">Ultimate Luxury</p>
                <div className="mt-4">
                  <span className="text-3xl font-bold text-white">$399</span>
                  <span className="text-purple-200">/month</span>
                </div>
              </div>
              <div className="p-6">
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-center">
                    <span className="text-purple-400 mr-3">✓</span>
                    All Gold benefits included
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-400 mr-3">✓</span>
                    30% discount on all services
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-400 mr-3">✓</span>
                    Private VIP suite access
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-400 mr-3">✓</span>
                    Unlimited bottle service
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-400 mr-3">✓</span>
                    Personal concierge service
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-400 mr-3">✓</span>
                    Exclusive Platinum events & trips
                  </li>
                  <li className="flex items-center">
                    <span className="text-purple-400 mr-3">✓</span>
                    Custom entertainment packages
                  </li>
                </ul>
                <button
                  disabled
                  className="w-full mt-6 bg-yellow-600/30 text-yellow-400 font-bold py-3 rounded-lg cursor-not-allowed border border-yellow-500/50"
                >
                  Coming Soon
                </button>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 rounded-lg p-8 mb-12 opacity-60">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">EXCLUSIVE MEMBER BENEFITS</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-red-600/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Priority Access</h4>
                <p className="text-gray-300 text-sm">
                  Skip the line and enjoy guaranteed seating with advance reservations
                </p>
              </div>
              <div className="text-center">
                <div className="bg-red-600/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💎</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Exclusive Events</h4>
                <p className="text-gray-300 text-sm">
                  Member-only parties, performer showcases, and special celebrations
                </p>
              </div>
              <div className="text-center">
                <div className="bg-red-600/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🥂</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Premium Service</h4>
                <p className="text-gray-300 text-sm">
                  Dedicated staff, complimentary services, and personalized attention
                </p>
              </div>
              <div className="text-center">
                <div className="bg-red-600/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💰</span>
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">Savings & Perks</h4>
                <p className="text-gray-300 text-sm">
                  Significant discounts, complimentary services, and exclusive offers
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-red-900/20 to-black border border-yellow-500/50 rounded-lg p-8 max-w-2xl mx-auto opacity-60">
            <div className="text-center mb-6">
              <div className="inline-block bg-yellow-600/20 border border-yellow-500/50 rounded-lg px-4 py-2 mb-4">
                <span className="text-yellow-400 font-bold">🚧 APPLICATION FORM - DEMO ONLY 🚧</span>
              </div>
              <h3 className="text-2xl font-bold text-white">VIP MEMBERSHIP APPLICATION</h3>
              <p className="text-gray-400 text-sm mt-2">This form is not functional during the demo phase</p>
            </div>
            <form className="space-y-4 pointer-events-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="bg-black/50 border border-red-500/40 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:border-red-400 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="bg-black/50 border border-red-500/40 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:border-red-400 focus:outline-none"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-black/50 border border-red-500/40 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:border-red-400 focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="bg-black/50 border border-red-500/40 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:border-red-400 focus:outline-none"
                />
              </div>
              <select className="w-full bg-black/50 border border-red-500/40 rounded-lg px-4 py-3 text-white focus:border-red-400 focus:outline-none">
                <option value="">Select Membership Tier</option>
                <option value="silver">Silver Membership - $99/month</option>
                <option value="gold">Gold Membership - $199/month</option>
                <option value="platinum">Platinum Membership - $399/month</option>
              </select>
              <textarea
                placeholder="Tell us about your interests and how you'd like to enhance your Skin Cabaret experience..."
                rows={4}
                className="w-full bg-black/50 border border-red-500/40 rounded-lg px-4 py-3 text-white placeholder-white/60 focus:border-red-400 focus:outline-none"
              ></textarea>
              <div className="text-center">
                <button
                  type="button"
                  disabled
                  className="bg-yellow-600/30 text-yellow-400 font-bold py-3 px-8 rounded-lg cursor-not-allowed border border-yellow-500/50"
                >
                  Coming Soon
                </button>
                <p className="text-yellow-400 text-sm mt-4 font-semibold">
                  VIP membership applications will be available when the program launches.
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
