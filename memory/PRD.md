# PRD — Bradwear Indonesia Landing Page

## Original Problem Statement
> buatkan landing page tenttang aplikasi dari googleplay dan bentuk 3d animasi https://play.google.com/store/apps/details?id=com.bradwear.app dan penjjelasan tentang aplikasi serta cara download nya

## User Choices
- Frontend only (no backend/database)
- Indonesian language
- Default style chosen by main agent: dark premium theme with 3D phone mockup hero

## Goal
Marketing landing page for the **Bradwear Indonesia** app (Google Play, dev: marsh.dev). Communicates app value and drives Google Play installs via clear download steps.

## User Personas
- Indonesian professionals seeking premium workshirts/uniforms
- Procurement contacts needing custom uniform orders
- Casual visitors arriving from social/search wanting an overview before installing

## Architecture
- **Frontend**: React 18 (CRA) + Tailwind CSS + framer-motion + @react-three/fiber + @react-three/drei + three.js + lucide-react
- **Backend**: Minimal FastAPI stub (health endpoint only) — kept to satisfy supervisor; no business logic
- **Hosting**: Supervisor-managed `yarn start` on port 3000 (frontend) + uvicorn on 8001 (backend stub)
- **Fonts**: Clash Display (headings) + Satoshi (body) via Fontshare CDN

## Implemented (2026-04-25)
- [x] Sticky glassmorphism navbar with anchor navigation
- [x] Hero: animated 3D smartphone with live app screenshot textured on display, orange accent bar, ambient + spot lighting, floating tags, dual CTAs
- [x] About section: parallax image, brand story, V-1/V-2/Ventura stats
- [x] Features: 5-card asymmetric Bento grid with hover lift
- [x] Screenshots gallery: infinite marquee with all 8 Play Store screenshots (×2)
- [x] Download Steps: 4 numbered steps with massive ghost numbers + dual CTAs
- [x] FAQ: animated accordion with 5 Q&A
- [x] Footer: contact links (phone, email, website), Play Store CTA, massive BRADWEAR wordmark
- [x] Grain texture overlay, custom scrollbar, `::selection` color
- [x] Full responsiveness (desktop + mobile tested)
- [x] All interactive elements have `data-testid`

## Testing Status
- Frontend test pass rate: **100% (14/14)** — `/app/test_reports/iteration_1.json`
- All Play Store CTAs verified link to `https://play.google.com/store/apps/details?id=com.bradwear.app`
- WebGL 3D canvas renders successfully

## Backlog (P1/P2)
- P2: Split `App.js` (749 lines) into `src/components/{Hero,Features,Gallery,Download,FAQ,Footer}.jsx`
- P2: Add micro-interaction sound on CTA hover
- P2: Add scroll-progress indicator on the right rail
- P2: Lazy-load the 3D Canvas with `IntersectionObserver` for mobile perf
- P2: Add Open Graph / Twitter Card meta tags for social sharing
- P2: Add Indonesian + English language toggle
- P2: Add testimonials / review carousel (currently no review data on Play Store yet)

## Next Tasks
- Wait for user feedback / refinement requests
- If requested: split components, add more sections, tweak palette
