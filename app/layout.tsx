import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ScrollProgress from "@/components/ScrollProgress";
import MouseGlow from "@/components/MouseGlow";
import FloatingButtons from "@/components/FloatingButtons";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Optician",
  name: "R.M OPTICAL",
  image: "https://rmoptical.vercel.app/og-image.jpg",
  url: "https://rmoptical.vercel.app",
  telephone: "+916296457668",
  email: "rmoptical2026@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Your Store Address",
    addressLocality: "Payradanga",
    addressRegion: "West Bengal",
    postalCode: "741247",
    addressCountry: "IN",
  },
  openingHours: "Mo-Su 10:00-20:00",
  priceRange: "₹₹",
  sameAs: [
    "https://facebook.com/",
    "https://instagram.com/",
  ],
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "R.M OPTICAL | Premium Eye Care",
    template: "%s | R.M OPTICAL",
  },

  description:
    "R.M OPTICAL offers Computerised Eye Testing, Premium Optical Frames, Sunglasses, Contact Lens and Expert Eye Care Services.",

  keywords: [
    "R.M OPTICAL",
    "Optical Shop",
    "Eye Testing",
    "Computerised Eye Testing",
    "Premium Frames",
    "Spectacles",
    "Contact Lens",
    "Sunglasses",
    "Eye Care",
    "Optometrist",
  ],

  authors: [
    {
      name: "R.M OPTICAL",
    },
  ],

  creator: "R.M OPTICAL",

  publisher: "R.M OPTICAL",

  metadataBase: new URL("https://rmoptical.vercel.app"),

  openGraph: {
    title: "R.M OPTICAL | Premium Eye Care",
    description:
      "Premium Optical Store offering Computerised Eye Testing, Branded Frames, Sunglasses and Contact Lens.",
    url: "https://rmoptical.vercel.app",
    siteName: "R.M OPTICAL",
    locale: "en_IN",
    type: "website",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "R.M OPTICAL",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "R.M OPTICAL | Premium Eye Care",
    description:
      "Premium Eye Care, Computerised Eye Testing & Branded Eyewear.",
    images: ["/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />

        <MouseGlow />
        <ScrollProgress />
        {children}

        <FloatingButtons />
      </body>
    </html>
  );
}