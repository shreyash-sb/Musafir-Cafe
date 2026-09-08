import type { Metadata } from "next";
import { MenuClient } from "@/components/pages/MenuClient";

export const metadata: Metadata = {
  title: "Artisan Menu & Ordering",
  description: "Browse single-origin coffees, zafrani chais, fresh sourdoughs, thali feasts, and artisan bakery at Musafir Cafe Baramati."
};

export default function MenuPage() {
  return <MenuClient />;
}
