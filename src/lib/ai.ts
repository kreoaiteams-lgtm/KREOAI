import { supabase } from "./supabase";

/**
 * Distilled aesthetics prompt from Claude Cookbooks
 * This helps ensure generated artifacts are beautiful and distinctive.
 */
export const AESTHETICS_SYSTEM_PROMPT = `
<frontend_aesthetics>
You are an ELITE UI ARCHITECT. Your mission is to eliminate "AI slop"—the generic, timid, and predictable layouts typical of LLMs. Every manifestation must feel like a premium, editorial digital product.

### 1. CORE IDENTITY: RICH MINIMALISM
- **Typography Strategy**: You MUST use 'Satoshi' (sans-serif) or 'Instrument Serif' (serif). Use elegant hierarchy, ample letter spacing, and deliberate whitespace.
- **Architectural Polish**: Avoid harsh borders. Use very subtle, light borders (border-black/5 or border-blue-100/50) or no borders at all, relying on soft, multi-layered shadows for depth.
- **Color Palette**: Use a "Sophisticated Editorial" palette. Soft off-whites, deep ink-blues (#1B3FBF), and golden accents. Avoid high-saturation "Pure Colors" unless used as small focus points.
- **Glassmorphism**: Leverage backdrop-blur (backdrop-blur-xl) and translucent backgrounds (bg-white/70) to create a sense of depth and luxury.
- **Roundedness**: Use generous border-radius (rounded-[2rem] or rounded-[3rem]) to create a soft, approachable, yet premium feel.

### 2. ARCHITECTURAL AIR
- **Whitespace as a Feature**: Use massive padding (p-12 to p-24) to let the design breathe. Luxury is defined by the space between elements.
- **Soft Depth**: Use soft, organic shadows (e.g., shadow-[0_20px_50px_rgba(0,0,0,0.05)]) instead of hard offset shadows.
- **Seamless Flow**: Elements should feel like they are floating in a cohesive, atmospheric space rather than being locked into a rigid grid.

### 3. THE "WOW" PROTOCOL
- **Micro-Animations**: Use smooth, eased transitions. Entry animations should feel like a gentle reveal or a cinematic fade.
- **Atmospheric Details**: Use subtle gradients (bg-gradient-to-br from-white to-blue-50/30) and "floating" decorative elements (soft blurs, light flares) to add visual interest without clutter.
- **Premium Utility**: Every interactive element should have a subtle hover state (scale-105, slight shadow increase) that feels alive and responsive.

### 4. DATA INTEGRITY (THE ANTI-SLOP PROTOCOL)
- **NO HALLUCINATIONS**: Do not invent marketing slogans. Use researched specs only.
- **NO PLACEHOLDERS**: Real copy, real data only.

### 5. EXTREME CURVES & COLOR (NEW MANDATE)
- **Vibrant & Colorful**: Inject beautiful, high-contrast colors. Use vibrant gradients (e.g., from-pink-500 to-orange-400, or from-teal-400 to-blue-500) for buttons, cards, and backgrounds to make the app POP.
- **Curved Everything**: EVERYTHING must have extreme curved borders. Use \`rounded-3xl\`, \`rounded-[2rem]\`, or \`rounded-full\` for all cards, buttons, images, and containers. NO sharp corners allowed anywhere.
- **HTML ONLY**: You are generating RAW HTML. Do not use React components or JSX.

You are KREO. Deliver a very beautiful, colorful, minimal, and highly rounded HTML masterpiece.
</frontend_aesthetics>
`;

const SARVAM_API_KEY = import.meta.env.VITE_SARVAM_API_KEY || "sk_re6xoj0j_hWoXVGn7z2ah9nsizyJmKmJY";
const SARVAM_ENDPOINT = "https://api.sarvam.ai/v1/chat/completions";
const JINA_API_KEY = "jina_1571735a32634468b4b6258b9fcfa276X8wx9LD9fG7zOo7KVosMzfGXolqX";

const NEEDS_SEARCH_REGEX = /(price|cost|today|latest|news|statistics|stats|vs|compare|rate|ranking|best|top|current|roi|bank|market|stock)/i;

