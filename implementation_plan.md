# Implementation Plan — NIX & CO. D2C Website & Pitch Prototype

Build a full-stack D2C FMCG ecommerce & pitch prototype website for **NIX & CO.** (Period Stain Rescue Stick) based on [prd.md](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/prd.md). The system consists of a **FastAPI backend** connected to **Supabase** (PostgreSQL + Auth/Storage) and a modern **Vite + React + TypeScript** frontend with an art-directed **Cherry Cream** visual system.

> [!IMPORTANT]
> **DESIGN CONSTRAINT:** Before writing components, establish a coherent NIX design system using the Cherry Cream palette. No glassmorphism, no excessive gradients, no neon, no excessive rounded cards, no giant decorative blobs. The website should look intentionally art-directed and brand-led. Use the [attendance tracker reference](https://personal-attendance-tracker-one.vercel.app/) only as a benchmark for implementation quality and cleanliness, **not** as a visual template. When in doubt, choose better typography/spacing/product composition over more effects.

---

## User Review Required

> [!IMPORTANT]
> **Full Stack Architecture**:
> - **Backend**: FastAPI (Python 3.10+) with Uvicorn, structured into API routers (`/api/v1/product`, `/api/v1/orders`, `/api/v1/rewards`, `/api/v1/waitlist`, `/api/v1/notes`, `/api/v1/demo`).
> - **Database & Auth**: Supabase PostgreSQL database integrated via `supabase-py` and `SQLAlchemy`/`asyncpg` or direct REST client.
> - **Frontend**: Vite + React + TypeScript + React Router communicating with the FastAPI REST API.

> [!NOTE]
> **Design System Compliance**: Strict adherence to the **Cherry Cream** palette (`Deep Cherry #7B2638`, `Cherry Red #A83A4B`, `Warm Cream #F8F0E3`, `Soft Cocoa #4A3032`, `Dusty Blush #D9A6AD`). Glassmorphism, neon, excessive gradients, futuristic SaaS blobs, and dark-mode defaults are strictly excluded as mandated by the PRD.

---

## Open Questions

> [!NOTE]
> 1. **Supabase Credentials**: For local development/testing, do you have an existing Supabase Project URL & Anon Key, or should we set up a local Supabase client / FastAPI SQLite mock database that seamlessly connects to Supabase env variables (`SUPABASE_URL`, `SUPABASE_KEY`)?
> 2. **Pricing & Currency**: Should the default product price be set to `₹349` in the database seed script, or leave it as a configurable `₹XXX` placeholder?
> 3. **Font Preference**: Plan uses **DM Sans** (body) + **Playfair Display** (editorial headlines). Any preference for a different pairing?

---

## Proposed Changes

### Backend Component (FastAPI + Supabase)

#### [NEW] [backend/requirements.txt](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/backend/requirements.txt)
Python dependencies: `fastapi`, `uvicorn`, `supabase`, `pydantic`, `pydantic-settings`, `python-dotenv`, `cors`.

#### [NEW] [backend/app/main.py](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/backend/app/main.py)
FastAPI application entry point, CORS middleware setup, router inclusions, and health check.

#### [NEW] [backend/app/config.py](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/backend/app/config.py)
Settings management loading Supabase URL, Supabase Service/Anon Key, and App settings via Pydantic.

#### [NEW] [backend/app/db/supabase.py](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/backend/app/db/supabase.py)
Supabase client initialization and fallback database handler.

#### [NEW] [backend/app/schemas/schemas.py](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/backend/app/schemas/schemas.py)
Pydantic schemas for Product, OrderCreate, OrderResponse, RewardsAccount, WaitlistCreate, ArticleResponse.

#### [NEW] [backend/app/routers/product.py](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/backend/app/routers/product.py)
Endpoints for getting product details, variants, price config, FAQs, and bundle offers.

#### [NEW] [backend/app/routers/orders.py](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/backend/app/routers/orders.py)
Endpoints for creating demo orders, fetching order status by ID (`/api/v1/orders/{id}`), and tracking order timeline.

#### [NEW] [backend/app/routers/rewards.py](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/backend/app/routers/rewards.py)
Endpoints for fetching user rewards points, redeeming perks, and copying/generating referral codes (`NIX-XXXX`).

#### [NEW] [backend/app/routers/waitlist.py](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/backend/app/routers/waitlist.py)
Endpoint for registering users for the Emergency Kit waitlist.

#### [NEW] [backend/app/routers/notes.py](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/backend/app/routers/notes.py)
Endpoints for serving NIX Notes editorial content.

#### [NEW] [backend/app/routers/demo.py](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/backend/app/routers/demo.py)
Demo state reset endpoint (`POST /api/v1/demo/reset`) to reset cart, order history, rewards, and waitlist for presentation resets. Also clears corresponding local frontend state via the response.

---

### Frontend — Design System & Foundation

#### [NEW] [src/index.css](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/index.css)
Establish the Cherry Cream design system:
- **CSS custom properties** for all palette tokens (Deep Cherry, Cherry Red, Warm Cream, Soft Cocoa, Dusty Blush) + derived tonal variants for hover states, muted surfaces, borders
- **Typography scale**: Google Fonts — `DM Sans` (body/UI) + `Playfair Display` (editorial headlines). Hierarchy: hero (clamp 3–5rem), section headings (1.75–2.5rem), body (1rem), compact uppercase labels (0.75rem, letter-spacing 0.1em)
- **Border system**: `1px solid rgba(74, 48, 50, 0.12)` default, subtle shadows
- **Corner radius tokens**: small controls `8px`, inputs `10px`, cards `12–16px`, feature containers `20–24px`
- **Transition primitives**: `200ms ease` for micro-interactions
- **CSS reset** and base element styling (no `#000` text — use Soft Cocoa)

---

### Frontend — API & State Layer

#### [NEW] [src/api/client.ts](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/api/client.ts)
Axios API client configured with FastAPI base URL (`http://localhost:8000/api/v1`). Typed request/response wrappers for each endpoint group.

#### [NEW] [src/api/types.ts](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/api/types.ts)
TypeScript interfaces mirroring backend Pydantic schemas: `Product`, `Order`, `RewardsAccount`, `WaitlistEntry`, `Article`, `CartItem`, `BundleOption`.

#### [NEW] [src/context/AppContext.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/context/AppContext.tsx)
React Context providing:
- Cart state (add, remove, update quantity, clear) — synced with backend + localStorage fallback
- User/account state (demo user profile, orders, rewards)
- Waitlist state
- Demo reset function (calls `POST /api/v1/demo/reset` + clears local state)
- Optimistic UI updates with backend reconciliation

#### [NEW] [src/hooks/useAnalytics.ts](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/hooks/useAnalytics.ts)
Analytics-ready event dispatcher (PRD §36). Fires structured events for: `view_product`, `add_to_cart`, `remove_from_cart`, `begin_checkout`, `purchase`, `join_waitlist`, `join_rewards`, `referral_copy`, `reorder`, `view_note`. Currently logs to console; wired for future analytics provider.

---

### Frontend — Reusable Components (PRD §31)

#### [NEW] [src/components/common/Header.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/components/common/Header.tsx)
Desktop: `NIX logo → Shop | How It Works | Rewards | About → Account → Bag (count)`. Sticky on scroll with subtle bottom border. Mobile: clean hamburger → drawer navigation.

#### [NEW] [src/components/common/Footer.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/components/common/Footer.tsx)
Brand tagline, navigation columns (Shop, How It Works, Rewards, About, NIX Notes, Emergency Kit), support links, newsletter email input, social icon placeholders.

#### [NEW] [src/components/common/Button.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/components/common/Button.tsx)
Three variants: **Primary** (Deep Cherry bg, Cream text, Cherry Red hover), **Secondary** (transparent bg, Deep Cherry border, blush hover fill), **Text** (underline/arrow animation). Modest rounding, not full pills.

#### [NEW] [src/components/common/Toast.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/components/common/Toast.tsx)
Non-intrusive toast notification ("NIX added to your bag."). Auto-dismiss. No modal interruption.

#### [NEW] [src/components/common/Accordion.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/components/common/Accordion.tsx)
Expandable sections for product details (What is NIX?, How does it work?, Shipping & returns, etc.).

#### [NEW] [src/components/common/Modal.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/components/common/Modal.tsx)
Generic modal wrapper with overlay, close button, keyboard escape handling.

#### [NEW] [src/components/common/SectionHeading.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/components/common/SectionHeading.tsx)
Reusable section header with optional eyebrow label, headline, and supporting copy. Uses Playfair Display for headlines.

#### [NEW] [src/components/common/DemoResetButton.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/components/common/DemoResetButton.tsx)
Floating dev/demo utility button. Calls backend `POST /api/v1/demo/reset` + clears localStorage. Not visible to normal visitors (toggled via query param or keyboard shortcut).

#### [NEW] [src/components/product/ProductImage.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/components/product/ProductImage.tsx)
Replaceable product image slot. Subtle shadow, realistic proportions. Placeholder-ready for future photography.

#### [NEW] [src/components/product/ProductGallery.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/components/product/ProductGallery.tsx)
Swipeable gallery (mobile) / thumbnail selector (desktop). Slots: hero, close-up, in-hand, in-bag, packaging.

#### [NEW] [src/components/product/ProductCard.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/components/product/ProductCard.tsx)
Card for product display in grid contexts. Image, name, price, CTA.

#### [NEW] [src/components/product/QuantitySelector.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/components/product/QuantitySelector.tsx)
`− 1 +` control. Prevents quantity below 1.

#### [NEW] [src/components/product/AddToCartButton.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/components/product/AddToCartButton.tsx)
Primary CTA with immediate visual feedback. Updates cart count in header. Fires `add_to_cart` analytics event.

#### [NEW] [src/components/cart/CartItem.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/components/cart/CartItem.tsx)
Line item: product image, name, quantity selector, unit price, remove button, line total.

#### [NEW] [src/components/checkout/CheckoutForm.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/components/checkout/CheckoutForm.tsx)
Multi-step form with progress indicator: `Contact → Delivery → Payment → Confirmation`. Inline validation. Simulated payment UI with "PLACE DEMO ORDER" CTA.

#### [NEW] [src/components/checkout/OrderTimeline.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/components/checkout/OrderTimeline.tsx)
Visual timeline: Order confirmed ✓ → Packed ✓ → Shipped → Out for delivery → Delivered. Simulated progression.

#### [NEW] [src/components/rewards/RewardCard.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/components/rewards/RewardCard.tsx)
Points display with progress bar, next reward threshold, redeem CTA.

#### [NEW] [src/components/rewards/ReferralCard.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/components/rewards/ReferralCard.tsx)
Referral code display (`NIX-XXXX`), copy button, "REFER A FRIEND" CTA. Fires `referral_copy` analytics event.

#### [NEW] [src/components/content/WaitlistForm.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/components/content/WaitlistForm.tsx)
Email input + submit. Shows "You're on the list." after submission. Handles "already submitted" state.

#### [NEW] [src/components/content/ArticleCard.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/components/content/ArticleCard.tsx)
Editorial article card with image, title, excerpt. Featured variant (large) and standard variant (grid). Fires `view_note` analytics event.

---

### Frontend — Pages (PRD §08–§26)

#### [NEW] [src/pages/HomePage.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/pages/HomePage.tsx)
Full homepage with **all 6 PRD sections**:
1. **Hero** — "For the stain you didn't plan for." + product image + SHOP NIX / HOW IT WORKS CTAs
2. **The Problem** (§10 S2) — "It always happens at the worst time." Scenarios: college, work, commute, travel, gym. Emotional recognition, not fear.
3. **Meet NIX** (§11) — Product introduction. Deep Cherry background section with cream typography for contrast.
4. **How It Works Preview** (§12) — 4-step visual: Blot → Apply → Work it in → Wash. CTA: "SEE HOW IT WORKS"
5. **Why a Stick?** (§13) — Side-by-side comparison: Conventional stain remover vs NIX (format/use-case focus, no absolute competitor claims)
6. **Social Proof** (§14) — Placeholder testimonial slots. "Made for real-life emergencies." No fake ratings or stats.

#### [NEW] [src/pages/ShopPage.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/pages/ShopPage.tsx)
Premium beauty/FMCG product page layout (PRD §15, §57):
- Left: Large `ProductGallery`
- Right: Product name, short description, configurable price, `QuantitySelector`, ADD TO BAG / BUY NOW CTAs
- Below: `Accordion` sections (What is NIX?, How does it work?, When should I use it?, How do I carry it?, Product details, Shipping & returns)
- **Product Bundles section** (§16): Single, Duo, Campus Pack, Refill — with "COMING SOON" badges on future SKUs

#### [NEW] [src/pages/HowItWorksPage.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/pages/HowItWorksPage.tsx)
Standalone page (PRD §58). Editorial 4-step layout: horizontal on desktop, stacked on mobile. Step number + title + one-sentence explanation + optional image placeholder. Subtle connecting lines.

#### [NEW] [src/pages/CartPage.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/pages/CartPage.tsx)
Functional cart (§17). Product list with `CartItem` components, subtotal, estimated total, PROCEED TO CHECKOUT / CONTINUE SHOPPING CTAs. **Empty cart state**: "Your bag is empty." + "Keep a NIX close..." + SHOP NIX CTA.

#### [NEW] [src/pages/CheckoutPage.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/pages/CheckoutPage.tsx)
Prototype checkout (§18). `CheckoutForm` with Contact → Delivery → Payment steps. Simulated payment UI. "PLACE DEMO ORDER" CTA. Redirects to empty cart → Shop page. Inline field validation.

#### [NEW] [src/pages/OrderConfirmationPage.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/pages/OrderConfirmationPage.tsx)
Post-checkout confirmation (§19). "You're all set." Order number, product, quantity, total, delivery estimate. TRACK ORDER / GO TO MY NIX CTAs.

#### [NEW] [src/pages/OrderTrackingPage.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/pages/OrderTrackingPage.tsx)
Route: `/account/orders/:id` (§20). `OrderTimeline` component showing simulated shipping progression. Demonstrates post-purchase experience.

#### [NEW] [src/pages/AccountPage.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/pages/AccountPage.tsx)
Lightweight customer dashboard (§21). "Hey, [Name]." greeting. Overview cards: Orders, NIX Rewards points, Next replenishment, Referral status. Sections: Orders list, Rewards summary, **Replenishment** (§23 — "Never get caught without a backup." + Reorder CTA + "COMING SOON" subscription), Profile details.

#### [NEW] [src/pages/RewardsPage.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/pages/RewardsPage.tsx)
Rewards & retention page (§22, §59). "Good things come back around." Points system display (configurable values), progress bar, redemption tiers, `ReferralCard` with code generation.

#### [NEW] [src/pages/EmergencyKitPage.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/pages/EmergencyKitPage.tsx)
Future product reveal (§24, §60). "The NIX Emergency Kit." COMING SOON. Conceptual contents as placeholders. `WaitlistForm`. Expressive visual treatment within Cherry Cream system.

#### [NEW] [src/pages/NotesPage.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/pages/NotesPage.tsx)
Editorial magazine layout (§25, §61). "NIX Notes — Things worth knowing." Featured article (large) + 3–4 article cards grid. 5 sample articles on period/stain topics. No medical advice claims.

#### [NEW] [src/pages/AboutPage.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/pages/AboutPage.tsx)
Brand story (§26). The Insight → The Opportunity → The Vision. Closes with "Small enough to carry. Smart enough to matter."

---

### Frontend — Routing & App Shell

#### [NEW] [src/App.tsx](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/App.tsx)
React Router setup with all routes:
| Route | Page |
|---|---|
| `/` | HomePage |
| `/shop` | ShopPage |
| `/how-it-works` | HowItWorksPage |
| `/cart` | CartPage |
| `/checkout` | CheckoutPage |
| `/order-confirmation` | OrderConfirmationPage |
| `/account` | AccountPage |
| `/account/orders/:id` | OrderTrackingPage |
| `/rewards` | RewardsPage |
| `/emergency-kit` | EmergencyKitPage |
| `/notes` | NotesPage |
| `/about` | AboutPage |

Shared layout: `Header` + `<Outlet />` + `Footer` + `Toast` provider + `DemoResetButton`.

#### [NEW] [src/data/product.ts](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/src/data/product.ts)
Centralized product/config data structure (§30): name, description, price, images[], features[], details[], variants[], bundle options, rewards values, shipping estimate. Single source of truth for all product information — easy to swap placeholders.

---

### Frontend — SEO & Meta

#### [MODIFY] [index.html](file:///home/rishi/Coding/NIX-Period-Stain-Rescue-Stick-SAAS/index.html)
- Title: "NIX & CO. — Period Stain Rescue, Wherever Life Happens"
- Meta description: "NIX is a portable pre-treatment stick designed for fresh menstrual stains. Keep it close for the moments you don't plan for."
- Semantic HTML5 throughout
- Google Fonts preconnect for DM Sans + Playfair Display

---

## Verification Plan

### Automated Tests
- Backend: Run FastAPI with `uvicorn app.main:app --reload` and verify OpenAPI `/docs` endpoint responds with all 6 router groups.
- Frontend: `npm run build` for TypeScript type-checking and bundling.

### Manual & Subagent Visual Verification
- Start FastAPI backend on port 8000 and Vite dev server on port 5173.
- Execute browser subagent to test the **three pitch-critical journeys** (PRD §37):

**Journey 1 — Purchase Flow:**
1. Open Home → verify Cherry Cream branding, hero, problem section, product intro, how-it-works preview, comparison, social proof
2. Shop → verify product gallery, accordion, bundles → Add to Bag → verify toast & cart count
3. Cart → verify line items → Checkout → fill Contact/Delivery/Payment → PLACE DEMO ORDER
4. Order Confirmation → verify order details → TRACK ORDER
5. Account → verify order in history, rewards points updated

**Journey 2 — Discovery Flow:**
1. Home → Problem section → How It Works → Shop

**Journey 3 — Expansion Flow:**
1. Home → Emergency Kit → JOIN THE WAITLIST → verify "You're on the list."

**Additional checks:**
- Mobile responsiveness at 375px, 390px, 430px
- Demo Reset clears all state (cart, orders, rewards, waitlist)
- NIX Notes page loads sample articles
- Rewards page shows points system and referral code
