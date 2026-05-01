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

### 4. TECHNICAL CONSTRAINTS
- **STRICT STANDALONE HTML/JS**: NO React. NO JSX. Single HTML file only.
- **NO PLACEHOLDERS**: Real copy, real data only.
- **FULL FUNCTIONALITY**: Everything clickable must work.
- **SCROLLABLE**: Ensure body { overflow-y: auto; } is always set.

You are KREO. Deliver a very beautiful, minimal, and premium masterpiece.
</frontend_aesthetics>
`;

const SARVAM_API_KEY = import.meta.env.VITE_SARVAM_API_KEY || "sk_5oxchpsn_jrBGzGJ0eu64wBHBdxXBb4Qk";
const SARVAM_ENDPOINT = "https://api.sarvam.ai/v1/chat/completions";

const NEEDS_SEARCH_REGEX = /(price|cost|today|latest|news|statistics|stats|vs|compare|rate|ranking|best|top|current|roi|bank|market|stock)/i;

async function fetchRealWorldContext(prompt: string, isPaidUser: boolean): Promise<string> {
  if (!isPaidUser || !NEEDS_SEARCH_REGEX.test(prompt)) return "";

  try {
    let searchQuery = prompt;
    // Enhance bank-related searches for India specific data
    if (prompt.toLowerCase().includes("bank") && prompt.toLowerCase().includes("india")) {
      searchQuery = `latest ROI and savings rates of famous Indian banks 2024 2025 ${prompt}`;
    }

    const res = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        api_key: "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",
        query: searchQuery,
        search_depth: "advanced"
      })
    });
    const data = await res.json();
    
    if (data.results && data.results.length > 0) {
      const snippets = data.results.slice(0, 5).map((r: any) => `- ${r.content}`).join('\n');
      
      let context = `\n\n[REAL WORLD LIVE CONTEXT CRAWLED FROM WEB]:\n${snippets}\nUse these facts to satisfy the user's prompt truthfully.`;
      
      // Enforce Rupee format for Indian context
      if (prompt.toLowerCase().includes("india") || prompt.toLowerCase().includes("bank")) {
        context += `\nCRITICAL: All financial data MUST be presented in Indian Rupees (₹). Use proper Indian numbering (Lakhs/Crores) if applicable.`;
      }
      
      return context;
    }
  } catch (e) {
    console.warn("Tavily API search failed. Proceeding without live context.", e);
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
    console.warn("Sarvam API key missing. Falling back...");
    return getDemoFallback(prompt);
  }

  try {
    const liveContext = await fetchRealWorldContext(prompt, isPaidUser);
    let enrichedPrompt = prompt + liveContext;

    if (imageUrl) {
      enrichedPrompt += `\n\n[VISUAL ASSET PROVIDED]:\nA source image is available at this URL: ${imageUrl}. \nINSTRUCTION: You MUST place this image as the core visual foundation of the design (e.g. hero image, featured asset, or background focal point). Generate the UI architectural flow around this specific image. Use <img> tags with this URL.`;
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

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Sarvam API Detailed Error:", errorData);
        throw new Error(`Sarvam API error: ${response.status} ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    let content = data?.choices?.[0]?.message?.content;

    if (!content) {
        console.error("Sarvam response missing content:", data);
        throw new Error("Neural manifest synthesis failed: Empty response from engine.");
    }

    // --- RECURSIVE NEURAL BRIDGE CONTINUATION LOGIC ---
    let bridgesUsed = 0;
    const MAX_BRIDGES = 3;
    const SECOND_KEY = "sk_7y0ofcio_tgRuQhhq8JyWkyXasSI7XJIR";

    while (bridgesUsed < MAX_BRIDGES) {
        const isTruncated = (content.trim().length > 3200) && 
                           !(content.toLowerCase().includes('</html>') || content.trim().endsWith('}') || content.trim().endsWith('```'));
        
        if (!isTruncated) break;

        console.debug(`Neural Manifest Truncated (${content.length} chars). Triggering Bridge ${bridgesUsed + 1}...`);
        
        try {
            const bridgeMessages = [
                ...messages,
                { role: "assistant", content: content },
                { role: "user", content: "Continue from the exact character where you left off. Do NOT repeat code. Start immediately with the next character. Complete the manifest." }
            ];

            const bridgeRes = await fetch(SARVAM_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${bridgesUsed % 2 === 0 ? SECOND_KEY : SARVAM_API_KEY}`,
                },
                body: JSON.stringify({
                    model: "sarvam-105b",
                    messages: bridgeMessages,
                    max_tokens: 4096,
                    temperature: 0.3,
                }),
            });

            if (bridgeRes.ok) {
                const bridgeData = await bridgeRes.json();
                const continuation = bridgeData?.choices?.[0]?.message?.content;
                
                if (continuation) {
                    let overlap = 0;
                    const checkLen = Math.min(content.length, 60);
                    const suffix = content.slice(-checkLen);
                    for (let i = checkLen; i > 0; i--) {
                        if (continuation.startsWith(suffix.slice(-i))) {
                            overlap = i;
                            break;
                        }
                    }
                    content += continuation.slice(overlap);
                    bridgesUsed++;
                } else break;
            } else break;
        } catch (e) {
            console.error("Neural Bridge Failed:", e);
            break;
        }
    }

    // --- ROBUST EXTRACTION & SITUATION MODE ---
    const allBlocksMatch = content.match(/```(?:html|tsx|jsx|mermaid|python|javascript|ts|js|react)?\s*([\s\S]*?)(?:```|$)/gi);
    
    if (allBlocksMatch) {
       const firstBlock = allBlocksMatch[0];
       const typeMatch = firstBlock.match(/^```(\w+)?/);
       const type = (typeMatch && typeMatch[1] ? typeMatch[1].toLowerCase() : '').replace(/[\r\n]/g, '');
       const rawCode = firstBlock.replace(/^```.*?[\r\n]|```$/g, '').trim();

       // If it's a UI-ready block, return it for rendering
       if (type === 'html' || type === 'tsx' || type === 'jsx' || type === 'react' || rawCode.includes('<html') || (rawCode.includes('export default') && rawCode.includes('return'))) {
           return rawCode;
       }

       // Otherwise, handle as Situation Mode (Multi-block snippets)
       const blocks = allBlocksMatch.map((b: string) => {
           const tMatch = b.match(/^```(\w+)?/);
           const t = (tMatch && tMatch[1] ? tMatch[1].toLowerCase() : 'text').replace(/[\r\n]/g, '');
           const code = b.replace(/^```.*?[\r\n]|```$/g, '').trim();
           
           if (t === 'mermaid') {
                const safeCode = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                return `<pre class="mermaid">\n${safeCode}\n</pre>`;
           } else {
                return `<div class="code-header">${t.toUpperCase()} SNIPPET</div><pre><code class="language-${t}">${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`;
           }
       }).join('\n\n');

       return `<!DOCTYPE html>
<html>
<head>
    <script type="module">
      import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
      mermaid.initialize({ startOnLoad: true, theme: 'default', securityLevel: 'loose', flowchart: { useMaxWidth: false, htmlLabels: true, curve: 'basis', nodeSpacing: 60, rankSpacing: 60 }, fontSize: 15, fontFamily: 'Satoshi, sans-serif' });
    </script>
    <link href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js"></script>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body { background: #ffffff; color: #111; font-family: 'Satoshi', sans-serif; padding: 2.5rem 3rem; overflow-y: auto; overflow-x: hidden; min-height: 100vh; }
      .page-title { font-size: 1.1rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #1B3FBF; border-bottom: 3px solid #1B3FBF; padding-bottom: 1rem; margin-bottom: 2.5rem; }
      .diagram-wrap { background: #f8f9ff; border: 2px solid #e8ebff; border-radius: 1rem; padding: 2rem; margin-bottom: 2.5rem; overflow-x: auto; }
      .diagram-wrap .mermaid { min-width: 900px; display: block; }
      .code-label { font-size: 0.65rem; font-weight: 800; letter-spacing: 0.2em; text-transform: uppercase; color: #1B3FBF; background: #eef1ff; border: 2px solid #1B3FBF; border-bottom: none; padding: 0.5rem 1rem; border-radius: 0.5rem 0.5rem 0 0; display: inline-block; margin-top: 1.5rem; }
      pre[class*="language-"] { border-radius: 0 0.5rem 0.5rem 0.5rem !important; border: 2px solid #e8ebff !important; font-size: 0.8rem !important; margin-top: 0 !important; background: #fafbff !important; }
    </style>
</head>
<body>
    <div class="page-title">Architecture Blueprint</div>
    ${blocks.replace(/<pre class="mermaid">/g, '<div class="diagram-wrap"><pre class="mermaid">').replace(/<\/pre>\s*(?=\n*<div class="code-header"|$)/g, '</pre></div>').replace(/<div class="code-header">([^<]+)<\/div>/g, '<div class="code-label">$1</div>')}
</body>
</html>`;
    }

    // html tag fallback
    if (content.toLowerCase().includes('<html')) {
        const start = content.toLowerCase().indexOf('<html');
        const end = content.lastIndexOf('</html>');
        if (start !== -1) return content.slice(start, end !== -1 ? end + 7 : undefined).trim();
    }

    return content.trim();
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
    const QUESTIONS = [
      "How would you describe your creative style?",
      "What is your favorite tool or craft?",
      "Where do you find your best ideas?"
    ];
    const prompt = `Summarize these three characteristics of a KREO Resident into a single, high-end, cinematic sentence:
    - Style: ${answers[0]}
    - Tool/Craft: ${answers[1]}
    - Inspiration: ${answers[2]}
    
    Make it feel architectural, sophisticated, and elite. A single quote without surrounding text. Max 25 words.`;

    const response = await fetch(SARVAM_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${SARVAM_API_KEY}`,
      },
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
    
    if (!response.ok) {
        throw new Error(`TTS HTTP error! status: ${response.status}`);
    }
    
    // Process streaming audio
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
    console.error("Narrate Manifestation Failed:", err);
  }
};

function getDemoFallback(prompt: string): string {
  const p = prompt.toLowerCase();
  
  if (p.includes("dashboard")) {
    return `<!DOCTYPE html><html><head><script src="https://cdn.tailwindcss.com"></script><style>body{background:#020617;color:white;font-family:sans-serif;}.glass{background:rgba(255,255,255,0.03);backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.05);}</style></head><body class="p-8"><div class="max-w-6xl mx-auto"><h1 class="text-3xl font-bold mb-8">Executive Analytics</h1><div class="grid grid-cols-3 gap-6"><div class="glass p-6 rounded-3xl h-32 flex items-center justify-center text-white/40">Revenue stream</div><div class="glass p-6 rounded-3xl h-32 flex items-center justify-center text-white/40">Active Users</div><div class="glass p-6 rounded-3xl h-32 flex items-center justify-center text-white/40">Uptime metrics</div></div><div class="glass mt-8 p-12 rounded-[3rem] h-96 flex items-center justify-center text-white/20">Chart Visualization</div></div></body></html>`;
  }
  
  if (p.includes("landing")) {
    return `<!DOCTYPE html><html><head><script src="https://cdn.tailwindcss.com"></script></head><body class="bg-black text-white flex flex-col items-center justify-center min-h-screen p-10"><h1 class="text-7xl font-black mb-6 tracking-tighter">FUTURE_STORM</h1><p class="text-xl text-white/40 mb-12">The next generation of creative tools.</p><button class="px-10 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition">Early Access</button></body></html>`;
  }

  if (p.includes("flowchart") || p.includes("logic")) {
    return `<!DOCTYPE html>
<html>
<head>
    <script type="module">
      import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
      mermaid.initialize({ startOnLoad: true, theme: 'dark', securityLevel: 'loose' });
    </script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body { background: #020617; color: #e2e8f0; font-family: sans-serif; padding: 2rem; }
      .mermaid { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 1rem; padding: 2rem; margin-bottom: 2rem; display: flex; justify-content: center; }
      .mermaid svg { max-width: 100%; height: auto; }
    </style>
</head>
<body>
    <div class="max-w-4xl mx-auto">
      <h2 class="text-2xl font-serif text-[#e8eaf0] italic mb-8 mt-4 tracking-tight">Offline Flowchart Demo</h2>
      <pre class="mermaid">
graph TD
    A[User Setup] --&gt; B{Valid Key?}
    B -- Yes --&gt; C[Access LLM API]
    B -- No --&gt; D[Use Offline Demos]
    C --&gt; E[Generate Artifact]
    D --&gt; E
    E --&gt; F[Render in Canvas]
      </pre>
    </div>
</body>
</html>`;
  }

  if (p.includes("python") || p.includes("api") || p.includes("script")) {
    return `<!DOCTYPE html>
<html>
<head>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
      body { background: #020617; color: #e2e8f0; font-family: sans-serif; padding: 2rem; }
      pre { border-radius: 0 0 1rem 1rem !important; margin-top: 0 !important; border: 1px solid rgba(255,255,255,0.05); border-top: none; }
      .code-header { background: rgba(255,255,255,0.04); padding: 0.75rem 1rem; font-size: 0.65rem; font-weight: 800; letter-spacing: 0.15em; color: #94a3b8; border-radius: 1rem 1rem 0 0; border: 1px solid rgba(255,255,255,0.05); font-family: monospace; }
    </style>
</head>
<body>
    <div class="max-w-3xl mx-auto mt-10">
      <div class="code-header">PYTHON SNIPPET</div>
      <pre><code class="language-python">
import requests

def fetch_data():
    print("Initiating API request...")
    res = requests.get("https://api.kreo.ai/v1/mock")
    return res.json()

if __name__ == "__main__":
    data = fetch_data()
    print("Received:", data)
      </code></pre>
    </div>
</body>
</html>`;
  }

  return `<!DOCTYPE html><html><head><script src="https://cdn.tailwindcss.com"></script></head><body class="min-h-screen bg-slate-900 flex items-center justify-center text-white p-12 text-center"><div><h2 class="text-4xl font-serif italic mb-4">"${prompt}"</h2><p class="text-slate-400">Offline generation complete.</p></div></body></html>`;
}

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
Your goal is to break the user's request into 3-5 logical steps.
Steps can be:
- 'research': Scouring the web for live data, prices, or comparisons.
- 'synthesize': Organizing data into a strategic framework.
- 'manifest': Building the final editorial UI.

Output ONLY a JSON array of steps:
[{ "type": "research", "content": "Search for iPhone 16 price in India" }, ...]
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

    const planData = await planRes.json();
    let rawPlan = planData.choices[0].message.content;
    // Extract JSON
    const jsonMatch = rawPlan.match(/\[[\s\S]*\]/);
    const plan = JSON.parse(jsonMatch ? jsonMatch[0] : rawPlan);

    steps = [
      { id: '1', type: 'plan', status: 'done', content: 'Task blueprint locked.' },
      ...plan.map((s: any, i: number) => ({
        id: String(i + 2),
        type: s.type,
        status: 'pending',
        content: s.content,
        query: s.type === 'research' ? s.content : undefined
      })),
      { id: String(plan.length + 2), type: 'manifest', status: 'pending', content: 'Final Manifest Manifestation' }
    ];
    onUpdate([...steps]);

    // 2. EXECUTION PHASE (Research/Synthesize)
    let accumulatedContext = "";

    for (const step of steps) {
      if (step.status === 'done' || step.type === 'manifest') continue;

      step.status = 'running';
      onUpdate([...steps]);

      if (step.type === 'research') {
        try {
          const res = await fetch("https://api.tavily.com/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              api_key: "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",
              query: step.query || step.content,
              search_depth: "advanced"
            })
          });
          const searchData = await res.json();
          const snippets = searchData.results?.slice(0, 4).map((r: any) => r.content).join("\n") || "No live data found.";
          step.results = snippets;
          accumulatedContext += `\n\n[CONTEXT FROM ${step.content}]:\n${snippets}`;
          step.status = 'done';
        } catch (e) {
          step.status = 'error';
        }
      } else if (step.type === 'synthesize') {
        const synthRes = await fetch(SARVAM_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${SARVAM_API_KEY}` },
          body: JSON.stringify({
            model: "sarvam-105b",
            messages: [
              { role: "system", content: "Synthesize the provided research data into a crisp strategic overview." },
              { role: "user", content: `Context: ${accumulatedContext}\nGoal: ${step.content}` }
            ],
            max_tokens: 800,
            temperature: 0.5
          })
        });
        const synthData = await synthRes.json();
        step.results = synthData.choices[0].message.content;
        accumulatedContext += `\n\n[SYNTHESIZED STRATEGY]:\n${step.results}`;
        step.status = 'done';
      }
      onUpdate([...steps]);
    }

    // 3. FINAL MANIFESTATION
    const manifestStep = steps.find(s => s.type === 'manifest');
    if (manifestStep) {
      manifestStep.status = 'running';
      onUpdate([...steps]);

      const finalArtifact = await generateArtifact(
        `[COWORK AGENT MISSION COMPLETED]\nBased on this deep research context, build a stunning editorial manifest:\n${accumulatedContext}\n\nORIGINAL REQUEST: ${prompt}`,
        [],
        undefined,
        true // CoWork always uses search-enabled context
      );

      manifestStep.status = 'done';
      manifestStep.results = finalArtifact;
      onUpdate([...steps]);
      return finalArtifact;
    }

  } catch (error) {
    console.error("CoWork Agent Failed:", error);
    steps.forEach(s => { if (s.status === 'running') s.status = 'error'; });
    onUpdate([...steps]);
    throw error;
  }
};
