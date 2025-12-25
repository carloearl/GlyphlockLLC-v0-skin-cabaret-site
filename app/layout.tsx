import type React from "react"
import type { Metadata } from "next"
import { Montserrat, JetBrains_Mono } from "next/font/google"
import { Suspense } from "react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import "./globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Skin Cabaret - Scottsdale's Premier Adult Entertainment | VIP Experiences & Bachelor Parties",
  description:
    "Experience Scottsdale's most sophisticated adult entertainment venue. Premium VIP packages, unforgettable bachelor parties, and world-class performers. Phoenix New Times Best Of Winner. Open 8PM-6AM daily.",
  keywords: [
    "Scottsdale adult entertainment",
    "VIP bachelor parties",
    "premium strip club",
    "Scottsdale nightlife",
    "adult entertainment Arizona",
    "VIP packages",
    "bachelor party venue",
    "Scottsdale entertainment",
    "Phoenix New Times winner",
    "upscale gentlemen's club",
  ],
  authors: [{ name: "Skin Cabaret" }],
  creator: "Skin Cabaret",
  publisher: "Skin Cabaret",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://skincabaret.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Skin Cabaret - Scottsdale's Premier Adult Entertainment",
    description:
      "Experience world-class entertainment at Scottsdale's most exclusive venue. VIP packages, bachelor parties, and unforgettable nights.",
    url: "https://skincabaret.com",
    siteName: "Skin Cabaret",
    images: [
      {
        url: "/images/hero-bdsm-red-lighting.jpeg",
        width: 1200,
        height: 630,
        alt: "Skin Cabaret - Premium Adult Entertainment Venue",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Skin Cabaret - Scottsdale's Premier Adult Entertainment",
    description:
      "Experience world-class entertainment at Scottsdale's most exclusive venue. VIP packages, bachelor parties, and unforgettable nights.",
    images: ["/images/hero-bdsm-red-lighting.jpeg"],
    creator: "@skincabaret",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google6f03b6c13b55545c",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "entertainment",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NightClub",
              name: "Skin Cabaret",
              description:
                "Scottsdale's premier adult entertainment venue featuring VIP experiences, bachelor parties, and world-class performers.",
              url: "https://skincabaret.com",
              logo: "https://skincabaret.com/images/skin-logo-red-silhouette.png",
              image: [
                "https://skincabaret.com/images/hero-bdsm-red-lighting.jpeg",
                "https://skincabaret.com/images/vip-blonde-martini.jpeg",
                "https://skincabaret.com/images/bachelor-party-celebration.jpeg",
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "1137 N Scottsdale Rd",
                addressLocality: "Scottsdale",
                addressRegion: "AZ",
                postalCode: "85251",
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 33.4942,
                longitude: -111.9261,
              },
              telephone: "+14804257546",
              email: "info@skincabaret.com",
              openingHours: "Mo-Su 20:00-06:00",
              priceRange: "$$$",
              servesCuisine: "Cocktails",
              acceptsReservations: true,
              hasMenu: false,
              smokingAllowed: false,
              paymentAccepted: ["Cash", "Credit Card", "Debit Card"],
              currenciesAccepted: "USD",
              areaServed: {
                "@type": "GeoCircle",
                geoMidpoint: {
                  "@type": "GeoCoordinates",
                  latitude: 33.4942,
                  longitude: -111.9261,
                },
                geoRadius: "50000",
              },
              sameAs: [
                "https://www.facebook.com/skincabaret",
                "https://www.instagram.com/skincabaret",
                "https://twitter.com/skincabaret",
              ],
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "5.0",
                reviewCount: "150",
                bestRating: "5",
                worstRating: "1",
              },
              review: [
                {
                  "@type": "Review",
                  author: {
                    "@type": "Person",
                    name: "Michael R.",
                  },
                  reviewRating: {
                    "@type": "Rating",
                    ratingValue: "5",
                    bestRating: "5",
                  },
                  reviewBody:
                    "Best bachelor party venue in Scottsdale! Professional staff, amazing atmosphere, and the entertainment was top-notch.",
                },
              ],
              amenityFeature: [
                {
                  "@type": "LocationFeatureSpecification",
                  name: "VIP Seating",
                  value: true,
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Bottle Service",
                  value: true,
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Bachelor Party Packages",
                  value: true,
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Valet Parking",
                  value: true,
                },
                {
                  "@type": "LocationFeatureSpecification",
                  name: "Private Events",
                  value: true,
                },
              ],
            }),
          }}
        />

        <meta name="theme-color" content="#dc2626" />
        <meta name="msapplication-TileColor" content="#dc2626" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />

        <meta name="geo.region" content="US-AZ" />
        <meta name="geo.placename" content="Scottsdale" />
        <meta name="geo.position" content="33.4942;-111.9261" />
        <meta name="ICBM" content="33.4942, -111.9261" />
        <meta name="rating" content="adult" />
        <meta name="audience" content="adult" />
        <meta name="content-rating" content="mature" />
      </head>
      <body className={`font-sans ${montserrat.variable} ${jetbrainsMono.variable} antialiased`}>
        <Suspense fallback={null}>{children}</Suspense>
        <SpeedInsights />
      </body>
    </html>
  )
}
