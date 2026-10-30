// ---------------------------------------------------------------------------
// Talks to your CMS API (read-only: the website only needs the "read" endpoints;
// create / edit / delete are done inside the CMS project).
//
// Expected endpoints (change paths in .env if yours are different):
//   GET {VITE_API_URL}/menus        -> list of menus with their submenus
//   GET {VITE_API_URL}/pages/:slug  -> one submenu page (header, content, images)
//
// The normalisers below accept several common field names, so small naming
// differences (title/name/header, content/description/body, ...) still work.
// ---------------------------------------------------------------------------
const API_URL = (import.meta.env.VITE_API_URL || "").replace(/\/$/, "");
const MENUS_PATH = import.meta.env.VITE_MENUS_PATH || "/menus";
const PAGE_PATH = import.meta.env.VITE_PAGE_PATH || "/pages";
const CAROUSELS = import.meta.env.VITE_CAROUSEL_PATH || "/carousels";
const REVIEWS = import.meta.env.VITE_REVIEWS_PATH || "/reviews";
const FAQ = import.meta.env.VITE_FAQ_PATH || "/faq";
const ASSET_URL = (
  import.meta.env.VITE_ASSET_URL ||
  (API_URL ? new URL(API_URL, window.location.origin).origin : "")
).replace(/\/$/, "");

export const DEMO_MODE = !API_URL;

