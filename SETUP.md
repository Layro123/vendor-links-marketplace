# AJResells - Client Setup Guide

## Step 1: Setup on Your Laptop

1. Unzip the `ajresells-handover.zip` file
2. Open Terminal and navigate to the folder:
   ```bash
   cd ajresells
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

---

## Step 2: Create Your Accounts

### Vercel (Hosting - Free)
1. Go to https://vercel.com
2. Sign up with GitHub or email
3. Keep this tab open

### Stripe (Payments)
1. Go to https://stripe.com
2. Create account
3. Go to https://dashboard.stripe.com/apikeys
4. Copy your **Secret key**

### Resend (Emails - Free)
1. Go to https://resend.com
2. Create account
3. Go to https://resend.com/api-keys
4. Create and copy API key

---

## Step 3: Deploy to Vercel

1. In Terminal, run:
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```
2. Follow the prompts (accept defaults)
3. Note your site URL (e.g., `https://ajresells.vercel.app`)

---

## Step 4: Setup Stripe Webhook

1. Go to https://dashboard.stripe.com/webhooks
2. Click **Add endpoint**
3. URL: `https://YOUR-SITE.vercel.app/api/webhook`
4. Select event: `checkout.session.completed`
5. Click **Add endpoint**
6. Copy the **Signing secret** (starts with `whsec_`)

---

## Step 5: Add Environment Variables

1. Go to https://vercel.com → Your project → Settings → Environment Variables
2. Add these:

| Name | Value |
|------|-------|
| `STRIPE_SECRET_KEY` | sk_live_... (from Stripe) |
| `STRIPE_WEBHOOK_SECRET` | whsec_... (from webhook) |
| `RESEND_API_KEY` | re_... (from Resend) |
| `NEXT_PUBLIC_BASE_URL` | https://YOUR-SITE.vercel.app |

3. Click Save
4. Go to Deployments → Redeploy

---

## Step 6: Update Vendor Contacts

Edit `lib/products.ts` - replace placeholder contacts with real ones:

```typescript
contacts: [
  { platform: 'WhatsApp', contact: '+86 123 456 7890', notes: 'Main contact' },
  { platform: 'WeChat', contact: 'vendor_wechat_id' },
],
```

Then redeploy:
```bash
vercel --prod
```

---

## Step 7: (Optional) Custom Domain

1. In Vercel → Settings → Domains
2. Add your domain
3. Update DNS records as shown
4. Update `NEXT_PUBLIC_BASE_URL` env variable
5. Update Stripe webhook URL

---

## Testing

1. Use Stripe test keys (sk_test_...)
2. Card: `4242 4242 4242 4242`, any future date, any CVC
3. Check email arrives with vendor contacts

---

## How It Works

1. Customer adds to cart → Checkout
2. Pays on Stripe (enters email)
3. Email sent automatically with vendor contacts
4. Success page also shows contacts
