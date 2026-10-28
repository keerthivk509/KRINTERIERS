# KR Interior Design — React + Vite

## Run locally

1. Install Node.js 18+.
2. Open a terminal in this folder.
3. Run `npm install`
4. Run `npm run dev`
5. Open the local URL printed by Vite (usually http://localhost:5173).

Build production files with `npm run build`.

## Dynamic navigation

Edit `src/data/siteData.js` and update the `navigation` array. Top-level menus are Home, About Us, Services, Gallery, and Contact Us. Home has no submenu. About Us, Services, and Gallery have nested `submenu` arrays. Navbar.jsx renders menus with `.map()`.

Services, gallery items and testimonials are also data-driven from `siteData.js`. Replace the demo phone/email/address, sample photos, statistics and testimonials before publishing. The contact form currently validates client-side only; connect it to a backend or form service to receive submissions.

## Animations

All motion lives in two places, with no extra dependencies:

- `src/animations.css` — hover effects, hero transitions, marquee, reveal styles (respects `prefers-reduced-motion`).
- `src/components/Motion.jsx` — `<Reveal variant="up|left|right|zoom|wipe" delay={ms}>` for scroll reveals, `<CountUp value="500+"/>` for counters, and `<ScrollEffects/>` for the progress bar and shrinking navbar.
  Wrap any new block in `<Reveal>` to animate it on scroll.

## Dynamic submenu pages (CMS)

Submenus and their pages come from your CMS API. The website only **reads**; create / edit / delete happen in the CMS.

1. `npm install` then copy `.env.example` to `.env` and set `VITE_API_URL` (empty = demo mode with sample pages).
2. Endpoints used (paths can be changed in `.env`):
   - `GET /menus` → `[{ "title":"Services", "submenus":[{ "title":"Modular Kitchen","slug":"modular-kitchen" }] }]`
     (a flat list where each item has a `parent` also works)
   - `GET /pages/:slug` → `{ "title","subtitle","content","image","images":[...] }`
3. The navbar replaces the static submenu of a parent with the same title (About Us, Services, Gallery...). Links open `/page/:slug`.
4. `image` / `images` can be full blob URLs (https://...) or relative paths. `content` can be plain text or rich-text HTML (it is sanitised).
5. If the API is offline the site still works with the static menu. CORS must allow the website's origin on the Node API.
   Field names are flexible (title/name/header, content/description/body, image/headerImage/banner...). See `src/api.js` to adjust.
