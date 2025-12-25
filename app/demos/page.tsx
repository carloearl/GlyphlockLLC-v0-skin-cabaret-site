"use client"
import Link from "next/link"

export default function DemosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-red-950/20 to-black">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-red-500/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-white hover:text-red-400 transition-colors">
              ← Back to Main Site
            </Link>
            <h1 className="text-xl font-bold text-white">Demo Features</h1>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-black text-white mb-6">DEMO FEATURES</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Preview upcoming features currently in development. These systems will be available soon.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Event Manager Demo */}
            <Link href="/demos/event-manager" className="group">
              <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 rounded-lg p-6 hover:border-red-400/60 transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📅</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Event Manager</h3>
                  <p className="text-gray-400 mb-4">Advanced event booking and management system</p>
                  <div className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded text-sm font-bold">
                    COMING SOON
                  </div>
                </div>
              </div>
            </Link>

            {/* VIP Membership Demo */}
            <Link href="/demos/vip-membership" className="group">
              <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 rounded-lg p-6 hover:border-red-400/60 transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">👑</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">VIP Membership</h3>
                  <p className="text-gray-400 mb-4">Exclusive membership tiers and benefits program</p>
                  <div className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded text-sm font-bold">
                    COMING SOON
                  </div>
                </div>
              </div>
            </Link>

            {/* Performer Profiles Demo */}
            <Link href="/demos/performer-profiles" className="group">
              <div className="bg-gradient-to-br from-red-900/30 to-black border border-red-500/40 rounded-lg p-6 hover:border-red-400/60 transition-all duration-300">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">⭐</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Performer Profiles</h3>
                  <p className="text-gray-400 mb-4">Individual entertainer profiles and schedules</p>
                  <div className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded text-sm font-bold">
                    COMING SOON
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
