// app/success/page.tsx
import Stripe from "stripe";
import Link from "next/link";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

type Props = {
  searchParams: {
    session_id?: string;
  };
};

export default async function SuccessPage({ searchParams }: Props) {
  const sessionId = searchParams.session_id;

  if (!sessionId) {
    return (
      <div style={{ padding: 40 }}>
        <h1>❌ Fehler</h1>
        <p>Keine Session-ID gefunden.</p>
      </div>
    );
  }

  let session;

  try {
    session = await stripe.checkout.sessions.retrieve(sessionId);
  } catch (err) {
    return (
      <div style={{ padding: 40 }}>
        <h1>❌ Fehler</h1>
        <p>Stripe-Session konnte nicht geladen werden.</p>
      </div>
    );
  }

  if (session.payment_status !== "paid") {
    return (
      <div style={{ padding: 40 }}>
        <h1>⏳ Zahlung noch nicht abgeschlossen</h1>
        <p>Bitte schließe den Zahlungsvorgang ab.</p>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>🎉 Zahlung erfolgreich</h1>
      <p>Vielen Dank für deine Zahlung.</p>

      <Link href={`/api/download?session_id=${sessionId}`}>
        <button
          style={{
            marginTop: 20,
            padding: "12px 24px",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          PDF herunterladen
        </button>
      </Link>
    </div>
  );
}
