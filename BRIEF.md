# BRIEF.md — Nailed It Studio Riga Landing Page

Read CLAUDE.md before reading this file.
This file defines everything about this specific project.

---

## PROJECT OVERVIEW

**Client:** Nailed It Studio Riga (demo project — not commissioned, built as Fiverr portfolio)
**Purpose:** Demonstrate cinematic animated landing page capability for Fiverr Gig 5
**Live URL target:** nailed-it-demo.pages.dev (Cloudflare Pages)
**Type:** Single-page static site (HTML/CSS/JS only, no frameworks)

---

## DESIGN DIRECTION

**Aesthetic:** Dark luxury editorial
**Mood:** High-end Riga nail salon — sophisticated, clean, sensory, feminine but not cutesy
**References:** Think Glossier meets Aesop meets a Latvian winter — dark, warm, minimal

**Do NOT make it:**
- Bubbly or pastel (that's not their brand)
- Generic beauty salon pink
- Corporate or clinical
- Overcrowded with elements

---

## DESIGN TOKENS

Put all of these in `:root {}` at the top of style.css. Use them everywhere — never hardcode colors.

```css
:root {
  /* Colors */
  --color-bg:         #0D0D0D;   /* page background — near black */
  --color-surface:    #1A1714;   /* card/section surfaces — dark warm brown */
  --color-surface-2:  #231F1C;   /* slightly lighter surface for contrast */
  --color-cream:      #E8E0D0;   /* logo color, headings */
  --color-accent:     #8B1A2F;   /* burgundy red — CTAs, highlights */
  --color-accent-hover: #A82038; /* slightly lighter red for hover states */
  --color-text:       #F5F0E8;   /* body text — warm white */
  --color-muted:      #9A8F84;   /* secondary text, captions */
  --color-border:     #2A2420;   /* subtle borders */

  /* Typography */
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body:    'DM Sans', system-ui, sans-serif;

  /* Spacing scale */
  --space-xs:   0.5rem;   /*  8px */
  --space-sm:   1rem;     /* 16px */
  --space-md:   1.5rem;   /* 24px */
  --space-lg:   2.5rem;   /* 40px */
  --space-xl:   4rem;     /* 64px */
  --space-2xl:  6rem;     /* 96px */

  /* Section padding (mobile → desktop via clamp) */
  --section-padding: clamp(4rem, 10vw, 8rem);

  /* Transitions */
  --transition-fast:   150ms ease;
  --transition-base:   300ms ease;
  --transition-slow:   600ms ease;
  --transition-crawl: 1000ms ease;

  /* Animation easing */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out:   cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## TYPOGRAPHY

Load from Google Fonts in `<head>` (before stylesheet):
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet">
```

**Type scale:**
```css
/* Headlines — Cormorant Garamond */
h1 { font-size: clamp(3rem, 8vw, 7rem); font-weight: 300; line-height: 1.0; letter-spacing: -0.02em; }
h2 { font-size: clamp(2rem, 5vw, 4rem);  font-weight: 300; line-height: 1.1; letter-spacing: -0.01em; }
h3 { font-size: clamp(1.25rem, 3vw, 1.75rem); font-weight: 400; }

/* Body — DM Sans */
body { font-size: 1rem; font-weight: 300; line-height: 1.7; }
.label { font-size: 0.75rem; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; }
```

---

## PAGE SECTIONS (build in this exact order)

### 1. `<head>` Setup
- lang="en" (site is in English)
- charset UTF-8
- viewport meta
- meta description: "Nailed It Studio — premium nail art and manicure salon in Rīga. Book your appointment online via Fresha."
- title: "Nailed It Studio Rīga | Premium Nail Art"
- Preload hero image: `<link rel="preload" as="image" href="images/hero/hero-bg.jpg">`
- Google Fonts link
- Stylesheet link
- Favicon: use a simple cream circle with "N" text if no file available

### 2. Navigation (`<nav>`)
**Layout:** Fixed top, full width, transparent → blurs and darkens on scroll
**Left:** "NAILED IT" text logo in Cormorant Garamond, cream color
**Right:** Navigation links: About · Services · Gallery · Book Now
**"Book Now":** Styled as a pill button with accent border (NOT filled — ghost style by default)
**Mobile:** Hamburger icon → slide-in menu from right, full screen overlay, dark bg
**Scroll behavior:** Add class `.scrolled` to nav when window.scrollY > 60px → add `backdrop-filter: blur(12px)`, darken background to rgba(13,13,13,0.85)

### 3. Hero Section (`<section id="hero">`)
**Height:** 100svh (use svh for mobile browser bar handling)
**Background:** `images/hero/hero-bg.jpg` — cover, center, fixed attachment on desktop
**Overlay:** Linear gradient from rgba(13,13,13,0.6) top to rgba(13,13,13,0.85) bottom
**Content (centered, slightly left-of-center):**
```
[Label — .label class, muted color, fades in first]
Rīga · Est. 2023

[H1 — cream, split into individual spans for animation]
Where precision
meets artistry.

[Subheading — DM Sans 300, muted color, fades in after h1]
Premium nail studio in the heart of Rīga.

[CTA buttons — appear last]
[Primary] Book Appointment → https://www.fresha.com (open _blank)
[Secondary] View Our Work → scrolls to #gallery
```
**Bottom:** Scroll indicator — small animated down arrow or line, fades out on scroll

**Hero animations (run on page load, sequence):**
1. Label fades up (delay: 0ms)
2. H1 — each word slides up from below with stagger (delay: 200ms, stagger: 80ms per word)
3. Subheading fades up (delay: 600ms)
4. Buttons fade up together (delay: 900ms)
5. Scroll indicator fades in (delay: 1400ms)

Use CSS @keyframes + animation-delay. No JS needed for entry animations.

### 4. About Section (`<section id="about">`)
**Layout:** 2 columns on desktop (50/50), stacked on mobile — text left, image right
**Background:** var(--color-surface) — slightly lighter than page bg to create depth
**Left column content:**
```
[Label] About the Studio

[H2] Crafted with
care, every time.

[Body text]
Nailed It Studio is Rīga's premium destination for nail art,
manicure, and pedicure. Our studio on Strēlnieku iela is built
around one principle: every detail matters.

From gel manicures to intricate nail art, we take our time with
every client. The result is work that lasts — and an experience
worth coming back for.

[Pull quote — styled differently, italic Cormorant, larger, accent left border]
"She has eyes for every small detail."
— Susanna, loyal client

[Small text — muted]
★★★★★ 5.0 from 70+ reviews
```
**Right column:** Single image — `images/about/about-nails.jpg` — use Image 2 (dark burgundy nails). Object-fit cover, slight zoom on hover (transform: scale(1.03), transition 600ms).

**Scroll animations:**
- Text column: fade + slide in from left (translateX(-40px) → 0)
- Image column: fade + slide in from right (translateX(40px) → 0)
- Use Intersection Observer, threshold 0.2

### 5. Services Section (`<section id="services">`)
**Background:** var(--color-bg) — back to dark
**Header:**
```
[Label] What we offer
[H2] Our Services
```
**Grid:** 3 columns desktop, 2 columns tablet, 1 column mobile
**Cards:** Each service in a card — var(--color-surface), border var(--color-border), border-radius 4px

**Services list:**
```
1. Manicure          — Classic manicure with cuticle care and hand massage
2. Gel Manicure      — Long-lasting gel polish, any color from our vast collection
3. French Manicure   — Rīga's finest French manicure. Precision and elegance.
4. Nail Art          — Custom designs, geometric, abstract, or anything you imagine
5. Pedicure          — Full pedicure treatment with cuticle care and scrub
6. Removal           — Safe gel and acrylic removal with nail care included
```

**Card structure:**
- Top: SVG line icon (keep icons simple — 24x24, stroke style, cream color)
- Middle: Service name (h3)
- Bottom: One-line description (body, muted)
- Hover: border-color changes to var(--color-accent), very subtle

**SVG icons — draw these inline (stroke, no fill):**
- Manicure: simple hand outline
- Gel: nail polish bottle
- French: two horizontal lines (tip + base)
- Nail Art: sparkle/star
- Pedicure: foot outline
- Removal: eraser/wipe (X mark)

**Scroll animation:** Cards stagger in — each card delays 100ms more than the previous. Fade up from translateY(30px).

### 6. Gallery Section (`<section id="gallery">`)
**Background:** var(--color-surface)
**Header:**
```
[Label] Portfolio
[H2] The work speaks
for itself.
```
**Layout:** Horizontal scroll strip — one row of images, scroll left/right
- On desktop: show partial next image to indicate scrollability
- On mobile: same, touch scroll
- Smooth scroll-snap on each image
- Custom scrollbar: thin, accent color, or hidden entirely

**Images to use (in this order):**
1. `images/gallery/black-geometric.jpg` — Image 1
2. `images/gallery/burgundy-nails.jpg` — Image 2
3. `images/gallery/red-shimmer-close.jpg` — Image 8
4. `images/gallery/red-shimmer-full.jpg` — Image 9
5. `images/gallery/ai-hero.jpg` — AI-generated image if available, else skip

**Each image:** 400px wide, 500px tall, object-fit cover. On hover: slight overlay appears with style name in cream text (caption appears, image darkens slightly).

**Captions (on hover):**
1. "Black geometric french"
2. "Deep burgundy gel"
3. "Cherry shimmer"
4. "Cherry shimmer — full set"
5. "Studio signature look"

### 7. Testimonials Section (`<section id="testimonials">`)
**Background:** var(--color-bg)
**Header:**
```
[Label] Client love
[H2] What our clients say
```
**Layout:** 3 cards, equal width, flex row on desktop, stacked on mobile

**Review cards:**
```
Card 1 — Vaida Tauraite (2 months ago)
Stars: ★★★★★
Quote: "I have never seen a salon so sterile and clean. The color
selection was enormous. The woman was good, nice, and spoke English.
I'll be back with my next new set of nails!"
Service: Removal + consultation

Card 2 — Adela Hansen (7 months ago)
Stars: ★★★★★
Quote: "This was a 10/10 experience! She speaks perfect English,
has a heart of gold, and takes her time with the nails. She has
eyes for every small detail!"
Service: Manicure

Card 3 — Susanna (11 months ago)
Stars: ★★★★★
Quote: "Diana does the BEST French manicure in Rīga! The salon is
comfortable, there's delicious coffee, and the atmosphere is always
cozy."
Service: Manicure, Pedicure, Gel, French
```

**Card design:**
- Background: var(--color-surface)
- Top: 5 gold stars (★★★★★, color: #C9A84C)
- Quote text: italic Cormorant Garamond, 1.1rem, cream
- Bottom: reviewer name (DM Sans 500) + service tag (small pill, muted bg)
- Subtle left border: 2px solid var(--color-accent)

**Scroll animation:** Cards stagger in from bottom, 150ms apart.

### 8. Booking CTA Section (`<section id="book">`)
**Background:** Full-width, use `images/hero/hero-bg.jpg` again with heavy dark overlay (rgba(13,13,13,0.85))
**Height:** Minimum 60vh, centered content
**Content:**
```
[Label — cream] Ready for your next set?

[H2 — large, cream]
Book your appointment
today.

[Body — muted]
We're open daily 10:00 – 23:00.
Find us at Strēlnieku iela 13, Centra rajons, Rīga.
Parking available.

[Primary CTA button — filled, accent red]
Book on Fresha  →
href: https://www.fresha.com (search "Nailed It Studio Riga" — find actual URL)

[Hours badge — small pill below button]
Open today · 10:00 – 23:00
```

**JS — live hours badge:**
Check current hour. If between 10 and 23 (local Riga time): show "Open now · closes at 23:00" in green. Otherwise: "Closed · opens at 10:00" in muted. Use `new Date()` and `.getHours()`. Note: this is approximate, no timezone conversion needed for demo.

**Animation:** Content fades in from below on scroll.

### 9. Footer (`<footer>`)
**Background:** var(--color-surface)
**Top border:** 1px solid var(--color-border)
**Layout:** 3 columns desktop, stacked mobile

**Col 1 — Brand:**
```
NAILED IT
nailed.it.riga
[Short tagline] Premium nail studio, Rīga.
```

**Col 2 — Visit:**
```
[Label] Find us
Strēlnieku iela 13
Centra rajons, Rīga
Mon–Sun: 10:00 – 23:00
Parking available
```

**Col 3 — Connect:**
```
[Label] Follow along
Instagram: @nailed.it.riga [link]
Book via Fresha [link]
```

**Bottom bar (separate row):**
```
Left: © 2025 Nailed It Studio Rīga. All rights reserved.
Right: Built by Stepe Digital [link to fiverr or placeholder #]
```
Both in muted, 0.75rem. "Built by Stepe Digital" is a discreet backlink — keep it subtle.

---

## GLOBAL ANIMATIONS SYSTEM

Add this to main.js — runs on all `.animate-on-scroll` elements:

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target); // animate once only
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.animate-on-scroll').forEach(el => {
  observer.observe(el);
});
```

CSS classes to define:
```css
.animate-on-scroll {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s var(--ease-out-expo), transform 0.8s var(--ease-out-expo);
}
.animate-on-scroll.from-left  { transform: translateX(-40px); }
.animate-on-scroll.from-right { transform: translateX(40px); }
.animate-on-scroll.is-visible {
  opacity: 1;
  transform: translate(0);
}

