import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { field, context, style } = await req.json();

    // Stil-Anweisungen
    const styleText =
      {
        neutral: "Sachlich, professionell und neutral formuliert.",
        praezise: "Kurz, präzise, klar strukturiert, ohne Ausschmückungen.",
        ausfuehrlich:
          "Etwas ausführlicher formuliert, dennoch professionell und strukturiert.",
      }[style] || "Sachlich, professionell und neutral formuliert.";

    // Feld-spezifische Prompts
    const prompts: Record<string, string> = {
      skills: `
Erstelle eine Liste relevanter beruflicher Kenntnisse.

${styleText}

Profil:
${context}

Form:
- Stichpunktartig
- Keine Emojis
- Keine Floskeln
`,

      experience: `
Formuliere einen Abschnitt zur Berufserfahrung.

${styleText}

Profil:
${context}

Form:
- Klar strukturiert
- Chronologisch sinnvoll
- Sachlicher Ton
`,

      education: `
Formuliere einen Abschnitt zur Ausbildung.

${styleText}

Profil:
${context}

Form:
- Kurz und übersichtlich
- Sachlich
- Ohne unnötige Details
`,
    };

    const prompt = prompts[field];

    if (!prompt) {
      return NextResponse.json(
        { error: "Unbekanntes Feld" },
        { status: 400 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.6,
    });

    const text = completion.choices[0].message.content;

    return NextResponse.json({ text });
  } catch (error) {
    return NextResponse.json(
      { error: "Fehler bei der KI-Generierung" },
      { status: 500 }
    );
  }
}
