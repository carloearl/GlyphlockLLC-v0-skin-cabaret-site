"use client"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PerformerProfilesDemo() {
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

      {/* Performer Profiles Section - DEMO */}
      <section className="pt-24 py-16 sm:py-24 bg-gradient-to-b from-card/30 to-background relative">
        <div className="absolute inset-0 bg-black/20 z-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-20">
          <div className="text-center mb-8">
            <div className="inline-block bg-yellow-600/20 border border-yellow-500/50 rounded-lg px-6 py-3 mb-6">
              <span className="text-yellow-400 font-bold text-lg">🚧 COMING SOON - DEMO PREVIEW 🚧</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-center mb-6 text-secondary/70 animate-glow hover:scale-105 transition-transform duration-300">
              FEATURED PERFORMERS
            </h2>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed mb-4">
              This section is currently in development. Performer profiles and scheduling will be available soon.
            </p>
            <p className="text-sm text-yellow-400 font-semibold">
              * Images are blurred for privacy during development phase
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 opacity-60">
            {/* Performer 1 */}
            <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-red-500/30 rounded-lg overflow-hidden hover:border-red-500/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/entertainer-pole-dance-blue.jpeg"
                  alt="Demo Performer Profile"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110 blur-md"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute top-4 left-4 bg-yellow-600 text-black px-3 py-1 rounded-full text-sm font-bold">
                  DEMO
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">SAMPLE PROFILE</h3>
                  <p className="text-yellow-400 font-semibold mb-1">Performance Specialist</p>
                  <div className="flex items-center space-x-4 text-sm text-white/80">
                    <span>🕘 Schedule TBD</span>
                    <span>⭐ Experience Varies</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                    Demo Feature
                  </span>
                  <span className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                    Coming Soon
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  This is a preview of how performer profiles will appear once this feature is fully implemented.
                  Detailed performer information and scheduling will be available soon.
                </p>
              </div>
            </div>

            {/* Performer 2 */}
            <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-red-500/30 rounded-lg overflow-hidden hover:border-red-500/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/staff-hostess-red.jpeg"
                  alt="Demo VIP Profile"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110 blur-md"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute top-4 left-4 bg-yellow-600 text-black px-3 py-1 rounded-full text-sm font-bold">
                  DEMO
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">SAMPLE VIP HOST</h3>
                  <p className="text-yellow-400 font-semibold mb-1">VIP Experience Curator</p>
                  <div className="flex items-center space-x-4 text-sm text-white/80">
                    <span>🕘 Schedule TBD</span>
                    <span>⭐ Experience Varies</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                    Demo Feature
                  </span>
                  <span className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                    Coming Soon
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  VIP host profiles will showcase our premium service specialists and their availability for exclusive
                  experiences and private events.
                </p>
              </div>
            </div>

            {/* Performer 3 */}
            <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-red-500/30 rounded-lg overflow-hidden hover:border-red-500/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/entertainer-pole-dance-red.jpeg"
                  alt="Demo Artist Profile"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110 blur-md"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute top-4 left-4 bg-yellow-600 text-black px-3 py-1 rounded-full text-sm font-bold">
                  DEMO
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">SAMPLE ARTIST</h3>
                  <p className="text-yellow-400 font-semibold mb-1">Performance Artist</p>
                  <div className="flex items-center space-x-4 text-sm text-white/80">
                    <span>🕘 Schedule TBD</span>
                    <span>⭐ Experience Varies</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                    Demo Feature
                  </span>
                  <span className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                    Coming Soon
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Performance artist profiles will highlight specialized skills, show schedules, and booking
                  availability for themed entertainment experiences.
                </p>
              </div>
            </div>

            {/* Additional Demo Performers */}
            <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-red-500/30 rounded-lg overflow-hidden hover:border-red-500/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/entertainer-flowing-hair.jpeg"
                  alt="Demo Entertainer Profile"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110 blur-md"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute top-4 left-4 bg-yellow-600 text-black px-3 py-1 rounded-full text-sm font-bold">
                  DEMO
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">SAMPLE ENTERTAINER</h3>
                  <p className="text-yellow-400 font-semibold mb-1">Elite Performer</p>
                  <div className="flex items-center space-x-4 text-sm text-white/80">
                    <span>🕘 Schedule TBD</span>
                    <span>⭐ Experience Varies</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                    Demo Feature
                  </span>
                  <span className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                    Coming Soon
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Elite performer profiles will showcase our most talented entertainers with detailed skill sets,
                  availability schedules, and booking options for premium experiences.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-red-500/30 rounded-lg overflow-hidden hover:border-red-500/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/vip-brunette-bar.jpeg"
                  alt="Demo VIP Specialist"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110 blur-md"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute top-4 left-4 bg-yellow-600 text-black px-3 py-1 rounded-full text-sm font-bold">
                  DEMO
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">VIP SPECIALIST</h3>
                  <p className="text-yellow-400 font-semibold mb-1">Premium Service Expert</p>
                  <div className="flex items-center space-x-4 text-sm text-white/80">
                    <span>🕘 Schedule TBD</span>
                    <span>⭐ Experience Varies</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                    Demo Feature
                  </span>
                  <span className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                    Coming Soon
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  VIP specialists will provide personalized service experiences with detailed profiles showing their
                  expertise in premium entertainment and customer service.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border border-red-500/30 rounded-lg overflow-hidden hover:border-red-500/60 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(239,68,68,0.3)]">
              <div className="relative h-80 overflow-hidden">
                <Image
                  src="/images/heritage-pole-performance.jpeg"
                  alt="Demo Heritage Performer"
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-110 blur-md"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute top-4 left-4 bg-yellow-600 text-black px-3 py-1 rounded-full text-sm font-bold">
                  DEMO
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">HERITAGE ARTIST</h3>
                  <p className="text-yellow-400 font-semibold mb-1">Legacy Performer</p>
                  <div className="flex items-center space-x-4 text-sm text-white/80">
                    <span>🕘 Schedule TBD</span>
                    <span>⭐ Experience Varies</span>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                    Demo Feature
                  </span>
                  <span className="bg-yellow-600/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-semibold">
                    Coming Soon
                  </span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Heritage artists represent the legacy and tradition of Skin Cabaret, with profiles showcasing their
                  years of experience and signature performance styles.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-yellow-900/20 to-black border border-yellow-600/30 rounded-lg p-6 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold text-yellow-400 mb-3">🚧 FEATURE IN DEVELOPMENT 🚧</h3>
              <p className="text-gray-300 mb-4">
                Performer profiles, scheduling, and meet & greet bookings are currently being developed. This feature
                will be available soon with full functionality.
              </p>
              <button
                className="bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-400 border border-yellow-500/50 px-8 py-3 rounded-lg font-bold transition-all duration-300 cursor-not-allowed opacity-60"
                disabled
              >
                COMING SOON
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
