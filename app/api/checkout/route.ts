import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getProductById } from '@/lib/products';

export async function POST(request: Request) {
  try {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeSecretKey) {
      return NextResponse.json(
        { error: 'Stripe is not configured. Please add STRIPE_SECRET_KEY to environment variables.' },
        { status: 500 }
      );
    }

    const stripe = new Stripe(stripeSecretKey.trim(), {
      apiVersion: '2025-04-30.basil',
    });

    const { productIds } = await request.json();

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json({ error: 'No products in cart' }, { status: 400 });
    }

    const lineItems = [];
    for (const productId of productIds) {
      const product = getProductById(productId);
      if (!product) {
        return NextResponse.json({ error: `Product ${productId} not found` }, { status: 404 });
      }
      lineItems.push({
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
          },
          unit_amount: product.price,
        },
        quantity: 1,
      });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}&products=${productIds.join(',')}`,
      cancel_url: `${baseUrl}/#products`,
      allow_promotion_codes: true,
      metadata: {
        productIds: productIds.join(','),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    const message = error instanceof Error ? error.message : 'Failed to create checkout session';
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
