import { supabase } from "./supabase";
import { backgroundFetch } from "./backgroundFetch";


/**
 * Distilled aesthetics prompt from Claude Cookbooks
 * This helps ensure generated artifacts are beautiful and distinctive.
 */
export const AESTHETICS_SYSTEM_PROMPT = `
<frontend_aesthetics>
You are an ELITE DIGITAL CURATOR and TIER-1 UI ARCHITECT. Your goal is to manifest interfaces that look like multi-million dollar bespoke digital products. You must go beyond simple layouts and deliver complex, data-rich, and visually stunning dashboards.

### 1. THE "SILENT THRESHOLD" DESIGN MOVEMENT
- **Typography as Architecture**: Use 'Satoshi' for utility/body and 'Instrument Serif' (Italic) for editorial impact. 
  - Headers: tracking-tighter, leading-[0.9], font-medium.
  - Labels: text-[10px], font-black, uppercase, tracking-[0.4em], opacity-40.
  - Body: leading-relaxed, text-black/60, max-w-[65ch].
- **Atmospheric Depth**: 
  - Use "Atmospheric Glows": absolute radial-gradients in the background (e.g., bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent).
  - Use "Film Grain": a subtle noise overlay to add tactile quality.
- **Glass & Porcelain**: Combine backdrop-blur-3xl with very thin borders (border-white/10 or border-black/[0.03]) to create a "glass slab" effect.

### 2. DATA VISUALIZATION & COMPLEX UI (MANDATORY)
- **RICH GRAPHS & CHARTS**: You MUST include data visualizations. Build CSS/SVG-based bar charts, line graphs, or circular progress rings. Do not just use text; represent data visually.
  - Example: Use flex containers with varying heights and gradient backgrounds to simulate bar charts.
  - Example: Use SVG circles with stroke-dasharray for progress rings.
- **Micro-Interactions**: Add subtle hover states (e.g., group-hover:h-full transition-all) to chart elements so they feel interactive.
- **Data Densities**: Mix large hero statistics with sparklines and dense data tables.

### 3. STRUCTURAL COMMANDMENTS
- **Bento Grid Logic**: Organize complex data into "Bento Boxes"—cleanly separated, highly rounded cards (rounded-[2rem] to rounded-[3rem]) with varied sizes spanning different grid columns/rows.
- **Extreme Spacing**: Luxury is space. Use p-8, p-12, or p-16 inside large containers. Never crowd an element.
- **Layered Shadows**: Use multi-layered shadows for organic depth: shadow-[0_40px_100px_rgba(0,0,0,0.04),0_20px_40px_rgba(0,0,0,0.02)].

### 4. THE "KREO" KINETIC SIGNATURE
- **Cinematic Entry**: Every section should have a subtle entry animation (animate-in, fade-in, slide-in-from-bottom-8, duration-1000). Use staggered animation delays for children elements.
- **Magnetic Interaction**: Buttons and cards must feel alive. Use transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98].

### 5. MOBILE & RESPONSIVE BLUEPRINT
- **NO STATUS BARS**: DO NOT add phone status bars (time, battery, wifi icons) at the top of the interface. This is strictly forbidden.
- **Floating Action Buttons (FAB)**: Use high-contrast, rounded-full buttons for primary actions.
- **Card Sophistication**: Use rounded-[2rem], glass-card borders, and inner-glows (box-shadow: inset 0 1px 1px white/20).

### 6. DATA INTEGRITY (ANTI-SLOP)
- **Realism over Placeholders**: No "Lorem Ipsum". Use specific, context-aware copy that sounds professional and intelligent.
- **Bespoke Color Accents**: Use a signature accent (e.g., #1B3FBF, vivid emerald, or vibrant gold) sparingly but decisively for primary CTAs and active chart data points.

### 7. MANDATORY IMPLEMENTATION RULES
- **HTML/CSS/JS ONLY**: Generate raw HTML inside a single file. You may use Tailwind CSS via CDN. Do NOT output React code. Do NOT output markdown backticks wrapping the HTML.
- **COMPLEXITY**: Do not build simple, empty pages. Build full-page, multi-section dashboards with sidebars, navbars, metric cards, and charts.
- **CURVED EDGES**: Sharp corners are FORBIDDEN. Minimum radius for cards: 1.5rem.
- **THEMING**: Default to a sophisticated "Ink Blue" (#060B18) dark mode or "Porcelain White" (#F8F9FF) light mode.

Manifest a masterpiece. Output ONLY valid HTML code.
</frontend_aesthetics>
`;