/* Stagger delays for grids */
.animate-on-scroll:nth-child(2) { transition-delay: 100ms; }
.animate-on-scroll:nth-child(3) { transition-delay: 200ms; }
.animate-on-scroll:nth-child(4) { transition-delay: 300ms; }
.animate-on-scroll:nth-child(5) { transition-delay: 400ms; }
.animate-on-scroll:nth-child(6) { transition-delay: 500ms; }

/* Reduced motion override */
@media (prefers-reduced-motion: reduce) {
  .animate-on-scroll {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

Apply `.animate-on-scroll` to: section headings, about columns, service cards, gallery items, testimonial cards, CTA content.
Apply `.animate-on-scroll.from-left` to: about text column.
Apply `.animate-on-scroll.from-right` to: about image column.

---

## CURSOR EFFECT (desktop only)

Add a custom cursor dot that follows the mouse with smooth lag:

```javascript
// Only on non-touch devices
if (window.matchMedia('(pointer: fine)').matches) {
  const cursor = document.createElement('div');
  cursor.className = 'cursor-dot';
  document.body.appendChild(cursor);

  let mouseX = 0, mouseY = 0;
  let curX = 0, curY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  const lerp = (a, b, t) => a + (b - a) * t;

  const animateCursor = () => {
    curX = lerp(curX, mouseX, 0.12);
    curY = lerp(curY, mouseY, 0.12);
    cursor.style.transform = `translate(${curX}px, ${curY}px)`;
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  // Scale up on hoverable elements
  const hoverEls = document.querySelectorAll('a, button, .gallery__item');
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('is-hovering'));
  });
}
```

CSS for cursor:
```css
.cursor-dot {
  position: fixed;
  top: -6px;
  left: -6px;
  width: 12px;
  height: 12px;
  background: var(--color-cream);
  border-radius: 50%;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: difference;
  transition: width 300ms var(--ease-out-expo),
              height 300ms var(--ease-out-expo),
              background 300ms ease;
  will-change: transform;
}
.cursor-dot.is-hovering {
  width: 40px;
  height: 40px;
  top: -20px;
  left: -20px;
}
```

---

## NAV SCROLL BEHAVIOR (JS)

```javascript
const nav = document.querySelector('nav');
const handleScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
};
window.addEventListener('scroll', handleScroll, { passive: true });
```

CSS:
```css
nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  padding: 1.5rem 2rem;
  transition: background var(--transition-base), backdrop-filter var(--transition-base), padding var(--transition-base);
}
nav.scrolled {
  background: rgba(13, 13, 13, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  padding: 1rem 2rem;
}
```

---

## MOBILE NAV (hamburger)

```javascript
const burger = document.querySelector('.nav__burger');
const menu = document.querySelector('.nav__menu');

burger.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('is-open');
  burger.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close on link click
document.querySelectorAll('.nav__menu a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    burger.setAttribute('aria-expanded', false);
    document.body.style.overflow = '';
  });
});
```

---

## IMAGE FILE NAMES (reference these exactly)

Place all images in the `images/` folder with this structure:
```
images/
├── hero/
│   └── hero-bg.jpg         ← AI-generated or use images/gallery/black-geometric.jpg darkened
├── about/
│   └── about-nails.jpg     ← Image 2 (burgundy nails, cream sweater)
├── gallery/
│   ├── black-geometric.jpg ← Image 1
│   ├── burgundy-nails.jpg  ← Image 2
│   ├── red-shimmer-close.jpg ← Image 8
│   └── red-shimmer-full.jpg  ← Image 9
└── logo/
    └── logo.png            ← Extracted logo (cream circle with NAILED IT text)
```

If hero-bg.jpg is not yet available (AI not generated yet), use `images/gallery/black-geometric.jpg` with a heavier CSS overlay.

---

## BUTTONS

**Primary button (filled):**
```css
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  background: var(--color-accent);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-decoration: none;
  border: 1px solid var(--color-accent);
  border-radius: 2px;
  cursor: pointer;
  transition: background var(--transition-fast), transform var(--transition-fast);
}
.btn-primary:hover {
  background: var(--color-accent-hover);
  transform: translateY(-1px);
}
```

**Secondary button (ghost):**
```css
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  background: transparent;
  color: var(--color-cream);
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-decoration: none;
  border: 1px solid rgba(232, 224, 208, 0.4);
  border-radius: 2px;
  cursor: pointer;
  transition: border-color var(--transition-fast), transform var(--transition-fast);
}
.btn-secondary:hover {
  border-color: var(--color-cream);
  transform: translateY(-1px);
}
```

---

## WHAT SUCCESS LOOKS LIKE

When complete, the page should:
- Load hero in under 2 seconds
- Animations trigger smoothly as user scrolls
- Look flawless on iPhone 14 (390px) and MacBook (1440px)
- The cursor dot follows the mouse with subtle lag on desktop
- Nav blurs and compresses on scroll
- All CTA buttons link to Fresha booking
- "Built by Stepe Digital" visible in footer

Deploy to Cloudflare Pages and return the live URL.

---

*Brief version 1.0 — Nailed It Studio demo — Stepe Digital*



# BRIEF.md — Nailed It Studio Rīga
# Animation Landing Page — Fiverr Portfolio Gig

Read this after CLAUDE.md. All rules in CLAUDE.md apply.
Read CONTENT.md for all copy — use it verbatim, no rewrites.

---

## PROJECT OVERVIEW

Type: Single-page animated landing page
Client: Nailed It Studio Rīga (real nail salon, demo build)
Purpose: Fiverr portfolio piece for "Animated Landing Page" gig
Deploying to: Cloudflare Pages
Stack: Pure HTML / CSS / JS — no frameworks, no npm

---

## DESIGN SYSTEM

### Colors
--bg:         #0D0D0D
--bg-soft:    #141414
--bg-card:    #161616
--cream:      #E8E0D0
--cream-dim:  #A89F92
--accent:     #8B1A2F
--accent-hi:  #B02340
--line:       rgba(232,224,208,.10)
--line-med:   rgba(232,224,208,.18)

### Typography
--ff-display: 'Cormorant Garamond', Georgia, serif
--ff-body:    'DM Sans', sans-serif
Load via Google Fonts CDN with display=swap.

### Aesthetic
Dark luxury editorial. Think Maison Margiela meets Apple product page.
Large display type, generous whitespace, precise micro-details.
NO gradients with multiple colors. NO rounded buttons. NO drop shadows.
Borders and lines use --line / --line-med only.

---

## FILE STRUCTURE

index.html
css/style.css
js/main.js
hero/hero-bg.webp
hero/hero-scroll.mp4     ← only reference if file exists
about/about-nails.webp
gallery/black-geometric.webp
gallery/burgundy-nails.webp
gallery/red-shimmer-close.webp
gallery/red-shimmer-full.webp

---

## SECTIONS (in order)

1. NAV
2. HERO
3. ABOUT
4. SERVICES
5. GALLERY
6. TESTIMONIALS
7. BOOKING CTA
8. FOOTER

---

## SECTION SPECS

### 1. NAV
- Fixed, transparent → blur + border on scroll (backdrop-filter)
- Left: logo text "NAILED IT" in Cormorant Garamond
- Center: links — About · Services · Gallery · Book Now
- Right: hours badge (open/closed dot + label) + "Book" CTA button
- Mobile: hide center links, keep logo + book button
- Hours badge logic:
  Open: hours >= 10 && hours < 23 (Europe/Riga timezone)
  Closed: show "Opens 10:00"

### 2. HERO — SCROLL-DRIVEN ANIMATION

IF hero/hero-scroll.mp4 EXISTS:
  - Full-viewport video element, muted, preload="auto", playsinline
  - Video playback tied to scroll position via JS:
    video.currentTime = (scrollY / maxScroll) * video.duration
  - Overlay: left-aligned headline text with opacity fade on scroll
  - Text fades out as user scrolls into the video animation

IF only hero/hero-bg.webp EXISTS (fallback):
  - background-attachment: fixed on min-width: 1024px ONLY
  - CSS parallax layers: hero-bg + dark gradient overlay
  - Staggered entry animations: eyebrow → h1 → sub → CTAs
  - Scroll indicator with animated line

Both versions:
  - Eyebrow: "Rīga · Est. 2023"
  - H1: "Where precision meets artistry."
  - Sub: "Premium nail studio in the heart of Rīga."
  - CTA 1: "Book Appointment" → Fresha link
  - CTA 2: "View Our Work" → #gallery anchor

### 3. ABOUT
- 2-column grid: image left, text right
- Image: about/about-nails.webp — NO loading="lazy" (above fold)
- Decorative border offset behind image (CSS ::before)
- Pull quote: "She has eyes for every small detail." — Susanna
- Stats row: 5.0★ · 70+ reviews · Est. 2023
- Scroll reveal: image slides from left, text from right

### 4. SERVICES
- 6-card grid (3 cols desktop → 2 tablet → 1 mobile)
- Cards: numbered 01–06, service name, description, no prices
  (prices not in CONTENT.md — omit entirely)
- Bottom accent line animates in on hover
- Staggered scroll reveal with transition-delay per card

### 5. GALLERY
- Horizontal scroll track, drag-to-scroll on desktop
- Touch scroll native on mobile
- 4 images: black-geometric, burgundy-nails, red-shimmer-close, red-shimmer-full
- Captions from CONTENT.md gallery section
- Fade edge gradients left and right
- aria-label="Portfolio gallery — scroll to view more"

### 6. TESTIMONIALS
- 3 cards, exact quotes from CONTENT.md — verbatim
- Reviewer name, time ago, service tag
- Large decorative quotation mark (Cormorant, accent color, low opacity)
- Staggered scroll reveal

### 7. BOOKING CTA
- Full-width dark section with radial glow (accent color, low opacity)
- Headline, body, address, hours from CONTENT.md
- Hours badge (live JS — same logic as nav badge)
- Single CTA: "Book on Fresha →"

### 8. FOOTER
- 3-column: brand · Find us · Follow along
- All content from CONTENT.md footer section
- Bottom bar: copyright left, "Built by Stepe Digital" right
- "Built by Stepe Digital" links to stepe.digital

---

## ANIMATIONS

### Hero entry (CSS @keyframes)
Sequence: eyebrow (0.2s) → h1 (0.38s) → sub (0.55s) → CTAs (0.72s) → scroll hint (1.2s)
All animate from opacity:0 + translateY(20px) → visible

### Scroll reveals (Intersection Observer — no scroll listeners)
Classes: .reveal, .reveal-left, .reveal-right
Threshold: 0.12
One-shot: unobserve after trigger
Stagger via inline transition-delay on children

### Parallax (desktop only, min-width: 1024px)
background-attachment: fixed on hero bg image
NEVER apply on max-width: 1023px

### Custom cursor (desktop only, min-width: 769px)
- Dot: 10px filled accent circle
- Ring: 36px outlined, follows with lerp (factor 0.14)
- Expands on hover over interactive elements
- Hide entirely on touch devices (display: none)

### Nav on scroll
- Padding collapses
- backdrop-filter: blur(18px) activates
- border-bottom appears

### Gallery drag scroll
- mousedown/mousemove/mouseup on track
- multiplier: 1.4x

### Floating Book button
- Fixed bottom-right
- Fades in after 400px scroll
- Links to Fresha

---

## SEO

Title: Nailed It Studio Rīga | Premium Nail Art & Manicure
Meta description: from CONTENT.md
OG tags: from CONTENT.md
JSON-LD structured data:
{
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  "name": "Nailed It Studio Rīga",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Strēlnieku iela 13",
    "addressLocality": "Rīga",
    "addressCountry": "LV"
  },
  "openingHours": "Mo-Su 10:00-23:00",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "70"
  }
}

Hero image preload:
<link rel="preload" as="image" href="hero/hero-bg.webp">

---

## PERFORMANCE RULES

- Hero image: preload link in <head>
- Gallery images: loading="lazy"
- About image: NO lazy load
- Fonts: display=swap
- Animate only transform + opacity
- All @keyframes wrapped in:
  @media (prefers-reduced-motion: no-preference) { ... }

---

## KNOWN FIXES (apply without being told)

1. Hours open: hours >= 10 && hours < 23 (not < 22)
2. background-attachment: fixed — min-width: 1024px only
3. All images .webp — no .jpg references
4. about-nails.webp — no loading="lazy"
5. Skip-to-content link as first element in body
6. Focus styles: never outline:none without replacement

---

## LIBRARIES (CDN only)

GSAP 3.12.2 is approved for scroll-driven animation:
https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js
https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js

Use GSAP ScrollTrigger for:
- Scroll-scrubbed video playback (if MP4 exists)
- Section pin during scroll animation
- Any animation requiring precise scroll progress

---

*Stepe Digital — demo build for AnimationLandingPage Fiverr gig*