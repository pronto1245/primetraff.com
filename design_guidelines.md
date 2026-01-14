# Traffic Arbitrage Partner Hub - Design Guidelines

## Design Approach
**Selected Approach:** Design System - Modern Dashboard Pattern
**Inspiration:** Linear (clean, data-focused), Stripe Dashboard (professional metrics), Vercel Analytics (clarity)
**Rationale:** Partner dashboards require clarity, data density, and professional credibility. Focus on information hierarchy and efficient navigation over decorative elements.

## Core Design Elements

### Typography
- **Primary Font:** Inter (Google Fonts) - excellent for data and dashboards
- **Hierarchy:**
  - Page Titles: text-3xl font-bold
  - Section Headers: text-xl font-semibold
  - Data Labels: text-sm font-medium uppercase tracking-wide
  - Body Text: text-base
  - Metrics/Numbers: text-2xl to text-4xl font-bold (tabular-nums)

### Layout System
**Spacing Primitives:** Tailwind units of 3, 4, 6, 8, 12
- Component padding: p-6 or p-8
- Section gaps: gap-6 or gap-8
- Page margins: px-6 lg:px-8
- Card spacing: space-y-6

**Grid Structure:**
- Sidebar: Fixed 240px (hidden on mobile, slide-over drawer)
- Main content: Flexible, max-w-7xl
- Dashboard cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3

## Component Library

### Navigation
**Sidebar (Desktop):**
- Fixed left sidebar with logo at top
- Vertical nav links with icons (Heroicons outline)
- Active state with subtle background
- User profile at bottom with avatar and name
- Collapsible sections for organized menu groups

**Mobile Navigation:**
- Hamburger menu triggering slide-over drawer
- Same sidebar content in overlay format

### Dashboard Components

**Metric Cards:**
- White background cards with rounded corners (rounded-lg)
- Metric label (small, muted text)
- Large number display with trend indicator
- Sparkline or percentage change
- Compact padding (p-6)

**Data Tables:**
- Sticky header row
- Striped rows for readability (alternate subtle background)
- Right-aligned numerical columns
- Action buttons in last column
- Pagination controls at bottom
- Sortable column headers with icons

**Charts:**
- Use Chart.js or Recharts library via CDN
- Line charts for trends over time
- Bar charts for comparisons
- Donut charts for distribution
- Consistent spacing around charts (p-8)

**Filter Bar:**
- Horizontal bar above content
- Date range picker, status dropdowns, search input
- Apply/Reset buttons grouped on right
- Responsive: stack vertically on mobile

### Forms & Inputs
**Text Inputs:**
- Consistent height (h-10)
- Border with focus ring
- Label above input (text-sm font-medium mb-2)
- Helper text below if needed

**Buttons:**
- Primary: Solid background, white text
- Secondary: Border with transparent background
- Sizes: px-4 py-2 (default), px-6 py-3 (large)
- Icon + text combinations supported

**Select/Dropdowns:**
- Native select styled consistently
- Custom dropdown for complex selections
- Icons indicating dropdown state

### Status Indicators
**Badges:**
- Small, rounded-full pills
- Success, Warning, Error, Info states
- Used for statuses, tags, labels
- Consistent sizing (px-2.5 py-0.5 text-xs)

### Empty States
- Centered content with icon
- Helpful message explaining why empty
- CTA button if actionable
- Use in tables, lists, and dashboards

## Page Layouts

### Dashboard Home
- Top: Quick stats grid (3-4 metric cards)
- Middle: Revenue/Traffic chart (full width)
- Bottom: Recent activity table + Top performing campaigns (2 columns)

### Reports/Analytics Page
- Filter bar at top
- Chart visualization area
- Detailed data table below
- Export button in top-right

### Campaign Management
- List view with table
- Filters and search in header
- Bulk actions toolbar when items selected
- Click row to view details (slide-out panel or new page)

### Profile/Settings
- Two-column layout (md:grid-cols-3)
- Left: Navigation tabs (sticky)
- Right: Form content (md:col-span-2)

## Images
**Logo Placement:** 
- Sidebar header (h-8)
- Login page centered (h-12)

**Profile Images:**
- User avatars in sidebar and header (h-10 w-10 rounded-full)
- Partner logos in tables/lists (h-8 w-8)

**Empty State Illustrations:**
- Centered in empty table/list states (h-48 w-48)
- Simple line illustrations or icons

**No Hero Image:** This is a utility dashboard, not a marketing site. Focus on data presentation and efficient workflows.

## Responsive Behavior
- **Mobile (<768px):** Single column, stacked cards, hamburger navigation
- **Tablet (768-1024px):** 2-column grids, visible sidebar
- **Desktop (>1024px):** 3-column grids, full layout

## Animations
Minimal and purposeful only:
- Smooth sidebar transitions (duration-200)
- Dropdown menu fade-in
- Loading states for data fetching
- No decorative animations

## Icons
**Library:** Heroicons via CDN (outline for nav, solid for badges/actions)
**Usage:**
- Navigation items (h-5 w-5)
- Metric cards (h-6 w-6)
- Table actions (h-4 w-4)
- Consistent stroke-width and sizing