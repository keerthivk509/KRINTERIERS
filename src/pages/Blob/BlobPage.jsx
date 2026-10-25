import { useCallback, useEffect, useRef, useState } from "react";
import "./BlobPage.css";

/*  BlobPage — one page with a header, content and image sections.
    Every image comes from a blob URL and has its own title and content.
    It does not depend on the rest of the project (no router, no libraries).

    With no props at all it shows the built-in DEFAULT_PAGE below (header, content and four images
    with titles and content), so you can see the design straight away. Edit DEFAULT_PAGE to change it.

    Or give it your own data in ONE of three ways:
      <BlobPage page={{ title, subtitle, content, image, images:[{url,title,content}], parent }} />
      <BlobPage slug="modular-kitchen" endpoint="https://your-api/api/pages/:slug" />
      <BlobPage slug="x" load={(signal) => myFetchFunction(signal)} />      // must return the page object
    Other props: homeHref, ctaHref, ctaLabel, LinkComponent (react-router <Link>) for the breadcrumb,
                 fallbackOnError (true = show DEFAULT_PAGE when the CMS cannot be reached).               */

/* ---------- read the data (accepts the usual field names) ---------- */
const pick = (o, ...keys) => { for (const k of keys) if (o && o[k] !== undefined && o[k] !== null && o[k] !== "") return o[k]; };
function normalize(raw) {
  const r = (raw && !Array.isArray(raw) && (raw.data ?? raw.page)) || raw || {};
  let images = pick(r, "images", "gallery", "photos", "media") || [];
  if (!Array.isArray(images)) images = [images];
  let parent = pick(r, "parent", "menu", "category");
  if (parent && typeof parent === "object") parent = pick(parent, "title", "name", "label");
  return {
    title: pick(r, "title", "name", "header", "heading") || "",
    subtitle: pick(r, "subtitle", "subheading", "summary") || "",
    content: pick(r, "content", "description", "body", "html") || "",
    image: pick(r, "headerImage", "header_image", "image", "imageUrl", "banner", "cover") || "",
    parent: parent || "",
    images: images
      .map((i) => (typeof i === "string"
        ? { url: i, title: "", content: "" }
        : { url: pick(i, "url", "src", "path", "location") || "", title: pick(i, "title", "caption", "name", "alt") || "", content: pick(i, "content", "description", "text") || "" }))
      .filter((i) => i.url),
  };
}

