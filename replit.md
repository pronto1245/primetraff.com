# Traffic Arbitrage Partner Hub

## Overview

A traffic arbitrage partner dashboard application built with React frontend and Express backend. The platform allows partners to register, track metrics, and manage their traffic arbitrage activities. The UI is designed following a modern dashboard pattern inspired by Linear, Stripe Dashboard, and Vercel Analytics, focusing on data clarity and professional credibility.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript, using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state management
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming (light/dark mode support)
- **Form Handling**: React Hook Form with Zod validation schemas
- **Design System**: Inter font, modern dashboard pattern with clean metrics cards and fixed sidebar navigation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Server**: Node.js with HTTP server (supports WebSocket upgrade if needed)
- **API Pattern**: RESTful API with `/api` prefix for all routes
- **Build System**: esbuild for server bundling, Vite for client bundling

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: `shared/schema.ts` for shared type definitions between client and server
- **Validation**: Zod schemas generated from Drizzle schemas using drizzle-zod
- **Current Storage**: In-memory storage implementation (`MemStorage`) with interface for database migration

### Project Structure
```
├── client/           # Frontend React application
│   ├── src/
│   │   ├── components/ui/  # shadcn/ui components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utilities and query client
│   │   └── pages/          # Page components
├── server/           # Backend Express application
│   ├── index.ts      # Server entry point
│   ├── routes.ts     # API route definitions
│   ├── storage.ts    # Data storage interface
│   └── vite.ts       # Vite dev server integration
├── shared/           # Shared code between client and server
│   └── schema.ts     # Database schema and types
└── migrations/       # Drizzle database migrations
```

### Path Aliases
- `@/*` maps to `./client/src/*`
- `@shared/*` maps to `./shared/*`
- `@assets/*` maps to `./attached_assets/*`

## External Dependencies

### Database
- **PostgreSQL**: Primary database (configured via `DATABASE_URL` environment variable)
- **Drizzle Kit**: Database migration and schema push tool

### UI/Component Libraries
- **Radix UI**: Headless UI primitives for accessible components
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Embla Carousel**: Carousel component
- **Recharts**: Charting library for data visualization

### Form & Validation
- **React Hook Form**: Form state management
- **Zod**: Schema validation
- **@hookform/resolvers**: Zod resolver for React Hook Form

### Build & Development
- **Vite**: Frontend build tool with HMR
- **esbuild**: Server bundling
- **tsx**: TypeScript execution for development

### Session & Auth (Available)
- **express-session**: Session management
- **connect-pg-simple**: PostgreSQL session store
- **passport / passport-local**: Authentication (configured but not implemented)

### Other Services (Available for Integration)
- **Stripe**: Payment processing
- **Nodemailer**: Email sending
- **OpenAI / Google Generative AI**: AI integrations
- **Multer**: File upload handling