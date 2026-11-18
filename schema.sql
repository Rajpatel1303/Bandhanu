CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  sku TEXT NOT NULL,
  category TEXT NOT NULL,
  sub_category TEXT,
  price REAL NOT NULL,
  original_price REAL,
  fabric TEXT,
  craft_technique TEXT,
  knot_count TEXT,
  availability TEXT DEFAULT 'in_stock',
  lead_time TEXT,
  is_featured INTEGER DEFAULT 0,
  is_new_drop INTEGER DEFAULT 0,
  images TEXT,
  colors TEXT,
  description TEXT,
  features TEXT,
  wash_care TEXT,
  dimensions TEXT,
  views INTEGER DEFAULT 0,
  enquiries_count INTEGER DEFAULT 0,
  created_at TEXT
);

CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image TEXT,
  badge TEXT,
  is_active INTEGER DEFAULT 1,
  sub_categories TEXT
);

CREATE TABLE IF NOT EXISTS banners (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  cta_text TEXT,
  cta_category TEXT,
  badge TEXT,
  bg_gradient TEXT,
  image_url TEXT,
  is_active INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS business_profile (
  id TEXT PRIMARY KEY,
  data TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS site_content (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS enquiries (
  id TEXT PRIMARY KEY,
  product_id TEXT,
  product_title TEXT,
  sku TEXT,
  price REAL,
  color TEXT,
  timestamp TEXT,
  status TEXT
);
