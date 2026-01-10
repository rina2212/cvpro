import { NextResponse } from 'next/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get('data');

  if (!raw) {
    return NextResponse.json({ error: 'Keine Daten erhalten' }, { status: 400 });
  }

  const data = JSON.parse(decodeURIComponent(raw));

  // --- Dokument & Seite ---
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // DIN A4
  const width = page.getWidth();

  // --- Schriften ---
  const regular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // --- Farben ---
  const textColor = rgb(0, 0, 0);
  const muted = rgb(0.35, 0.35, 0.35);
  const lineColor = rgb(0.8, 0.8, 0.8);

  // --- Layout ---
  const marginX = 50;
  let y = 790;

  const drawLine = (gap = 18) => {
    page.drawLine({
      start: { x: marginX, y },
      end: { x: width - marginX, y },
      thickness: 1,
      color: lineColor,
    });
    y -= gap;
  };

  const drawText = (
    text: string,
    size = 11,
    isBold = false,
    color = textColor,
    marginBottom = 16
  ) => {
    if (!text) return;
    page.drawText(text, {
      x: marginX,
      y,
      size,
      font: isBold ? bold : regular,
      color,
      maxWidth: width - marginX * 2,
      lineHeight: size * 1.4,
    });
    y -= marginBottom;
  };

  // --- Kopf ---
  drawText(data.name || 'Name', 22, true, textColor, 10);
  drawText(data.title || 'Berufsbezeichnung', 13, false, muted, 24);
  drawLine(26);

  // --- Profil ---
  drawText('PROFIL', 12, true, muted, 10);
  drawText(data.profile, 11, false, textColor, 24);
  drawLine(26);

  // --- Berufserfahrung ---
  drawText('BERUFSERFAHRUNG', 12, true, muted, 10);
  drawText(data.experience, 11, false, textColor, 28);
  drawLine(26);

  // --- Ausbildung ---
  drawText('AUSBILDUNG', 12, true, muted, 10);
  drawText(data.education, 11, false, textColor, 28);

  // --- PDF speichern ---
  const pdfBytes = await pdfDoc.save();

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="lebenslauf.pdf"',
    },
  });
}
