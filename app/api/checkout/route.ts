import Stripe from "stripe";
import { NextResponse } from "next/server";

export async function POST() {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;

  if (!stripeSecret) {
    return NextResponse.json(
      { error: "STRIPE_SECRET_KEY missing" },
      { status: 500 }
    );
  }

  const stripe = new Stripe(stripeSecret);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: "CVPro – Lebenslauf",
          },
          unit_amount: 1999,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
  });

  return NextResponse.json({ url: session.url });
}
