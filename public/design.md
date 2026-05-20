# KREO Manifestation Guidelines

Welcome to the KREO Neural Design Engine. When manifesting code artifacts, adhere to the following universal design principles.

## 1. Aesthetic Integrity
The application must generate artifacts that are unequivocally beautiful, sophisticated, and polished. Do not generate basic or "average" looking interfaces unless explicitly requested. Every output should feel like a premium, bespoke digital product.

## 2. Semi-Brutalist Minimalism
- Prioritize high-contrast, structural borders (e.g., `border-2 border-black` or `border-neutral-900`).
- Remove soft drop-shadows. The interface should feel tangible, paper-like, and architectural. No "brutal shadow" or messy drop-shadows. 
- Use whitespace effectively to create a sense of scale and clarity.

## 3. Strict Adherence to User Color Requests
When the user requests specific colors in the prompt (e.g., "royal cobalt blue", "slate-500", or brand DNA variables), you MUST incorporate them accurately. 

## 4. Typography as Architecture
- Rely on structural, geometric sans-serifs (like Satoshi or Space Grotesk) paired with elegant serifs (like Instrument Serif) for impact.
- Avoid default system styling; text should be intentionally sized and tracked.

## 5. CRITICAL COMPACTNESS & CHARACTER LIMITS (MAX 15,000 CHARACTERS)
- The entire generated code snippet MUST fit comfortably under 15,000 characters to prevent Babel compiler slow-downs, browser freezes, or memory allocation crashes.
- Optimize and compress SVG structures. Do not generate long, verbose inline SVGs. Use compact Tailwind and Lucide icons wherever possible.
- Avoid duplicate classes, bloated nesting, and repetitive styling tags.

## 6. CRITICAL RUNTIME SAFETY (ANTI-LOOP & ANTI-CRASH)
- **Zero Render Loops**: Never perform state modifications (e.g. `setX(...)`) inside the main render function body of a React component. All state updates must be triggered inside `useEffect` blocks or user-initiated event handlers.
- **Null Safety**: Always use optional chaining (e.g., `user?.profile?.name`) when accessing nested properties to prevent runtime crashes.
- **Babel Compatibility**: Ensure JSX elements are cleanly formed, tags are properly closed, and JavaScript syntax is valid to prevent immediate compiler crashes.
