import { NextResponse } from "next/server";
import Stripe from "stripe";
import crypto from "crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-12-15.clover",
});

// Mini-In-Memory-Store (für lokal & MVP völlig okay)
const usedSessions = new Set<string>();
const downloadTokens = new Map<string, { sessionId: string; expires: number }>();

export async function POST(req: Request) {
  try {
    const { sessionId } = await req.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session-ID fehlt" },
        { status: 400 }
      );
    }

    // Session darf nicht mehrfach benutzt werden
    if (usedSessions.has(sessionId)) {
      return NextResponse.json(
        { error: "Session bereits verwendet" },
        { status: 403 }
      );
    }

    // Stripe prüfen
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
      return NextResponse.json(
        { error: "Zahlung nicht abgeschlossen" },
        { status: 402 }
      );
    }

    // Token erzeugen
    const token = crypto.randomUUID();

    // Token 10 Minuten gültig
    downloadTokens.set(token, {
      sessionId,
      expires: Date.now() + 10 * 60 * 1000,
    });

    // Session markieren
    usedSessions.add(sessionId);

    return NextResponse.json({ token });

  } catch (err) {
    console.error("Download-Token Fehler:", err);
    return NextResponse.json(
      { error: "Interner Serverfehler" },
      { status: 500 }
    );
  }
}

// Export für nächste Route (Download)
export function getDownloadToken(token: string) {
  const entry = downloadTokens.get(token);

  if (!entry) return null;
  if (Date.now() > entry.expires) {
    downloadTokens.delete(token);
    return null;
  }

  // Token nur einmal gültig
  downloadTokens.delete(token);
  return entry.sessionId;
}
