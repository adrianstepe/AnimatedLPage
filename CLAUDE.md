# CLAUDE.md — Stepe Digital Development Rules

You are building projects for Stepe Digital, a solo freelance web development operation.
Read this file fully before writing any code.

---

## WHO YOU ARE BUILDING FOR

Developer: Adrians, 18, Latvia.
Brand: Stepe Digital (Fiverr: Adrians S)
Stack: HTML/CSS/JS, React, Supabase, n8n, Cloudflare Pages
AI tools in use: Claude Code (you), Gemini for image gen, Lovable, AntiGravity IDE

---

## ABSOLUTE RULES — NEVER BREAK THESE

- NO WordPress. Ever. Not even mentioned.
- NO page builders (Elementor, Webflow, Wix, Squarespace etc.)
- NO jQuery unless explicitly told
- NO Bootstrap or Tailwind unless explicitly told
- NO npm / node_modules for static HTML/CSS/JS projects
- NO inline styles unless there is no cleaner alternative
- NO placeholder lorem ipsum text — ask for real content or use [PLACEHOLDER] markers
- NO comments that state the obvious (e.g. `<!-- header -->` above a `<header>`)
- NO unnecessary console.log() left in production code
- Always use semantic HTML5 elements (header, main, section, article, footer, nav)
- Always mobile-first CSS (min-width breakpoints, not max-width)
- Always use CSS custom properties (variables) for colors, fonts, spacing

---

## CODE STYLE

### HTML
- Indent: 2 spaces
- Attributes order: id, class, data-*, src/href, alt, aria-*
- Self-closing tags: `<img />`, `<input />`, `<br />`
- Every image must have meaningful alt text or alt="" if decorative
- Every page must have: lang attribute on html, meta charset, meta viewport, meta description, title

### CSS
- All design tokens go at the top of the file in :root {}
- Mobile styles first, then @media (min-width: ...) for larger screens
- Breakpoints: 480px (mobile-l), 768px (tablet), 1024px (desktop), 1280px (desktop-l)
- Use clamp() for fluid typography and spacing where appropriate
- Class naming: BEM-lite — .section-name, .section-name__element, .section-name--modifier
- Group properties: positioning → display/box model → typography → visual → animation
- Transitions: always specify property, never use `transition: all`
- Animations: use @keyframes, keep transforms GPU-friendly (transform, opacity only)

### JavaScript
- Vanilla JS only unless a library is explicitly listed in the project brief
- Use const by default, let when reassignment is needed, never var
- Use arrow functions for callbacks
- Intersection Observer for scroll animations (no scroll event listeners)
- Wait for DOMContentLoaded before querying elements
- Debounce resize and scroll listeners if used
- All async operations use async/await, not .then() chains

---

## FILE STRUCTURE (static HTML projects)

```
project-root/
├── index.html
├── CLAUDE.md
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   ├── hero/
│   ├── gallery/
│   └── icons/
└── fonts/ (only if self-hosting)
```

---

## DEPLOYMENT TARGET

All static projects deploy to Cloudflare Pages.
- No server-side code in static projects
- All form submissions use Formspree (action="https://formspree.io/f/[ID]")
- External booking links open in _blank with rel="noopener noreferrer"
- All images must be compressed before referencing (<200KB target per image)
- Favicon must be included (at minimum a 32x32 .ico or .png)

---

## PERFORMANCE RULES

- Images below the fold: loading="lazy"
- Hero images: preload with <link rel="preload">
- Google Fonts: load with display=swap
- External scripts: defer or async attribute
- CSS animations: only animate transform and opacity (GPU composited)
- No render-blocking resources above the fold
- Target Lighthouse score: 90+ performance

---

## ACCESSIBILITY RULES

- All interactive elements keyboard-navigable
- Focus styles must be visible (never `outline: none` without a replacement)
- Color contrast: WCAG AA minimum (4.5:1 for text)
- ARIA labels on icon-only buttons
- Skip-to-content link at top of page
- Reduced motion: wrap all animations in @media (prefers-reduced-motion: no-preference)

---

## HOW TO HANDLE AMBIGUITY

If something in the brief is unclear:
1. Make a reasonable assumption based on the brand and aesthetic
2. Leave a comment: `/* DECISION: [what you chose and why] */`
3. List all decisions made at the end of your response
Do NOT stop and ask about small decisions — keep building.

---

## COMMUNICATION STYLE

- Be direct and concise
- When you complete a task, list: what was built, what files were created/modified, what to do next
- If you hit a problem, describe it in one sentence and propose the fix
- Do not explain what HTML/CSS/JS is — Adrians knows
- Do not pad responses with filler text

---

## WHEN STARTING A NEW PROJECT

1. Read CLAUDE.md (this file)
2. Read the project brief file (e.g. BRIEF.md)
3. Read the content file if one exists (e.g. CONTENT.md)
4. Confirm the file structure you will create
5. Build in order: HTML structure → CSS (mobile first) → JS → animations
6. Never jump to animations before the base layout is solid

---

## LIBRARIES ALLOWED (CDN only, no npm)

If a project brief allows libraries, use only these CDN sources:
- GSAP: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js`
- GSAP ScrollTrigger: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js`
- Swiper.js: `https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js`
- No other libraries unless explicitly listed in the project brief.


## SKILLS
Skills are located in the skills/ folder. Read the relevant SKILL.md before
executing any task that matches its trigger description.

---