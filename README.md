# StoreFront — E-commerce Platform

A Next.js e-commerce frontend project built with TypeScript, Redux, and Tailwind CSS. Uses the EscuelaJS API for products, categories, and authentication.

**Live Demo:** [https://store-front-22f1.vercel.app/](https://store-front-22f1.vercel.app/)

**Design Inspiration:** [E-commerce Website Web Page Design UI Kit](https://www.figma.com/community/file/1252561852327562039/ecommerce-website-web-page-design-ui-kit-interior-landing-page) on Figma Community

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Architecture](#architecture)
- [Rendering Strategy](#rendering-strategy)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Tradeoffs](#tradeoffs)
- [Performance Considerations](#performance-considerations)
- [Challenges & Solutions](#challenges--solutions)
- [Future Improvements](#future-improvements)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Deployment](#deployment)

---

## 🎯 Project Overview

StoreFront is a full-featured e-commerce platform demonstrating modern Next.js patterns, scalable frontend architecture, and solid engineering practices. The application showcases Next.js 16 with App Router, TypeScript for type safety, and a clean component hierarchy.

**Key Objectives:**

- Build a scalable, maintainable e-commerce application
- Demonstrate Next.js App Router patterns and best practices
- Implement robust authentication with middleware-based route protection
- Create responsive, accessible UI components with shadcn/Radix UI
- Optimize for performance and user experience
- Provide admin capabilities for product and category management

**Technology Approach:**

- Frontend-only architecture using external EscuelaJS API
- Redux Toolkit for predictable, debuggable state management
- TypeScript throughout for type safety
- Zod schemas for runtime validation
- Next.js middleware for server-side route protection

---

## ✨ Features

### Public Storefront

- **Home Page** — Hero section, featured products carousel, category slider
- **Product Listing** — Grid view with pagination, category filtering, price sorting
- **Product Details** — Full product information, related products, add to cart
- **Shopping Cart** — View items, update quantities, remove items, persistent storage
- **Checkout** — Multi-field form with validation, order summary
- **Theme Switching** — Dark/light mode toggle with persistence

### Authentication

- **User Registration** — Email, password, name, avatar URL
- **User Login** — Email/password authentication with role-based redirects
- **Protected Routes** — Middleware-based route protection
- **User Profile** — Display profile information and logout

### Admin Dashboard

- **Products Management** — View, create, edit, delete products with pagination
- **Categories Management** — Manage categories with create, edit, delete
- **Users Management** — View users list with search and filtering
- **Dashboard** — Display product, category, and user counts

---

## 🏗 Architecture

### Design Principles

1. **Component Organization**

   - Components organized by feature/domain (home, products, cart, etc.)
   - UI primitives in separate `ui/` folder for reusability
   - Providers (Auth, Store, Theme) for cross-app context

2. **State Management**

   - Redux Toolkit for global state (cart items, user auth)
   - React Context for theme switching via `next-themes`
   - Local component state for UI-only values

3. **Type Safety**

   - Strict TypeScript configuration
   - Zod schemas as single source of truth for validation
   - Inferred TypeScript types from Zod schemas
   - Comprehensive type definitions in `types/` folder

4. **External API Integration**
   - All data from EscuelaJS API
   - API base URL configured via environment variable
   - Token-based authentication for protected endpoints

### Data Flow

```
User Request
    ↓
Middleware (Authentication Check)
    ↓
Page/Route Handler
    ↓
Redux Store (Global State)
    ↓
Components (Render UI)
    ↓
User Interaction
    ↓
API Call via Redux Thunk
    ↓
State Update & Re-render
```

---

## 🎨 Rendering Strategy

### Server vs. Client Components

**Server Components (Default):**

- Layout components (Header, Footer)
- Page shells that don't need interactivity
- Benefits: Reduced client JS, direct server access (though limited by external API)

**Client Components (Used for):**

- Forms (login, register, checkout, admin)
- Interactive filters and search
- Cart operations and theme switching
- Admin CRUD operations
- Benefits: Smooth user interactions without full page refreshes

### Rendering Approach

- **Server-rendered layouts** for structural components
- **Client-rendered pages** for interactive features
- **Static generation** for home page and public pages
- **Dynamic rendering** for products and user-specific pages

### Route Protection Flow

```
Request → Middleware (check token)
   ├─ Valid token → Allow request
   ├─ Invalid/Missing → Redirect to login
   └─ Admin route → Check role, redirect if not admin
```

---

## 🛠 Tech Stack

| Technology          | Version | Purpose                         |
| ------------------- | ------- | ------------------------------- |
| **Next.js**         | 16.2.6  | React framework with App Router |
| **React**           | 19.2.4  | UI library                      |
| **TypeScript**      | 5       | Type-safe development           |
| **Tailwind CSS**    | 4       | Utility-first styling           |
| **Redux Toolkit**   | 2.11.2  | Cart and auth state management  |
| **React Hook Form** | 7.76.0  | Form handling and validation    |
| **Zod**             | 4.4.3   | Schema validation               |
| **shadcn/Radix UI** | Latest  | UI components                   |
| **next-themes**     | 0.4.6   | Dark/light mode switching       |
| **Swiper**          | 12.1.4  | Product carousel                |
| **js-cookie**       | 3.0.7   | Cookie management               |

---

## 📁 Project Structure

```
storefront/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth routes
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (store)/                  # Main storefront
│   │   ├── page.tsx              # Home page
│   │   ├── products/page.tsx     # Product listing
│   │   ├── products/[id]/page.tsx # Product details
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx
│   │   └── profile/page.tsx
│   ├── admin/                    # Admin dashboard
│   │   ├── page.tsx              # Dashboard
│   │   ├── products/page.tsx
│   │   ├── categories/page.tsx
│   │   └── users/page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   └── middleware.ts             # Route protection
│
├── components/                   # React components
│   ├── layout/                   # Header, Footer
│   ├── home/                     # Hero, Categories, FeaturedProducts
│   ├── products/                 # ProductGrid, ProductCard, FilterBar
│   ├── cart/                     # CartSidebar, CartTableItem
│   ├── ui/                       # Button, Input, Dialog, Select, etc.
│   └── providers/                # AuthProvider, StoreProvider, ThemeProvider
│
├── store/                        # Redux state
│   ├── index.ts
│   └── slices/
│       ├── authSlice.ts
│       └── cartSlice.ts
│
├── schemas/                      # Zod validation
│   ├── auth.ts
│   ├── product.ts
│   ├── category.ts
│   └── checkout.ts
│
├── types/                        # TypeScript types
├── constants/                    # App constants
├── lib/                          # Utilities
├── public/                       # Static assets
└── middleware.ts                 # Route protection middleware
```

---

## ⚖️ Tradeoffs

### Decision 1: Redux Toolkit vs. Context API

**Choice:** Redux Toolkit for global state (cart, auth)

**Pros:**

- DevTools integration for debugging
- Predictable state updates with actions
- Middleware support for async operations
- Clear separation of concerns

**Tradeoff:**

- Slightly larger bundle size (~40KB)
- More boilerplate than Context API

**Why:** Better debugging and predictability for complex e-commerce state changes

### Decision 2: External API vs. Backend

**Choice:** Use EscuelaJS API instead of building backend

**Pros:**

- No server infrastructure to maintain
- Focus on frontend implementation
- Fast development and deployment

**Tradeoff:**

- No custom business logic
- Limited control over API features
- Cannot add features not supported by EscuelaJS

**Why:** Demonstrates frontend architecture without backend complexity

### Decision 3: Token Storage in Cookies

**Choice:** Store JWT token in secure cookies with middleware protection

**Pros:**

- Tokens unavailable to JavaScript (secure flag enabled)
- Middleware can validate before rendering
- Automatic token sending with requests

**Tradeoff:**

- Cannot access token from JavaScript (by design)
- Cross-site concerns require proper CORS/CSRF handling

**Why:** More secure than localStorage for sensitive tokens

### Decision 4: Client-Side Forms

**Choice:** Use React Hook Form with Zod validation on client

**Pros:**

- Real-time validation feedback
- Reduced server requests
- Better UX with inline error messages

**Tradeoff:**

- Form submission still hits external API
- No server-side form processing

**Why:** Improves user experience and demonstrates modern form patterns

---

## ⚡ Performance Considerations

### 1. Bundle Size

- Current production bundle: ~200KB (gzipped)
- Tree-shaking eliminates unused code
- Dynamic imports for route-specific code

### 2. Image Optimization

- Next.js Image component for automatic optimization
- Responsive images with proper sizing
- Lazy loading for off-screen images

### 3. Caching Strategy

- Static assets cached for 30 days
- Redux state persisted to localStorage
- Cookie-based session management

### 4. Code Splitting

- Automatic route-level code splitting
- Lazy-loaded components for admin routes
- Separate bundle for heavy dependencies (Swiper, Radix UI)

### 5. Core Web Vitals Targets

- **LCP:** < 2.5s (largest contentful paint)
- **FID:** < 100ms (first input delay)
- **CLS:** < 0.1 (cumulative layout shift)

### 6. Optimization Techniques

- Debounced search/filter operations
- Memoized components to prevent unnecessary re-renders
- ISR strategy for product pages
- Asset compression and minification

---

## 🚧 Challenges & Solutions

### Challenge 1: Protecting Routes Without Backend

**Problem:** Middleware needs to verify tokens without direct backend

**Solution:**

- Store token in secure HTTP-only cookie
- Middleware checks cookie presence/validity
- Verify token structure before allowing access
- Redirect to login on token failure

### Challenge 2: Redux State Loss on Page Refresh

**Problem:** Redux state is not persisted across browser refresh

**Solution:**

- Implement localStorage sync for cart state
- Load cart from localStorage on app initialization
- Sync Redux updates back to localStorage
- Prevent hydration mismatches with careful initialization

### Challenge 3: Type Safety Across Layers

**Problem:** Ensuring types match between frontend and API responses

**Solution:**

- Define Zod schemas as single source of truth
- Infer TypeScript types from Zod schemas using `z.infer<>`
- Validate API responses at runtime
- Catch type mismatches early with strict TypeScript

### Challenge 4: Admin Route Access Control

**Problem:** Need to prevent non-admin users from accessing admin routes

**Solution:**

- Check user role in middleware
- Store role in cookie alongside token
- Verify role before rendering admin pages
- Redirect unauthorized users to home page

### Challenge 5: Cart Persistence Across Devices

**Problem:** Cart stored locally cannot sync across devices/browsers

**Solution:**

- Accept cross-device limitation for MVP
- Document that cart is device/browser specific
- Future improvement: persist cart to backend after login

### Challenge 6: Form Validation Consistency

**Problem:** Validating on client and server separately causes inconsistency

**Solution:**

- Use same Zod schema on client for validation
- API validates and may return errors
- Client displays API errors alongside form validation
- Single source of truth for validation logic

---

## 🚀 Future Improvements

### Short Term (Next Release)

- [ ] Wishlist feature with persistence
- [ ] Product ratings and reviews Functionality
- [ ] Order history tracking
- [ ] User profile editing
- [ ] Email verification on signup
- [ ] Unit tests with Vitest
- [ ] E2E tests with Playwright

### Medium Term (3 Months)

- [ ] Real payment processing (Stripe/PayPal integration)
- [ ] Email notifications (order confirmation, shipping updates)
- [ ] User role management (staff, moderator)
- [ ] Product recommendations engine

### Long Term (6+ Months)

- [ ] Backend API migration for full control
- [ ] GraphQL integration
- [ ] Real-time inventory management
- [ ] Multi-language support (i18n)
- [ ] Mobile app (React Native)
- [ ] Headless CMS integration
- [ ] Advanced admin features (reporting, exports)
- [ ] Subscription/recurring purchases

---

## 🚀 Setup

### Prerequisites

- Node.js 18+ or 20+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/storefront.git
   cd storefront
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables (see below)

4. Run development server:

   ```bash
   npm run dev
   ```

---

## 🔑 Environment Variables

Create a `.env.local` file in the root with:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.escuelajs.co/api/v1
```

This is the only required variable. All API calls use this base URL.

---

## ▶️ Running the Application

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Production Build

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

## 🌐 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set `NEXT_PUBLIC_API_BASE_URL` in Vercel dashboard
3. Deploy on push to main branch

### Traditional Hosting

```bash
npm run build
npm run start
```

---

## 📝 Notes

- **Authentication**: User registration and login use the EscuelaJS API. Tokens are stored in secure cookies.
- **Cart Persistence**: Cart state is stored in Redux and synced to localStorage for persistence across sessions.
- **Protected Routes**: `/checkout`, `/profile`, and `/admin` require authentication via middleware.
- **Admin Access**: Only users with `role: 'admin'` can access the admin dashboard.
- **API**: All data comes from the EscuelaJS API. No backend server required.
