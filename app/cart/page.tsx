"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, Tag, CheckCircle2, ArrowRight, Printer, MapPin } from "lucide-react";
import { useCart, OrderType, PlacedReceipt } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { brand } from "@/data/site";

export default function CartPage() {
  const {
    items,
    subtotal,
    delivery,
    tax,
    total,
    discountAmount,
    couponCode,
    orderType,
    tableNumber,
    baristaTip,
    increase,
    decrease,
    removeFromCart,
    clearCart,
    setOrderType,
    setTableNumber,
    applyCoupon,
    removeCoupon,
    setBaristaTip
  } = useCart();

  const [enteredCoupon, setEnteredCoupon] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [specialInstructions, setSpecialInstructions] = useState("");
  const [loading, setLoading] = useState(false);
  const [receipt, setReceipt] = useState<PlacedReceipt | null>(null);

  const { notify } = useToast();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!enteredCoupon) return;
    const success = applyCoupon(enteredCoupon);
    if (success) setEnteredCoupon("");
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!items.length) {
      notify("Your cart is empty");
      return;
    }
    if (!name || !phone) {
      notify("Please provide your name and phone number");
      return;
    }
    if (orderType === "delivery" && !address) {
      notify("Please provide your delivery address in Baramati");
      return;
    }

    setLoading(true);

    const receiptData: PlacedReceipt = {
      orderId: `MSF-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      items: [...items],
      subtotal,
      discount: discountAmount,
      delivery,
      tax,
      tip: baristaTip,
      total,
      orderType,
      tableNumber: orderType === "dine-in" ? tableNumber || "Counter" : undefined,
      customerName: name,
      customerPhone: phone,
      address: orderType === "delivery" ? address : undefined,
      date: new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      }),
      estimatedTime:
        orderType === "dine-in"
          ? "10 - 15 mins"
          : orderType === "takeaway"
          ? "15 - 20 mins"
          : "30 - 40 mins"
    };

    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...receiptData, specialInstructions })
      });
    } catch {
      // offline fallback
    }

    setLoading(false);
    setReceipt(receiptData);
    clearCart();
    notify("Order placed successfully! Your receipt is ready.");
  };

  // 1. Digital Receipt View
  if (receipt) {
    return (
      <main className="min-h-screen bg-[#FAF7F2] px-6 pb-24 pt-28 dark:bg-[#160F0C]">
        <div className="mx-auto max-w-xl classic-card rounded-3xl p-6 sm:p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#284435]/10 text-[#284435] dark:text-emerald-400">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C47D3B]">
              Order Confirmed
            </span>
            <h1 className="font-heading text-2xl font-bold text-[#231711] dark:text-white">
              Thank You, {receipt.customerName}!
            </h1>
            <p className="text-xs text-[#6B5B52] dark:text-[#B8ABA0]">
              Your order is being handcrafted with love at Musafir Cafe.
            </p>
          </div>

          {/* Receipt Details Box */}
          <div className="rounded-2xl border border-[#231711]/10 bg-white/70 p-5 dark:bg-[#1E1410] dark:border-white/10 space-y-3">
            <div className="flex items-center justify-between border-b border-[#231711]/5 pb-3 dark:border-white/10 text-xs">
              <div>
                <span className="text-[10px] text-[#6B5B52] dark:text-[#B8ABA0] block">Order ID</span>
                <strong className="font-mono text-[#C47D3B]">{receipt.orderId}</strong>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-[#6B5B52] dark:text-[#B8ABA0] block">Estimated Time</span>
                <strong className="text-[#231711] dark:text-white">{receipt.estimatedTime}</strong>
              </div>
            </div>

            <div className="space-y-2 py-1">
              {receipt.items.map((item) => (
                <div key={item.id} className="flex justify-between text-xs">
                  <span>
                    {item.quantity}x {item.name}
                  </span>
                  <span className="font-bold">₹{item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-[#231711]/5 pt-2 dark:border-white/10 space-y-1 text-xs text-[#6B5B52] dark:text-[#B8ABA0]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{receipt.subtotal}</span>
              </div>
              {receipt.discount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Discount</span>
                  <span>-₹{receipt.discount}</span>
                </div>
              )}
              {receipt.delivery > 0 && (
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span>₹{receipt.delivery}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>GST (5%)</span>
                <span>₹{receipt.tax}</span>
              </div>
              <div className="flex justify-between border-t border-[#231711]/10 pt-2 text-sm font-bold text-[#231711] dark:text-white">
                <span>Total Paid</span>
                <span>₹{receipt.total}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => window.print()}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-full border border-[#231711]/10 bg-white py-2.5 text-xs font-semibold text-[#231711] hover:bg-[#231711]/5 dark:bg-white/5 dark:text-white"
            >
              <Printer className="h-3.5 w-3.5" />
              Print Receipt
            </button>
            <Link
              href="/menu"
              onClick={() => setReceipt(null)}
              className="flex-1 flex items-center justify-center gap-1.5 rounded-full bg-[#C47D3B] py-2.5 text-xs font-bold text-white hover:bg-[#B36E2E]"
            >
              Back to Menu
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // 2. Empty Cart View
  if (!items.length) {
    return (
      <main className="min-h-screen bg-[#FAF7F2] px-6 pb-24 pt-32 dark:bg-[#160F0C] text-center">
        <div className="mx-auto max-w-md classic-card rounded-3xl p-8 space-y-4">
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#C47D3B]/10 text-[#C47D3B]">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-[#231711] dark:text-white">
            Your Cart is Empty
          </h1>
          <p className="text-xs text-[#6B5B52] dark:text-[#B8ABA0]">
            Explore our single-origin coffees, zafrani chais, and fresh artisan sourdough bakery to start your order.
          </p>
          <div className="pt-2">
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 rounded-full bg-[#C47D3B] px-6 py-2.5 text-xs font-bold text-white shadow hover:bg-[#B36E2E] transition"
            >
              Explore Menu <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // 3. Active Cart Checkout View
  return (
    <main className="min-h-screen bg-[#FAF7F2] px-6 pb-24 pt-28 dark:bg-[#160F0C] transition-colors duration-200">
      <div className="mx-auto max-w-5xl">
        <div className="border-b border-[#231711]/10 pb-5 dark:border-white/10 mb-8">
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C47D3B] block">
            Express Cafe Ordering
          </span>
          <h1 className="mt-1 font-heading text-3xl font-bold text-[#231711] dark:text-white">
            Your Order Basket ({items.length})
          </h1>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          {/* Left Column: Cart Items & Order Type */}
          <div className="space-y-6">
            {/* Order Type Toggle */}
            <div className="classic-card rounded-2xl p-4">
              <span className="text-xs font-bold text-[#231711] dark:text-white block mb-2.5">
                How would you like to receive your order?
              </span>
              <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
                {(["dine-in", "takeaway", "delivery"] as OrderType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setOrderType(type)}
                    className={`py-2 px-3 rounded-xl capitalize transition border ${
                      orderType === type
                        ? "border-[#C47D3B] bg-[#C47D3B] text-white font-bold"
                        : "border-[#231711]/10 bg-white/60 text-[#6B5B52] dark:bg-white/5 dark:text-[#B8ABA0]"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>

              {orderType === "dine-in" && (
                <div className="mt-3.5 pt-3 border-t border-[#231711]/5 dark:border-white/10">
                  <label className="text-xs font-semibold text-[#231711] dark:text-white block mb-1">
                    Table Number (Optional)
                  </label>
                  <input
                    placeholder="e.g. Table 4 / Terrace 2"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    className="w-full rounded-xl border border-[#231711]/10 bg-white px-3 py-2 text-xs outline-none focus:border-[#C47D3B] dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>
              )}
            </div>

            {/* Items List */}
            <div className="classic-card rounded-2xl p-4 sm:p-5 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 border-b border-[#231711]/5 pb-3.5 last:border-0 last:pb-0 dark:border-white/5"
                >
                  <div className="relative h-14 w-14 rounded-xl overflow-hidden bg-[#EFE9E1] shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-sm font-bold text-[#231711] dark:text-white truncate">
                      {item.name}
                    </h3>
                    <span className="text-xs font-bold text-[#C47D3B]">₹{item.price}</span>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => decrease(item.id)}
                      className="grid h-7 w-7 place-items-center rounded-lg border border-[#231711]/10 bg-white text-[#231711] hover:bg-[#231711]/5 dark:bg-white/5 dark:text-white"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold">{item.quantity}</span>
                    <button
                      onClick={() => increase(item.id)}
                      className="grid h-7 w-7 place-items-center rounded-lg border border-[#231711]/10 bg-white text-[#231711] hover:bg-[#231711]/5 dark:bg-white/5 dark:text-white"
                      aria-label="Increase quantity"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="grid h-7 w-7 place-items-center rounded-lg text-[#C86041] hover:bg-[#C86041]/10 ml-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="classic-card rounded-2xl p-4 flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#6B5B52]" />
                <input
                  value={enteredCoupon}
                  onChange={(e) => setEnteredCoupon(e.target.value.toUpperCase())}
                  placeholder="Coupon (e.g. MUSAFIR10)"
                  className="w-full rounded-xl border border-[#231711]/10 bg-white pl-9 pr-3 py-2 text-xs outline-none focus:border-[#C47D3B] uppercase font-mono dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="rounded-xl bg-[#231711] px-4 py-2 text-xs font-bold text-white hover:bg-[#3A251C] transition dark:bg-white dark:text-[#231711]"
              >
                Apply
              </button>
            </form>

            {couponCode && (
              <div className="flex items-center justify-between rounded-xl bg-emerald-50 px-4 py-2 text-xs text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                <span>Coupon &ldquo;{couponCode}&rdquo; Applied (-₹{discountAmount})</span>
                <button onClick={removeCoupon} className="font-bold underline hover:no-underline">
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Right Column: Customer Info & Order Summary */}
          <div className="space-y-6">
            <form onSubmit={handlePlaceOrder} className="classic-card rounded-2xl p-5 space-y-4">
              <h2 className="font-heading text-lg font-bold text-[#231711] dark:text-white">
                Guest Information
              </h2>

              <div>
                <label className="text-xs font-semibold text-[#231711] dark:text-white block mb-1">Your Full Name</label>
                <input
                  required
                  placeholder="e.g. Aarti Deshmukh"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-[#231711]/10 bg-white px-3 py-2 text-xs outline-none focus:border-[#C47D3B] dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#231711] dark:text-white block mb-1">WhatsApp Phone Number</label>
                <input
                  required
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-[#231711]/10 bg-white px-3 py-2 text-xs outline-none focus:border-[#C47D3B] dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>

              {orderType === "delivery" && (
                <div>
                  <label className="text-xs font-semibold text-[#231711] dark:text-white block mb-1">Delivery Address (Baramati)</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="House/Flat No, Landmark, Area in Baramati"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-xl border border-[#231711]/10 bg-white p-3 text-xs outline-none focus:border-[#C47D3B] dark:border-white/10 dark:bg-white/5 dark:text-white"
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-[#231711] dark:text-white block mb-1">Preparation Note (Optional)</label>
                <input
                  placeholder="e.g. Oat milk / Extra hot / Less sugar"
                  value={specialInstructions}
                  onChange={(e) => setSpecialInstructions(e.target.value)}
                  className="w-full rounded-xl border border-[#231711]/10 bg-white px-3 py-2 text-xs outline-none focus:border-[#C47D3B] dark:border-white/10 dark:bg-white/5 dark:text-white"
                />
              </div>

              {/* Order Summary breakdown */}
              <div className="border-t border-[#231711]/5 pt-3 dark:border-white/5 space-y-1.5 text-xs text-[#6B5B52] dark:text-[#B8ABA0]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Coupon Discount</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                {delivery > 0 && (
                  <div className="flex justify-between">
                    <span>Baramati Express Delivery</span>
                    <span>₹{delivery}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span>₹{tax}</span>
                </div>
                <div className="flex justify-between border-t border-[#231711]/10 pt-2 text-base font-bold text-[#231711] dark:text-white">
                  <span>Grand Total</span>
                  <span className="text-[#C47D3B]">₹{total}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-[#C47D3B] py-3 text-xs font-bold text-white shadow-md hover:bg-[#B36E2E] transition disabled:opacity-50"
              >
                {loading ? "Placing Order..." : `Place Order (₹${total})`}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
