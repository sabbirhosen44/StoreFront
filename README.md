# 🛒 StoreFront — E-commerce Platform

A modern, high-performance, full-featured e-commerce frontend web application built with **Next.js 16 (App Router)**, **TypeScript**, **Redux Toolkit**, and **Tailwind CSS v4**.

Integrated with the external **EscuelaJS REST API**, StoreFront includes a public customer storefront, dynamic catalog filtering, shopping cart & wishlist persistence, multi-step checkout with order tracking, role-based access control, an admin dashboard, and an automated Vitest test suite.

🌐 **Live Demo:** [https://store-front-22f1.vercel.app/](https://store-front-22f1.vercel.app/)  
🎨 **Design Inspiration:** [E-commerce Website Web Page Design UI Kit](https://www.figma.com/community/file/1252561852327562039/ecommerce-website-web-page-design-ui-kit-interior-landing-page) on Figma Community

---

## 📁 Project Structure

```text
storefront/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication Routes (Login & Register)
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (store)/                  # Public Storefront Layout & Pages
│   │   ├── page.tsx              # Home Page (Hero, Categories, Featured Products)
│   │   ├── products/             # Product Catalog & Dynamic Filtering
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx     # Product Details Page
│   │   ├── cart/page.tsx         # Shopping Cart Page
│   │   ├── checkout/page.tsx     # Multi-step Checkout Form
│   │   ├── profile/page.tsx      # User Profile & Stats Overview
│   │   ├── wishlist/page.tsx     # Saved Wishlist Items Page
│   │   ├── orders/page.tsx       # Order History Tracking Page
│   │   ├── contact/page.tsx      # Contact Form & Info Cards
│   │   ├── about/page.tsx        # Brand Story & Mission Page
│   │   ├── privacy/page.tsx      # Privacy Policy Statement
│   │   ├── returns/page.tsx      # 30-Day Returns Policy Page
│   │   └── payment/page.tsx      # Payment Options Info Page
│   ├── admin/                    # Protected Admin Dashboard
│   │   ├── page.tsx              # Dashboard Metrics Overview
│   │   ├── products/page.tsx     # Product Management (CRUD)
│   │   ├── categories/page.tsx   # Category Management (CRUD)
│   │   └── users/page.tsx        # User Directory & Filtering
│   ├── globals.css               # Design System Tokens & Tailwind CSS v4
│   ├── layout.tsx                # Root App Layout & Providers
│   └── middleware.ts             # Route Protection & Cookie Guards
│
├── components/                   # React Components
│   ├── layout/                   # Header (Search, Badges), Footer
│   ├── home/                     # Hero, CategorySlider, FeaturedProducts
│   ├── products/                 # ProductCard, ProductGrid, FilterBar
│   ├── cart/                     # CartSidebar, CartTableItem
│   ├── ui/                       # Button, Input, Select, Dialog, Toast, Sheet
│   └── providers/                # AuthProvider, StoreProvider, ThemeProvider
│
├── store/                        # Redux Toolkit Global State
│   ├── index.ts                  # Store Configuration & Typed Hooks
│   └── slices/
│       ├── authSlice.ts          # Auth Session & Cookie Sync
│       ├── cartSlice.ts          # Shopping Cart & Local Storage Sync
│       ├── wishlistSlice.ts      # Wishlist Bookmark Persistence
│       └── orderSlice.ts         # Finalized Orders History
│
├── schemas/                      # Zod Validation Schemas
│   ├── auth.ts                   # Login & Registration Schemas
│   ├── checkout.ts               # Billing & Shipping Address Schema
│   ├── contact.ts                # Contact Form Validation Schema
│   ├── category.ts               # Category Management Schema
│   └── product.ts                # Product CRUD Schema
│
├── __tests__/                    # Vitest & React Testing Library Suite
│   ├── cartSlice.test.ts         # Cart Reducer Unit Tests (6 tests)
│   ├── wishlistSlice.test.ts     # Wishlist Reducer Unit Tests (4 tests)
│   ├── authSlice.test.ts         # Auth Reducer Unit Tests (3 tests)
│   ├── schemas.test.ts           # Zod Schema Unit Tests (4 tests)
│   └── ProductCard.test.tsx      # Component UI Rendering Tests (2 tests)
│
├── types/                        # TypeScript Interfaces & Types
├── constants/                    # Application Navigation & Constants
├── lib/                          # Utility Functions & API Helpers
└── public/                       # Static Assets & Images
```

---

## ✨ Features Breakdown

### 🛍️ Public Storefront
- **Responsive Home & Catalog:** Hero banner, category slider, featured product grid, and interactive header search overlay.
- **Product Filtering & Sorting:** Dynamic filtering by category, price range, and price sorting (`searchParams` URL state synchronization).
- **Shopping Cart & Wishlist:** Real-time item count badges, quantity adjustments, bookmarking, and local storage persistence.
- **Checkout & Order Tracking:** Multi-field validated checkout form with order creation and `/orders` tracking page.
- **Support & Policy Pages:** Responsive `/contact` form with validation, `/about`, `/privacy`, `/returns`, and `/payment` pages.

### 🔒 Authentication & Route Protection
- **JWT Cookie Storage:** Secure cookie-based token management for authentication sessions.
- **Middleware Guards:** Server-side route protection restricting `/admin`, `/checkout`, and `/profile` routes based on user role.

### 🛠️ Admin Dashboard (`/admin`)
- **Product Management:** Create, view, edit, and delete products.
- **Category Management:** Manage category catalog items.
- **User Management:** Search and filter registered platform users.

---

## 🛠 Tech Stack

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **Next.js** | 16.2.6 | React framework with App Router & RSC |
| **React** | 19.2.4 | UI library |
| **TypeScript** | 5.x | Strict type safety |
| **Tailwind CSS** | 4.x | Utility-first styling & design tokens |
| **Redux Toolkit** | 2.11.2 | Predictable state management with `localStorage` sync |
| **React Hook Form** | 7.76.0 | Performance form state handling |
| **Zod** | 4.4.3 | Runtime schema validation |
| **Vitest & JSDOM** | Latest | Unit testing framework |
| **React Testing Library** | Latest | Component UI rendering tests |
| **next-themes** | 0.4.6 | Dark/light mode theme toggle |

---

## 🧪 Automated Testing Suite

StoreFront features **19 automated unit and component tests** executed with Vitest and JSDOM:

```bash
# Run automated test suite
npm test
```

### Test Coverage Highlights:
- **Redux Slice Unit Tests:** Validates state mutation, addition, removal, and clear operations for Cart, Wishlist, and Auth slices.
- **Zod Schema Tests:** Tests runtime validation rules and constraint failures for Checkout and Contact forms.
- **Component UI Tests:** Verifies `ProductCard` component rendering across Grid and List view modes using React Testing Library.

---

## 🚧 Challenges & Architectural Solutions

### 1. Route Protection via Server Middleware
- **Challenge:** Securing client and admin routes without a dedicated custom backend server.
- **Solution:** Token and role cookies are validated inside Next.js `middleware.ts`. Non-admin users attempting to access `/admin` are automatically redirected to home, while unauthenticated users accessing `/checkout` are redirected to `/login`.

### 2. State Loss Avoidance Across Sessions
- **Challenge:** Preserving shopping cart, wishlist items, and order history across page refreshes.
- **Solution:** Integrated Redux Toolkit reducers with client-side `localStorage` synchronization guarded with `typeof window !== "undefined"` checks for SSR safety.

### 3. Unified Validation Layer
- **Challenge:** Ensuring consistent validation rules between client form inputs and API payloads.
- **Solution:** Defined single-source-of-truth Zod schemas in `schemas/` that feed both React Hook Form validation and TypeScript inferred types (`z.infer<>`).

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/storefront.git
   cd storefront
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**  
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://api.escuelajs.co/api/v1
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application in your browser.

---

## 📜 Available Scripts

- `npm run dev` — Starts Next.js development server
- `npm run build` — Builds the production application bundle
- `npm run start` — Runs the compiled production build
- `npm test` — Runs the Vitest automated test suite (19 tests)
- `npm run lint` — Runs ESLint for code quality inspection
