"use client"
import { X } from "lucide-react"
import Image from "next/image"

interface AgeVerificationPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function AgeVerificationPopup({ isOpen, onClose }: AgeVerificationPopupProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md">
      <div className="relative max-w-md w-full mx-4 bg-gradient-to-b from-red-900/20 via-black to-red-900/20 border-2 border-red-500/50 rounded-lg p-8 shadow-[0_0_50px_rgba(239,68,68,0.4)]">
        <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors">
          <X className="w-6 h-6" />
        </button>

        <div className="text-center space-y-6">
          <Image
            src="/images/skin-logo-red-silhouette.png"
            alt="Skin Cabaret Logo"
            width={120}
            height={120}
            className="mx-auto drop-shadow-[0_0_20px_rgba(239,68,68,0.8)]"
          />

          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">21+ TO ENTER SITE</h2>
            <p className="text-white/80 text-sm">
              You must be 21 years or older to enter this website. This site contains adult content and is intended for
              mature audiences only.
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={onClose}
              className="w-full px-6 py-3 bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white font-bold rounded-lg hover:shadow-[0_0_25px_rgba(239,68,68,0.6)] transition-all duration-300 hover:scale-105"
            >
              I AM 21 OR OLDER - ENTER SITE
            </button>
            <button
              onClick={() => (window.location.href = "https://google.com")}
              className="w-full px-6 py-3 bg-gray-600 text-white font-bold rounded-lg hover:bg-gray-500 transition-colors"
            >
              I AM UNDER 21 - EXIT
            </button>
          </div>

          <p className="text-white/60 text-xs">
            By entering this site, you confirm that you are 21 years or older and agree to our terms of service.
          </p>
        </div>
      </div>
    </div>
  )
}
