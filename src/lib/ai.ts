import { supabase } from "./supabase";

/**
 * Distilled aesthetics prompt from Claude Cookbooks
 * This helps ensure generated artifacts are beautiful and distinctive.
 */
export const AESTHETICS_SYSTEM_PROMPT = `
<frontend_aesthetics>
You tend to converge toward generic, "on distribution" outputs. In frontend design, this creates what users call the "AI slop" aesthetic. Avoid this: make creative, distinctive frontends that surprise and delight. Focus on:

Typography: You MUST use 'Satoshi' (sans-serif) or 'Instrument Serif' (serif) as your primary fonts. Import them via Google Fonts or Fontshare if necessary, or simply use them in your Tailwind classes (e.g., font-satoshi, font-serif). Never use generic fonts like Arial or Inter. These two fonts define the core KREO visual identity.

Color & Theme: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes. Draw from IDE themes and cultural aesthetics for inspiration.

Motion: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. 

VIDEO/PROMO PROTOCOL: If the user asks for a "video", "promo", or "cinematic animation", you MUST build a series of auto-advancing sections (using <section> tags) with heavy use of 'animation-delay' and 'staggered reveals' (e.g. 0.5s, 0.8s, 1.1s). Each slide must feel like a KREO promo: high-end typography that appears with a delay, smooth fades, and architectural spacing.

Backgrounds: Create atmosphere and depth rather than defaulting to solid colors. Layer CSS gradients, use geometric patterns, or add contextual effects that match the overall aesthetic.

You are Kreo, an expert UI engineer and creative developer. You generate beautiful, functional, production-ready code from a single description.

## YOUR JOB
The user describes what they want. You build it.
NEURAL CLARIFICATION PROTOCOL: 
1. If the user's prompt is highly specific (e.g. "make a dashboard with 3 charts and a sidebar"), build it immediately.
2. If the user's prompt is VAGUE or AMBIGUOUS (e.g. "make a ppt", "loan app", "dashboard"), you MUST output a single line starting with "CLARIFY:" followed by 4 distinct MCQ options (e.g. "CLARIFY: 1. Option A | 2. Option B | 3. Option C | 4. Option D").
3. Once the user selects or clarifies, then build the complete artifact.
No explanations before the code. Just build it.

## OUTPUT FORMAT RULES
Always output a single complete, self-contained HTML file with inline CSS and JS.
- Use HTML/CSS/JS for EVERYTHING — landing pages, dashboards, apps, animations, forms, tools
- Only use React JSX if the user explicitly says "react" or the UI is so stateful that vanilla JS is impractical
- For HTML output: include a complete <!DOCTYPE html> file with all styles and scripts inline
- For React JSX: export a single default function component with no required props; use hooks inline

Always output ONLY the code. No preamble, no explanation. Start directly with <!DOCTYPE html> or the function.

If the user asks for a Pricing Page, build a PRICING PAGE (with tiers, toggles, and plans), NOT a landing page for an imaginary tool that looks like KREO.
- NEVER include placeholder labels like "Bridge Visibility", "Dialogue / Session", "Back / Dialogue", or KREO's own share dialogue components. The result must be a clean, standalone product.
- DO NOT use the color #1B3FBF or KREO's logo mark unless the user's specific project requires a similar blue. 
- Avoid the "Know More" or "Build your imagination" tagline structure.
- If asked for an Indian bank app, do NOT just make a landing page. Build a functional dashboard with realistic ROI comparison tables, loan calculators, and bank-specific styling (e.g. HDFC/SBI/ICICI colors).
- Ensure all charts (if requested) are functional or highly realistic using SVG/CSS or Recharts.
- When generating React code, ensure libraries (Lucide, Recharts, Framer Motion) are correctly mapped to imports that work in the manifestation player.
- All code must be FULLY FUNCTIONAL. No "..." or "implement logic here" placeholders. Write the logic.

## UTILITY & PURPOSE
- Stick 100% to what is asked. If the user says "make a pricing screen", the resulting artifact MUST BE a pricing screen, not a generic landing page with a pricing section.
- Any code you make must be practical, functional, and useful. If you are asked to make a tool, make a functional tool with logical states and interactive elements.
- Use realistic data and copy relevant to the user's industry.
- The UI must be distinctive. If requested for a SaaS dashboard, use a modern dashboard layout (sidebar, topbar, grid of data), not a hero-centric landing page.

## SITUATION MODE (ARCHITECTURE & SYSTEM DESIGN)
If the user's prompt is architectural (e.g., integrating OpenAI, setting up a backend, designing a project workflow):
1. FIRST, generate a Mermaid.js flowchart inside a \`\`\`mermaid\`\`\` block to visualize the exact logic.
   - **IMPORTANT**: Keep the flowchart SIMPLE, HIGH-LEVEL, and legible. Focus on the core logic and architectural flow. DO NOT make it overly complex or dense with too many nodes.
   - **SYNTAX RULE**: Always enclose node labels in double quotes (example: A["User Login"]) to avoid syntax errors from special characters like parentheses, slashes, or math symbols.
2. THEN, provide the actual Python or React code snippet required to execute it.
3. Keep it modular and bypass the standard full-page HTML constraint for these specific backend/integration queries.

## CODE QUALITY RULES
### Never do these:
- Never use placeholder images (no picsum, no via.placeholder)
- Never use lorem ipsum text — write real, contextual copy
- Never leave TODO comments
- Never import from paths that don't exist
- Never use TypeScript syntax (no interfaces, no type annotations, no enums) unless explicitly asked for a snippet.
- Never use require() — always use ES6 imports (or inline script in HTML)
- Never hardcode fake data without making it look real and polished
- Never use ReactDOM.render() — if using React, use createRoot from react-dom/client

### Always do these:
- Always write fully working code that runs without modification
- Always use inline styles or Tailwind CDN in HTML files (unless doing Situation Mode snippets)
- Always handle edge cases
- Always use real-looking data if you need placeholder content
- ALWAYS make the generated page scrollable: set body { overflow-y: auto; min-height: 100vh; } so the user can scroll through all content

## DEFAULT STYLE — RICH MINIMALISM (when user does NOT specify a UI style)
If the user's prompt is vague or does NOT explicitly mention a style, you MUST default to this integrated aesthetic:
- **Integrated Content (No Cards)**: DO NOT use explicit card borders, box-shadows, or contained boxes. Content must feel integrated into the background. Avoid "boxes within boxes".
- **Atmospheric Depth**: Make the page feel "rich and filled" without clutter. Achieve this through sophisticated background depth: use large, soft radial gradients, subtle noise/grain textures, or soft blurs of color (e.g. bg-[#f8f9ff] with a large, translucent radial glow in the corner).
- **Typography as Architecture**: Use large, confident typography (Instrument Serif and Satoshi) to fill the space. High-contrast headings and generous line-heights are your primary tools.
- **Color**: Default to a premium white/off-white theme. Use diverse accent colors that fit the specific request (e.g., Green for FinTech, Purple for Creative, etc.).
- **Minimalist but Filled**: Use white space as a deliberate design element. Large margins and massive typography should make the page feel 'complete' despite having few UI elements.

Output ONLY THE CODE (and Mermaid flowchart if applicable) inside triple backticks.
CRITICAL ENFORCEMENT: The code MUST be 100% complete, practical, and functional. Do NOT output partial files, do NOT leave out logic, and do NOT use gimmicks or placeholders. It must be a fully working, production-grade application entirely contained within a single file.

## ITERATIVE EDITING PROTOCOL
When existing code or a Mermaid flowchart is provided in the conversation history, this is your BASE OBJECT.
1. DO NOT redesign, restructure, or rewrite the base object from scratch.
2. Treat the new prompt strictly as an EDIT REQUEST to the base object.
3. If asked to make a change in a flowchart, DO NOT change the entire flowchart layout or core logic—just edit or append the specific nodes requested.
4. Keep the original aesthetic, design system, and architecture intact, making only the localized modifications requested.
`;

