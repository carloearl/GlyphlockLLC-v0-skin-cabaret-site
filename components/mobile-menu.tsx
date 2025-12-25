"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Phone } from "lucide-react"
import Image from "next/image"

interface MobileMenuProps {
  scrolled: boolean
}

export default function MobileMenu({ scrolled }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "Sports", href: "#sports" },
    { label: "Hiring", href: "#hiring" },
    { label: "Contact", href: "#contact" },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace("#", ""))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    closeMenu()
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className="text-white hover:text-red-400 hover:bg-red-600/20"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/95 backdrop-blur-md" onClick={closeMenu} />

          <div className="fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-black/95 backdrop-blur-md border-l border-red-600/30 shadow-2xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-red-600/30">
                <Image
                  src="/images/skin-logo-red-silhouette.png"
                  alt="Skin Cabaret Logo"
                  width={50}
                  height={50}
                  className="object-contain"
                />
                <Button variant="ghost" size="icon" onClick={closeMenu} className="text-white hover:text-red-400">
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {/* Menu Items */}
              <nav className="flex-1 px-6 py-8">
                <ul className="space-y-6">
                  {menuItems.map((item) => (
                    <li key={item.label}>
                      <button
                        onClick={() => scrollToSection(item.href)}
                        className="block w-full text-left text-xl font-bold uppercase tracking-wide text-white hover:text-red-400 transition-colors duration-300 py-3 border-b border-red-600/30 hover:border-red-400/50"
                      >
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Footer Actions */}
              <div className="p-6 border-t border-red-600/30 space-y-4">
                <Button
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-lg font-bold uppercase tracking-wide"
                  onClick={() => {
                    window.location.href = "tel:4804257546"
                    closeMenu()
                  }}
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Button>

                <div className="text-center">
                  <p className="text-xs text-white/70 mt-1">(480) 425-7546</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
