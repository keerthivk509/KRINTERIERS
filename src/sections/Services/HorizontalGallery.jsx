import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import "./HorizontalGallery.css";

const CMS = (import.meta.env?.VITE_CMS_URL || "").replace(/\/$/, "");

const FALLBACK = [
  {
    id: 1,
    title: "Soft Living",
    slug: "soft-living",
    cta: "Explore Seating",
    description:
      "Bring warmth into your space with beautifully crafted seating designed for comfort, character, and everyday living.",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    title: "Dining & Gathering",
    slug: "dining",
    cta: "Explore Dining",
    description:
      "Tables and chairs made for long meals, good conversation and moments worth remembering.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    title: "Restful Nights",
    slug: "bedroom",
    cta: "Explore Bedrooms",
    description:
      "Calm, layered bedrooms with beds, storage and lighting that help you slow down.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    title: "Modular Kitchen",
    slug: "kitchen",
    cta: "Explore Kitchens",
    description:
      "Smart storage, durable finishes and layouts that make everyday cooking a pleasure.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 5,
    title: "Work & Focus",
    slug: "workspace",
    cta: "Explore Workspaces",
    description:
      "Comfortable, well-lit workspaces for home offices and growing teams.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
  },
];

const pick = (obj, ...keys) => {
  for (const key of keys) {
    if (obj?.[key] !== undefined && obj[key] !== null && obj[key] !== "") {
      return obj[key];
    }
  }
};

const normalize = (service, index) => {
  const title = pick(service, "title", "name") || "Service";
  const rawImage = pick(service, "image", "imageUrl", "img") || "";

  const image = !rawImage
    ? ""
    : /^(https?:|blob:|data:|\/\/)/i.test(rawImage)
      ? rawImage
      : `${CMS}${rawImage.startsWith("/") ? "" : "/"}${rawImage}`;

  return {
    id: pick(service, "id", "_id") ?? index,
    title,
    slug: pick(service, "slug") || String(index),
    description: pick(service, "description", "tagline", "summary") || "",
    image,
    cta: pick(service, "cta", "ctaLabel") || `Explore ${title}`,
  };
};

