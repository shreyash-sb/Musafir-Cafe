# Musafir Cafe & Roastery ☕

> *"For the Wanderers, Dreamers & Coffee Lovers — Where Every Sip is a Journey."*

A full-stack, production-grade web application for **Musafir Cafe & Roastery** in Baramati, Maharashtra, cleanly decoupled into **Frontend** (Next.js 15 App Router, Tailwind CSS v4) and **Backend** (Node.js/Express, PostgreSQL).

---

## 📁 Clean Monorepo Architecture

```text
musafir-cafe/
├── backend/                             # Dedicated Node.js & PostgreSQL REST API
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                    # PostgreSQL connection pool with in-memory fallback
│   │   ├── db/
│   │   │   ├── schema.sql               # PostgreSQL tables (orders, reservations, messages, products)
│   │   │   ├── seed.sql                 # Musafir signature menu and seed data
│   │   │   └── initDb.js                # One-command migration script (npm run db:init)
│   │   ├── routes/
│   │   │   ├── orders.js                # Order placement & WhatsApp concierge dispatch
│   │   │   ├── reservations.js          # Table bookings & digital reservation passes
│   │   │   ├── contact.js               # Inquiries & guest feedback
│   │   │   └── products.js              # Database-driven menu catalog
│   │   └── server.js                    # Express app (CORS, JSON parser, health check)
│   ├── .env.example                     # Database credentials template
│   ├── .env                             # Active environment configuration
│   └── package.json                     # Express, pg, cors, dotenv
│
├── frontend/                            # Next.js 15 App Router Web Platform
│   ├── app/
│   │   ├── about/page.tsx               # Founding story & ethical sourcing
│   │   ├── api/[action]/route.ts        # Built-in fallback API route handler
│   │   ├── cart/page.tsx                # Checkout, coupon chips & WhatsApp order dispatch
│   │   ├── contact/page.tsx             # Location map, hours, FAQs & contact form
│   │   ├── events/page.tsx              # Acoustic sessions, workshops & RSVP
│   │   ├── gallery/page.tsx             # Cafe ambiance gallery with interactive lightbox
│   │   ├── menu/page.tsx                # Artisan menu + The Musafir Brew Lab
│   │   ├── stories/page.tsx             # Musafir Journal essays & reader modal
│   │   ├── globals.css                  # Design tokens & dark mode utilities
│   │   ├── layout.tsx                   # SEO OpenGraph, AppProvider & navigation
│   │   ├── loading.tsx                  # Ambient barista loader
│   │   ├── not-found.tsx                # 404 Lost Wanderer handler
│   │   ├── sitemap.ts                   # Next.js auto-generated sitemap.xml
│   │   └── page.tsx                     # Dynamic homepage
│   ├── components/
│   │   ├── ui.tsx                       # Consolidated UI primitives (Modal, Button, Badge,
│   │   │                                # ProductCard, QuickViewModal, TableBookingModal)
│   │   ├── Navbar.tsx                   # Sticky glass header & mobile drawer
│   │   └── Footer.tsx                   # Operating hours, map links & Wanderers Club
│   ├── context/
│   │   └── AppContext.tsx               # Single provider (Cart, Toast, Theme, Wishlist, Table Modal)
│   ├── lib/
│   │   ├── site.ts                      # Menu catalog, brand config & zones
│   │   └── api.ts                       # Unified API client (auto-switches to backend or fallback)
│   ├── public/
│   │   ├── icon.svg                     # Branded coffee compass emblem
│   │   ├── robots.txt                   # Crawler policies
│   │   └── site.webmanifest             # PWA manifest
│   ├── eslint.config.mjs                # ESLint configuration
│   ├── next.config.ts                   # Security headers, compression & image domains
│   ├── package.json                     # Next.js 15, React 19, Tailwind CSS v4, Lucide
│   ├── postcss.config.mjs
│   └── tsconfig.json                    # Path aliases configured for frontend
│
├── package.json                         # Root orchestration scripts
└── tsconfig.json                        # Root TypeScript configuration (0 VS Code errors)
```

