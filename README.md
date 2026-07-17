# bAI

AI-native SaaS platform built with Next.js (App Router), TypeScript, Tailwind CSS, and shadcn/ui.

## Stack

- **Next.js** App Router + TypeScript
- **Tailwind CSS** v4
- **shadcn/ui** (Base UI / Nova style)
- Path aliases via `@/*`

## Project structure

```text
app/                 # Routes, layouts, and global styles
components/
  ui/                # shadcn/ui primitives
  layout/            # Shared chrome (header, etc.)
  marketing/         # Landing / marketing sections
lib/                 # Utilities, constants, env helpers
types/               # Shared TypeScript types
public/              # Static assets
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Copy `.env.example` to `.env.local` and fill in values as needed.

## Scripts

| Command         | Description              |
| --------------- | ------------------------ |
| `npm run dev`   | Start development server |
| `npm run build` | Production build         |
| `npm run start` | Start production server  |
| `npm run lint`  | Run ESLint               |

## UI components

shadcn/ui is configured via `components.json`. Add more components with:

```bash
npx shadcn@latest add <component>
```

## Deploy

Deploy on [Vercel](https://vercel.com) or any Node.js host that supports Next.js. Set `NEXT_PUBLIC_APP_URL` to your production URL before shipping.
