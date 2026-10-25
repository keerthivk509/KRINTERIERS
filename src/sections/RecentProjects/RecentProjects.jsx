import { useEffect, useId, useMemo, useRef, useState } from "react";
import "./RecentProjects.css";

/*  RecentProjects — dark portfolio section: heading, button, category chips and a photo grid.
    Props
      items          [{ title, category, image, slug?, href? }]   (omit to show the sample photos)
      eyebrow, title, subtitle, ctaLabel, ctaHref
      limit          how many photos to show (default 6)
      linkBase       tile link = `${linkBase}/${slug}` when an item has a slug (default "/gallery")
      LinkComponent  pass react-router's <Link> so tiles open without a page reload
      moreHref       "View Full Gallery" link shown when there are more photos than "limit"      */

const photo = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=80`;
const SAMPLE = [
  {
    title: "Modern Living",
    category: "Living Room",
    image: photo("photo-1600210492486-724fe5c67fb0"),
  },
  {
    title: "Calm Bedroom",
    category: "Bedroom",
    image: photo("photo-1611892440504-42a792e24d32"),
  },
  {
    title: "Warm Kitchen",
    category: "Kitchen",
    image: photo("photo-1600607687920-4e2a09cf159d"),
  },
  {
    title: "Natural Elegance",
    category: "Living Room",
    image: photo("photo-1600607687644-c7171b42498f"),
  },
  {
    title: "Quiet Retreat",
    category: "Bedroom",
    image: photo("photo-1616486338812-3dadae4b4ace"),
  },
  {
    title: "Contemporary Kitchen",
    category: "Kitchen",
    image: photo("photo-1600566753086-00f18fb6b3ea"),
  },
];

function Tile({ item, index, url, LinkComponent }) {
  const [bad, setBad] = useState(false);
  const Tag = url ? LinkComponent || "a" : "div";
  const linkProps = url ? (LinkComponent ? { to: url } : { href: url }) : {};
  return (
    <article className="rp-tile" style={{ "--i": index }}>
      <Tag
        className="rp-link"
        {...linkProps}
        aria-label={url ? `Open ${item.title}` : undefined}
      >
        {bad ? (
          <span className="rp-broken">Image unavailable</span>
        ) : (
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            onError={() => setBad(true)}
          />
        )}
        <span className="rp-arrow" aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7M8 7h9v9" />
          </svg>
        </span>
        <span className="rp-caption">
          <strong>{item.title}</strong>
        </span>
      </Tag>
    </article>
  );
}

export default function RecentProjects({
  items = SAMPLE,
  eyebrow = "OUR PORTFOLIO",
  title = "Recent Projects",
  subtitle = "Get inspired by spaces designed with purpose and personality.",
  ctaLabel = "Discuss Your Project",
  ctaHref = "#contact",
  limit = 6,
  linkBase = "/gallery",
  LinkComponent,
  moreHref = "/gallery",
  moreLabel = "View Full Gallery",
  id,
}) {
  const ref = useRef(null);
  const headingId = useId();
  const [visible, setVisible] = useState(false);
  const [filter, setFilter] = useState("All");

  // start the animations when the section scrolls into view (only once)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const categories = useMemo(
    () => ["All", ...new Set(items.map((i) => i.category).filter(Boolean))],
    [items],
  );
  const filtered =
    filter === "All" ? items : items.filter((i) => i.category === filter);
  const shown = filtered.slice(0, limit);
  useEffect(() => {
    if (!categories.includes(filter)) setFilter("All");
  }, [categories, filter]);

  const urlFor = (it) => it.href || (it.slug ? `${linkBase}/${it.slug}` : null);

  return (
    <section
      id={id}
      ref={ref}
      className={`rp ${visible ? "is-visible" : ""}`}
      aria-labelledby={headingId}
    >
      <div className="rp-wrap">
        <header className="rp-head">
          <div>
            <p className="rp-eyebrow">{eyebrow}</p>
            <h2 id={headingId}>{title}</h2>
            {subtitle && <p className="rp-sub">{subtitle}</p>}
          </div>
          <a className="rp-btn" href={ctaHref}>
            <span>{ctaLabel}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </a>
        </header>

        {categories.length > 2 && (
          <div className="rp-chips" role="tablist" aria-label="Filter projects">
            {categories.map((c, i) => (
              <button
                key={c}
                role="tab"
                aria-selected={c === filter}
                style={{ "--i": i }}
                className={`rp-chip ${c === filter ? "is-active" : ""}`}
                onClick={() => setFilter(c)}
              >
                {c}
              </button>
            ))}
          </div>
        )}

        {/* key changes with the filter, so the photos animate in again */}
        <div className="rp-grid" key={filter}>
          {shown.map((it, i) => (
            <Tile
              key={it.slug || it.title + i}
              item={it}
              index={i}
              url={urlFor(it)}
              LinkComponent={LinkComponent}
            />
          ))}
        </div>

        {filtered.length > limit && moreHref && (
          <div className="rp-more">
            <a className="rp-btn rp-btn-ghost" href={moreHref}>
              {moreLabel}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
