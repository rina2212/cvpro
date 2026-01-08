"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <main style={{ padding: "60px", textAlign: "center" }}>
      <h1>✅ Zahlung erfolgreich</h1>

      <p style={{ marginTop: "16px" }}>
        Vielen Dank! Deine Zahlung war erfolgreich.
      </p>

      {sessionId && (
        <p style={{ fontSize: "12px", opacity: 0.6 }}>
          Session-ID: {sessionId}
        </p>
      )}

      <div style={{ marginTop: "32px" }}>
        <Link href="/api/download">
          <button
            style={{
              padding: "14px 28px",
              borderRadius: "999px",
              border: "none",
              background: "#4f46e5",
              color: "white",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            PDF herunterladen
          </button>
        </Link>
      </div>
    </main>
  );
}
