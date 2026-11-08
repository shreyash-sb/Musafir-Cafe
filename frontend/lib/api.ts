/**
 * Musafir Cafe & Roastery — Unified API Client
 *
 * Connects the Next.js Frontend to the dedicated PostgreSQL Express Backend
 * (http://localhost:5000). If the backend server is temporarily unavailable,
 * it seamlessly falls back to the local Next.js route handler.
 */

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export async function submitOrder(orderData: unknown) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fall back to Next.js route handler
  }

  const fallbackRes = await fetch("/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData)
  });
  return fallbackRes.json();
}

export async function submitReservation(reservationData: unknown) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/reservations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reservationData)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fall back to Next.js route handler
  }

  const fallbackRes = await fetch("/api/reservations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reservationData)
  });
  return fallbackRes.json();
}

export async function submitContactMessage(contactData: unknown) {
  try {
    const res = await fetch(`${BACKEND_URL}/api/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData)
    });
    if (res.ok) {
      return await res.json();
    }
  } catch {
    // Fall back to Next.js route handler
  }

  const fallbackRes = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(contactData)
  });
  return fallbackRes.json();
}

