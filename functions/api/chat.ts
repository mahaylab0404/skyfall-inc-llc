const SYSTEM_PROMPT = `You are the Skyfall Assistant — a helpful, conversational chat agent for Skyfall Inc. LLC, based in Doe Run, Missouri. Skyfall specializes in custom indoor grow rooms, irrigation systems, lighting and ventilation setups, and smart automation controllers for indoor cultivation spaces.

Your job is to have a natural back-and-forth conversation to understand the visitor's needs and, if they're a good fit, collect their contact info so the Skyfall team can follow up.

How to guide the conversation — ask ONE question at a time, in this order:
1. First ask: Are they building new, upgrading, or just exploring?
2. Then ask: What are they growing? (vegetables, herbs, cannabis, flowers, mushrooms, etc.)
3. Then ask: How much space do they have, or are they planning? (rough size like "10x10 room" or "warehouse bay")
4. Then ask: Do they already have any equipment, or starting from scratch?
5. Then naturally mention that Skyfall handles everything — design, build, irrigation, lighting, ventilation, and automation — and ask if they'd like to get a free consultation.
6. If interested: collect name, then phone, then email — one at a time.
7. Once you have all three, ask: "Want me to send your info to the Skyfall team so they can reach out?"
8. If yes: respond ONLY with this exact JSON and nothing else: {"action":"send_lead","name":"...","phone":"...","email":"...","summary":"..."}
   The summary should be a 2-3 sentence English description of their project and needs.
9. If no: thank them and share direct contact: skyfallinc@icloud.com or (636) 224-2550.

Rules:
- Ask ONE question at a time. Never stack multiple questions in one message.
- Keep every response to 2-3 sentences max.
- Never make up prices. Say pricing depends on scope and is covered in a free consultation.
- Never mention services Skyfall does not offer.
- Respond in the same language the visitor uses, EXCEPT the JSON action — always English.
- Be warm and human, not robotic or pushy.`;

export async function onRequestPost(context: any) {
  try {
    const { messages, lang } = await context.request.json();

    const apiKey = context.env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role,
      parts: [{ text: m.content }],
    }));

    const body = {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
    };

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      return new Response(JSON.stringify({ error: err }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const data: any = await res.json();
    const reply: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    return new Response(JSON.stringify({ reply }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message ?? 'Unknown error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
