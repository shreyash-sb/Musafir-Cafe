import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { AppProvider } from "@/context/AppContext";
import { BackToTop, TableBookingModal } from "@/components/ui";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAF7F2" },
    { media: "(prefers-color-scheme: dark)", color: "#160F0C" }
  ],
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL("https://musafircafe.com"),
  title: {
    default: "Musafir Cafe & Roastery | Where Every Sip is a Journey",
    template: "%s | Musafir Cafe Baramati"
  },
  description:
    "Musafir Cafe Baramati — A sanctuary for wanderers and coffee connoisseurs. Handcrafted single-origin coffee, zafrani chai, artisan sourdough, table reservations, and live acoustic culture.",
  keywords: [
    "Musafir Cafe",
    "Musafir Cafe Baramati",
    "Best cafe in Baramati",
    "Specialty Coffee Baramati",
    "Artisan Bakery Baramati",
    "Single Origin Coffee",
    "Pure Vegetarian Cafe",
    "Terrace Garden Cafe",
    "Table Booking Baramati"
  ],
  authors: [{ name: "Musafir Cafe Team" }],
  creator: "Musafir Cafe & Roastery",
  manifest: "/site.webmanifest",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg"
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://musafircafe.com",
    siteName: "Musafir Cafe & Roastery",
    title: "Musafir Cafe | Where Every Sip is a Journey",
    description: "For the wanderers, dreamers, and coffee lovers. Experience the ultimate specialty cafe sanctuary in Baramati.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Musafir Cafe Barista Pouring Reserve Coffee"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Musafir Cafe & Roastery",
    description: "Handcrafted coffee, slow zafrani chai, artisan bakery, and soulful hospitality in Baramati.",
    images: ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80"]
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col justify-between">
        <AppProvider>
          <Navbar />
          <div className="flex-1">{children}</div>
          <Footer />
          <BackToTop />
          <TableBookingModal />
        </AppProvider>
      </body>
    </html>
  );
}
