import { NextResponse } from 'next/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const raw = searchParams.get('data');

  if (!raw) {
    return NextResponse.json({ error: 'Keine Daten' }, { status: 400 });
  }

  const data = JSON.parse(decodeURIComponent(raw));

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595.28, 841.89]);
  const width = page.getWidth();

  // Schriftwahl
  const fontRegular =
    data.font === 'serif'
      ? await pdfDoc.embedFont(StandardFonts.TimesRoman)
      : await pdfDoc.embedFont(StandardFonts.Helvetica);

  const fontBold =
    data.font === 'serif'
      ? await pdfDoc.embedFont(StandardFonts.TimesRomanBold)
      : await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Akzentfarbe
  const accentColor =
    data.accent === 'blue'
      ? rgb(0.1, 0.3, 0.6)
      : data.accent === 'gray'
      ? rgb(0.4, 0.4, 0.4)
      : rgb(0, 0, 0);

  let y = 780;
  const margin = 50;

  const draw = (text: string, size = 12, bold = false, gap = 20) => {
    if (!text) return;
    page.drawText(text, {
      x: margin,
      y,
      size,
      font: bold ? fontBold : fontRegular,
      color: bold ? accentColor : rgb(0, 0, 0),
      maxWidth: width - margin * 2,
      lineHeight: size * 1.4,
    });
    y -= gap;
  };

  // Layout
  if (data.layout === 'modern') {
    draw(data.name, 24, true, 10);
    draw(data.title, 14, false, 30);
  } else {
    draw(data.name, 20, true, 6);
    draw(data.title, 12, false, 24);
  }

  draw('Profil', 13, true, 10);
  draw(data.profile, 11, false, 26);

  draw('Berufserfahrung', 13, true, 10);
  draw(data.experience, 11, false, 26);

  draw('Ausbildung', 13, true, 10);
  draw(data.education, 11, false, 26);

  const pdfBytes = await pdfDoc.save();

  return new NextResponse(Buffer.from(pdfBytes), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="lebenslauf.pdf"',
    },
  });
}