const pick = (o, ...keys) => {
  for (const k of keys) {
    if (o && o[k] !== undefined && o[k] !== null && o[k] !== "") return o[k];
  }
  return undefined;
};
const slugify = (s) =>
  String(s || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
const unwrap = (r) => {
  if (!r || Array.isArray(r) || typeof r !== "object") return r;
  return r.data ?? r.page ?? r.menus ?? r.result ?? r;
};

/** Blob / https / data URLs are used as they are; relative paths get the API origin. */
export function assetUrl(u) {
  if (!u) return "";
  const url =
    typeof u === "object" ? pick(u, "url", "src", "path", "location") : u;
  if (!url) return "";
  if (/^(https?:|blob:|data:|\/\/)/i.test(url)) return url;
  return `${ASSET_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

export function normalizeMenus(raw) {
  const list = unwrap(raw);
  if (!Array.isArray(list)) return [];
  const sub = (i) => ({
    id: pick(i, "id", "_id"),
    title: pick(i, "title", "name", "label", "header") || "Untitled",
    slug: pick(i, "slug", "path") || slugify(pick(i, "title", "name", "label")),
  });
  const nested = list.filter((i) =>
    Array.isArray(pick(i, "submenus", "subMenus", "children", "items")),
  );
  if (nested.length) {
    return nested.map((i) => ({
      title: pick(i, "title", "name", "label"),
      submenus: pick(i, "submenus", "subMenus", "children", "items").map(sub),
    }));
  }
  // flat list of submenu pages that each name their parent menu
  const map = new Map();
  list.forEach((i) => {
    let parent = pick(
      i,
      "parent",
      "menu",
      "parentTitle",
      "category",
      "parentMenu",
    );
    if (parent && typeof parent === "object")
      parent = pick(parent, "title", "name", "label");
    if (!parent) return;
    if (!map.has(parent)) map.set(parent, []);
    map.get(parent).push(sub(i));
  });
  return [...map].map(([title, submenus]) => ({ title, submenus }));
}

export function normalizePage(raw) {
  const r = unwrap(raw);
  if (!r || typeof r !== "object") return null;
  let images = pick(r, "images", "gallery", "photos", "media") || [];
  if (!Array.isArray(images)) images = [images];
  let parent = pick(r, "parent", "menu", "parentTitle", "category");
  if (parent && typeof parent === "object")
    parent = pick(parent, "title", "name", "label");
  return {
    title: pick(r, "title", "name", "header", "heading") || "",
    subtitle:
      pick(r, "subtitle", "subheading", "summary", "shortDescription") || "",
    content: pick(r, "content", "description", "body", "html") || "",
    image: assetUrl(
      pick(
        r,
        "headerImage",
        "header_image",
        "image",
        "banner",
        "cover",
        "thumbnail",
      ),
    ),
    images: images.map(assetUrl).filter(Boolean),
    parent: parent || "",
  };
}
export const getSlides = async () => {
  const res = await fetch(`${API_URL}/carousels`);
  if (!res.ok) throw new Error("Failed to fetch slides");
  return res.json();
};
async function request(path, signal) {
  const res = await fetch(`${API_URL}${path}`, {
    signal,
    headers: { Accept: "application/json" },
  });
  console.log("res", res);
  if (res.status === 404) {
    const e = new Error("Not found");
    e.status = 404;
    throw e;
  }
  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  const data = await res.json();
  console.log("res", data);
  return data;
}

export async function getMenus(signal) {
  if (DEMO_MODE) return DEMO_MENUS;

  const menu = normalizeMenus(await request(MENUS_PATH, signal));

  return menu;
}

export async function getCarousels(signal) {
  if (DEMO_MODE) return SLIDE;
  console.log("raw", CAROUSELS);

  const raw = await request(CAROUSELS, signal);
  console.log("raw", raw, CAROUSELS);

  const slides = unwrap(raw);

  return Array.isArray(slides) ? slides : [];
}
export const getPublicReviews = async (signal) => {
  const data = await request(REVIEWS, signal);
  return Array.isArray(data) ? data : (data.reviews ?? data.data ?? []);
};
export const getPublicFAQs = async (signal) => {
  const data = await request(FAQ, signal);
  return data;
};
export async function getPage(slug, signal) {
  if (DEMO_MODE) {
    const page = DEMO_PAGES[slug];
    if (!page) {
      const e = new Error("Not found");
      e.status = 404;
      throw e;
    }
    await new Promise((r) => setTimeout(r, 500)); // pretend network delay so you can see the loading state
    return page;
  }
  return normalizePage(
    await request(`${PAGE_PATH}/${encodeURIComponent(slug)}`, signal),
  );
}

// ---------------------------- DEMO DATA ------------------------------------
const img = (id, w = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
const lorem =
  "<p>We begin every project by listening. Your lifestyle, your routines and the way you want a room to feel shape every decision we make, from the layout to the final accessories.</p><h3>Materials that last</h3><p>Our team selects durable finishes, warm woods and soft fabrics that look beautiful today and still feel right years from now.</p><ul><li>Space planning and 3D visuals</li><li>Custom furniture and joinery</li><li>Lighting, colour and styling</li></ul><p>Every detail is coordinated on site so the result matches the design.</p>";
const mk = (title, parent, header, gallery, subtitle) => ({
  title,
  parent,
  subtitle,
  content: lorem,
  image: img(header),
  images: gallery.map((g) => img(g, 1000)),
});
export const DEMO_PAGES = {
  "our-story": mk(
    "Our Story",
    "About Us",
    "photo-1600607687939-ce8a6c25118c",
    [
      "photo-1600210492486-724fe5c67fb0",
      "photo-1616486338812-3dadae4b4ace",
      "photo-1600607687920-4e2a09cf159d",
    ],
    "How KR started and what we believe in.",
  ),
  "why-choose-us": mk(
    "Why Choose Us",
    "About Us",
    "photo-1600210492486-724fe5c67fb0",
    ["photo-1600607687939-ce8a6c25118c", "photo-1497366754035-f200968a6e72"],
    "Design, quality and care in every project.",
  ),
  "residential-design": mk(
    "Residential Design",
    "Services",
    "photo-1616486338812-3dadae4b4ace",
    [
      "photo-1600607687939-ce8a6c25118c",
      "photo-1600210492486-724fe5c67fb0",
      "photo-1600607687920-4e2a09cf159d",
    ],
    "Stylish, comfortable homes tailored to your lifestyle.",
  ),
  "commercial-design": mk(
    "Commercial Design",
    "Services",
    "photo-1497366754035-f200968a6e72",
    ["photo-1616486338812-3dadae4b4ace", "photo-1600607687939-ce8a6c25118c"],
    "Functional, inspiring offices and business spaces.",
  ),
  "modular-kitchen": mk(
    "Modular Kitchen",
    "Services",
    "photo-1600607687920-4e2a09cf159d",
    [
      "photo-1600210492486-724fe5c67fb0",
      "photo-1616486338812-3dadae4b4ace",
      "photo-1600607687939-ce8a6c25118c",
    ],
    "Beautiful and efficient kitchens for everyday living.",
  ),
};
export const DEMO_MENUS = [
  {
    title: "About Us",
    submenus: [
      { title: "Our Story", slug: "our-story" },
      { title: "Why Choose Us", slug: "why-choose-us" },
    ],
  },
  {
    title: "Services",
    submenus: [
      { title: "Residential Design", slug: "residential-design" },
      { title: "Commercial Design", slug: "commercial-design" },
      { title: "Modular Kitchen", slug: "modular-kitchen" },
    ],
  },
];

export const SLIDE = [
  {
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85",
    eyebrow: "TRANSFORMING SPACES",
    title: "Beautiful Interiors",
    second: "for a Better Life",
    desc: "We design spaces that inspire, comfort and reflect your unique style. From modern minimalism to timeless elegance, we bring your vision to life.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85",
    eyebrow: "DESIGNED AROUND YOU",
    title: "A Home That Feels",
    second: "Uniquely Yours",
    desc: "Thoughtful materials, balanced colours and beautiful details come together to make your space feel personal.",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=85",
    eyebrow: "FORM MEETS FUNCTION",
    title: "Every Detail",
    second: "Has a Purpose",
    desc: "We combine practical layouts with timeless style to create spaces that look beautiful and work effortlessly.",
  },
];
