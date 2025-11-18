# Workflow Console

## Overview

**Workflow Console** is a read-only web visualization tool for multi-Coach collaboration workflows. It displays structured workflow-log JSON data as an interactive timeline, showing how context flows between different Coach/tool actors in the AgentOS system. The application serves as a prototype for workflow replay and documentation, presenting a single high-impact collaboration narrative (6–12 steps) from information source processing through demo snippet generation.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- React 19.2.0 with TypeScript
- Vite 7.2.2 for build tooling
- Tailwind CSS 4.1.17 for styling
- shadcn/ui component library (New York style variant)
- Lucide React for icons

**Component Hierarchy:**
```
App
└── WorkflowConsolePage (main container)
    ├── SessionHeader (sticky header with metadata)
    ├── FlowMap (horizontal scrollable node sequence)
    │   └── StepNode (×N clickable workflow steps)
    └── StepDetailPanel (bottom detail view)
```

**State Management:**
- Simple useState hooks for:
  - Selected step ID (controls detail panel)
  - Session data (loaded from JSON)
  - Loading/error states
- No external state management library required

**Data Flow:**
1. Fetch `workflow-log-sample.json` from public directory
2. Parse into WorkflowSession interface
3. Sort steps by order field
4. Render as interactive flow
5. Click events update selected state
6. Detail panel reactively displays selected step

### Design System

**Color Palette (Light Mode Primary):**
- Background: `hsl(0 0% 98%)` - Light gray-white
- Card: `hsl(0 0% 100%)` - Pure white
- Primary: `hsl(217 91% 60%)` - Blue for interactions
- Accent: `hsl(142 76% 36%)` - Green for success states
- Border: `hsl(214 15% 91%)` - Subtle gray borders

**Actor-Specific Colors:**
- Coach C: Blue (`hsl(217 91% 60%)`)
- Coach A: Green (`hsl(142 76% 36%)`)
- Coach E: Purple (`hsl(271 81% 56%)`)
- Tools (Replit, etc.): Orange (`hsl(25 95% 53%)`)
- Knowledge Garden: Emerald

**Typography:**
- System font stack with fallbacks
- Hierarchy: 2xl (headers) → lg (cards) → base (body) → sm (metadata)
- Semantic font weights: 400, 500, 600, 700

**Spacing & Layout:**
- Tailwind spacing units: 4, 6, 8, 12, 16, 24, 32
- Container: `max-w-7xl mx-auto px-6`
- Border radius: 9px (lg), 6px (md), 3px (sm)
- Consistent vertical rhythm with py-6, py-8, py-12

### Data Model

**Schema Definition** (`docs/workflow-log-schema.md`):
- WorkflowSession: Top-level container with session metadata
  - session_id (unique identifier)
  - title (display name)
  - created_at (ISO 8601 timestamp)
  - description (narrative summary)
  - steps[] (array of Step objects)

- Step: Individual workflow hop/transition
  - id, order (sequencing)
  - timestamp (ISO 8601)
  - actor (Coach/tool name)
  - skill (optional workflow name)
  - tool (execution environment)
  - input_label, output_label (I/O descriptions)
  - summary (optional action description)
  - tags[] (optional categorization)

**Type Safety:**
- Full TypeScript interfaces in `src/types/workflow.ts`
- Strict type checking enabled
- No any types allowed

### Build Configuration

**Vite Setup:**
- Dev server: `host: 0.0.0.0, port: 5000, strictPort: true, allowedHosts: true`
- Tailwind CSS v4 integration via `@tailwindcss/vite` plugin
- Path alias: `@/` → `./src/`
- React plugin with Fast Refresh
- Build output to `dist/`
- **Important**: `allowedHosts: true` is required for Replit preview to work with dynamic hostnames

**TypeScript Config:**
- Target: ES2022
- Module: ESNext
- Strict mode enabled
- Path mapping for @ alias
- Separate configs for app and node

**Tailwind Configuration:**
- CSS variables for theming
- New York style variant (shadcn/ui)
- Custom color extensions via HSL
- Autoprefixer for browser compatibility

### Development Workflow

**Git Strategy:**
- This project is a submodule within `obsidian-vault/projects/workflow-console/`
- Independent GitHub repo: `agentos-workflow-console`
- Daily development happens independently
- Milestone updates (v0.1, v0.2) sync back to parent vault

**Deployment:**
- Target platform: Replit
- Static file serving from `client/public/`
- JSON data loaded from `/data/workflow-log-sample.json`

## External Dependencies

### UI Component Library
- **shadcn/ui**: Unstyled, accessible component primitives
  - Badge, Button, Card, Separator components
  - Class variance authority for variant styling
  - Tailwind merge for className composition

### Icon Library
- **Lucide React**: Modern icon set (ArrowRight, Clock icons)

### Styling
- **Tailwind CSS v4**: Utility-first CSS framework with native Vite integration
  - Uses `@tailwindcss/vite` plugin for optimal performance
  - CSS-first configuration via `@import "tailwindcss"` in index.css
  - Custom color system via CSS variables (HSL format)
  - Custom animations defined in tailwind.config.ts

### Development Tools
- **ESLint**: Code linting with TypeScript support
- **TypeScript ESLint**: TypeScript-specific lint rules
- **Vite**: Build tool and dev server
- **PostCSS**: CSS processing pipeline

### Type Definitions
- `@types/node`: Node.js type definitions
- `@types/react`, `@types/react-dom`: React type definitions

### No Backend Dependencies
- No database (read-only JSON data)
- No API server (static file hosting only)
- No authentication (public read-only application)
- No real-time features (static visualization)