-- ==============================================================================
-- Musafir Cafe & Roastery — Seed Data
-- ==============================================================================

INSERT INTO products (id, name, category, description, price, rating, image, featured, dietary, flavor_notes, prep_time, calories, origin)
VALUES
(
  'musafir-reserve-espresso',
  'Musafir Karwa Espresso',
  'Signature Blends',
  'Our signature dark roast extraction with caramelized crema, roasted hazelnut notes, and a velvety bittersweet cacao finish.',
  159.00,
  4.95,
  'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=900&q=80',
  true,
  '["Vegan", "Organic", "Bestseller"]'::jsonb,
  '["Dark Cacao", "Smoked Toffee", "Hazelnut"]'::jsonb,
  '3-5 mins',
  '5 kcal',
  'Chikmagalur Single Estate, Karnataka'
),
(
  'royal-zafrani-latte',
  'Royal Zafrani Cardamom Latte',
  'Artisanal Lattes',
  'Single-origin Arabica micro-foamed with Kashmiri Pampore saffron, crushed green cardamom, and raw demerara sugar.',
  249.00,
  4.98,
  'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=900&q=80',
  true,
  '["Chef''s Special", "Veg"]'::jsonb,
  '["Pampore Saffron", "Cardamom", "Vanilla Cream"]'::jsonb,
  '5-7 mins',
  '180 kcal',
  'Kashmir Saffron x Karnataka Arabica'
),
(
  'cold-brew-himalayan',
  'Himalayan Oak Cold Drip',
  'Cold Drips',
  'Steeped drop-by-drop for 20 hours over toasted oak wood chips. Naturally sweet, zero acidity, and immensely refreshing.',
  229.00,
  4.90,
  'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=900&q=80',
  true,
  '["Vegan", "Bestseller"]'::jsonb,
  '["Oak Wood", "Molasses", "Wild Honey"]'::jsonb,
  'Instant Pour',
  '12 kcal',
  'Bababudangiri High Altitude, 1400m'
),
(
  'paneer-tikka-sourdough',
  'Malai Paneer Tikka Sourdough Tartine',
  'Sourdough & Mains',
  'Charcoal-grilled cottage cheese cubes tossed in tandoori spices, smoked bell pepper coulis, pickled onions, and microgreens on rustic naturally fermented sourdough.',
  329.00,
  4.92,
  'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80',
  true,
  '["Bestseller", "Veg"]'::jsonb,
  '["Smoked Paprika", "Tangy Sumac", "Crusty Ferment"]'::jsonb,
  '12-15 mins',
  '410 kcal',
  'In-House Artisan Bakery, Baramati'
),
(
  'pistachio-croissant',
  'Pistachio Rose Blossom Croissant',
  'Bakery',
  'Laminated with French cultured butter, filled with Sicilian pistachio praline cream, and finished with organic candied rose petals.',
  219.00,
  4.89,
  'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80',
  true,
  '["Chef''s Special", "Veg"]'::jsonb,
  '["Sicilian Pistachio", "Flaky Butter", "Damask Rose"]'::jsonb,
  'Ready to Serve',
  '340 kcal',
  'Musafir Viennoiserie Workshop'
),
(
  'dark-chocolate-basque',
  'Smoked Dark Chocolate Basque Cheesecake',
  'Desserts',
  'Crustless molten center cheesecake baked at 240°C for caramelized burnt crust, paired with house espresso sea-salt caramel.',
  279.00,
  4.97,
  'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80',
  true,
  '["Chef''s Special", "Veg", "Gluten-Free"]'::jsonb,
  '["70% Callebaut Dark", "Smoked Toffee", "Maldon Salt"]'::jsonb,
  'Ready to Serve',
  '390 kcal',
  'Pastry Kitchen, Baramati'
)
ON CONFLICT (id) DO NOTHING;

