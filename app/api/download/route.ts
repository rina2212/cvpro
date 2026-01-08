import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json(
      { error: "Session ID fehlt" },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Zahlung nicht abgeschlossen" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      downloadUrl: "/pdf/lebenslauf-premium.pdf",
    });
  } catch (error) {
    console.error("Stripe Download Error:", error);
    return NextResponse.json(
      { error: "Download nicht erlaubt" },
      { status: 500 }
    );
  }
}
