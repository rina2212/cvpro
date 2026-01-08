import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST() {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: ["card"],

      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: 499, // 4,99 € – Beispielpreis
            product_data: {
              name: "CVPro – Lebenslauf als PDF",
              description:
                "Professionell strukturierter Lebenslauf, KI-unterstützt erstellt und direkt als PDF verfügbar.",
            },
          },
        },
      ],

      success_url:
        "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",

      cancel_url: "http://localhost:3000",

      customer_creation: "always",

      billing_address_collection: "auto",

      allow_promotion_codes: false,

      metadata: {
        product: "cvpro_lebenslauf_pdf",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Checkout Fehler:", err);
    return NextResponse.json(
      { error: "Checkout konnte nicht gestartet werden." },
      { status: 500 }
    );
  }
}
