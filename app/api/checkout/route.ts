import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST() {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "STRIPE_SECRET_KEY fehlt" },
      { status: 500 }
    );
  }

  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    return NextResponse.json(
      { error: "NEXT_PUBLIC_BASE_URL fehlt" },
      { status: 500 }
    );
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: "Lebenslauf Premium",
          },
          unit_amount: 1499,
        },
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/generator`,
  });

  return NextResponse.json({ url: session.url });
}