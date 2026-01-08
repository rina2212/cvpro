import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts } from "pdf-lib";

export async function POST(req: Request) {
  const { name, job, profile } = await req.json();

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([595, 842]); // A4
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let y = 800;

  page.drawText(name || "Name", {
    x: 50,
    y,
    size: 20,
    font,
  });

  y -= 30;

  page.drawText(job || "Berufsbezeichnung", {
    x: 50,
    y,
    size: 14,
    font,
  });

  y -= 40;

  page.drawText(profile || "Kurzprofil", {
    x: 50,
    y,
    size: 12,
    font,
    maxWidth: 500,
    lineHeight: 14,
  });

  const pdfBytes = await pdfDoc.save();

  return new NextResponse(pdfBytes, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=lebenslauf.pdf",
    },
  });
}