/* ---------- default content and images (shown when no data is given) ---------- */
const photo = (id, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;
export const DEFAULT_PAGE = {
  title: "Warm Living Room Makeover",
  subtitle: "A calm, light-filled family space built around comfort, texture and everyday living.",
  parent: "Projects",
  image: photo("photo-1616486338812-3dadae4b4ace", 1800),
  content:
    "This project began with a simple wish: a living room where the whole family could relax together. We reworked the layout to open up the space, brought in natural light, and chose soft, durable materials that look beautiful and last.\n\nEvery piece was selected with care, from the statement armchair to the layered lighting, so the room feels warm, personal and complete.",
  images: [
    { url: photo("photo-1616486338812-3dadae4b4ace"), title: "The statement armchair", content: "A sculpted armchair in soft fabric becomes the heart of the room and invites you to sit and stay." },
    { url: photo("photo-1600607687939-ce8a6c25118c"), title: "Light and open layout", content: "Moving the seating away from the walls opened the space and let daylight reach every corner." },
    { url: photo("photo-1600210492486-724fe5c67fb0"), title: "Textures that feel good", content: "Natural fabrics, warm wood and a woven rug add depth without making the room feel busy." },
    { url: photo("photo-1600607687920-4e2a09cf159d"), title: "The finishing touches", content: "Layered lighting, art and small details tie everything together for a calm, finished look." },
  ],
};

/* ---------- small HTML cleaner for rich text from the CMS (keeps basic formatting only) ---------- */
const ALLOWED = new Set(["P", "BR", "H2", "H3", "H4", "UL", "OL", "LI", "STRONG", "B", "EM", "I", "U", "BLOCKQUOTE", "A", "IMG", "FIGURE", "FIGCAPTION", "HR", "SPAN", "DIV", "TABLE", "THEAD", "TBODY", "TR", "TH", "TD"]);
const DROP = new Set(["SCRIPT", "STYLE", "IFRAME", "OBJECT", "EMBED", "LINK", "META", "SVG", "MATH", "FORM", "INPUT", "BUTTON", "TEXTAREA", "SELECT"]);
function cleanHtml(html) {
  const doc = new DOMParser().parseFromString(`<body>${html}</body>`, "text/html");
  const walk = (el) => {
    [...el.children].forEach((child) => {
      const tag = child.tagName;
      if (DROP.has(tag)) { child.remove(); return; }
      walk(child);
      if (!ALLOWED.has(tag)) { child.replaceWith(...child.childNodes); return; }
      [...child.attributes].forEach((a) => {
        const n = a.name.toLowerCase();
        const ok = (tag === "A" && ((n === "href" && /^(https?:|mailto:|tel:)/i.test(a.value)) || n === "title"))
          || (tag === "IMG" && ((n === "src" && /^https?:/i.test(a.value)) || n === "alt"));
        if (!ok) child.removeAttribute(a.name);
      });
      if (tag === "A") { child.setAttribute("rel", "noopener noreferrer"); child.setAttribute("target", "_blank"); }
    });
  };
  walk(doc.body);
  return doc.body.innerHTML;
}
function Prose({ content }) {
  const text = String(content || "");
  if (!text.trim()) return null;
  if (/<[a-z][\s\S]*>/i.test(text)) return <div className="bp-prose" dangerouslySetInnerHTML={{ __html: cleanHtml(text) }} />;
  return <div className="bp-prose">{text.split(/\n+/).filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}</div>;
}

/* ---------- reveal on scroll ---------- */
function Reveal({ variant = "up", delay = 0, className = "", children }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { setShown(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`bp-reveal bp-${variant} ${shown ? "is-in" : ""} ${className}`} style={{ "--d": `${delay}ms` }}>{children}</div>;
}

/* picture that shows a tidy box when a blob link is broken or removed */
function Pic({ src, alt }) {
  const [bad, setBad] = useState(false);
  if (bad) return <span className="bp-broken" role="img" aria-label={alt || "Image unavailable"}>Image unavailable</span>;
  return <img src={src} alt={alt} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={() => setBad(true)} />;
}

function Lightbox({ items, index, onClose, onStep }) {
  const closeRef = useRef(null);
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); else if (e.key === "ArrowRight") onStep(1); else if (e.key === "ArrowLeft") onStep(-1); };
    const prev = document.body.style.overflow;
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = prev; };
  }, [onClose, onStep]);
  const it = items[index];
  return (
    <div className="bp-lightbox" role="dialog" aria-modal="true" aria-label={it.title || `Image ${index + 1}`} onClick={onClose}>
      <button ref={closeRef} className="bp-lb-btn bp-lb-close" aria-label="Close" onClick={onClose}>✕</button>
      {items.length > 1 && <button className="bp-lb-btn bp-lb-prev" aria-label="Previous image" onClick={(e) => { e.stopPropagation(); onStep(-1); }}>‹</button>}
      <figure key={index} onClick={(e) => e.stopPropagation()}>
        <img src={it.url} alt={it.title || ""} referrerPolicy="no-referrer" />
        {(it.title || it.content) && <figcaption>{it.title && <h3>{it.title}</h3>}{it.content && <p>{it.content}</p>}</figcaption>}
      </figure>
      {items.length > 1 && <button className="bp-lb-btn bp-lb-next" aria-label="Next image" onClick={(e) => { e.stopPropagation(); onStep(1); }}>›</button>}
    </div>
  );
}

const pad = (n) => String(n).padStart(2, "0");

