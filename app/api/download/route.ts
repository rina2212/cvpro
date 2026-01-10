import { NextResponse } from 'next/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function GET() {
  // 1. Neues PDF-Dokument
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // DIN A4

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let y = 800;

  // Hilfsfunktion für Text
  const drawText = (
    text: string,
    size = 12,
    bold = false,
    marginBottom = 20
  ) => {
    page.drawText(text, {
      x: 50,
      y,
      size,
      font: bold ? boldFont : font,
      color: rgb(0, 0, 0),
    });
    y -= marginBottom;
  };

  // 2. Inhalt (erstmal fest – später dynamisch)
  drawText('Max Mustermann', 20, true, 30);
  drawText('Account Manager', 14, false, 30);

  drawText('Profil', 14, true, 20);
  drawText(
    'Erfahrener Account Manager mit Fokus auf Kundenbetreuung, Vertrieb und Organisation.',
    12,
    false,
    30
  );

  drawText('Berufserfahrung', 14, true, 20);
  drawText(
    'Account Manager – Beispiel GmbH (2021 – heute)\nBetreuung von Bestandskunden, Angebotserstellung und Projektkoordination.',
    12,
    false,
    40
  );

  drawText('Ausbildung', 14, true, 20);
  drawText(
    'Kaufmann für Büromanagement – Musterfirma AG (2017)',
    12,
    false,
    30
  );

  // 3. PDF erzeugen
  const pdfBytes = await pdfDoc.save();

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="lebenslauf.pdf"',
    },
  });
}
