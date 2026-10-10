# Bandhanu — Where Heritage Meets Style

> **Every knot we tie is not just a design — it’s a promise of authenticity, sustainability, and love for handmade.**  
> *Bandhanu: Every Knot, A Story.*

A modern, mobile-first showcase and digital commerce platform for handcrafted Khatri Bandhani garments, sarees, stoles, dupattas, and unstitched fabrics. Built with **React 19**, **TypeScript**, **Tailwind CSS**, and backed by **Supabase Cloud PostgreSQL** with a private, unlisted Atelier CMS.

---

## ✨ Key Features

### 🛍️ Customer Experience (100% Mobile & Desktop Optimized)
- **Silk Wave Aesthetic:** Rich crimson, madder red, and raw silk cream styling with gold zari accents and smooth micro-animations.
- **Dedicated Multi-Page Flow:**
  - `#/` — **Home Showcase:** Silk wave hero, curated categories, flagship product showcase, craft teaser, editorial lookbook, and direct bespoke consultation.
  - `#/catalogue` — **Digital Catalogue:** 2-tier Category & Sub-Category navigation with real-time keyword search, sorting, and tag filters.
  - `#/product/:id` — **Product Details:** Head-to-hem full clothing frame (no scroll cutoffs), 1-tap zoom knot inspector, color swatches, technical specs tabs, and curated pairings.
  - `#/about` — **Our Story & Craft:** Official heritage narrative, 3 vision pillars (*Global Identity*, *Honor Artisans*, *Contemporary Designs*), and an interactive 4-stage craft simulation.
  - `#/contact` — **Jamnagar Studio:** Studio address, Google Maps link, visiting hours, and interactive bespoke inquiry builder.
  - `#/wishlist` — **My Curated Trousseau:** Save favorite pieces, review total estimated value, and enquire single or all pieces via WhatsApp.
- **Direct WhatsApp Commerce:** Intelligent dispatcher routes customers directly into the WhatsApp chat with pre-filled SKU, title, price, and selected color (bypassing the intermediate landing page on both desktop and mobile).

### 🔐 Zero-Footprint Private Studio CMS (`#/studio-access`)
- **Zero Public Footprint:** No admin links, login buttons, or switcher indicators appear anywhere on the customer storefront.
- **Passcode Protection:** Gated behind a master studio passcode (`bandhanu@2026` or `7860`).
- **Universal Site CMS:** Atelier managers can update every headline, badge, banner, vision pillar, contact detail, and section toggle with live persistence to Supabase Cloud PostgreSQL.
- **Catalogue & Sub-Category Manager:** Full CRUD for products, categories, sub-categories, inventory status, prices, knot counts, and image galleries.
- **Commerce Intelligence:** Real-time analytics, order velocity tracking, and inquiry history logs.

---

## 🛠️ Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS, Custom Heritage Design System
- **Icons & Motion:** Lucide React, Canvas Confetti
- **Cloud Database:** Supabase Cloud PostgreSQL (`BandhaniHouse`)
- **Deep Linking:** Hash-based SPA routing with browser history support

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Rajpatel1303/Bandhanu.git

# Navigate to project directory
cd Bandhanu

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will run on `http://localhost:5173`.

### Production Build

```bash
npm run build
```

The compiled output will be generated in the `dist/` directory, ready to deploy to Cloudflare Pages, Vercel, Netlify, or any static web host.

---

## 🔒 Studio Access & CMS

To access the private back-office atelier:
1. Navigate directly to `http://localhost:5173/#/studio-access`
2. Enter the studio master passcode: `bandhanu@2026` (or `7860`)
3. Access real-time analytics, catalogue management, and universal site content customization.
4. Click **"Lock & Sign Out"** in the top navigation bar to lock the studio and return to the customer storefront.

---

## 📄 License

Private proprietary project for **Bandhanu**. All rights reserved.
