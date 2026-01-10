import { NextResponse } from 'next/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get('data');

  if (!raw) {
    return NextResponse.json({ error: 'Keine Daten erhalten' }, { status: 400 });
  }

  const data = JSON.parse(decodeURIComponent(raw));

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]); // DIN A4

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  let y = 800;

  const draw = (
    text: string,
    size = 12,
    isBold = false,
    margin = 20
  ) => {
    page.drawText(text || '', {
      x: 50,
      y,
      size,
      font: isBold ? bold : font,
      color: rgb(0, 0, 0),
      maxWidth: 500,
    });
    y -= margin;
  };

  draw(data.name, 20, true, 30);
  draw(data.title, 14, false, 30);

  draw('Profil', 14, true, 20);
  draw(data.profile, 12, false, 30);

  draw('Berufserfahrung', 14, true, 20);
  draw(data.experience, 12, false, 40);

  draw('Ausbildung', 14, true, 20);
  draw(data.education, 12, false, 30);

  const pdfBytes = await pdfDoc.save();

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="lebenslauf.pdf"',
    },
  });
}
