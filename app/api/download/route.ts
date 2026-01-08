// app/api/download/route.ts
import { NextResponse } from "next/server";
import Stripe from "stripe";
import fs from "fs";
import path from "path";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return new NextResponse("Session-ID fehlt", { status: 400 });
  }

  let session;

  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return new NextResponse("Ungültige Stripe-Session", { status: 400 });
  }

  if (session.payment_status !== "paid") {
    return new NextResponse("Zahlung nicht abgeschlossen", { status: 403 });
  }

  // 🔐 HIER ist der geschützte Bereich
  const filePath = path.join(
    process.cwd(),
    "public",
    "generated",
    "lebenslauf.pdf"
  );

  if (!fs.existsSync(filePath)) {
    return new NextResponse("PDF nicht gefunden", { status: 404 });
  }

  const fileBuffer = fs.readFileSync(filePath);

  return new NextResponse(fileBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="lebenslauf.pdf"',
    },
  });
}
