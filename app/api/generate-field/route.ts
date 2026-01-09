import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({
    text: "Platzhalter – KI ist noch deaktiviert",
  });
}