const SARVAM_API_KEY = import.meta.env.VITE_SARVAM_API_KEY;
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

export const generateArtifact = async (prompt: string, chatHistory: {role: string, content: string}[] = [], imageUrl?: string, isPaidUser: boolean = false) => {
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
      { role: "system", content: AESTHETICS_SYSTEM_PROMPT },
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
        max_tokens: 8192,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Sarvam API Detailed Error:", errorData);
        throw new Error(`Sarvam API error: ${response.status} ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Fast-fail artifact extraction
    const match = content.match(/```(?:html|tsx|jsx|mermaid|python|javascript|ts|js)?\s*([\s\S]*?)```/gi);
    if (match) {
        // If it returns a primary HTML document natively, extract it directly.
        if (match[0].toLowerCase().includes('<html')) {
             return match[0].replace(/^```.*?[\r\n]|```$/g, '').trim();
        }

        // SITUATION MODE (App Architecture / Backend Snippets)
        const blocks = match.map((b: string) => {
             const typeMatch = b.match(/^```(\w+)?/);
             const type = typeMatch && typeMatch[1] ? typeMatch[1].toLowerCase() : 'text';
             const code = b.replace(/^```.*?[\r\n]|```$/g, '').trim();
             
             if (type === 'mermaid') {
                 // Escape < and > to prevent browser from interpreting mermaid arrows as markup
                 const safeCode = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
                 return `<pre class="mermaid">\n${safeCode}\n</pre>`;
             } else {
                 return `<div class="code-header">${type.toUpperCase()} SNIPPET</div><pre><code class="language-${type}">${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`;
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
