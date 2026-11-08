"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState
} from "react";
import { Product } from "@/lib/site";
import { Sparkles, X, CheckCircle2, AlertCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

/* ==========================================================================
   Types
   ========================================================================== */
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
  specialInstructions?: string;
};

type ToastType = "success" | "info" | "warning";
type Toast = { id: number; message: string; type: ToastType };

type AppContextValue = {
  // Theme
  dark: boolean;
  toggleTheme: () => void;

  // Toast
  notify: (message: string, type?: ToastType) => void;

  // Global Table Booking Modal
  isTableModalOpen: boolean;
  tableModalZone?: string;
  openTableModal: (zoneId?: string) => void;
  closeTableModal: () => void;

  // Cart & State
  items: CartItem[];
  wishlist: string[];
  orderType: OrderType;
  tableNumber: string;
  couponCode: string;
  discountAmount: number;
  baristaTip: number;
  lastOrder: PlacedReceipt | null;
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

const AppContext = createContext<AppContextValue | null>(null);

/* ==========================================================================
   Coupons & Reducer
   ========================================================================== */
const VALID_COUPONS: Record<string, { type: "percentage" | "fixed"; value: number; minOrder: number; label: string }> = {
  MUSAFIR10: { type: "percentage", value: 10, minOrder: 200, label: "10% off on orders above ₹200" },
  FIRSTBREW: { type: "fixed", value: 50, minOrder: 150, label: "₹50 flat off on first brew" },
  TRAVELER20: { type: "percentage", value: 20, minOrder: 500, label: "20% wanderer bonus above ₹500" }
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
  | { type: "init"; state: Partial<CartState> }
  | { type: "add"; product: Product; quantity?: number; customization?: string }
  | { type: "remove"; id: string }
  | { type: "increase"; id: string }
  | { type: "decrease"; id: string }
  | { type: "clear" }
  | { type: "wishlist"; id: string }
  | { type: "set_order_type"; orderType: OrderType }
  | { type: "set_table"; table: string }
  | { type: "apply_coupon"; code: string; discount: number }
  | { type: "remove_coupon" }
  | { type: "set_tip"; tip: number }
  | { type: "set_last_order"; order: PlacedReceipt | null };

const initialCartState: CartState = {
  items: [],
  wishlist: [],
  orderType: "dine-in",
  tableNumber: "",
  couponCode: "",
  discountAmount: 0,
  baristaTip: 0,
  lastOrder: null
};

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "init":
      return { ...state, ...action.state };

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

    case "increase": {
      const updated = state.items.map((item) =>
        item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      return { ...state, items: updated };
    }

    case "decrease": {
      const updated = state.items
        .map((item) => (item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0);
      return { ...state, items: updated };
    }

    case "clear":
      return {
        ...state,
        items: [],
        couponCode: "",
        discountAmount: 0,
        baristaTip: 0
      };

    case "wishlist": {
      const exists = state.wishlist.includes(action.id);
      return {
        ...state,
        wishlist: exists ? state.wishlist.filter((id) => id !== action.id) : [...state.wishlist, action.id]
      };
    }

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

/* ==========================================================================
   Provider Component
   ========================================================================== */
export function AppProvider({ children }: { children: React.ReactNode }) {
  // Theme State
  const [dark, setDark] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem("musafir-theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const shouldUseDark = stored ? stored === "dark" : prefersDark;
      setDark(shouldUseDark);
      document.documentElement.classList.toggle("dark", shouldUseDark);
    } catch {
      // ignore SSR/storage errors
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setDark((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      try {
        window.localStorage.setItem("musafir-theme", next ? "dark" : "light");
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  // Toast State
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = useCallback((message: string, type: ToastType = "success") => {
    const id = Date.now() + Math.random();
    setToasts((current) => [...current, { id, message, type }]);
    window.setTimeout(() => {
      setToasts((current) => current.filter((t) => t.id !== id));
    }, 3800);
  }, []);

  // Global Table Booking Modal State
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [tableModalZone, setTableModalZone] = useState<string | undefined>(undefined);

  const openTableModal = useCallback((zoneId?: string) => {
    setTableModalZone(zoneId);
    setIsTableModalOpen(true);
  }, []);

  const closeTableModal = useCallback(() => {
    setIsTableModalOpen(false);
    setTableModalZone(undefined);
  }, []);

  // Cart State
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  // Restore cart & wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem("musafir-cart");
      const savedWishlist = window.localStorage.getItem("musafir-wishlist");
      if (savedCart || savedWishlist) {
        dispatch({
          type: "init",
          state: {
            items: savedCart ? JSON.parse(savedCart) : [],
            wishlist: savedWishlist ? JSON.parse(savedWishlist) : []
          }
        });
      }
    } catch {
      // ignore
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      window.localStorage.setItem("musafir-cart", JSON.stringify(cartState.items));
      window.localStorage.setItem("musafir-wishlist", JSON.stringify(cartState.wishlist));
    } catch {
      // ignore
    }
  }, [cartState.items, cartState.wishlist]);

  // Derived financial calculations
  const subtotal = useMemo(
    () => cartState.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartState.items]
  );

  const delivery = useMemo(
    () => (cartState.orderType === "delivery" && subtotal > 0 ? (subtotal >= 400 ? 0 : 40) : 0),
    [cartState.orderType, subtotal]
  );

  const tax = useMemo(() => Math.round(subtotal * 0.05), [subtotal]);

  const total = useMemo(
    () => Math.max(0, subtotal - cartState.discountAmount + delivery + tax + cartState.baristaTip),
    [subtotal, cartState.discountAmount, delivery, tax, cartState.baristaTip]
  );

  // Cart Actions
  const addToCart = useCallback((product: Product, quantity = 1, customization?: string) => {
    dispatch({ type: "add", product, quantity, customization });
    notify(`Added ${product.name} to order`);
  }, [notify]);

  const removeFromCart = useCallback((id: string) => {
    dispatch({ type: "remove", id });
  }, []);

  const increase = useCallback((id: string) => {
    dispatch({ type: "increase", id });
  }, []);

  const decrease = useCallback((id: string) => {
    dispatch({ type: "decrease", id });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "clear" });
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    dispatch({ type: "wishlist", id });
  }, []);

  const setOrderType = useCallback((orderType: OrderType) => {
    dispatch({ type: "set_order_type", orderType });
  }, []);

  const setTableNumber = useCallback((table: string) => {
    dispatch({ type: "set_table", table });
  }, []);

  const applyCoupon = useCallback(
    (code: string) => {
      const clean = code.trim().toUpperCase();
      const rule = VALID_COUPONS[clean];
      if (!rule) {
        notify("Invalid promo code. Try MUSAFIR10 or FIRSTBREW", "warning");
        return false;
      }
      if (subtotal < rule.minOrder) {
        notify(`Minimum order ₹${rule.minOrder} required for ${clean}`, "warning");
        return false;
      }
      const discount =
        rule.type === "percentage" ? Math.round((subtotal * rule.value) / 100) : rule.value;
      dispatch({ type: "apply_coupon", code: clean, discount });
      notify(`Promo code ${clean} applied! (Saved ₹${discount})`);
      return true;
    },
    [subtotal, notify]
  );

  const removeCoupon = useCallback(() => {
    dispatch({ type: "remove_coupon" });
    notify("Coupon removed", "info");
  }, [notify]);

  const setBaristaTip = useCallback((tip: number) => {
    dispatch({ type: "set_tip", tip });
  }, []);

  const setLastOrder = useCallback((order: PlacedReceipt | null) => {
    dispatch({ type: "set_last_order", order });
  }, []);

  const value = useMemo(
    () => ({
      dark,
      toggleTheme,
      notify,
      isTableModalOpen,
      tableModalZone,
      openTableModal,
      closeTableModal,
      ...cartState,
      subtotal,
      delivery,
      tax,
      total,
      addToCart,
      removeFromCart,
      increase,
      decrease,
      clearCart,
      toggleWishlist,
      setOrderType,
      setTableNumber,
      applyCoupon,
      removeCoupon,
      setBaristaTip,
      setLastOrder
    }),
    [
      dark,
      toggleTheme,
      notify,
      isTableModalOpen,
      tableModalZone,
      openTableModal,
      closeTableModal,
      cartState,
      subtotal,
      delivery,
      tax,
      total,
      addToCart,
      removeFromCart,
      increase,
      decrease,
      clearCart,
      toggleWishlist,
      setOrderType,
      setTableNumber,
      applyCoupon,
      removeCoupon,
      setBaristaTip,
      setLastOrder
    ]
  );

  return (
    <AppContext.Provider value={value}>
      {children}

      {/* Floating Top-Right Toast Notifications */}
      <div className="fixed top-24 right-4 sm:right-6 z-[100] flex flex-col gap-2.5 pointer-events-none max-w-sm w-full">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, y: -10, transition: { duration: 0.18 } }}
              className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-[#C47D3B]/25 bg-white/95 px-4 py-3.5 text-xs sm:text-sm font-semibold text-[#231711] shadow-xl shadow-black/10 backdrop-blur-xl dark:border-[#C47D3B]/30 dark:bg-[#1E1410]/95 dark:text-white"
              role="status"
            >
              <div
                className={`grid h-7 w-7 place-items-center rounded-full shrink-0 ${
                  toast.type === "warning"
                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                    : toast.type === "info"
                    ? "bg-blue-500/15 text-blue-600 dark:text-blue-400"
                    : "bg-[#C47D3B]/15 text-[#C47D3B]"
                }`}
              >
                {toast.type === "warning" ? (
                  <AlertCircle className="h-4 w-4" />
                ) : toast.type === "info" ? (
                  <Sparkles className="h-4 w-4" />
                ) : (
                  <CheckCircle2 className="h-4 w-4" />
                )}
              </div>
              <span className="flex-1 leading-snug">{toast.message}</span>
              <button
                aria-label="Dismiss notification"
                className="text-[#6B5B52] hover:text-[#C47D3B] transition p-1 cursor-pointer"
                onClick={() => setToasts((current) => current.filter((item) => item.id !== toast.id))}
              >
                <X className="h-4 w-4" />
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </AppContext.Provider>
  );
}

/* ==========================================================================
   Convenience Hooks
   ========================================================================== */
export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
}

export function useCart() {
  return useApp();
}

export function useToast() {
  const { notify } = useApp();
  return { notify };
}

export function useTheme() {
  const { dark, toggleTheme } = useApp();
  return { dark, toggleTheme };
}
