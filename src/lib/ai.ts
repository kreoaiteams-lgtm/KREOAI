import { supabase } from "./supabase";

/**
 * Distilled aesthetics prompt from Claude Cookbooks
 * This helps ensure generated artifacts are beautiful and distinctive.
 */
export const AESTHETICS_SYSTEM_PROMPT = `
<frontend_aesthetics>
You are an ELITE UI ARCHITECT. Your mission is to eliminate "AI slop"—the generic, timid, and predictable layouts typical of LLMs. Every manifestation must feel like a premium, editorial digital product.

### 1. CORE IDENTITY: EDITORIAL BRUTALISM
- **Typography Strategy**: You MUST use 'Satoshi' (sans-serif) or 'Instrument Serif' (serif). Large, loud headers are design elements.
- **Brutalist Architecture**: Use thick **2px solid black borders** (border-black border-2) on all cards, buttons, and sections.
- **High Contrast**: Use a "Pure Color" strategy. Use solid, high-saturation backgrounds (Primary Blue, Cyber Yellow, Sharp Cyan). Never use timid, washed-out colors.
- **Neo-Shadows**: Use hard, solid offset shadows instead of soft ones (e.g., shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]).
- **Roundedness**: Maintain "Half-Brutalism" by keeping 2xl or 3xl rounded corners (rounded-3xl), but framing them with thick black borders.

### 2. ARCHITECTURAL DENSITY
- **Sharp Grids**: Use strictly aligned grids. Every element should feel locked into place with visible or implied borders.
- **Density over Fluff**: Fill the screen with meaningful content. Large margins (p-16) are still key for luxury, but edges must be sharp and defined.
- **No Boring Cards**: Every card must have a 2px border and a hard offset shadow.

### 3. THE "WOW" PROTOCOL
- **Kinetic Motion**: Animations should be fast and snappy. Entry animations should feel like architectural blueprints being drawn in real-time.
- **High-End Graphic Details**: Use small detail markers (crosshairs, coordinate labels, serial numbers) in the corners of sections to emphasize the "System Design" vibe.
- **Indian Brutalism**: For Indian contexts, mix bold black geometry with vibrant Teal and Deep Orange. Use ₹ symbol in a large, bold font.

### 4. TECHNICAL CONSTRAINTS
- **STRICT STANDALONE HTML/JS**: NO React. NO JSX. Single HTML file only.
- **NO PLACEHOLDERS**: Real copy, real data only.
- **FULL FUNCTIONALITY**: Everything clickable must work.
- **SCROLLABLE**: Ensure body { overflow-y: auto; } is always set.

You are KREO. Deliver a high-end, brutalist masterpiece.
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
    let content = data.choices[0].message.content;

    // --- NEURAL BRIDGE CONTINUATION LOGIC ---
    // If output feels truncated (no closing tags and roughly at limit), bridge to the second key
    const isTruncated = (content.trim().length > 3500) && 
                       !(content.toLowerCase().includes('</html>') || content.trim().endsWith('}') || content.trim().endsWith('```'));

    if (isTruncated) {
        console.debug("Neural Manifest Truncated. Triggering Bridge Continuation...");
        const SECOND_KEY = "sk_7y0ofcio_tgRuQhhq8JyWkyXasSI7XJIR";
        
        const bridgeMessages = [
            ...messages,
            { role: "assistant", content: content },
            { role: "user", content: "Continue from the exact character where you left off. Do NOT repeat code. Start immediately with the next character. Complete the manifest." }
        ];

        try {
            const bridgeRes = await fetch(SARVAM_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${SECOND_KEY}`,
                },
                body: JSON.stringify({
                    model: "sarvam-105b",
                    messages: bridgeMessages,
                    max_tokens: 4096,
                    temperature: 0.5,
                }),
            });

            if (bridgeRes.ok) {
                const bridgeData = await bridgeRes.json();
                const continuation = bridgeData?.choices?.[0]?.message?.content;
                
                if (continuation) {
                    // STITCH LOGIC: More conservative stitching to avoid dropping characters
                    let overlap = 0;
                    const checkLen = Math.min(content.length, 50); // Shorter check window for safety
                    const suffix = content.slice(-checkLen);
                    for (let i = checkLen; i > 0; i--) {
                        if (continuation.startsWith(suffix.slice(-i))) {
                            overlap = i;
                            break;
                        }
                    }
                    
                    content += continuation.slice(overlap);
                    console.debug("Neural Bridge Successful. Manifest Extended.");
                }
            }
        } catch (e) {
            console.error("Neural Bridge Failed:", e);
        }
    }
    // ----------------------------------------

    // Fast-fail artifact extraction
    const match = content.match(/```(?:html|tsx|jsx|mermaid|python|javascript|ts|js|react)?\s*([\s\S]*?)```/gi);
    if (match) {
        // If it's a UI-ready block (HTML or React/JSX), extract and return RAW code
        // This allows ArtifactPanel to render it via Babel/Iframe
        const firstBlock = match[0];
        const typeMatch = firstBlock.match(/^```(\w+)?/);
        const type = typeMatch && typeMatch[1] ? typeMatch[1].toLowerCase() : '';
        const rawCode = firstBlock.replace(/^```.*?[\r\n]|```$/g, '').trim();

        if (type === 'html' || type === 'tsx' || type === 'jsx' || type === 'react' || rawCode.includes('<html') || (rawCode.includes('export default') && rawCode.includes('return'))) {
            return rawCode;
        }

        // SITUATION MODE (App Architecture / Backend Snippets / Mermaid)
        const blocks = match.map((b: string) => {
             const tMatch = b.match(/^```(\w+)?/);
             const t = tMatch && tMatch[1] ? tMatch[1].toLowerCase() : 'text';
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
      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
        securityLevel: 'loose',
        flowchart: { useMaxWidth: false, htmlLabels: true, curve: 'basis', nodeSpacing: 60, rankSpacing: 60 },
        fontSize: 15,
        fontFamily: 'Satoshi, sans-serif'
      });
    </script>
    <link href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css" rel="stylesheet" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-python.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-javascript.min.js"></script>
    <style>
      * { box-sizing: border-box; margin: 0; padding: 0; }
      body {
        background: #ffffff;
        color: #111;
        font-family: 'Satoshi', sans-serif;
        padding: 2.5rem 3rem;
        overflow-y: auto;
        overflow-x: hidden;
        min-height: 100vh;
      }
      .page-title {
        font-size: 1.1rem;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: #1B3FBF;
        border-bottom: 3px solid #1B3FBF;
        padding-bottom: 1rem;
        margin-bottom: 2.5rem;
      }
      .diagram-wrap {
        background: #f8f9ff;
        border: 2px solid #e8ebff;
        border-radius: 1rem;
        padding: 2rem;
        margin-bottom: 2.5rem;
        overflow-x: auto;
        overflow-y: visible;
        -webkit-overflow-scrolling: touch;
      }
      .diagram-wrap .mermaid {
        min-width: 900px;
        display: block;
      }
      .diagram-wrap svg {
        width: 100% !important;
        height: auto !important;
        min-width: 900px;
        display: block;
      }
      .code-label {
        font-size: 0.65rem;
        font-weight: 800;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: #1B3FBF;
        background: #eef1ff;
        border: 2px solid #1B3FBF;
        border-bottom: none;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem 0.5rem 0 0;
        display: inline-block;
        margin-top: 1.5rem;
      }
      pre[class*="language-"] {
        border-radius: 0 0.5rem 0.5rem 0.5rem !important;
        border: 2px solid #e8ebff !important;
        font-size: 0.8rem !important;
        margin-top: 0 !important;
        background: #fafbff !important;
      }
      code { font-family: 'Fira Code', 'Fira Mono', monospace; }
    </style>
</head>
<body>
    <div class="page-title">Architecture Blueprint</div>
    ${blocks.replace(/<pre class="mermaid">/g, '<div class="diagram-wrap"><pre class="mermaid">').replace(/<\/pre>\s*(?=\n*<div class="code-header"|$)/g, '</pre></div>').replace(/<div class="code-header">([^<]+)<\/div>/g, '<div class="code-label">$1</div>')}
</body>
</html>`;
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
