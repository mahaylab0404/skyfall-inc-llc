interface Env {
  GEMINI_API_KEY: string;
}

interface Message {
  role: 'user' | 'model';
  content: string;
}

const SYSTEM_PROMPT = `You are the Skyfall Assistant — a helpful, knowledgeable chat agent for Skyfall Inc. LLC, based in Doe Run, Missouri. Skyfall specializes in custom indoor grow rooms, irrigation systems, lighting and ventilation setups, and smart automation controllers for indoor cultivation spaces.

Your job is to:
1. Greet the visitor warmly and ask about their project — space size, what they're growing, goals, timeline, and experience level.
2. Listen carefully and match their needs to Skyfall's services: custom grow room buildouts, irrigation system design, lighting & ventilation setup, environmental control, grow room automation, and facility planning.
3. Be honest — if Skyfall is a great fit, explain exactly why. If it's a poor fit, say so respectfully.
4. When the visitor seems interested in working with Skyfall, naturally collect their name, phone number, and email address — ask for one at a time in conversation.
5. Once you have their contact info, ask: "Would you like me to send your details and a summary of your project to the Skyfall team so they can follow up with you?"
6. If they say yes, respond ONLY with this exact JSON and nothing else: {"action":"send_lead","name":"...","phone":"...","email":"...","summary":"..."}
   Where summary is a concise English description of their project and needs (2-4 sentences).
7. If they say no, thank them and let them know they can always reach out directly at skyfallinc@icloud.com or (636) 224-2550.

Rules:
- Keep responses short — 2 to 4 sentences maximum.
- Never make up prices. Say pricing is scope-dependent and discussed during a free consultation.
- Never hallucinate services Skyfall doesn't offer.
- Always respond in the same language the user is writing in, UNLESS generating the JSON action — that must always be in English.
- Be warm and conversational, not robotic or salesy.`;

const LANGUAGE_GREETINGS: Record<string, string> = {
  en: "Hi! I'm the Skyfall Assistant. Tell me about your project — what kind of space are you working with and what are you looking to grow?",
  es: "¡Hola! Soy el Asistente de Skyfall. Cuéntame sobre tu proyecto — ¿qué tipo de espacio tienes y qué quieres cultivar?",
  fr: "Bonjour ! Je suis l'Assistant Skyfall. Parlez-moi de votre projet — quel type d'espace avez-vous et que souhaitez-vous cultiver ?",
  ht: "Bonjou! Mwen se Asistan Skyfall. Pale m sou pwojè ou — ki kalite espas ou genyen epi kisa ou vle kilitve?",
  ru: "Привет! Я Ассистент Skyfall. Расскажите о своём проекте — какое у вас пространство и что вы хотите выращивать?",
  pt: "Olá! Sou o Assistente Skyfall. Fale-me sobre seu projeto — que tipo de espaço você tem e o que quer cultivar?",
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const { messages, lang } = await request.json<{ messages: Message[]; lang: string }>();

    const apiKey = env.GEMINI_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: 'API key not configured' }), { status: 500 });
    }

    const contents = messages.map((m) => ({
      role: m.role,
      parts: [{ text: m.content }],
    }));

    const body = {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      generationConfig: { maxOutputTokens: 300, temperature: 0.7 },
    };

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    );

    if (!res.ok) {
      const err = await res.text();
      return new Response(JSON.stringify({ error: err }), { status: 500 });
    }

    const data = await res.json<any>();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

    return new Response(JSON.stringify({ reply }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500 });
  }
};

export { LANGUAGE_GREETINGS };
