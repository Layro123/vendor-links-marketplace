import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getProductById } from '@/lib/products';

const EMAILJS_SERVICE_ID = 'service_x84hi2r';
const EMAILJS_TEMPLATE_ID = 'template_hzv0bvs';
const EMAILJS_PUBLIC_KEY = 'eDKfLzs3ebdIYep42';

export async function POST(request: Request) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
  const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!stripeSecretKey || !stripeWebhookSecret) {
    console.error('Missing environment variables');
    return NextResponse.json({ error: 'Server configuration error' }, { status: 500 });
  }

  const stripe = new Stripe(stripeSecretKey.trim(), {
    apiVersion: '2025-12-15.clover',
  });

  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, stripeWebhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerEmail = session.customer_details?.email;
    const productIds = session.metadata?.productIds?.split(',') || [];

    if (!customerEmail || productIds.length === 0) {
      console.error('Missing email or products');
      return NextResponse.json({ error: 'Missing data' }, { status: 400 });
    }

    const purchasedProducts = productIds
      .map(id => getProductById(id))
      .filter(Boolean);

    if (purchasedProducts.length === 0) {
      console.error('No valid products found');
      return NextResponse.json({ error: 'No products' }, { status: 400 });
    }

    // Build email HTML
    const productSections = purchasedProducts.map(product => {
      const contactsHtml = product!.digitalContent.contacts
        .map(c => `
          <div style="background: #1a1a1a; padding: 16px; border-radius: 8px; margin-bottom: 12px;">
            <div style="color: #26FF00; font-size: 12px; text-transform: uppercase; margin-bottom: 4px;">${c.platform}</div>
            <div style="color: white; font-size: 18px; font-family: monospace;">${c.contact}</div>
            ${c.notes ? `<div style="color: #888; font-size: 14px; margin-top: 8px;">${c.notes}</div>` : ''}
          </div>
        `)
        .join('');

      return `
        <div style="background: #0a0a0a; border: 1px solid #333; border-radius: 12px; padding: 24px; margin-bottom: 24px;">
          <h2 style="color: white; margin: 0 0 20px 0; font-size: 20px;">${product!.digitalContent.title}</h2>
          ${contactsHtml}
          ${product!.digitalContent.additionalInfo ? `
            <div style="background: #111; padding: 16px; border-radius: 8px; margin-top: 16px;">
              <p style="color: #ccc; margin: 0; font-size: 14px;">${product!.digitalContent.additionalInfo}</p>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');

    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="background: #000; margin: 0; padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
          <div style="max-width: 600px; margin: 0 auto;">
            <div style="text-align: center; margin-bottom: 40px;">
              <h1 style="color: white; margin: 0 0 8px 0; font-size: 28px;">AJResells</h1>
              <p style="color: #26FF00; margin: 0; font-size: 16px;">Your Purchase is Complete!</p>
            </div>

            <div style="background: #26FF00; color: black; padding: 20px; border-radius: 12px; text-align: center; margin-bottom: 32px;">
              <p style="margin: 0; font-size: 18px; font-weight: bold;">Thank you for your order!</p>
              <p style="margin: 8px 0 0 0; font-size: 14px;">Your vendor contacts are below.</p>
            </div>

            ${productSections}

            <div style="background: #1a1a00; border: 1px solid #444400; padding: 16px; border-radius: 8px; margin-top: 24px;">
              <p style="color: #ffff88; margin: 0; font-size: 13px;">
                <strong>Important:</strong> Save this email! Per our terms of service, please do not share or redistribute this vendor information.
              </p>
            </div>

            <div style="text-align: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid #333;">
              <p style="color: #666; margin: 0; font-size: 12px;">
                &copy; 2025 AJResells. All rights reserved.
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    try {
      const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          accessToken: 'o60c6ZNF5hpirhCOdAjbZ',
          template_params: {
            to_email: customerEmail,
            subject: 'Your AJResells Order - Vendor Contacts Inside',
            message: emailHtml,
          },
        }),
      });

      if (emailResponse.ok) {
        console.log(`Email sent to ${customerEmail}`);
      } else {
        const errorText = await emailResponse.text();
        console.error('EmailJS error:', errorText);
      }
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
    }
  }

  return NextResponse.json({ received: true });
}
