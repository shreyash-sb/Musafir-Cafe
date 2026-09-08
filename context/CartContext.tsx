"use client";

import { createContext, useContext, useEffect, useMemo, useReducer, useState } from "react";
import { Product } from "@/data/products";
import { useToast } from "@/context/ToastContext";

export type CartItem = Product & {
  quantity: number;
  customization?: string;
};

export type OrderType = "delivery" | "takeaway" | "dine-in";

export type PlacedReceipt = {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  delivery: number;
  tax: number;
  tip: number;
  total: number;
  orderType: OrderType;
  tableNumber?: string;
  customerName: string;
  customerPhone: string;
  address?: string;
  date: string;
  estimatedTime: string;
};

type CartState = {
  items: CartItem[];
  wishlist: string[];
  orderType: OrderType;
  tableNumber: string;
  couponCode: string;
  discountAmount: number;
  baristaTip: number;
  lastOrder: PlacedReceipt | null;
};

type CartAction =
  | { type: "add"; product: Product; quantity?: number; customization?: string }
  | { type: "remove"; id: string }
  | { type: "increase"; id: string }
  | { type: "decrease"; id: string }
  | { type: "clear" }
  | { type: "wishlist"; id: string }
  | { type: "set_wishlist"; list: string[] }
  | { type: "set_order_type"; orderType: OrderType }
  | { type: "set_table"; table: string }
  | { type: "apply_coupon"; code: string; discount: number }
  | { type: "remove_coupon" }
  | { type: "set_tip"; tip: number }
  | { type: "set_last_order"; order: PlacedReceipt | null };

type CartContextValue = CartState & {
  subtotal: number;
  delivery: number;
  tax: number;
  total: number;
  addToCart: (product: Product, quantity?: number, customization?: string) => void;
  removeFromCart: (id: string) => void;
  increase: (id: string) => void;
  decrease: (id: string) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  setOrderType: (type: OrderType) => void;
  setTableNumber: (table: string) => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  setBaristaTip: (tip: number) => void;
  setLastOrder: (order: PlacedReceipt | null) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const VALID_COUPONS: Record<string, { type: "percentage" | "fixed"; value: number; minOrder: number; label: string }> = {
  MUSAFIR10: { type: "percentage", value: 10, minOrder: 200, label: "10% off on orders above ₹200" },
  FIRSTBREW: { type: "fixed", value: 50, minOrder: 150, label: "₹50 flat off on first brew" },
  TRAVELER20: { type: "percentage", value: 20, minOrder: 500, label: "20% wanderer bonus above ₹500" }
};

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "add": {
      const matchIndex = state.items.findIndex(
        (item) => item.id === action.product.id && item.customization === action.customization
      );
      const qty = action.quantity || 1;
      if (matchIndex > -1) {
        const updated = [...state.items];
        updated[matchIndex] = {
          ...updated[matchIndex],
          quantity: updated[matchIndex].quantity + qty
        };
        return { ...state, items: updated };
      }
      return {
        ...state,
        items: [...state.items, { ...action.product, quantity: qty, customization: action.customization }]
      };
    }
    case "remove":
      return { ...state, items: state.items.filter((item) => item.id !== action.id) };
    case "increase":
      return {
        ...state,
        items: state.items.map((item) => (item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item))
      };
    case "decrease":
      return {
        ...state,
        items: state.items
          .map((item) => (item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item))
          .filter((item) => item.quantity > 0)
      };
    case "clear":
      return { ...state, items: [], couponCode: "", discountAmount: 0 };
    case "wishlist": {
      const isPresent = state.wishlist.includes(action.id);
      const nextList = isPresent ? state.wishlist.filter((id) => id !== action.id) : [...state.wishlist, action.id];
      if (typeof window !== "undefined") {
        localStorage.setItem("musafir_wishlist", JSON.stringify(nextList));
      }
      return { ...state, wishlist: nextList };
    }
    case "set_wishlist":
      return { ...state, wishlist: action.list };
    case "set_order_type":
      return { ...state, orderType: action.orderType };
    case "set_table":
      return { ...state, tableNumber: action.table };
    case "apply_coupon":
      return { ...state, couponCode: action.code, discountAmount: action.discount };
    case "remove_coupon":
      return { ...state, couponCode: "", discountAmount: 0 };
    case "set_tip":
      return { ...state, baristaTip: action.tip };
    case "set_last_order":
      return { ...state, lastOrder: action.order };
    default:
      return state;
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, {
    items: [],
    wishlist: [],
    orderType: "delivery",
    tableNumber: "",
    couponCode: "",
    discountAmount: 0,
    baristaTip: 0,
    lastOrder: null
  });

  const { notify } = useToast();

  useEffect(() => {
    try {
      const saved = localStorage.getItem("musafir_wishlist");
      if (saved) {
        dispatch({ type: "set_wishlist", list: JSON.parse(saved) });
      }
    } catch {
      // ignore
    }
  }, []);

  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = state.orderType === "delivery" && subtotal > 0 ? (subtotal > 499 ? 0 : 40) : 0;
  const discount = Math.min(state.discountAmount, subtotal);
  const taxable = Math.max(0, subtotal - discount);
  const tax = Math.round(taxable * 0.05); // 5% GST
  const total = taxable + delivery + tax + state.baristaTip;

  const value = useMemo<CartContextValue>(
    () => ({
      ...state,
      subtotal,
      delivery,
      tax,
      total,
      addToCart: (product, quantity, customization) => {
        dispatch({ type: "add", product, quantity, customization });
        notify(`${product.name} added to cart`);
      },
      removeFromCart: (id) => {
        dispatch({ type: "remove", id });
        notify("Item removed from cart");
      },
      increase: (id) => dispatch({ type: "increase", id }),
      decrease: (id) => dispatch({ type: "decrease", id }),
      clearCart: () => dispatch({ type: "clear" }),
      toggleWishlist: (id) => {
        const isPresent = state.wishlist.includes(id);
        dispatch({ type: "wishlist", id });
        notify(isPresent ? "Removed from favorites" : "Added to favorites");
      },
      setOrderType: (orderType) => dispatch({ type: "set_order_type", orderType }),
      setTableNumber: (table) => dispatch({ type: "set_table", table }),
      applyCoupon: (rawCode) => {
        const code = rawCode.trim().toUpperCase();
        const promo = VALID_COUPONS[code];
        if (!promo) {
          notify("Invalid coupon code");
          return false;
        }
        if (subtotal < promo.minOrder) {
          notify(`Minimum order value of ₹${promo.minOrder} required for ${code}`);
          return false;
        }
        let calculated = 0;
        if (promo.type === "percentage") {
          calculated = Math.round((subtotal * promo.value) / 100);
        } else {
          calculated = promo.value;
        }
        dispatch({ type: "apply_coupon", code, discount: calculated });
        notify(`Coupon ${code} applied! You saved ₹${calculated}`);
        return true;
      },
      removeCoupon: () => {
        dispatch({ type: "remove_coupon" });
        notify("Coupon removed");
      },
      setBaristaTip: (tip) => dispatch({ type: "set_tip", tip }),
      setLastOrder: (order) => dispatch({ type: "set_last_order", order })
    }),
    [state, subtotal, delivery, tax, total, notify]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
