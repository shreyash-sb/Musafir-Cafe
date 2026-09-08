import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";
import { BackToTop } from "@/components/BackToTop";

export const metadata: Metadata = {
  title: {
    default: "Musafir Cafe | Where Every Sip is a Journey",
    template: "%s | Musafir Cafe"
  },
  description:
    "Musafir Cafe Baramati — A sanctuary for wanderers and coffee connoisseurs. Handcrafted single-origin coffee, zafrani chai, artisan sourdough, table reservations, and acoustic live events.",
  keywords: [
    "Musafir Cafe",
    "Musafir Cafe Baramati",
    "Best cafe in Baramati",
    "Specialty Coffee Baramati",
    "Artisan Bakery",
    "Single Origin Coffee",
    "Pure Vegetarian Cafe",
    "Terrace Garden Cafe",
    "Table Booking Baramati"
  ],
  openGraph: {
    title: "Musafir Cafe | Where Every Sip is a Journey",
    description: "For the wanderers, dreamers, and coffee lovers. Experience the ultimate cafe sanctuary in Baramati.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Musafir Cafe Barista Pouring Coffee"
      }
    ]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <ToastProvider>
            <CartProvider>
              <Navbar />
              {children}
              <Footer />
              <BackToTop />
            </CartProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
