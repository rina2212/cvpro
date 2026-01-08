import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type StyleKey = "neutral" | "praezise" | "ausfuehrlich";

const styleText: Record<StyleKey, string> = {
  neutral: "Sachlich, professionell und neutral formuliert.",
  praezise: "Kurz, präzise und klar strukturiert.",
  ausfuehrlich: "Ausführlich, erklärend und gut lesbar.",
};

export async function POST(req: Request) {
  const { field, input, style } = await req.json();

  const selectedStyle: StyleKey =
    style === "praezise" || style === "ausfuehrlich"
      ? style
      : "neutral";

  const prompt = `
Formuliere das folgende Feld für einen Lebenslauf.

Feld: ${field}
Stil: ${styleText[selectedStyle]}
Inhalt:
${input}
`;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    return NextResponse.json({
      text: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("OpenAI Fehler:", error);
    return NextResponse.json(
      { error: "Text konnte nicht generiert werden" },
      { status: 500 }
    );
  }
}
