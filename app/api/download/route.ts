import { NextResponse } from 'next/server';

export async function GET() {
  const pdfText = `
Lebenslauf – Testversion

Name: Max Mustermann
Position: Account Manager

Dies ist eine Test-PDF.
`;

  const buffer = Buffer.from(pdfText, 'utf-8');

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="lebenslauf.pdf"',
    },
  });
}
