import { NextResponse } from "next/server";
import { PDFDocument, StandardFonts } from "pdf-lib";

export async function POST(req: Request) {
  try {
    const { content } = await req.json();

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([595, 842]); // A4
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const fontSize = 12;
    const margin = 50;
    let y = page.getHeight() - margin;

    const lines = content.split("\n");

    for (const line of lines) {
      page.drawText(line, {
        x: margin,
        y,
        size: fontSize,
        font,
      });
      y -= fontSize + 6;
    }

    const pdfBytes = await pdfDoc.save();

    // 🔑 DER WICHTIGE FIX
    const buffer = Buffer.from(pdfBytes);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="lebenslauf.pdf"',
      },
    });
  } catch (error) {
    console.error("PDF Fehler:", error);
    return NextResponse.json(
      { error: "PDF konnte nicht erstellt werden" },
      { status: 500 }
    );
  }
}
