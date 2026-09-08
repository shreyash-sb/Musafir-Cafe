"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag, Tag, Sparkles, CheckCircle2, ArrowRight, Printer, MapPin, Phone, User, Clock, Compass } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/Button";
import { Input, Textarea } from "@/components/Input";
import { useCart, OrderType, PlacedReceipt } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { brand } from "@/data/site";

export function CartClient() {
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
      notify("Please add items to your cart before placing an order");
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
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      estimatedTime: orderType === "dine-in" ? "10-15 mins" : orderType === "takeaway" ? "15-20 mins" : "30-40 mins"
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
    notify("Order placed successfully! Your digital receipt is ready.");
  };

  return (
    <main className="min-h-screen bg-cafe-bg px-6 pb-24 pt-32 dark:bg-[#150B07] transition-colors duration-300">
      <section className="mx-auto max-w-6xl">
        {/* If Order Placed: Show Digital Musafir Receipt Pass */}
        {receipt ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto space-y-6"
          >
            <div className="text-center space-y-2 mb-8">
              <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent/20 text-accent mb-3">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                Order Confirmed
              </span>
              <h1 className="font-heading text-4xl font-bold text-primary dark:text-white">
                Thank You, Musafir!
              </h1>
              <p className="text-xs sm:text-sm text-cafe-muted dark:text-white/70">
                Your order is being handcrafted with love at our Baramati roastery kitchen.
              </p>
            </div>

            {/* Receipt Card */}
            <div className="relative overflow-hidden rounded-3xl border-2 border-dashed border-accent/40 bg-white p-6 md:p-8 shadow-2xl dark:bg-[#1E110A] text-primary dark:text-white">
              <div className="flex items-center justify-between border-b border-primary/10 dark:border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-primary">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div>
                    <strong className="font-heading text-lg font-bold block">{brand.name}</strong>
                    <small className="text-[10px] text-accent uppercase tracking-widest">Digital Bill Slip</small>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-cafe-muted dark:text-white/50 block">Order Ref</span>
                  <strong className="font-mono text-sm font-bold text-accent">{receipt.orderId}</strong>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-b border-primary/10 dark:border-white/10 text-xs">
                <div>
                  <span className="text-cafe-muted dark:text-white/50 block">Guest</span>
                  <strong className="block mt-0.5">{receipt.customerName}</strong>
                </div>
                <div>
                  <span className="text-cafe-muted dark:text-white/50 block">Order Mode</span>
                  <strong className="block mt-0.5 capitalize text-accent">{receipt.orderType}</strong>
                </div>
                <div>
                  <span className="text-cafe-muted dark:text-white/50 block">Estimated Time</span>
                  <strong className="block mt-0.5">{receipt.estimatedTime}</strong>
                </div>
                <div>
                  <span className="text-cafe-muted dark:text-white/50 block">Date</span>
                  <strong className="block mt-0.5">{receipt.date}</strong>
                </div>
              </div>

              {/* Items List */}
              <div className="py-4 space-y-3 border-b border-primary/10 dark:border-white/10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-accent block">
                  Ordered Items
                </span>
                {receipt.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-start text-xs">
                    <div>
                      <strong className="block">{it.name} <span className="text-accent">x{it.quantity}</span></strong>
                      {it.customization && (
                        <span className="text-[11px] text-cafe-muted dark:text-white/60 block mt-0.5">
                          {it.customization}
                        </span>
                      )}
                    </div>
                    <span className="font-bold">₹{it.price * it.quantity}</span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="py-4 space-y-2 text-xs text-cafe-muted dark:text-white/70 border-b border-primary/10 dark:border-white/10">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{receipt.subtotal}</span>
                </div>
                {receipt.discount > 0 && (
                  <div className="flex justify-between text-emerald-500 font-bold">
                    <span>Discount Savings</span>
                    <span>-₹{receipt.discount}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span>{receipt.delivery === 0 ? "FREE" : `₹${receipt.delivery}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST (5%)</span>
                  <span>₹{receipt.tax}</span>
                </div>
                {receipt.tip > 0 && (
                  <div className="flex justify-between text-accent font-semibold">
                    <span>Barista Tip</span>
                    <span>₹{receipt.tip}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-bold text-primary dark:text-accent pt-2 border-t border-primary/10 dark:border-white/10">
                  <span>Total Paid</span>
                  <span>₹{receipt.total}</span>
                </div>
              </div>

              <div className="pt-4 text-center text-[11px] text-cafe-muted dark:text-white/50">
                Show this slip on pickup / delivery. Thank you for journeying with Musafir Cafe!
              </div>
            </div>

            <div className="flex flex-wrap justify-between gap-4 pt-4">
              <Button href="/menu" variant="secondary">
                Order More Items
              </Button>
              <Button onClick={() => window.print()} className="gap-2">
                <Printer className="h-4 w-4" />
                Print / Save Receipt
              </Button>
            </div>
          </motion.div>
        ) : (
          /* Cart & Checkout Grid */
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            {/* Left Column: Items and Mode */}
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-accent">
                  Your Cart
                </span>
                <h1 className="mt-2 font-heading text-4xl sm:text-5xl font-bold text-primary dark:text-white">
                  Order Details ({items.length})
                </h1>
              </div>

              {/* Order Mode Switcher */}
              <div className="flex rounded-2xl border border-primary/10 bg-white p-1.5 dark:border-white/10 dark:bg-[#1E110A]">
                {(["delivery", "takeaway", "dine-in"] as OrderType[]).map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setOrderType(mode)}
                    className={`flex-1 rounded-xl py-2.5 text-xs font-bold capitalize transition duration-300 ${
                      orderType === mode
                        ? "bg-accent text-primary shadow-md"
                        : "text-cafe-muted hover:text-primary dark:text-white/70 dark:hover:text-white"
                    }`}
                  >
                    {mode === "dine-in" ? "Dine-In Service" : mode}
                  </button>
                ))}
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {items.length === 0 ? (
                  <div className="rounded-3xl border border-primary/10 bg-white p-12 text-center shadow-lg dark:border-white/10 dark:bg-[#1E110A]">
                    <ShoppingBag className="h-12 w-12 text-accent mx-auto mb-3 opacity-50" />
                    <h2 className="font-heading text-2xl font-bold text-primary dark:text-white">
                      Your cart is empty
                    </h2>
                    <p className="mt-2 text-xs text-cafe-muted dark:text-white/70 max-w-sm mx-auto">
                      Explore our handcrafted brews, single-origin roasts, and fresh artisan sourdough.
                    </p>
                    <Button href="/menu" className="mt-6">
                      Explore Menu
                    </Button>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.article
                      key={`${item.id}-${item.customization || ""}`}
                      layout
                      className="grid gap-4 rounded-[1.75rem] border border-primary/10 bg-white p-4 shadow-lg shadow-primary/5 dark:border-white/10 dark:bg-[#1E110A] sm:grid-cols-[110px_1fr_auto] items-center"
                    >
                      <div className="relative h-28 w-full overflow-hidden rounded-2xl">
                        <Image src={item.image} alt={item.name} fill sizes="110px" className="object-cover" />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                          {item.category}
                        </span>
                        <h2 className="font-heading text-lg font-bold text-primary dark:text-white">
                          {item.name}
                        </h2>
                        {item.customization && (
                          <p className="text-[11px] text-cafe-muted dark:text-white/60 mt-0.5 line-clamp-1">
                            {item.customization}
                          </p>
                        )}
                        <strong className="mt-2 block text-sm font-bold text-accent">
                          ₹{item.price} each
                        </strong>
                      </div>
                      <div className="flex items-center gap-2 self-center sm:self-auto justify-between sm:justify-end">
                        <button
                          onClick={() => decrease(item.id)}
                          className="grid h-8 w-8 place-items-center rounded-full border border-primary/10 bg-primary/5 text-primary dark:border-white/10 dark:bg-white/10 dark:text-white"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-primary dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increase(item.id)}
                          className="grid h-8 w-8 place-items-center rounded-full bg-primary text-white dark:bg-accent dark:text-primary"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-2 grid h-8 w-8 place-items-center rounded-full bg-red-50 text-red-500 hover:bg-red-100 transition dark:bg-red-900/20 dark:text-red-400"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </motion.article>
                  ))
                )}
              </div>

              {/* Coupon Codes Promo Box */}
              {items.length > 0 && (
                <div className="rounded-2xl border border-dashed border-accent/40 bg-accent/5 p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2.5">
                    <Tag className="h-4 w-4 text-accent shrink-0" />
                    <div>
                      <strong className="text-xs font-bold text-primary dark:text-white block">
                        Available Promos
                      </strong>
                      <span className="text-[11px] text-cafe-muted dark:text-white/60">
                        Use <span className="font-mono font-bold text-accent">MUSAFIR10</span> (10% off) or <span className="font-mono font-bold text-accent">FIRSTBREW</span> (₹50 off)
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Order Summary & Checkout Form */}
            {items.length > 0 && (
              <aside className="h-fit rounded-[2.25rem] border border-primary/10 bg-white p-6 md:p-8 shadow-2xl shadow-primary/10 dark:border-white/10 dark:bg-[#1E110A] space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-accent">Summary</span>
                  <h2 className="font-heading text-2xl font-bold text-primary dark:text-white mt-1">
                    Checkout Details
                  </h2>
                </div>

                {/* Coupon Code Input */}
                {couponCode ? (
                  <div className="flex items-center justify-between rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span className="flex items-center gap-1.5">
                      <Sparkles className="h-4 w-4" /> {couponCode} Applied (-₹{discountAmount})
                    </span>
                    <button onClick={removeCoupon} className="text-red-500 hover:underline">
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2">
                    <input
                      placeholder="Promo Code"
                      value={enteredCoupon}
                      onChange={(e) => setEnteredCoupon(e.target.value)}
                      className="w-full rounded-xl border border-primary/10 bg-primary/5 px-4 py-2.5 text-xs text-primary uppercase outline-none focus:border-accent dark:border-white/10 dark:bg-white/5 dark:text-white"
                    />
                    <Button type="submit" variant="secondary" className="text-xs min-h-10 px-4">
                      Apply
                    </Button>
                  </form>
                )}

                {/* Tip Barista Selector */}
                <div>
                  <label className="text-xs font-bold text-primary dark:text-white block mb-2">
                    Tip Your Barista Team
                  </label>
                  <div className="flex gap-2">
                    {[0, 20, 50, 100].map((tipVal) => (
                      <button
                        type="button"
                        key={tipVal}
                        onClick={() => setBaristaTip(tipVal)}
                        className={`flex-1 rounded-xl py-2 text-xs font-bold transition border ${
                          baristaTip === tipVal
                            ? "border-accent bg-accent text-primary"
                            : "border-primary/10 bg-primary/5 text-primary dark:border-white/10 dark:bg-white/5 dark:text-white"
                        }`}
                      >
                        {tipVal === 0 ? "No Tip" : `₹${tipVal}`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Bill Breakdown */}
                <div className="space-y-2.5 text-xs text-cafe-muted dark:text-white/70 border-t border-primary/10 dark:border-white/10 pt-4">
                  <div className="flex justify-between">
                    <span>Items Subtotal</span>
                    <strong className="text-primary dark:text-white">₹{subtotal}</strong>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-500 font-bold">
                      <span>Promo Discount</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Delivery Charges</span>
                    <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated GST (5%)</span>
                    <span>₹{tax}</span>
                  </div>
                  {baristaTip > 0 && (
                    <div className="flex justify-between text-accent font-semibold">
                      <span>Barista Tip</span>
                      <span>₹{baristaTip}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-primary/10 dark:border-white/10 pt-3 text-lg font-bold text-primary dark:text-white">
                    <span>Total Amount</span>
                    <span className="text-accent font-heading text-2xl">₹{total}</span>
                  </div>
                </div>

                {/* Customer Details Form */}
                <form onSubmit={handlePlaceOrder} className="space-y-3 border-t border-primary/10 dark:border-white/10 pt-4">
                  <Input
                    required
                    placeholder="Full Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-label="Full name"
                  />
                  <Input
                    required
                    type="tel"
                    placeholder="WhatsApp Phone Number *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    aria-label="Phone number"
                  />

                  {orderType === "delivery" && (
                    <Textarea
                      required
                      rows={2}
                      placeholder="Full Delivery Address in Baramati *"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      aria-label="Delivery address"
                    />
                  )}

                  {orderType === "dine-in" && (
                    <Input
                      placeholder="Table Number (e.g. Table 4 / Terrace 2)"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      aria-label="Table number"
                    />
                  )}

                  <Input
                    placeholder="Special Instructions (e.g. Extra hot, no sugar)"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    aria-label="Special instructions"
                  />

                  <Button type="submit" disabled={loading} className="w-full min-h-12 text-sm glow-gold-sm mt-2">
                    {loading ? "Confirming Order..." : `Place Order • ₹${total}`}
                  </Button>
                </form>
              </aside>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
