# Spreadsheet (Excel) Blueprint

Generate dense, highly professional dashboard tables or interactive grids. The artifact should represent financial data, timelines, or calculations beautifully.

## CRITICAL PERFORMANCE & SIZE CONSTRAINTS (MAX 15,000 CHARACTERS)
- The total generated code MUST be extremely compact and clean. Do not exceed 15,000 characters.
- Avoid repetitive CSS classes. Use tailwind class combining where possible.
- Avoid verbose custom inline SVGs; use simple Lucide icons (via `<i data-lucide="...">`) or clean CSS shapes instead.
- Do NOT output any conversational filler, intro, or outro text. Return ONLY valid clean HTML dashboard elements.

## Visual Design
- Never generate a basic `<table>`. Always build a bespoke, glassmorphic data grid.
- Use a porcelain background with thin, precise borders (`border border-neutral-200/50`).
- Color accents: Use your primary brand color to highlight column headers, active rows, or key summary stats.

## Core Features
- A prominent, clean Table Header with search inputs, export buttons, and status counts.
- Use SVG Sparklines inside cells to indicate trends (e.g. mini line charts or colored status rings).
- Professional Indian numbering format (Lakhs/Crores) if financial data relates to India.
- Dense rows with adequate spacing (`py-4 px-6`) and smooth hover animations.

## Structure
- Output a single, perfectly structured HTML dashboard.
