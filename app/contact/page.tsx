import type { Metadata } from "next";
import { ContactClient } from "@/components/pages/ContactClient";

export const metadata: Metadata = {
  title: "Contact & Table Booking",
  description: "Reach out to Musafir Cafe Baramati, book private pods or terrace tables, and view operating hours."
};

export default function ContactPage() {
  return <ContactClient />;
}
