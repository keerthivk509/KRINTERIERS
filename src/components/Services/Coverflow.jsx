import React, { useEffect, useState } from "react";
import "./Coverflow.css";

export default function Coverflow({ items = [], autoplay = 3600 }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = items.length;

  useEffect(() => {
    if (total < 2 || paused || autoplay <= 0) return;

    const timer = setInterval(() => {
      setActive((current) => (current + 1) % total);
    }, autoplay);

    return () => clearInterval(timer);
  }, [total, paused, autoplay]);

  useEffect(() => {
    if (active >= total && total > 0) {
      setActive(0);
    }
  }, [active, total]);

  const next = () => {
    if (total > 1) {
      setActive((current) => (current + 1) % total);
    }
  };

  const prev = () => {
    if (total > 1) {
      setActive((current) => (current - 1 + total) % total);
    }
  };

  const getOffset = (index) => {
    let offset = index - active;

    if (offset < -Math.floor(total / 2)) offset += total;
    if (offset > Math.floor(total / 2)) offset -= total;

    return offset;
  };

  if (!total) return null;

  return (
    <div
      className="coverflow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
    >
      <div className="coverflow__stage">
        {items.map((item, index) => {
          const offset = getOffset(index);
          const distance = Math.abs(offset);
          const isActive = offset === 0;

          return (
            <button
              type="button"
              key={`${item.title || "card"}-${index}`}
              className={`coverflow__card ${
                isActive ? "is-active" : ""
              } ${distance === 1 ? "is-near" : ""}`}
              aria-label={`Show ${item.title || `slide ${index + 1}`}`}
              aria-current={isActive ? "true" : undefined}
              onClick={() => setActive(index)}
              style={{
                "--offset": offset,
                "--distance": distance,
                transform: `
                  translateX(calc(var(--offset) * var(--cf-shift)))
                  translateZ(calc(var(--distance) * -95px))
                  rotateY(calc(var(--offset) * -19deg))
                  scale(${isActive ? 1 : distance === 1 ? 0.84 : 0.7})
                `,
                opacity: distance > 2 ? 0 : distance === 2 ? 0.65 : 1,
                zIndex: 20 - distance,
                visibility: distance > 2 ? "hidden" : "visible",
                pointerEvents: distance > 2 ? "none" : "auto",
                filter: isActive
                  ? "brightness(1)"
                  : `brightness(${Math.max(0.68, 1 - distance * 0.12)})`,
              }}
            >
              <div className="coverflow__media">
                <img
                  src={item.image || item.src}
                  alt={item.title || ""}
                  loading={distance <= 1 ? "eager" : "lazy"}
                  draggable="false"
                />

                <div className="coverflow__overlay" />

                <div
                  className={`coverflow__info ${isActive ? "is-current" : ""}`}
                  key={`${index}-${active}`}
                >
                  {item.subtitle && (
                    <span className="coverflow__sub">{item.subtitle}</span>
                  )}

                  {item.title && (
                    <h3 className="coverflow__title">{item.title}</h3>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {total > 1 && (
        <>
          <button
            type="button"
            className="coverflow__nav coverflow__nav--prev"
            onClick={prev}
            aria-label="Previous slide"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            type="button"
            className="coverflow__nav coverflow__nav--next"
            onClick={next}
            aria-label="Next slide"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>

          <div className="coverflow__dots" aria-label="Choose slide">
            {items.map((item, index) => (
              <button
                type="button"
                key={`${item.title || "dot"}-${index}`}
                className={`coverflow__dot ${
                  index === active ? "is-active" : ""
                }`}
                onClick={() => setActive(index)}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === active ? "true" : undefined}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
