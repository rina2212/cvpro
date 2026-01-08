"use client";

import Link from "next/link";

export default function CancelPage() {
  return (
    <main style={{ padding: 40 }}>
      <h1>Zahlung abgebrochen</h1>
      <p>Keine Sorge – du kannst es jederzeit erneut versuchen.</p>
      <Link href="/generator">Zurück</Link>
    </main>
  );
}
