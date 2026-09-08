import type { Metadata } from "next";
import { CartClient } from "@/components/pages/CartClient";

export const metadata: Metadata = {
  title: "Your Order & Checkout",
  description: "Review your cafe cart, apply discount promo coupons, choose dine-in/takeaway/delivery, and get a digital bill slip."
};

export default function CartPage() {
  return <CartClient />;
}