export default function BlobPage({ page, load, slug, endpoint, homeHref = "/", ctaHref = "#contact", ctaLabel = "Get a Free Quote", LinkComponent, fallbackOnError = false }) {
  const hasSource = Boolean(page || load || (endpoint && slug));
  const [state, setState] = useState(!hasSource ? { status: "ready", data: normalize(DEFAULT_PAGE) } : page ? { status: "ready", data: normalize(page) } : { status: "loading", data: null });
  const [heroReady, setHeroReady] = useState(false);
  const [open, setOpen] = useState(null);
  const loadRef = useRef(load);
  loadRef.current = load;

  useEffect(() => {
    setHeroReady(false);
    setOpen(null);
    if (page) { setState({ status: "ready", data: normalize(page) }); return; }
    if (!loadRef.current && !(endpoint && slug)) { setState({ status: "ready", data: normalize(DEFAULT_PAGE) }); return; }
    const ctrl = new AbortController();
    setState({ status: "loading", data: null });
    let run;
    if (loadRef.current) run = loadRef.current(ctrl.signal);
    else if (endpoint && slug) {
      run = fetch(endpoint.replace(":slug", encodeURIComponent(slug)), { signal: ctrl.signal, headers: { Accept: "application/json" } }).then((r) => {
        if (r.status === 404) { const e = new Error("Not found"); e.status = 404; throw e; }
        if (!r.ok) throw new Error(`Request failed (${r.status})`);
        return r.json();
      });
    } else run = Promise.reject(new Error("BlobPage needs page, load, or endpoint + slug"));
    Promise.resolve(run)
      .then((raw) => { if (ctrl.signal.aborted) return; const data = normalize(raw); if (data.title) document.title = data.title; setState({ status: "ready", data }); })
      .catch((err) => {
        if (ctrl.signal.aborted || err.name === "AbortError") return;
        if (fallbackOnError && err.status !== 404) setState({ status: "ready", data: normalize(DEFAULT_PAGE) });
        else setState({ status: err.status === 404 ? "missing" : "error", data: null });
      });
    return () => ctrl.abort();
  }, [page, slug, endpoint, fallbackOnError]);

  const images = state.data?.images || [];
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((d) => setOpen((i) => (i === null ? null : (i + d + images.length) % images.length)), [images.length]);
  const Home = LinkComponent || "a";
  const homeProps = LinkComponent ? { to: homeHref } : { href: homeHref };

  if (state.status === "loading") return <div className="bp bp-skeleton" aria-busy="true"><div className="bp-skel-hero" /><div className="bp-wrap"><div className="bp-skel-line w60" /><div className="bp-skel-line" /><div className="bp-skel-line w80" /></div></div>;
  if (state.status !== "ready") {
    return (
      <section className="bp bp-message"><div className="bp-wrap">
        <p className="bp-label">{state.status === "missing" ? "PAGE NOT FOUND" : "SOMETHING WENT WRONG"}</p>
        <h1>{state.status === "missing" ? "We couldn’t find that page" : "We couldn’t load this page"}</h1>
        <Home className="bp-btn" {...homeProps}>Back to Home</Home>
      </div></section>
    );
  }

  const p = state.data;
  const detailed = images.some((i) => i.title || i.content);
  return (
    <article className="bp">
      {/* ---------- header ---------- */}
      <header className="bp-hero">
        {p.image && <img src={p.image} alt="" referrerPolicy="no-referrer" className={heroReady ? "is-ready" : ""} onLoad={() => setHeroReady(true)} onError={() => setHeroReady(true)} />}
        <div className="bp-shade" />
        <div className="bp-wrap bp-hero-copy">
          <nav className="bp-crumbs" aria-label="Breadcrumb"><Home {...homeProps}>Home</Home>{p.parent && <><span>›</span><span>{p.parent}</span></>}<span>›</span><span>{p.title}</span></nav>
          <h1><span>{p.title}</span></h1>
          {p.subtitle && <p className="bp-subtitle">{p.subtitle}</p>}
        </div>
      </header>

      {/* ---------- content ---------- */}
      {p.content && (
        <section className="bp-section">
          <div className="bp-wrap">
            <Reveal className="bp-intro"><p className="bp-label">OVERVIEW</p><Prose content={p.content} /></Reveal>
          </div>
        </section>
      )}

      {/* ---------- images, each with its own title and content ---------- */}
      {images.length > 0 && (
        <section className="bp-section bp-images">
          <div className="bp-wrap">
            <Reveal className="bp-images-head"><p className="bp-label">GALLERY</p><h2>See it in detail</h2></Reveal>
            {detailed ? (
              <div className="bp-rows">
                {images.map((im, i) => (
                  <article className={`bp-row ${i % 2 ? "is-flip" : ""}`} key={im.url + i}>
                    <Reveal variant={i % 2 ? "right" : "left"} className="bp-media">
                      <button type="button" className="bp-pic" onClick={() => setOpen(i)} aria-label={`Enlarge ${im.title || `image ${i + 1}`}`}>
                        <Pic src={im.url} alt={im.title || `${p.title} ${i + 1}`} />
                      </button>
                    </Reveal>
                    <Reveal variant={i % 2 ? "left" : "right"} delay={120} className="bp-copy">
                      <span className="bp-index">{pad(i + 1)}</span>
                      {im.title && <h3>{im.title}</h3>}
                      {im.content && <p>{im.content}</p>}
                    </Reveal>
                  </article>
                ))}
              </div>
            ) : (
              <div className="bp-grid">
                {images.map((im, i) => (
                  <Reveal variant="zoom" delay={(i % 3) * 100} key={im.url + i}>
                    <button type="button" className="bp-pic" onClick={() => setOpen(i)} aria-label={`Enlarge image ${i + 1}`}><Pic src={im.url} alt={`${p.title} ${i + 1}`} /></button>
                  </Reveal>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <section className="bp-cta">
        <Reveal className="bp-wrap">
          <p className="bp-label">LET’S TALK</p>
          <h2>Ready to start your project?</h2>
          <a className="bp-btn" href={ctaHref}>{ctaLabel} →</a>
        </Reveal>
      </section>

      {open !== null && <Lightbox items={images} index={open} onClose={close} onStep={step} />}
    </article>
  );
}
