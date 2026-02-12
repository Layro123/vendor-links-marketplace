# AJResells

Premium vendor contacts marketplace for resellers.

**Live Site:** https://vendor-links-marketplace.vercel.app

## Quick Start

See [SETUP.md](./SETUP.md) for complete setup instructions.

### Required Steps Before Launch:
1. Add Stripe API keys to Vercel environment variables
2. Update vendor contacts in `lib/products.ts`
3. Redeploy

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- Stripe Payments
- Vercel Hosting

## Local Development

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Deploy

```bash
vercel --prod
```
