import type { Metadata } from "next";
import { GalleryClient } from "@/components/pages/GalleryClient";

export const metadata: Metadata = {
  title: "Cafe Gallery & Moments",
  description: "Explore the visual ambience, single-origin pour-overs, and acoustic nights at Musafir Cafe Baramati."
};

export default function GalleryPage() {
  return <GalleryClient />;
}
