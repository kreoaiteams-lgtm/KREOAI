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
- **NO HALLUCINATIONS**: Do not invent marketing slogans (e.g., "Quantum Paradigm") for real-world products. Use researched specs only.
- **TECHNICAL PRECISION**: If the context provides specs (Price, Range, Speed, Battery), these MUST be the centerpiece of the manifest.
- **NO PLACEHOLDERS**: Real copy, real data only. If data is missing, state it clearly rather than making it up.
- **SCROLLABLE**: Ensure body { overflow-y: auto; } is always set.

You are KREO. Deliver a very beautiful, minimal, and TRUTHFUL masterpiece.
</frontend_aesthetics>
`;

const SARVAM_API_KEY = import.meta.env.VITE_SARVAM_API_KEY || "sk_5oxchpsn_jrBGzGJ0eu64wBHBdxXBb4Qk";
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

    const res = await fetch(`https://s.jina.ai/${encodeURIComponent(searchQuery)}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${JINA_API_KEY}`,
        "Accept": "application/json"
      }
    });
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
  chatHistory: {role: string, content: string}[] = [], 
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

    const response = await fetch(SARVAM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SARVAM_API_KEY}`,
      },
      body: JSON.stringify({
        model: "sarvam-105b",
        messages: messages,
        max_tokens: 4096,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    let content = data?.choices?.[0]?.message?.content;
    return content || "";
  } catch (err) {
    console.error("Sarvam generation failed:", err);
    return "";
  }
};

/**
 * Generate Structured Comparison Data for Native UI
 */
export const generateComparisonData = async (prompt: string, context: string) => {
  try {
    const response = await fetch(SARVAM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${SARVAM_API_KEY}` },
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

    const data = await response.json();
    const content = data.choices[0].message.content;
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    return JSON.parse(jsonMatch ? jsonMatch[0] : content);
  } catch (err) {
    console.error("Comparison data generation failed:", err);
    return null;
  }
};

/**
 * COWORK AGENT LOGIC
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
          const synthRes = await fetch(SARVAM_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${SARVAM_API_KEY}` },
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

      const finalData = await generateComparisonData(prompt, accumulatedContext);

      manifestStep.status = 'done';
      manifestStep.results = JSON.stringify(finalData);
      onUpdate([...steps]);
      return finalData;
    }
  } catch (error) {
    console.error("CoWork Agent Failed:", error);
    steps.forEach(s => { if (s.status === 'running') s.status = 'error'; });
    onUpdate([...steps]);
    throw error;
  }
};
