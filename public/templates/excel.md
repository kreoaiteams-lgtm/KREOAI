# Spreadsheet (Excel) Blueprint

Generate dense, highly professional dashboard tables or interactive grids. The artifact should represent financial data, timelines, or calculations beautifully.

## Visual Design
- Never generate a basic `<table>`. Always build a bespoke, glassmorphic data grid.
- Use a neutral porcelain background with thin, precise borders (`border border-neutral-200/50`).
- Color accents: Use your primary brand color to highlight column headers, active rows, or key summary stats.

## Core Features
- A prominent, clean Table Header with search inputs, export buttons, and status counts.
- Use SVG Sparklines inside cells to indicate trends (e.g. mini line charts or colored status rings).
- Professional Indian numbering format (Lakhs/Crores) if financial data relates to India.
- Dense rows with adequate spacing (`py-4 px-6`) and smooth hover animations.

## Structure
- Output a single, perfectly structured HTML dashboard.
