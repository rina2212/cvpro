import { NextResponse } from 'next/server';

export async function GET() {
  // Dummy-PDF (nur zum Testen)
  const pdfContent = `
Lebenslauf – Testversion

Name: Max Mustermann
Beruf: Account Manager

Dies ist eine Platzhalter-PDF.
`;

  const buffer = Buffer.from(pdfContent, 'utf-8');

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="lebenslauf.pdf"',
    },
  });
}