export default function HorizontalGallery({
  services,
  eyebrow = "WHAT WE DO",
  title = "Our Services",
  linkBase = "/services",
  autoplay = 10500,
}) {
  const reduceMotion = useReducedMotion();

  const [items, setItems] = useState(() =>
    services?.length ? services.map(normalize) : FALLBACK,
  );

  const [active, setActive] = useState(0);
  const wheelLock = useRef(false);
  const wheelTimer = useRef(null);

  const count = items.length;

  // Load services from CMS.
  useEffect(() => {
    if (services?.length) {
      setItems(services.map(normalize));
      setActive(0);
      return;
    }

    const controller = new AbortController();

    fetch(`${CMS}/api/services`, {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load services");
        }
        return response.json();
      })
      .then((data) => {
        const list = Array.isArray(data) ? data : data?.data;

        const mapped = (Array.isArray(list) ? list : [])
          .map(normalize)
          .filter((service) => service.image);

        if (mapped.length >= 2) {
          setItems(mapped);
          setActive(0);
        }
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.warn("Using fallback gallery content.");
        }
      });

    return () => controller.abort();
  }, [services]);

  useEffect(() => {
    return () => {
      if (wheelTimer.current) {
        window.clearTimeout(wheelTimer.current);
      }
    };
  }, []);

  // Move forward or backward.
  const go = useCallback(
    (direction) => {
      if (count < 2) return;

      setActive((current) => (current + direction + count) % count);
    },
    [count],
  );

  // Mouse wheel navigation.
  const handleWheel = useCallback(
    (event) => {
      if (count < 2) return;

      const delta =
        Math.abs(event.deltaY) >= Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;

      if (delta === 0) return;

      event.preventDefault();

      if (wheelLock.current) return;

      wheelLock.current = true;
      go(delta > 0 ? 1 : -1);

      wheelTimer.current = window.setTimeout(() => {
        wheelLock.current = false;
      }, 850);
    },
    [count, go],
  );

  // Autoplay.
  useEffect(() => {
    if (!autoplay || autoplay < 1 || count < 2) return;

    const timer = window.setInterval(() => {
      go(1);
    }, autoplay);

    return () => window.clearInterval(timer);
  }, [autoplay, count, go]);

  // Keyboard navigation.
  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    }
  };

  // Calculate the shortest distance from the center.
  const offsetOf = (index) => {
    let offset = index - active;

    if (offset > count / 2) offset -= count;
    if (offset < -count / 2) offset += count;

    return offset;
  };

  return (
    <section
      className="hg"
      aria-label={title || "Services"}
      aria-roledescription="carousel"
    >
      {(eyebrow || title) && (
        <header className="hg-head">
          {eyebrow && <p className="hg-eyebrow">{eyebrow}</p>}
          {title && <h2>{title}</h2>}
        </header>
      )}

      <div className="hg-carousel">
        <motion.button
          type="button"
          className="hg-arrow hg-arrow-left"
          aria-label="Previous service"
          onClick={() => go(-1)}
          whileHover={reduceMotion ? {} : { scale: 1.08, x: -3 }}
          whileTap={reduceMotion ? {} : { scale: 0.92 }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </motion.button>

        <div
          className="hg-stage"
          onWheel={handleWheel}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          {items.map((service, index) => {
            const offset = offsetOf(index);
            const distance = Math.abs(offset);
            const isActive = index === active;
            const visible = distance <= 2;

            return (
              <motion.article
                key={service.id}
                className={`hg-card ${isActive ? "is-active" : ""}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${count}`}
                style={{
                  zIndex: isActive ? 100 : 100 - distance * 10,
                  pointerEvents: visible ? "auto" : "none",
                }}
                initial={false}
                animate={{
                  x: `${offset * 78}%`,
                  z: reduceMotion ? 0 : -Math.min(distance, 2) * 100,
                  scale: distance === 0 ? 1 : distance === 1 ? 0.84 : 0.7,
                  rotateY: reduceMotion
                    ? 0
                    : offset === 0
                      ? 0
                      : -Math.sign(offset) * 38,
                  opacity: visible ? 1 : 0,
                }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        type: "spring",
                        stiffness: 55,
                        damping: 25,
                        mass: 1.5,
                      }
                }
              >
                <img
                  className="hg-img"
                  src={service.image}
                  alt={isActive ? service.title : ""}
                  draggable={false}
                  loading={distance <= 1 ? "eager" : "lazy"}
                />

                <div className="hg-shade" aria-hidden="true" />

                <motion.div
                  className="hg-content"
                  aria-hidden={!isActive}
                  inert={!isActive}
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0,
                    y: isActive ? 0 : 18,
                  }}
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : {
                          opacity: {
                            duration: 0.7,
                            ease: [0.22, 1, 0.36, 1],
                          },
                          y: {
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                          },
                        }
                  }
                  style={{
                    visibility: isActive ? "visible" : "hidden",
                    pointerEvents: isActive ? "auto" : "none",
                  }}
                >
                  <div className="hg-copy">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>

                  <div className="hg-action">
                    <Link
                      className="hg-btn"
                      to={`${linkBase}/${service.slug}`}
                      tabIndex={isActive ? 0 : -1}
                    >
                      <span>{service.cta}</span>
                      <svg
                        width="18"
                        height="18"
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
                    </Link>
                  </div>
                </motion.div>
              </motion.article>
            );
          })}
        </div>

        <motion.button
          type="button"
          className="hg-arrow hg-arrow-right"
          aria-label="Next service"
          onClick={() => go(1)}
          whileHover={reduceMotion ? {} : { scale: 1.08, x: 3 }}
          whileTap={reduceMotion ? {} : { scale: 0.92 }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </motion.button>
      </div>

      <div className="hg-counter" aria-live="polite">
        <span className="hg-counter-line" />
        <span>
          {active + 1} / {count}
        </span>
        <span className="hg-counter-line" />
      </div>
    </section>
  );
}
