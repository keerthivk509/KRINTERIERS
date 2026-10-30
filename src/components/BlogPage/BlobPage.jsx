import React, { useEffect, useRef, useState } from "react";
import "./BlobPage.css";

/*
 * Static BlobPage
 * - No API calls, fetch, backend, or router dependency.
 * - Pass custom static content through the `page` prop, or edit DEFAULT_PAGE.
 * - Gallery items always use the same image/content zigzag layout.
 */

const photo = (id, width = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

export const DEFAULT_PAGE = {
  title: "Warm Living Room Makeover",
  subtitle:
    "A calm, light-filled family space built around comfort, texture and everyday living.",
  parent: "Projects",
  image: photo("photo-1616486338812-3dadae4b4ace", 1800),
  content:
    "This project began with a simple wish: a living room where the whole family could relax together. We reworked the layout to open up the space, brought in natural light, and chose soft, durable materials that look beautiful and last.\n\nEvery piece was selected with care, from the statement armchair to the layered lighting, so the room feels warm, personal and complete.",
  images: [
    {
      url: photo("photo-1616486338812-3dadae4b4ace"),
      title: "The statement armchair",
      content:
        " To get started with our website builder, simply enter your business name and explore a wide array of beautifully designed website templates. Browse through high-quality options to find the ideal style for your online presence. You can also use keywords to discover templates that perfectly match your brand's unique personality. To get started with our website builder, simply enter your business name and explore a wide array of beautifully designed website templates. Browse through high-quality options to find the ideal style for your online presence. You can also use keywords to discover templates that perfectly match your brand's unique personality. A sculpted armchair in soft fabric becomes the heart of the room and invites you to sit and stay.",
    },
    {
      url: photo("photo-1600607687939-ce8a6c25118c"),
      title: "Light and open layout",
      content:
        "Moving the seating away from the walls opened the space and let daylight reach every corner.",
    },
    {
      url: photo("photo-1600210492486-724fe5c67fb0"),
      title: "Textures that feel good",
      content:
        "Natural fabrics, warm wood and a woven rug add depth without making the room feel busy.",
    },
    {
      url: photo("photo-1600607687920-4e2a09cf159d"),
      title: "The finishing touches",
      content:
        "Layered lighting, art and small details tie everything together for a calm, finished look.",
    },
  ],
};

const pad = (number) => String(number).padStart(2, "0");

function Reveal({ variant = "up", delay = 0, className = "", children }) {
  const elementRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={elementRef}
      className={`bp-reveal bp-${variant} ${visible ? "is-in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Picture({ src, alt }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <span
        className="bp-broken"
        role="img"
        aria-label={alt || "Image unavailable"}
      >
        Image unavailable
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}

function Lightbox({ images, activeIndex, onClose, onChange }) {
  const closeButtonRef = useRef(null);
  const image = images[activeIndex];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onChange(1);
      if (event.key === "ArrowLeft") onChange(-1);
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, onChange]);

  if (!image) return null;

  return (
    <div
      className="bp-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={image.title || `Image ${activeIndex + 1}`}
      onClick={onClose}
    >
      <button
        ref={closeButtonRef}
        type="button"
        className="bp-lb-btn bp-lb-close"
        aria-label="Close image preview"
        onClick={onClose}
      >
        ✕
      </button>

      {images.length > 1 && (
        <button
          type="button"
          className="bp-lb-btn bp-lb-prev"
          aria-label="Previous image"
          onClick={(event) => {
            event.stopPropagation();
            onChange(-1);
          }}
        >
          ‹
        </button>
      )}

      <figure onClick={(event) => event.stopPropagation()}>
        <img src={image.url} alt={image.title || ""} />
        {(image.title || image.content) && (
          <figcaption>
            {image.title && <h3>{image.title}</h3>}
            {image.content && <p>{image.content}</p>}
          </figcaption>
        )}
      </figure>

      {images.length > 1 && (
        <button
          type="button"
          className="bp-lb-btn bp-lb-next"
          aria-label="Next image"
          onClick={(event) => {
            event.stopPropagation();
            onChange(1);
          }}
        >
          ›
        </button>
      )}
    </div>
  );
}

function renderContent(content) {
  return String(content || "")
    .split(/\n+/)
    .filter((paragraph) => paragraph.trim())
    .map((paragraph, index) => <p key={index}>{paragraph}</p>);
}

export default function BlobPage({
  page = DEFAULT_PAGE,
  homeHref = "/",
  ctaHref = "#contact",
  ctaLabel = "Get a Free Quote",
}) {
  const [heroReady, setHeroReady] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(null);

  // Normalize the static prop without making a request to any API.
  const content = page || DEFAULT_PAGE;
  const images = Array.isArray(content.images)
    ? content.images.filter((item) => item?.url)
    : [];

  const closePreview = () => setPreviewIndex(null);
  const changePreview = (direction) => {
    setPreviewIndex((current) => {
      if (current === null || images.length === 0) return current;
      return (current + direction + images.length) % images.length;
    });
  };

  return (
    <article className="bp">
      <header className="bp-hero">
        {content.image && (
          <img
            src={content.image}
            alt=""
            className={heroReady ? "is-ready" : ""}
            onLoad={() => setHeroReady(true)}
            onError={() => setHeroReady(true)}
          />
        )}
        <div className="bp-shade" />
        <div className="bp-wrap bp-hero-copy">
          {/* <nav className="bp-crumbs" aria-label="Breadcrumb">
            <a href={homeHref}>Home</a>
            {content.parent && <><span>›</span><span>{content.parent}</span></>}
            <span>›</span>
            <span>{content.title}</span>
          </nav> */}
          <h1>
            <span>{content.title}</span>
          </h1>
          {content.subtitle && (
            <p className="bp-subtitle">{content.subtitle}</p>
          )}
        </div>
      </header>

      {content.content && (
        <section className="bp-section">
          <div className="bp-wrap">
            <Reveal className="bp-intro">
              <p className="bp-label">OVERVIEW</p>
              <div className="bp-prose">{renderContent(content.content)}</div>
            </Reveal>
          </div>
        </section>
      )}

      {images.length > 0 && (
        <section className="bp-section bp-images">
          <div className="bp-wrap">
            <Reveal className="bp-images-head">
              <p className="bp-label">PROJECT DETAILS</p>
              <h2>See it in detail</h2>
            </Reveal>

            {/* Every item is one image + its content. Alternate sides in a zigzag. */}
            <div className="bp-rows">
              {images.map((item, index) => (
                <article
                  className={`bp-row ${index % 2 === 1 ? "is-flip" : ""}`}
                  key={`${item.url}-${index}`}
                >
                  <Reveal
                    variant={index % 2 === 1 ? "right" : "left"}
                    className="bp-media"
                  >
                    <button
                      type="button"
                      className="bp-pic"
                      onClick={() => setPreviewIndex(index)}
                      aria-label={`Preview ${item.title || `image ${index + 1}`}`}
                    >
                      <Picture
                        src={item.url}
                        alt={item.title || `${content.title} ${index + 1}`}
                      />
                    </button>
                  </Reveal>

                  <Reveal
                    variant={index % 2 === 1 ? "left" : "right"}
                    delay={120}
                    className="bp-copy"
                  >
                    <span className="bp-index">{pad(index + 1)}</span>
                    {item.title && <h3>{item.title}</h3>}
                    {item.content && <p>{item.content}</p>}
                  </Reveal>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bp-cta">
        <Reveal className="bp-wrap">
          <p className="bp-label">LET’S TALK</p>
          <h2>Ready to start your project?</h2>
          <a className="bp-btn" href={ctaHref}>
            {ctaLabel} →
          </a>
        </Reveal>
      </section>

      {previewIndex !== null && (
        <Lightbox
          images={images}
          activeIndex={previewIndex}
          onClose={closePreview}
          onChange={changePreview}
        />
      )}
    </article>
  );
}
