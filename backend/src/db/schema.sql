-- ==============================================================================
-- Musafir Cafe & Roastery — PostgreSQL Database Schema
-- ==============================================================================

-- 1. Products Catalog Table
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  category VARCHAR(64) NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL,
  rating NUMERIC(3, 2) DEFAULT 5.0,
  image TEXT,
  featured BOOLEAN DEFAULT false,
  dietary JSONB DEFAULT '[]'::jsonb,
  flavor_notes JSONB DEFAULT '[]'::jsonb,
  prep_time VARCHAR(32),
  calories VARCHAR(32),
  origin VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);

-- 2. Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(64) PRIMARY KEY,
  customer_name VARCHAR(120) NOT NULL,
  customer_phone VARCHAR(32) NOT NULL,
  order_type VARCHAR(32) NOT NULL,
  table_number VARCHAR(32),
  address TEXT,
  subtotal NUMERIC(10, 2) NOT NULL,
  discount NUMERIC(10, 2) DEFAULT 0,
  delivery_fee NUMERIC(10, 2) DEFAULT 0,
  tax NUMERIC(10, 2) DEFAULT 0,
  tip NUMERIC(10, 2) DEFAULT 0,
  total NUMERIC(10, 2) NOT NULL,
  items JSONB NOT NULL,
  special_instructions TEXT,
  status VARCHAR(32) DEFAULT 'received',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_orders_customer_phone ON orders(customer_phone);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- 3. Table Reservations Table
CREATE TABLE IF NOT EXISTS reservations (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  phone VARCHAR(32) NOT NULL,
  date DATE NOT NULL,
  time VARCHAR(32) NOT NULL,
  guests INTEGER NOT NULL DEFAULT 2,
  zone VARCHAR(100) NOT NULL,
  notes TEXT,
  status VARCHAR(32) DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_reservations_date ON reservations(date);
CREATE INDEX IF NOT EXISTS idx_reservations_phone ON reservations(phone);
CREATE INDEX IF NOT EXISTS idx_reservations_status ON reservations(status);

-- 4. Contact Inquiries & Feedback Table
CREATE TABLE IF NOT EXISTS messages (
  id VARCHAR(64) PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  contact VARCHAR(120) NOT NULL,
  subject VARCHAR(160),
  message TEXT NOT NULL,
  status VARCHAR(32) DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);

