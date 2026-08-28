# Upoma Site Redesign Plan

## Goal
Move the current single-page Upoma site from a safe, template-like light layout to a bold, premium, dynamic consultancy presence that feels distinctive and memorable.

## Locked design decisions (from your picks)
- **Palette**: Midnight + electric purple — near-black background `#0a0a0f`, deep purple `#3c0678`, bright electric purple `#7c3aed`, white text/accents `#ffffff`.
- **Typography**: Keep Glacial Indifference as the single type family; use weight and scale for hierarchy rather than a second font.
- **Layout structure**: Bento-grid / modular panel system for Services, Work, and About.

## What will change

### 1. Color inversion & atmosphere
- Flip the page to a dark midnight canvas (`#0a0a0f`).
- Use purple as luminous accent: glowing buttons, key-result panels, category tags, and subtle borders.
- Add soft ambient gradients (very subtle) behind the hero and work panels so the page has depth without being flashy.

### 2. Hero rethink
- Larger, more commanding headline with tighter line-height.
- Split the hero into a bento-like introduction: headline on the left, a compact "stats/claims" panel on the right (e.g., "Dhaka-based", "AI + Strategy", "Launching 2027").
- Animate the word "forward" with a slow color pulse or gradient shift.

### 3. Services as a bento grid
- Replace the 2×2 equal cards with a mixed-size bento grid:
  - One large feature card for AI Solutions.
  - Two medium cards for Digital Marketing Strategy and Social Media Management.
  - One small card for Training & Workshops.
- Cards sit on the dark background with subtle borders; hover lifts the card and brightens the border.

### 4. Work section as case-study panels
- Keep the three projects but present them as wide, alternating panels with a strong typographic hierarchy.
- Each panel gets a category badge, a bold project title, the summary, a compact "What I did" list, and a glowing purple key-result box.
- Add a slow horizontal accent line or number marker for each project.

### 5. About / Founder
- Place the founder carousel inside a framed panel with a subtle border and shadow.
- Add a short credentials row below the bio using the bento style.

### 6. Motion & interaction
- Entrance animations on scroll for each section (fade + translateY).
- Hover states on cards: lift, border glow, and arrow/indicator reveal.
- Smooth scroll and active nav state as the user scrolls.
- Staggered children animations for service cards and work lists.

### 7. Navigation & footer
- Sticky nav with a frosted-glass dark bar on scroll.
- Logo wordmark refined for the dark theme.
- Minimal footer with section links and the copyright line.

## Deliverables
- Updated `src/styles.css` with the new dark color system and animation tokens.
- Rewritten `src/routes/index.tsx` with the bento layout and scroll animations.
- Updated `src/components/site/Nav.tsx` and `src/components/site/Footer.tsx` for the dark theme.
- A production build check and a screenshot verification.

## Scope boundaries
- No new backend or contact-form logic; the form remains client-side with the same fields.
- No new imagery beyond the existing founder carousel assets.
- Copy stays exactly as currently approved; only layout, color, and motion change.
