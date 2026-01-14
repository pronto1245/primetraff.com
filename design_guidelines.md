# Traffic Arbitrage Partner Landing Page - Design Guidelines

## Design Approach
**Selected Approach:** Dark Professional SaaS Landing (inspired by primetrack.pro, Linear, Stripe)
**Rationale:** Dark aesthetic conveys sophistication and technical credibility for affiliate marketing professionals. Glass-morphism and subtle gradients create depth while maintaining data-focused clarity.

## Color System

### Background Layers
- **Base:** Slate-950 (#020617) - deepest background
- **Elevated:** Slate-900 (#0f172a) - cards and sections
- **Borders:** Slate-800 with 50% opacity - subtle separators

### Green Accent Scale
- **Primary CTA:** Emerald-500 (#10b981) - buttons, key actions
- **Hover State:** Emerald-400 (#34d399)
- **Success/Trust:** Emerald-600 (#059669) - badges, metrics
- **Glow Effects:** Emerald-500 at 20% opacity

### Text Hierarchy
- **Headings:** White (100% opacity)
- **Body:** Slate-300 (#cbd5e1) - 90% opacity
- **Muted/Labels:** Slate-400 (#94a3b8) - 70% opacity

## Typography
- **Font:** Inter (Google Fonts) - weights 400, 500, 600, 700
- **Hero Headline:** text-5xl lg:text-7xl font-bold leading-tight
- **Section Titles:** text-3xl lg:text-4xl font-bold
- **Feature Headers:** text-xl font-semibold
- **Body Text:** text-base lg:text-lg leading-relaxed
- **Metrics/Numbers:** text-4xl lg:text-6xl font-bold tabular-nums

## Layout System
**Spacing:** Tailwind units of 4, 6, 8, 12, 16, 20, 24
- Section padding: py-20 lg:py-32
- Component gaps: gap-8 lg:gap-12
- Container: max-w-7xl mx-auto px-6 lg:px-8

## Glass-Morphism System

### Card Treatment
- Background: Slate-900 with 60% opacity (bg-slate-900/60)
- Backdrop blur: backdrop-blur-xl
- Border: 1px slate-700/50 with subtle gradient
- Inner glow: Inset shadow with emerald-500/10

### Gradient Overlays
- **Radial accents:** Emerald-500/20 to transparent, positioned behind sections
- **Mesh backgrounds:** Subtle grid pattern overlay at 5% opacity on base layer
- **Hero gradient:** Dark gradient from slate-950 to slate-900/50 over hero image

## Component Library

### Hero Section (Full Viewport Height Allowed)
- **Background:** Large professional image (arbitrage dashboard, analytics, or abstract tech) with dark gradient overlay (slate-950 to transparent)
- **Content:** Centered headline + subheading + dual CTA (primary emerald + secondary outline)
- **Trust Badge Row:** Small logos or metrics strip below CTAs (transparent white at 60%)
- **Buttons on image:** Blurred glass background (backdrop-blur-md bg-slate-900/40)

### Feature Grid
- 3-column grid on desktop (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Glass-morphism cards with emerald icon (h-12 w-12 in gradient circle)
- Heading + description + optional "Learn more" micro-link
- Hover: Subtle lift (translate-y-1) and increased glow

### Stats/Metrics Bar
- 4-column grid of numbers (responsive to 2-col mobile)
- Large emerald numbers with white labels below
- Animated counter effect (implementation detail, not design)
- Dark glass background strip

### Trust Section
- Customer logos in 4-5 column grid
- Testimonial cards (2-col grid) with glass treatment
- Client photo (rounded-full h-12 w-12) + quote + name/title
- 5-star rating display in emerald

### Dashboard Preview
- Full-width section with glass-bordered mockup
- Screenshot/mockup of partner dashboard embedded
- Subtle emerald glow around dashboard frame
- Caption describing key features below

### Pricing Cards (If Applicable)
- 3-tier layout with glass cards
- Center card elevated and highlighted (border-emerald-500)
- Feature checklist with emerald checkmarks (Heroicons)
- CTA button at bottom of each card

### CTA Section
- Full-width dark section with radial emerald gradient background
- Centered headline + button + supporting text
- High contrast against other sections

### Footer
- 4-column grid (Company, Product, Resources, Legal) on desktop
- Social icons (Heroicons) in slate-400
- Newsletter signup with glass input field + emerald button
- Copyright and links in slate-500

## Navigation

### Header
- Sticky with backdrop-blur-xl and dark semi-transparent background
- Logo (white/emerald) left-aligned (h-8)
- Nav links in slate-300 with emerald active state
- Primary CTA button (emerald-500) right-aligned
- Mobile: Hamburger with slide-out dark drawer

## Images

### Required Images
1. **Hero Background:** High-quality image showing dashboard analytics, traffic graphs, or professional workspace. Should be 1920x1080+ resolution with people or abstract tech themes. Position: cover with dark overlay gradient
2. **Dashboard Preview:** Screenshot of partner dashboard interface (1200x800). Position: centered in preview section with subtle shadow
3. **Trust/Social Proof:** Optional partner/client logos (SVG format preferred, white at 60% opacity)

### Image Treatment
- All images receive dark overlay or gradient for text legibility
- Glass borders (border border-slate-700/50) around product screenshots
- Emerald glow effects (shadow-emerald-500/20) on hover

## Icons
**Library:** Heroicons (outline style) via CDN
**Usage:** h-6 w-6 for features, h-5 w-5 for nav, stroke-2 weight
**Colors:** Emerald-500 for primary icons, slate-400 for secondary

## Responsive Behavior
- Mobile (<768px): Single column stacks, larger touch targets (min-h-12)
- Tablet (768-1024px): 2-column grids
- Desktop (>1024px): Full multi-column layouts, max-w-7xl containers

## Effects & Animations
- Smooth scroll behavior
- Button hover: scale-105 + increased shadow + emerald glow
- Card hover: Subtle translate-y lift
- Page load: Fade-in sections (staggered, subtle)
- NO carousel/slider animations - static grid layouts only

## Page Structure (7 Sections)
1. Hero with image background + CTAs + trust badge
2. Features grid (6-9 feature cards)
3. Stats/metrics bar
4. Dashboard preview showcase
5. Testimonials (3-4 customer quotes)
6. Pricing (if applicable) or Final CTA section
7. Footer with newsletter + links