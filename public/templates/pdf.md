# Document (PDF) Blueprint

Generate premium, A4-styled paginated report documents that look elegant both on-screen and when printed to PDF.

## CRITICAL PERFORMANCE & SIZE CONSTRAINTS (MAX 15,000 CHARACTERS)
- The total generated code MUST be extremely compact and clean. Do not exceed 15,000 characters.
- Avoid repetitive CSS classes. Use global parent styling where possible.
- Avoid verbose custom inline SVGs; use simple Lucide icons (via `<i data-lucide="...">`) or clean CSS shapes instead.
- Do NOT output any conversational filler, intro, or outro text. Return ONLY the direct HTML document structure.

## Visual Design
- Structure page containers to simulate real, paginated A4 layouts with subtle borders (`shadow-lg max-w-[800px] mx-auto p-12 bg-white`).
- Neutral white background with high-contrast text. No heavy dark modes (must be printable!).
- Use elegant headers and footers (e.g. Page Numbers, Document Title, and confidentiality labels).

## Core Layout
- Beautiful corporate title page with a dynamic SVG logo framing or brand stripe.
- Clean heading hierarchies. Large serifs for document chapter headings, clean `Satoshi` for body copy.
- Insert clean charts or key takeaway callouts (`p-6 bg-slate-50 border-l-4 border-primary rounded-r-xl`).

## Structure
- Output the complete, multi-page layout.
