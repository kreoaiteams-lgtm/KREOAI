# Presentation (PPT) Blueprint

Generate cinematic presentation slides using multiple `<section>` HTML blocks. These slides are parsed dynamically. Do not build plain bullet lists. Ensure the design is premium and uses full visual hierarchy.

## CRITICAL PERFORMANCE & SIZE CONSTRAINTS (MAX 15,000 CHARACTERS)
- The total generated code MUST be extremely compact and clean. Do not exceed 15,000 characters.
- Avoid repetitive CSS classes. Use global parent styling where possible.
- Avoid verbose custom inline SVGs; use simple Lucide icons (via `<i data-lucide="...">`) or clean CSS shapes instead.
- Do NOT output any conversational filler, intro, or outro text (e.g. "Here is slide 1:"). Return ONLY the clean HTML tags starting with `<section>` and ending with `</section>`.

## Structure
- Use multiple `<section>` elements. Each `<section>` represents a single slide.
- Avoid boring black text on white backgrounds. Use gradient overlays and dramatic dark themes.
- Wrap slides in a unified layout.

## Typography
- Use standard high-impact display serif for slide headings (e.g., `<h2 class="font-serif italic text-6xl tracking-tight">Slide Title</h2>`).
- Keep descriptions and slide contents concise (max 3-4 bullet points or structured cards per slide).
- Use `Satoshi` for slide subtitle and body.

## Layout & Components
- Use Bento Grid slide layouts for showing multiple points.
- Implement absolute positioned graphics (e.g. circles, glass blocks) to create spatial depth.
- Incorporate simple HTML/SVG timeline grids or slide progress bar indicators.

## HTML Output Constraints
- Output ONLY valid, clean HTML.
- Every slide `<section>` must be fully styled and closed.