async function fetchRealWorldContext(prompt: string, isPaidUser: boolean): Promise<string> {
  if (!isPaidUser || !NEEDS_SEARCH_REGEX.test(prompt)) return "";

  try {
    let searchQuery = prompt;
    if (prompt.toLowerCase().includes("bank") && prompt.toLowerCase().includes("india")) {
      searchQuery = `latest ROI and savings rates of famous Indian banks 2024 2025 ${prompt}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s for research

    const res = await fetch(`https://s.jina.ai/${encodeURIComponent(searchQuery)}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${JINA_API_KEY}`,
        "Accept": "application/json"
      },
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    const data = await res.json();

    if (data.data && data.data.length > 0) {
      const snippets = data.data.slice(0, 5).map((r: any) => `- [${r.title}](${r.url}): ${r.description}`).join('\n');

      let context = `\n\n[REAL WORLD LIVE CONTEXT CRAWLED FROM WEB VIA JINA]:\n${snippets}\nUse these facts to satisfy the user's prompt truthfully.`;

      if (prompt.toLowerCase().includes("india") || prompt.toLowerCase().includes("bank")) {
        context += `\nCRITICAL: All financial data MUST be presented in Indian Rupees (₹). Use proper Indian numbering (Lakhs/Crores) if applicable.`;
      }

      return context;
    }
  } catch (e) {
    console.warn("Jina AI search failed. Proceeding without live context.", e);
  }
  return "";
}

export const generateArtifact = async (
  prompt: string,
  chatHistory: { role: string, content: string }[] = [],
  imageUrl?: string,
  isPaidUser: boolean = false,
  brandKitRule: string = "",
  styleMimicRule: string = ""
) => {
  if (!SARVAM_API_KEY) {
    return "";
  }

  try {
    const liveContext = await fetchRealWorldContext(prompt, isPaidUser);
    let enrichedPrompt = prompt + liveContext;

    if (imageUrl) {
      enrichedPrompt += `\n\n[VISUAL ASSET PROVIDED]:\nA source image is available at this URL: ${imageUrl}.`;
    }

    const sanitizedHistory = chatHistory.map(({ role, content }) => ({ role, content }));

    const messages = [
      { role: "system", content: `${AESTHETICS_SYSTEM_PROMPT}\n${brandKitRule}\n${styleMimicRule}` },
      ...sanitizedHistory,
      { role: "user", content: enrichedPrompt },
    ];

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

    const response = await fetch(SARVAM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SARVAM_API_KEY}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: "sarvam-105b",
        messages: messages,
        max_tokens: 4096,
        temperature: 0.7,
      }),
    });
    clearTimeout(timeoutId);

    if (!response.ok) return getDemoFallback(prompt);

    const data = await response.json();
    let content = data?.choices?.[0]?.message?.content;
    return content || getDemoFallback(prompt);
  } catch (err) {
    console.error("Sarvam generation failed:", err);
    return getDemoFallback(prompt);
  }
};

/**
 * Generate a Resident Bio from interview answers
 */
