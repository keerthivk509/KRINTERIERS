import React, { useEffect, useId, useRef, useState } from "react";
import "./FurnitureShowcase.css";
import { Words } from "../Motion";

/*  FurnitureShowcase — "Pieces Worth Coming Home To": a mosaic of five cards.
    Standalone: no libraries, no router. Edit the texts and photos through props or the DEFAULT_ITEMS below.

    Card order (matches the design):  1 tall card with text on top | 2 wide photo | 3 photo | 4 photo | 5 pink text card with a chair that pops out
    Photos: put yours in /public/images/ (furniture-1.jpg ... furniture-4.jpg) and the transparent chair as chair-cutout.png.
    Until they exist, the sample photos in "fallback" are shown (and a drawn chair for the pop-out).               */

const photo = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1100&q=80`;

const DEFAULT_ITEMS = [
  {
    variant: "overlay",
    src: "/images/furniture-1.jpg",
    fallback: photo("photo-1616486338812-3dadae4b4ace"),
    alt: "Cream lounge chair against a calm wall",
    text: "Every great place deserves great furnitures",
    bg: "#a3a7a9",
  },
  {
    variant: "photo",
    src: "/images/furniture-2.jpg",
    fallback: photo("photo-1600607687939-ce8a6c25118c"),
    alt: "Dark dining room with wooden chairs",
    bg: "#010101",
  },
  {
    variant: "photo",
    src: "/images/furniture-3.jpg",
    fallback: photo("photo-1600210492486-724fe5c67fb0"),
    alt: "Wooden swivel chair",
    bg: "#b9b8b3",
  },
  {
    variant: "photo",
    src: "/images/furniture-4.jpg",
    fallback: photo("photo-1600607687920-4e2a09cf159d"),
    alt: "Leather armchair with a patterned cushion",
    bg: "#1d2a33",
  },
  {
    variant: "cutout",
    cutout: "/images/chair-cutout.png",
    alt: "Cream and brown swivel armchair",
    text: "Elegance with style",
    bg: "#faefeb",
  },
];

/* photo with fallback; shows the card colour if nothing loads */
function Photo({ src, fallback, alt }) {
  const [url, setUrl] = useState(src);
  const [bad, setBad] = useState(false);
  if (bad || !url) return null;
  return (
    <img
      src={url}
      alt={alt}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => {
        if (fallback && url !== fallback) setUrl(fallback);
        else setBad(true);
      }}
    />
  );
}

/* the chair that pops out of its card: your transparent PNG, or a drawn chair as a stand-in */
function Cutout({ src, alt }) {
  const [bad, setBad] = useState(!src);
  return (
    <div className="fs-cutout">
      {bad ? (
        <svg viewBox="0 0 300 250" role="img" aria-label={alt}>
          <ellipse cx="150" cy="234" rx="112" ry="11" fill="#0000002b" />
          <path
            d="M34 156V112a62 62 0 0 1 62-62h108a62 62 0 0 1 62 62v44z"
            fill="#efe9d8"
          />
          <path
            d="M58 156v-40a46 46 0 0 1 46-46h92a46 46 0 0 1 46 46v40z"
            fill="#8b6f55"
          />
          <rect x="34" y="150" width="232" height="70" rx="16" fill="#f4eedf" />
          <rect x="62" y="134" width="176" height="40" rx="14" fill="#a28668" />
          <rect x="96" y="214" width="108" height="14" rx="7" fill="#ddd5c0" />
        </svg>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onError={() => setBad(true)}
        />
      )}
    </div>
  );
}

export default function FurnitureShowcase({
  badge = "Our Collection",
  badgeHref,
  title = "Pieces Worth",
  titleSoft = "Coming Home To",
  subtitle = "Furniture designed around comfort, simplicity, and everyday living.",
  items = DEFAULT_ITEMS,
  id,
}) {
  const ref = useRef(null);
  const headingId = useId();
  const [visible, setVisible] = useState(false);

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

  const Badge = badgeHref ? "a" : "span";
  const titleWords = title.split(" ").length;

  return (
    <section
      id={id}
      ref={ref}
      className={`fs ${visible ? "is-visible" : ""}`}
      aria-labelledby={headingId}
    >
      <div className="fs-wrap">
        <header className="fs-head">
          {/* {badge && (
            <Badge
              className="fs-badge"
              {...(badgeHref ? { href: badgeHref } : {})}
            >
              {badge}
              <svg
                width="9"
                height="9"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </Badge>
          )} */}
          <h2 id={headingId}>
            <span className="fs-h-main line">
              <Words text={title} />
            </span>{" "}
            <span className="fs-h-soft">
              <Words text={titleSoft} start={titleWords} />
            </span>
          </h2>
          {subtitle && <p className="fs-sub">{subtitle}</p>}
        </header>

        <div className="fs-grid">
          {items.slice(0, 5).map((it, i) => (
            <article
              key={i}
              className={`fs-card fs-${"abcde"[i]} is-${it.variant}`}
              style={{ "--i": i, "--bg": it.bg }}
            >
              <div className="fs-clip">
                {it.variant !== "cutout" && (
                  <Photo src={it.src} fallback={it.fallback} alt={it.alt} />
                )}
                {it.variant === "overlay" && (
                  <span className="fs-shade" aria-hidden="true" />
                )}
                {it.text && (
                  <p className="fs-text">
                    <Words text={it.text} start={2} />
                  </p>
                )}
              </div>
              {it.variant === "cutout" && (
                <Cutout src={it.cutout} alt={it.alt} />
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