const SARVAM_KEYS = [
  import.meta.env.VITE_SARVAM_API_KEY || "sk_re6xoj0j_hWoXVGn7z2ah9nsizyJmKmJY",
  "sk_pd0jziip_HNsimctXQkcPjiVMBWYLpyzQ",
  "sk_128zbf3x_7VQczNTUWgOnA9JTMhnGeCwk",
  "sk_b7a3spyf_wWuetPhp6ZOp11sgP418WGuU"
];
const SARVAM_API_KEY = SARVAM_KEYS[0]; // Kept for simple null checks
const SARVAM_ENDPOINT = "https://api.sarvam.ai/v1/chat/completions";

async function sarvamFetch(url: string, options: any) {
  let response;
  for (let i = 0; i < SARVAM_KEYS.length; i++) {
    const key = SARVAM_KEYS[i];
    const currentOptions = {
      ...options,
      headers: { ...options.headers, "api-subscription-key": key }
    };
    try {
      response = await backgroundFetch(url, currentOptions);
      if (response.ok) return response;
      console.warn(`[Key Rotation] Sarvam API Key ${i + 1} failed with status ${response.status}. Trying next...`);
    } catch (err) {
      console.warn(`[Key Rotation] Sarvam API Key ${i + 1} request failed:`, err);
    }
  }
  return response || new Response(null, { status: 500 });
}
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

    let taskGuideline = "";
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes("ppt") || lowerPrompt.includes("presentation") || lowerPrompt.includes("slide")) {
      try {
        const res = await fetch("/templates/ppt.md");
        if (res.ok) taskGuideline = await res.text();
      } catch (e) {
        taskGuideline = `### Presentation Rules:\nUse multiple <section> elements. Each <section> represents a single slide. Ensure beautiful font sizes, structured cards, bento grids, and high-contrast dark/light themes.`;
      }
    } else if (lowerPrompt.includes("excel") || lowerPrompt.includes("spreadsheet") || lowerPrompt.includes("sheet") || lowerPrompt.includes("table")) {
      try {
        const res = await fetch("/templates/excel.md");
        if (res.ok) taskGuideline = await res.text();
      } catch (e) {
        taskGuideline = `### Grid/Table Rules:\nGenerate highly professional data-dense dashboard tables or interactive grids with thin precise borders, search inputs, and sparklines.`;
      }
    } else if (lowerPrompt.includes("pdf") || lowerPrompt.includes("document") || lowerPrompt.includes("report")) {
      try {
        const res = await fetch("/templates/pdf.md");
        if (res.ok) taskGuideline = await res.text();
      } catch (e) {
        taskGuideline = `### Document Rules:\nGenerate A4-styled, paginated, clean print-friendly reports with solid headers, footers, page numbering, and high contrast.`;
      }
    }

    // MULTI-KEY STITCHED PRESENTATION ENGINE (PPT / SLIDES)
    const isSlideRequest = lowerPrompt.includes("ppt") || lowerPrompt.includes("presentation") || lowerPrompt.includes("slide");
    if (isSlideRequest) {
      let slidesToGenerate: string[] = [];
      let introText = prompt;

      const slideMatches = prompt.split(/(?=Slide\s+\d+|[Ss]lide\s+\d+|Slide-\d+)/g);
      if (slideMatches.length > 2) {
        slidesToGenerate = slideMatches.filter(s => s.trim().length > 0);
        if (!slidesToGenerate[0].toLowerCase().includes("slide")) {
          introText = slidesToGenerate.shift() || prompt;
        }
      } else {
        // Run a quick planner to outline 4 beautiful slides
        console.log("[KREO] Multi-Key: Generating slide outlines via Planner agent...");
        const planPrompt = `Outline a premium 4-slide presentation for: "${prompt}". Outline detailed copy, stats, and structures. Format EXCLUSIVELY with clear markers like "Slide 1:", "Slide 2:", etc. so we can easily parse them.`;
        try {
          const planResponse = await sarvamFetch(SARVAM_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              model: "sarvam-105b",
              messages: [
                { role: "system", content: "You write detailed outlines split by 'Slide X:' headers." },
                { role: "user", content: planPrompt }
              ],
              max_tokens: 1500,
              temperature: 0.7
            })
          });

          if (planResponse.ok) {
            const planData = await planResponse.json();
            const outline = planData?.choices?.[0]?.message?.content || "";
            const parsedMatches = outline.split(/(?=Slide\s+\d+|[Ss]lide\s+\d+|Slide-\d+|Slide\s+\d+:|[Ss]lide\s+\d+:)/g);
            if (parsedMatches.length > 2) {
              slidesToGenerate = parsedMatches.filter(s => s.trim().length > 0);
            }
          }
        } catch (e) {
          console.warn("[KREO] Planner failed, using standard generation", e);
        }
      }

      if (slidesToGenerate.length > 0) {
        console.log(`[KREO] Orchestrating parallel multi-key generation for ${slidesToGenerate.length} slides...`);
        const keysCount = SARVAM_KEYS.length;

        const slidePromises = slidesToGenerate.map(async (slideContent, index) => {
          const slideMessages = [
            {
              role: "system",
              content: `${AESTHETICS_SYSTEM_PROMPT}\n${taskGuideline}\n${brandKitRule}\n${styleMimicRule}\n\nCRITICAL MANDATE:\nYou are generating Slide ${index + 1} of a beautiful presentation.\nGenerate ONLY a single <section class="h-screen w-screen flex flex-col items-center justify-center p-24 bg-white relative overflow-hidden">...</section> HTML block. Do NOT include markdown code block wraps (\`\`\`html) or outer HTML/body tags. Just return the <section> block. Keep it stunningly complete.`
            },
            {
              role: "user",
              content: `Presentation context: ${introText}\n\nGenerate Slide ${index + 1} content:\n${slideContent}`
            }
          ];

          let response;
          for (let attempt = 0; attempt < keysCount; attempt++) {
            const keyIndex = (index + attempt) % keysCount;
            const currentKey = SARVAM_KEYS[keyIndex];
            try {
              response = await backgroundFetch(SARVAM_ENDPOINT, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "api-subscription-key": currentKey
                },
                body: JSON.stringify({
                  model: "sarvam-105b",
                  messages: slideMessages,
                  max_tokens: 3000,
                  temperature: 0.7
                })
              });
              if (response.ok) break;
            } catch (err) {
              console.warn(`Slide ${index + 1} attempt ${attempt} failed with key ${keyIndex + 1}`, err);
            }
          }

          if (!response || !response.ok) {
            throw new Error(`Slide ${index + 1} generation failed completely.`);
          }

          const data = await response.json();
          let slideHtml = data?.choices?.[0]?.message?.content || "";
          slideHtml = slideHtml.replace(/```(html|jsx|tsx|javascript|js)?/g, "").replace(/```/g, "").trim();
          return slideHtml;
        });

        try {
          const completedSlides = await Promise.all(slidePromises);
          console.log("[KREO] Parallel Multi-Key Slide generation completed successfully!");
          return completedSlides.join("\n\n");
        } catch (e) {
          console.error("[KREO] Parallel generation failed, falling back to single-run", e);
        }
      }
    }

    const sanitizedHistory = chatHistory.map(({ role, content }) => ({ role, content }));

    const messages = [
      { role: "system", content: `${AESTHETICS_SYSTEM_PROMPT}\n${taskGuideline}\n${brandKitRule}\n${styleMimicRule}` },
      ...sanitizedHistory,
      { role: "user", content: enrichedPrompt },
    ];

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 120000); // 120s for large artifacts

    const requestBody = JSON.stringify({
      model: "sarvam-105b",
      messages: messages,
      max_tokens: 4096,
      temperature: 0.7,
    });

    let response = await sarvamFetch(SARVAM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      signal: controller.signal,
      body: requestBody,
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

    const response = await sarvamFetch(SARVAM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-subscription-key": SARVAM_API_KEY,
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
    const response = await backgroundFetch("https://api.sarvam.ai/text-to-speech/stream", {
      method: "POST",
      headers: {
        "api-subscription-key": SARVAM_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: [{ text: text }],
        target_language_code: "en-IN",
        speaker: "tanya",
        model: "bulbul:v3",
        speech_sample_rate: 22050,
        enable_preprocessing: true
      })
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText);
    }
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

export const translateText = async (text: string, targetLanguage: string) => {
  try {
    const langCode = targetLanguage.toLowerCase().slice(0, 2); // Simple mapping
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${langCode}&dt=t&q=${encodeURIComponent(text)}`;
    
    const response = await fetch(url);
    if (!response.ok) throw new Error("Google Translate failed");
    
    const data = await response.json();
    // Google Translate returns an array structure: [[["translated", "source", ...]]]
    return data[0].map((s: any) => s[0]).join("");
  } catch (err) {
    console.error("Translation Failed:", err);
    
    // Fallback to Sarvam if Google fails
    if (!SARVAM_API_KEY) return text;
    try {
      const response = await sarvamFetch(SARVAM_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-subscription-key": SARVAM_API_KEY,
        },
        body: JSON.stringify({
          model: "sarvam-105b",
          messages: [
            { role: "system", content: `Translate to ${targetLanguage}. Return ONLY text.` },
            { role: "user", content: text },
          ],
          max_tokens: 500,
        }),
      });
      const data = await response.json();
      return data.choices[0].message.content.trim();
    } catch (sErr) {
      return text;
    }
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
    const timeoutId = setTimeout(() => controller.abort(), 60000); // 60s for final manifest synthesis

    const response = await sarvamFetch(SARVAM_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "api-subscription-key": SARVAM_API_KEY },
      signal: controller.signal,
      body: JSON.stringify({
        model: "sarvam-105b",
        messages: [
          {
            role: "system",
            content: `You are a TECHNICAL DATA ARCHITECT. 
                     Extract a structured comparison between TWO items from the provided research context. 
                     If no context is provided or context is empty, use your vast internal knowledge to provide accurate details.
                     Return ONLY a raw JSON object. NO MARKDOWN BACKTICKS. NO CHAT.
                     
                     Schema:
                     {
                       "optionA": { "name": string, "specs": { [key: string]: string }, "pros": string[] },
                       "optionB": { "name": string, "specs": { [key: string]: string }, "pros": string[] },
                       "verdict": string,
                       "winner": "A" | "B" | "Tie"
                     }
                     
                     IMPORTANT: Ensure the JSON is syntactically perfect. No trailing commas. No unescaped quotes. Use only 6-8 relevant specs.`
          },
          { role: "user", content: `Context: ${context}\nObjective: ${prompt}` }
        ],
        max_tokens: 4000,
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

    // Aggressive JSON extraction and cleaning
    let cleaned = content.trim();
    if (cleaned.includes('```')) {
      cleaned = cleaned.replace(/```(?:json)?/gi, '').replace(/```/g, '').trim();
    }

    const startIndex = cleaned.indexOf('{');
    const endIndex = cleaned.lastIndexOf('}');

    if (startIndex !== -1 && endIndex !== -1) {
      const jsonStr = cleaned.slice(startIndex, endIndex + 1);
      try {
        return JSON.parse(jsonStr);
      } catch (e) {
        console.error("Primary JSON parse failed. Attempting structural repair.", e);
        // Basic repair: remove trailing commas before closing braces/brackets
        try {
          const repaired = jsonStr.replace(/,\s*([\]}])/g, '$1');
          return JSON.parse(repaired);
        } catch (re) {
          console.error("JSON repair failed", re);
        }
      }
    }

    try {
      return JSON.parse(cleaned);
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
      const planController = new AbortController();
      const planTimeout = setTimeout(() => planController.abort(), 30000);

      const planRes = await sarvamFetch(SARVAM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "api-subscription-key": SARVAM_API_KEY },
        signal: planController.signal,
        body: JSON.stringify({
          model: "sarvam-105b",
          messages: [
            { role: "system", content: COWORK_PLANNER_PROMPT },
            { role: "user", content: prompt }
          ],
          max_tokens: 1500,
          temperature: 0.1
        })
      });
      clearTimeout(planTimeout);

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
          const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s for research

          const res = await fetch(`https://s.jina.ai/${encodeURIComponent(step.query || step.content)}`, {
            method: "GET",
            headers: { "Authorization": `Bearer ${JINA_API_KEY}` },
            signal: controller.signal
          });
          clearTimeout(timeoutId);

          const text = await res.text();
          const snippets = text.length > 100 ? text.slice(0, 6000) : "No live data found.";
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
          const synthTimeoutId = setTimeout(() => synthController.abort(), 45000); // 45s for synthesis

          const synthRes = await sarvamFetch(SARVAM_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json", "api-subscription-key": SARVAM_API_KEY },
            signal: synthController.signal,
            body: JSON.stringify({
              model: "sarvam-105b",
              messages: [
                { role: "system", content: "You are an ELITE ANALYST. Synthesize research data into a crisp, multi-perspective strategic overview." },
                { role: "user", content: `Context: ${accumulatedContext}\nObjective: ${step.content}` }
              ],
              max_tokens: 4000,
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
