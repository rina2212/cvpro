import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "disabled",
    token: null,
    message: "Download token temporarily disabled",
  });
}