---

## 🛠️ Quick Start

### 1. Run Both Frontend & Backend

From the project root:

```bash
# Start frontend on port 4500
npm run dev:frontend

# Start backend on port 5000 (in a second terminal)
npm run dev:backend
```

- **Frontend Application**: `http://localhost:4500`
- **Backend API**: `http://localhost:5000`
- **API Health Check**: `http://localhost:5000/api/health`

---

## 🐘 PostgreSQL Connection Guide (Step-by-Step)

The backend is built with native PostgreSQL support via `pg.Pool`. It automatically connects to your database or operates in a resilient in-memory fallback mode so development never gets blocked.

Follow either **Option A (Cloud PostgreSQL - Recommended, Free in 2 mins)** or **Option B (Local PostgreSQL)**.

### Option A: Cloud PostgreSQL (Neon / Supabase / Render) — *Fastest*

1. **Create a Free Database**:
   - Go to [Neon.tech](https://neon.tech) or [Supabase.com](https://supabase.com).
   - Click **Create Project** (select region closest to you, e.g. Singapore or Mumbai).
   - Copy your **Connection URI** (starts with `postgresql://...`).

2. **Paste URI into `backend/.env`**:
   Open [`backend/.env`](file:///d:/4-MY%20PROJECTS/3-Musafir-Cafe/backend/.env) and update:
   ```env
   DATABASE_URL=postgresql://user:password@ep-sample-12345.ap-southeast-1.neon.tech/musafir_cafe?sslmode=require
   DATABASE_SSL=true
   ```

3. **Initialize Tables & Seed Data**:
   Run the one-command migration:
   ```bash
   cd backend
   npm run db:init
   ```
   *This automatically creates `products`, `orders`, `reservations`, and `messages` tables with indexes and seeds the Musafir signature menu!*

---

### Option B: Local PostgreSQL (pgAdmin / psql)

1. **Verify PostgreSQL is Installed & Running**:
   Open PowerShell or Terminal:
   ```bash
   psql -U postgres
   ```

2. **Create the Database**:
   ```sql
   CREATE DATABASE musafir_cafe;
   ```

3. **Configure `backend/.env`**:
   Open [`backend/.env`](file:///d:/4-MY%20PROJECTS/3-Musafir-Cafe/backend/.env):
   ```env
   PORT=5000
   DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/musafir_cafe
   DATABASE_SSL=false
   ```
   *(Replace `YOUR_PASSWORD` with your local Postgres password).*

4. **Initialize Tables & Seed Data**:
   ```bash
   cd backend
   npm run db:init
   ```

5. **Start the Backend**:
   ```bash
   npm run dev
   ```
   You will see:
   ```text
   ✅ [PostgreSQL] Connected successfully to database!
   🚀 Port: http://localhost:5000
   ```

---

## 🔍 Fixing the VS Code "Problems" (Why they appeared)

If you saw errors in your VS Code problems panel (like `TableBookingModal.tsx`, `Navbar.tsx`, etc.):

1. **Stale Closed Files**: When older duplicate files (like `TableBookingModal.tsx`) were deleted or consolidated, VS Code keeps old editor tabs cached in memory until closed.
   - **Fix**: In VS Code, press `Ctrl + K, W` (or **File > Close All Editors**).
2. **TypeScript Server Cache**:
   - **Fix**: In VS Code, open the Command Palette (`Ctrl + Shift + P`) and type:
     ```
     TypeScript: Restart TS Server
     ```
3. **Paths Configured**: Root [`tsconfig.json`](file:///d:/4-MY%20PROJECTS/3-Musafir-Cafe/tsconfig.json) and [`frontend/tsconfig.json`](file:///d:/4-MY%20PROJECTS/3-Musafir-Cafe/frontend/tsconfig.json) now have paths mapped to `@/*` so every import resolves with **0 errors**.

---

## 🚀 Building for Production

```bash
# Lint frontend
npm run lint

# Build frontend production bundle
npm run build

# Start frontend in production mode
npm start
```
