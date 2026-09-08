export type DietaryTag = "Veg" | "Vegan" | "Gluten-Free" | "Chef's Special" | "Bestseller" | "Organic";

export type Product = {
  id: string;
  name: string;
  category: "Signature Blends" | "Artisanal Lattes" | "Cold Drips" | "Sourdough & Mains" | "Bakery" | "Desserts";
  description: string;
  price: number;
  rating: number;
  image: string;
  featured: boolean;
  dietary: DietaryTag[];
  flavorNotes: string[];
  prepTime: string;
  calories: string;
  origin: string;
};

export const products: Product[] = [
  {
    id: "musafir-reserve-espresso",
    name: "Musafir Karwa Espresso",
    category: "Signature Blends",
    description: "Our signature dark roast extraction with caramelized crema, roasted hazelnut notes, and a velvety bittersweet cacao finish.",
    price: 159,
    rating: 4.95,
    image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=900&q=80",
    featured: true,
    dietary: ["Vegan", "Organic", "Bestseller"],
    flavorNotes: ["Dark Cacao", "Smoked Toffee", "Hazelnut"],
    prepTime: "3-5 mins",
    calories: "5 kcal",
    origin: "Chikmagalur Estate, Karnataka"
  },
  {
    id: "saffron-cloud-latte",
    name: "Zafrani Saffron Cloud Latte",
    category: "Artisanal Lattes",
    description: "An opulent fusion of golden Kashmiri saffron strands, cardamom essence, Madagascar vanilla, and micro-steamed oat milk.",
    price: 249,
    rating: 4.98,
    image: "https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?auto=format&fit=crop&w=900&q=80",
    featured: true,
    dietary: ["Veg", "Chef's Special", "Bestseller"],
    flavorNotes: ["Kashmiri Saffron", "Cardamom", "Vanilla Cream"],
    prepTime: "5-7 mins",
    calories: "160 kcal",
    origin: "Pampore Saffron & Mysore Beans"
  },
  {
    id: "himalayan-nitro-cold-brew",
    name: "Himalayan Oak Nitro Cold Brew",
    category: "Cold Drips",
    description: "Slow steeped for 20 hours and infused with nitrogen for a silky, stout-like head with notes of dried berries and honey oak.",
    price: 269,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=80",
    featured: true,
    dietary: ["Vegan", "Gluten-Free", "Organic"],
    flavorNotes: ["Oak Barrel", "Wild Black Cherry", "Honey"],
    prepTime: "Instant Pour",
    calories: "10 kcal",
    origin: "Araku Valley High-Elevation Beans"
  },
  {
    id: "charcoal-paneer-sourdough",
    name: "Smoked Charcoal Paneer Panini",
    category: "Sourdough & Mains",
    description: "Charcoal-grilled cottage cheese tossed in house smoked peri-peri pesto, layered with baby spinach and aged cheddar on sourdough.",
    price: 289,
    rating: 4.88,
    image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80",
    featured: true,
    dietary: ["Veg", "Chef's Special", "Bestseller"],
    flavorNotes: ["Woodsmoke", "Basil Pesto", "Sharp Cheddar"],
    prepTime: "10-12 mins",
    calories: "380 kcal",
    origin: "In-House 36hr Fermented Sourdough"
  },
  {
    id: "almond-pistachio-croissant",
    name: "Pistachio Almond Twice-Baked Croissant",
    category: "Bakery",
    description: "Flaky golden French butter croissant filled with velvety Iranian pistachio frangipane and topped with toasted almond flakes.",
    price: 219,
    rating: 4.92,
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=900&q=80",
    featured: true,
    dietary: ["Veg", "Chef's Special"],
    flavorNotes: ["Cultured Butter", "Pistachio", "Toasted Nut"],
    prepTime: "Freshly Baked",
    calories: "320 kcal",
    origin: "French Butter Viennoiserie"
  },
  {
    id: "molten-brownie-skillet",
    name: "Sizzling Belgian Truffle Brownie",
    category: "Desserts",
    description: "Warm 70% dark Belgian chocolate brownie served on a sizzling hot plate with vanilla bean gelato and molten fudge cascade.",
    price: 259,
    rating: 4.96,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80",
    featured: true,
    dietary: ["Veg", "Bestseller"],
    flavorNotes: ["Belgian Cacao", "Bourbon Vanilla", "Sea Salt Fudge"],
    prepTime: "7-10 mins",
    calories: "450 kcal",
    origin: "Cacao Barry Belgium"
  },
  {
    id: "kullad-masala-chai",
    name: "Musafir Shahi Zafrani Chai",
    category: "Artisanal Lattes",
    description: "Hand-pounded green cardamom, dried ginger, lemongrass, and Assam single-estate orthodox tea brewed in traditional clay kulhad.",
    price: 139,
    rating: 4.85,
    image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=900&q=80",
    featured: false,
    dietary: ["Veg", "Organic", "Bestseller"],
    flavorNotes: ["Crushed Cardamom", "Ginger Spark", "Earthy Clay"],
    prepTime: "5 mins",
    calories: "95 kcal",
    origin: "Assam Upper Valley"
  },
  {
    id: "velvet-spanish-latte",
    name: "Velvet Spanish Caramel Latte",
    category: "Artisanal Lattes",
    description: "Espresso sweetened with caramelized condensed milk, textured whole milk, and a delicate dusting of Ceylon cinnamon.",
    price: 239,
    rating: 4.89,
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=900&q=80",
    featured: false,
    dietary: ["Veg"],
    flavorNotes: ["Dulce de Leche", "Ceylon Cinnamon", "Espresso"],
    prepTime: "5 mins",
    calories: "210 kcal",
    origin: "Arabica Roast Blend"
  },
  {
    id: "aeropress-ethiopian",
    name: "Ethiopian Yirgacheffe AeroPress",
    category: "Signature Blends",
    description: "Bright, floral, tea-like clarity with notes of jasmine, bergamot lemon, and wild peach brewed through an AeroPress extraction.",
    price: 199,
    rating: 4.93,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    featured: false,
    dietary: ["Vegan", "Organic"],
    flavorNotes: ["Jasmine Blossom", "Bergamot", "Peach Nectar"],
    prepTime: "6 mins",
    calories: "4 kcal",
    origin: "Yirgacheffe, Ethiopia"
  },
  {
    id: "musafir-royal-thali",
    name: "Musafir Royal Artisan Thali",
    category: "Sourdough & Mains",
    description: "Paneer Lababdar, slow-cooked Dal Makhani, Dum Aloo, Jeera rice, multi-grain rotis, roasted papad, house pickle, and dessert.",
    price: 369,
    rating: 4.87,
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=900&q=80",
    featured: false,
    dietary: ["Veg", "Chef's Special"],
    flavorNotes: ["Rich Tomato Cashew", "Desi Ghee", "Spiced Cumin"],
    prepTime: "15 mins",
    calories: "650 kcal",
    origin: "Musafir Chef's Signature Feast"
  },
  {
    id: "truffle-wild-mushroom-toast",
    name: "Truffled Wild Mushroom Sourdough",
    category: "Sourdough & Mains",
    description: "Sautéed shiitake & button mushrooms in garlic herb butter, whipped ricotta, white truffle oil drizzle on toasted sourdough.",
    price: 299,
    rating: 4.91,
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
    featured: false,
    dietary: ["Veg", "Chef's Special"],
    flavorNotes: ["White Truffle", "Garlic Thyme", "Whipped Ricotta"],
    prepTime: "10 mins",
    calories: "310 kcal",
    origin: "Artisanal Bakery Kitchen"
  },
  {
    id: "lotus-biscoff-frappe",
    name: "Lotus Biscoff Crumble Frappe",
    category: "Cold Drips",
    description: "Blended espresso, caramelized Biscoff spread, chilled cream, crunchy speculoos cookie crumble, and whipped topping.",
    price: 279,
    rating: 4.88,
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=900&q=80",
    featured: false,
    dietary: ["Veg", "Bestseller"],
    flavorNotes: ["Caramelized Biscuit", "Vanilla Bean", "Espresso"],
    prepTime: "5 mins",
    calories: "340 kcal",
    origin: "Belgian Speculoos Infusion"
  },
  {
    id: "hibiscus-cascara-cooler",
    name: "Wild Hibiscus Cascara Fizz",
    category: "Cold Drips",
    description: "Sun-dried coffee cherry cascara tea steeped with wild ruby hibiscus, fresh mint sprigs, lime twist, and sparkling soda.",
    price: 189,
    rating: 4.79,
    image: "https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=80",
    featured: false,
    dietary: ["Vegan", "Gluten-Free", "Organic"],
    flavorNotes: ["Tart Hibiscus", "Sweet Cascara Berry", "Fresh Mint"],
    prepTime: "3 mins",
    calories: "60 kcal",
    origin: "Estate Upcycled Coffee Cherry"
  },
  {
    id: "cinnamon-swirl-brioche",
    name: "Glazed Cinnamon Brioche Roll",
    category: "Bakery",
    description: "Warm, pillowy brioche dough swirled with Korintje cinnamon, brown muscovado sugar, and cream cheese glaze.",
    price: 189,
    rating: 4.86,
    image: "https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=900&q=80",
    featured: false,
    dietary: ["Veg", "Bestseller"],
    flavorNotes: ["Sweet Cinnamon", "Brown Sugar", "Cream Cheese"],
    prepTime: "Freshly Baked",
    calories: "290 kcal",
    origin: "Artisan Oven Daily"
  },
  {
    id: "classic-espresso-tiramisu",
    name: "Musafir Classic Espresso Tiramisu",
    category: "Desserts",
    description: "Savoiardi ladyfingers soaked in Musafir double espresso, layered with silky Italian mascarpone mousse and Dutch cocoa.",
    price: 279,
    rating: 4.97,
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=80",
    featured: false,
    dietary: ["Veg", "Chef's Special", "Bestseller"],
    flavorNotes: ["Mascarpone Cream", "Espresso Kick", "Dutch Cocoa"],
    prepTime: "Chilled Ready",
    calories: "380 kcal",
    origin: "Traditional Treviso Recipe"
  },
  {
    id: "matcha-ceremonial-latte",
    name: "Ceremonial Uji Matcha Latte",
    category: "Artisanal Lattes",
    description: "First-harvest ceremonial grade Japanese matcha whisked with oat milk and a touch of wild wildflower honey.",
    price: 259,
    rating: 4.84,
    image: "https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=900&q=80",
    featured: false,
    dietary: ["Veg", "Organic"],
    flavorNotes: ["Earthy Umami", "Sweet Grass", "Silky Oat"],
    prepTime: "5 mins",
    calories: "140 kcal",
    origin: "Uji, Kyoto, Japan"
  }
];

export const categories = [
  "All",
  "Signature Blends",
  "Artisanal Lattes",
  "Cold Drips",
  "Sourdough & Mains",
  "Bakery",
  "Desserts"
] as const;
