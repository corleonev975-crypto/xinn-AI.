import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        { error: { message: 'GROQ_API_KEY belum diisi di environment variable.' } },
        { status: 500 }
      );
    }

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'openai/gpt-oss-20b',
        temperature: 0.7,
        messages: [
          {
            role: 'system',
            content:
              'Kamu adalah XINN AI. Jawab dengan Bahasa Indonesia, jelas, modern, dan langsung ke inti.',
          },
          ...(Array.isArray(messages) ? messages : []),
        ],
      }),
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch {
    return NextResponse.json(
      { error: { message: 'Terjadi error saat menghubungi API Groq.' } },
      { status: 500 }
    );
  }
}
