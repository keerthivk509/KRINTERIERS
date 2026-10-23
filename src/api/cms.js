import { FALLBACK_SERVICES } from "../data/fallback";

const BASE = (import.meta.env.VITE_CMS_URL || "").replace(/\/$/, "");

export const slugify = (s = "") =>
  s
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const byOrder = (a, b) => (a.order ?? 0) - (b.order ?? 0);

// Map whatever DreamSpaceCMS returns into the shape the UI uses.
// Adjust ONLY these two functions if your CMS field names differ.
const normUnit = (u, i) => ({
  id: u.id ?? u._id ?? i,
  slug: u.slug || slugify(u.title || u.name),
  title: u.title || u.name || "",
  description: u.description || u.content || "",
  image: u.image || u.imageUrl || u.blobUrl || "",
  order: u.order ?? i,
});

const normService = (s, i) => {
  const units =
    s.subunits || s.subUnits || s.submenus || s.subMenus || s.children || [];
  return {
    id: s.id ?? s._id ?? i,
    slug: s.slug || slugify(s.title || s.name),
    title: s.title || s.name || "",
    tagline: s.tagline || s.subtitle || "",
    description: s.description || s.content || "",
    image: s.image || s.imageUrl || s.blobUrl || "",
    order: s.order ?? i,
    subunits: units.map(normUnit).sort(byOrder),
  };
};

export async function fetchServices() {
  try {
    const res = await fetch(`${BASE}/api/services`);
    if (!res.ok) throw new Error(`CMS responded ${res.status}`);
    const json = await res.json();
    const list = Array.isArray(json) ? json : json.data || json.services || [];
    if (!list.length) throw new Error("CMS returned no services");
    return { services: list.map(normService).sort(byOrder), fallback: false };
  } catch (err) {
    console.warn("[DreamSpaceCMS] using fallback data:", err.message);
    return { services: FALLBACK_SERVICES.map(normService), fallback: true };
  }
}

export async function submitEnquiry(payload) {
  const res = await fetch(`${BASE}/api/enquiries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error("Could not send your enquiry");
  return res.json().catch(() => ({}));
}
