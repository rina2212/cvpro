import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import crypto from "crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    return NextResponse.json({ error: "Webhook error" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // 🔐 Einmaligen Download-Token erzeugen
    const downloadToken = crypto.randomUUID();

    // 👉 HIER speicherst du den Token
    // z.B. Datenbank, Datei, Redis – fürs Erste simuliert:
    console.log("PDF freigeben mit Token:", downloadToken);

    // Optional: Kunde + Token speichern
    // await saveToken({ token: downloadToken, used: false });

    // Optional: Mail mit Download-Link
    // https://deine-seite.de/download?token=XYZ
  }

  return NextResponse.json({ received: true });
}
