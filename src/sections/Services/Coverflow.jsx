import { useEffect, useRef, useState } from "react";
import "./Coverflow.css";

export default function Coverflow({ items = [], autoplay = 3600 }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const stageRef = useRef(null);

  const total = items.length;

  const next = () => setActive((i) => (i + 1) % total);
  const prev = () => setActive((i) => (i - 1 + total) % total);

  // ── Autoplay (does NOT depend on `active` — was causing stutter)
  useEffect(() => {
    if (!total || paused || !autoplay) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % total);
    }, autoplay);
    return () => clearInterval(id);
  }, [total, paused, autoplay]);

  // ── Keyboard
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") setActive((i) => (i - 1 + total) % total);
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  // ── Touch swipe
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    let startX = null;
    const onStart = (e) => (startX = e.touches[0].clientX);
    const onEnd = (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (dx > 50) setActive((i) => (i - 1 + total) % total);
      else if (dx < -50) setActive((i) => (i + 1) % total);
      startX = null;
    };
    el.addEventListener("touchstart", onStart, { passive: true });
    el.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onStart);
      el.removeEventListener("touchend", onEnd);
    };
  }, [total]);

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
    >
      <div className="coverflow__stage" ref={stageRef}>
        {items.map((item, i) => {
          const offset = getOffset(i);
          const isActive = offset === 0;
          const abs = Math.abs(offset);
          const hidden = abs > 3;

          return (
            <div
              key={i}
              className={`coverflow__card ${isActive ? "is-active" : ""}`}
              onClick={() => setActive(i)}
              style={{
                "--tx": `${offset * 42}%`,
                "--tz": `${-abs * 180}px`,
                "--ry": `${offset * -28}deg`,
                "--sc": `${1 - abs * 0.08}`,
                "--op": hidden ? 0 : 1 - abs * 0.15,
                "--z": 10 - abs,
                "--br": isActive ? 1 : 1 - abs * 0.12,
                "--pe": hidden ? "none" : "auto",
              }}
            >
              <div className="coverflow__media">
                <img
                  src={item.image}
                  alt={item.title || `Slide ${i + 1}`}
                  loading={abs <= 1 ? "eager" : "lazy"}
                  draggable="false"
                />
                <div className="coverflow__overlay" />
                {isActive && (item.title || item.subtitle) && (
                  <div className="coverflow__info" key={`info-${active}`}>
                    {item.subtitle && (
                      <span className="coverflow__sub">{item.subtitle}</span>
                    )}
                    {item.title && (
                      <h3 className="coverflow__title">{item.title}</h3>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        className="coverflow__nav coverflow__nav--prev"
        onClick={prev}
        aria-label="Previous"
      >
        <i className="bi bi-arrow-left" />
      </button>
      <button
        type="button"
        className="coverflow__nav coverflow__nav--next"
        onClick={next}
        aria-label="Next"
      >
        <i className="bi bi-arrow-right" />
      </button>

      <div className="coverflow__dots">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            className={`coverflow__dot ${i === active ? "is-active" : ""}`}
            onClick={() => setActive(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
