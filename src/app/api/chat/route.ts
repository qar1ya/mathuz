import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const SYSTEM = `Siz MathUz platformasining AI matematik o'qituvchisiz.

Qoidalar:
- Har doim O'ZBEK tilida javob bering
- Bosqichma-bosqich tushuntirib boring
- DTM va Milliy Sertifikat imtihonlariga yo'naltirilgan
- Formulalarni aniq ko'rsating (masalan: a² + b² = c²)
- Qisqa va tushunarli bo'ling
- Agar savol matematikaga aloqasiz bo'lsa, faqat matematika haqida gapirishingizni bildiring`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json() as {
    messages: { role: "user" | "assistant"; content: string }[];
  };

  const stream = client.messages.stream({
    model: "claude-haiku-4-5",
    max_tokens: 1024,
    system: SYSTEM,
    messages,
  });

  const encoder = new TextEncoder();
  const readable = new ReadableStream({
    async start(controller) {
      try {
        for await (const event of stream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(readable, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