export const generateBio = async (answers: string[]) => {
  if (!SARVAM_API_KEY) return "A creative force within the KREO ecosystem, dedicated to building new worlds.";

  try {
    const prompt = `Summarize these three characteristics of a KREO Resident into a single, high-end, cinematic sentence:
    - Style: ${answers[0]}
    - Tool/Craft: ${answers[1]}
    - Inspiration: ${answers[2]}
    
    Make it feel architectural, sophisticated, and elite. A single quote without surrounding text. Max 25 words.`;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(SARVAM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SARVAM_API_KEY}`,
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: "sarvam-105b",
        messages: [
          { role: "system", content: "You are the KREO Neural Studio architect. You summarize creative identities into elite resident bios." },
          { role: "user", content: prompt },
        ],
        max_tokens: 100,
        temperature: 0.8,
      }),
    });
    clearTimeout(timeoutId);

    const data = await response.json();
    return data.choices[0].message.content.replace(/^["']|["']$/g, '').trim();
  } catch (err) {
    console.error("Bio generation failed:", err);
    return "A manifestation of pure imagination, weaving through the KREO neural net.";
  }
};

export const narrateText = async (text: string) => {
  if (!SARVAM_API_KEY) return;

  try {
    const response = await fetch("https://api.sarvam.ai/text-to-speech/stream", {
      method: "POST",
      headers: {
        "api-subscription-key": SARVAM_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: [{ text: text }],
        target_language_code: "en-IN",
        speaker: "meera",
        model: "bulbul:v2",
        speech_sample_rate: 22050,
        enable_preprocessing: true
      })
    });

    if (!response.ok) throw new Error();
    const chunks = [];
    const reader = response.body?.getReader();
    if (!reader) return;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
    }
    const blob = new Blob(chunks, { type: "audio/mpeg" });
    const audio = new Audio(URL.createObjectURL(blob));
    audio.play();
  } catch (err) {
    console.error("Narrate Failed:", err);
  }
};

function getDemoFallback(prompt: string): string {
  // Extract only the user's core intent if it's an enhanced query
  const cleanPrompt = prompt.split('\n')[0].slice(0, 100);
  
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap" rel="stylesheet">
      <script src="https://cdn.tailwindcss.com"></script>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@1&display=swap');
        body { font-family: 'Satoshi', sans-serif; background: #060606; color: white; overflow: hidden; }
        .serif { font-family: 'Instrument Serif', serif; font-style: italic; }
        .mesh {
          background-image: 
            radial-gradient(circle at 0% 0%, #1B3FBF20 0%, transparent 50%),
            radial-gradient(circle at 100% 100%, #1B3FBF10 0%, transparent 50%);
        }
      </style>
    </head>
    <body class="h-screen w-screen flex items-center justify-center mesh p-12">
      <div class="max-w-2xl w-full space-y-8 text-center animate-pulse">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
          <div class="w-1.5 h-1.5 rounded-full bg-[#1B3FBF] shadow-[0_0_8px_#1B3FBF]"></div>
          <span class="text-[9px] font-black uppercase tracking-[0.4em] opacity-40">Neural Link Unstable</span>
        </div>
        
        <h1 class="text-6xl md:text-8xl serif tracking-tighter leading-none">
          Manifesting<br/><span class="opacity-30">In Progress.</span>
        </h1>
        
        <div class="space-y-2 pt-8">
          <p class="text-[10px] font-black uppercase tracking-[0.3em] opacity-20">Current Objective</p>
          <p class="text-xl font-light opacity-50">${cleanPrompt}...</p>
        </div>

        <div class="pt-12">
           <div class="w-48 h-[1px] bg-white/10 mx-auto relative overflow-hidden">
              <div class="absolute inset-0 bg-[#1B3FBF] w-1/3 animate-[slide_2s_infinite_linear]"></div>
           </div>
        </div>
      </div>

      <style>
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      </style>
    </body>
  </html>
  `;
}

/**
 * Generate Structured Comparison Data for Native UI
 */
export const generateComparisonData = async (prompt: string, context: string) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);

    const response = await fetch(SARVAM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${SARVAM_API_KEY}` },
      signal: controller.signal,
      body: JSON.stringify({
        model: "sarvam-105b",
        messages: [
          {
            role: "system",
            content: `You are a TECHNICAL DATA ARCHITECT. 
                     Extract a structured comparison between TWO items from the provided research context. 
                     Return ONLY a JSON object. NO MARKDOWN. NO CHAT.
                     
                     Schema:
                     {
                       "optionA": { "name": string, "specs": { "Price": string, "Range": string, "Battery": string, "Performance": string, "Pros": string[] } },
                       "optionB": { "name": string, "specs": { "Price": string, "Range": string, "Battery": string, "Performance": string, "Pros": string[] } },
                       "verdict": string,
                       "winner": "A" | "B" | "Tie"
                     }`
          },
          { role: "user", content: `Context: ${context}\nObjective: ${prompt}` }
        ],
        max_tokens: 1000,
        temperature: 0.1
      })
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Sarvam API Error (400?):", response.status, errorData);
      return null;
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content;

    if (!content) {
      console.warn("AI returned empty content for comparison data.");
      return null;
    }

    // Improved JSON extraction: find first '{' and last '}'
    const startIndex = content.indexOf('{');
    const endIndex = content.lastIndexOf('}');

    if (startIndex !== -1 && endIndex !== -1) {
      try {
        const jsonStr = content.slice(startIndex, endIndex + 1);
        return JSON.parse(jsonStr);
      } catch (e) {
        console.error("JSON parse failed for extracted string", e);
      }
    }

    try {
      return JSON.parse(content);
    } catch (e) {
      console.error("Final fallback JSON parse failed", e);
      return null;
    }
  } catch (err) {
    console.error("Comparison data generation failed:", err);
    return null;
  }
};

/**
 * COWORK AGENT LOGI
 */

export interface CoWorkStep {
  id: string;
  type: 'plan' | 'research' | 'synthesize' | 'manifest';
  status: 'pending' | 'running' | 'done' | 'error';
  content: string;
  query?: string;
  results?: string;
}

const COWORK_PLANNER_PROMPT = `
You are the KREO Neural Orchestrator. 
The user is in COWORK MODE—which means they want a deep, multi-step research or strategic manifest.
Your goal is to break the user's request into 3-6 logical steps.

CRITICAL: ALWAYS START WITH AT LEAST 2 RESEARCH STEPS to ensure "Live Web Checking". 

Steps can be:
- 'research': Scouring the web for live data.
- 'synthesize': Organizing data into a strategic framework.
- 'manifest': Building the final editorial UI.

Output ONLY a JSON array of steps:
[{ "type": "research", "content": "Fetch details for..." }, ...]
`;

export const runCoWorkAgent = async (
  prompt: string,
  onUpdate: (steps: CoWorkStep[]) => void
) => {
  let steps: CoWorkStep[] = [
    { id: '1', type: 'plan', status: 'running', content: 'Orchestrating Task DNA...' }
  ];
  onUpdate([...steps]);

  try {
    // 1. PLANNING PHASE
    let plan = [];
    try {
      const planRes = await fetch(SARVAM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${SARVAM_API_KEY}` },
        body: JSON.stringify({
          model: "sarvam-105b",
          messages: [
            { role: "system", content: COWORK_PLANNER_PROMPT },
            { role: "user", content: prompt }
          ],
          max_tokens: 500,
          temperature: 0.1
        })
      });

      if (planRes.ok) {
        const planData = await planRes.json();
        let rawPlan = planData?.choices?.[0]?.message?.content;
        if (rawPlan) {
          const jsonMatch = rawPlan.match(/\[[\s\S]*\]/);
          plan = JSON.parse(jsonMatch ? jsonMatch[0] : rawPlan);
        }
      }
    } catch (e) {
      plan = [
        { type: "research", content: `Deep research for: ${prompt}` },
        { type: "research", content: `Compare alternatives for: ${prompt}` },
        { type: "synthesize", content: `Analyze findings` }
      ];
    }

    if (!Array.isArray(plan) || plan.length === 0) {
      plan = [{ type: "research", content: `Direct research for: ${prompt}` }];
    }

    steps = [
      { id: '1', type: 'plan', status: 'done', content: 'Mission DNA established.' },
      ...plan.map((s: any, i: number) => ({
        id: String(i + 2),
        type: s.type || 'research',
        status: 'pending',
        content: s.content || "Processing research node...",
        query: s.type === 'research' ? s.content : undefined
      })),
      { id: String(plan.length + 2), type: 'manifest', status: 'pending', content: 'Final Manifestation' }
    ];
    onUpdate([...steps]);

    // 2. EXECUTION PHASE
    let accumulatedContext = "";

    for (const step of steps) {
      if (step.status === 'done' || step.type === 'manifest') continue;

      step.status = 'running';
      onUpdate([...steps]);

      if (step.type === 'research') {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 15000);

          const res = await fetch(`https://s.jina.ai/${encodeURIComponent(step.query || step.content)}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${JINA_API_KEY}`, "Accept": "application/json" },
            signal: controller.signal
          });
          clearTimeout(timeoutId);

          const searchData = await res.json();
          const snippets = searchData.data?.slice(0, 8).map((r: any) => `[Source: ${r.url}]\n${r.title}\n${r.content?.slice(0, 2000)}`).join("\n\n") || "No live data found.";
          step.results = snippets;
          accumulatedContext += `\n\n### LIVE WEB CHECK: ${step.content}\n${snippets}`;
          step.status = 'done';
        } catch (e) {
          step.status = 'done';
          step.results = "Resource temporarily unavailable.";
        }
      } else if (step.type === 'synthesize') {
        try {
          const synthController = new AbortController();
          const synthTimeoutId = setTimeout(() => synthController.abort(), 20000); // 20s for synthesis

          const synthRes = await fetch(SARVAM_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${SARVAM_API_KEY}` },
            signal: synthController.signal,
            body: JSON.stringify({
              model: "sarvam-105b",
              messages: [
                { role: "system", content: "You are an ELITE ANALYST. Synthesize research data into a crisp, multi-perspective strategic overview." },
                { role: "user", content: `Context: ${accumulatedContext}\nObjective: ${step.content}` }
              ],
              max_tokens: 1000,
              temperature: 0.1
            })
          });
          clearTimeout(synthTimeoutId);
          const synthData = await synthRes.json();
          step.results = synthData.choices?.[0]?.message?.content || "Synthesis complete.";
          accumulatedContext += `\n\n[SYNTHESIZED STRATEGY]:\n${step.results}`;
          step.status = 'done';
        } catch (e) {
          step.status = 'done';
        }
      }
      onUpdate([...steps]);
    }

    // 3. FINAL MANIFESTATION (Native Data)
    const manifestStep = steps.find(s => s.type === 'manifest');
    if (manifestStep) {
      manifestStep.status = 'running';
      onUpdate([...steps]);

      // FALLBACK: If no context was accumulated, use the prompt itself as context
      const finalContext = accumulatedContext.trim().length > 50
        ? accumulatedContext
        : `Generate based on internal knowledge for: ${prompt}`;

      const finalData = await generateComparisonData(prompt, finalContext);

      if (!finalData) {
        manifestStep.status = 'error';
        manifestStep.content = "Neural synthesis failed. Please try a different query.";
      } else {
        manifestStep.status = 'done';
        manifestStep.results = JSON.stringify(finalData);
      }

      onUpdate([...steps]);
      return finalData;
    }
  } catch (error) {
    console.error("CoWork Agent Failed Core Exception:", error);
    steps.forEach(s => { if (s.status === 'running') s.status = 'error'; });
    onUpdate([...steps]);
    return null; // Return null instead of throwing to prevent UI crash
  }
};
