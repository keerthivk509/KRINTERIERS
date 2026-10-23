# Dreamspace React (FurnitureOne-style) + DreamSpaceCMS

```bash
npm install
cp .env.example .env     # set VITE_CMS_URL for production
CMS_PROXY_TARGET=http://localhost:5000 npm run dev
```

## CMS contract (src/api/cms.js)

`GET /api/services` returns an array (or `{ data: [...] }`):

```json
[{
  "id": 1, "title": "Sofas & Seating", "slug": "sofas-seating",
  "tagline": "Comfort, shaped beautifully", "description": "...",
  "image": "https://<blob-url>", "order": 1,
  "subunits": [{ "id": 11, "title": "Sofas", "slug": "sofas", "description": "...", "image": "https://<blob-url>", "order": 1 }]
}]
```

Key names `subUnits`, `submenus`, `children`, `imageUrl`, `name`, `_id` are also accepted.
If your CMS uses other names, edit `normService` / `normUnit` only.
`POST /api/enquiries` receives `{ name, phone, serviceId, serviceTitle, subunitId }`.

If the CMS is down or empty, `src/data/fallback.js` is shown (demo images; replace before launch).
The CMS must allow CORS from the site origin (or use the same-origin proxy).

## Where things live
- Menu: `components/Navbar.jsx`. "Services" opens a mega menu: each service with its sub-units.
- Sections: `sections/*`. Page for each service and sub-unit anchors: `pages/ServicePage.jsx` (`/services/:slug#sub-unit-slug`).
- Colours, type, spacing: top of `styles.css`. Copy: `data/content.js`.
