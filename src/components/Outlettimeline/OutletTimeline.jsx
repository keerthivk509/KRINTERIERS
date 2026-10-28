import React, { useEffect, useId, useRef, useState } from "react";
import "./OutletTimeline.css";
import AnimatedText, { SplitText } from "../MotionNew";
/* Edit this list: one object per step. Put your own photos in /public/images/ and use "/images/xxx.jpg". */
const img = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;
const DEFAULT_STEPS = [
  {
    year: "2014",
    title: "A small workshop with a big idea",
    text: "We started with one workshop and a simple promise: furniture that makes a house feel like home.",
    points: ["Handmade pieces", "First 50 happy families"],
    image: img("photo-1616486338812-3dadae4b4ace"),
    alt: "Cosy living room with a handcrafted armchair",
  },
  {
    year: "2016",
    title: "Our first outlet opens",
    text: "Customers could finally see, touch and test every piece before taking it home.",
    points: ["Walk-in showroom", "Free design advice"],
    image: img("photo-1600607687939-ce8a6c25118c"),
    alt: "Warm showroom with sofas and lighting",
  },
  {
    year: "2019",
    title: "Custom and modular ranges",
    text: "We added made-to-measure sofas, wardrobes and modular kitchens, built around your space.",
    points: ["Made to measure", "Modular kitchens"],
    image: img("photo-1600607687920-4e2a09cf159d"),
    alt: "Bright modular kitchen",
  },
  {
    year: "2022",
    title: "A bigger, brighter showroom",
    text: "A new outlet with room displays, a material library and a dedicated delivery team.",
    points: ["Room displays", "On-time delivery"],
    image: img("photo-1600210492486-724fe5c67fb0"),
    alt: "Large showroom with styled room displays",
  },
  {
    year: "Today",
    title: "10,000+ happy homes",
    text: "From a single outlet to a trusted name, and we are still designing around you.",
    points: ["4.9/5 customer rating", "Support after delivery"],
    image: img("photo-1497366754035-f200968a6e72"),
    alt: "Finished interior ready to move in",
  },
];

const pad = (n) => String(n).padStart(2, "0");

export default function OutletTimeline({
  eyebrow = "OUR OUTLET JOURNEY",
  title = "From a small workshop to your favourite showroom",
  steps = DEFAULT_STEPS,
  id,
}) {
  const headingId = useId();
  const trackRef = useRef(null);
  const stepRefs = useRef([]);
  const [active, setActive] = useState(0);
  const [seen, setSeen] = useState({}); // steps that have appeared once (used for the phone layout)

  // 1) the step that crosses the middle of the screen becomes the active one -> changes the image
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number(e.target.dataset.index));
        }),
      { rootMargin: "-49% 0px -49% 0px", threshold: 0 },
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [steps.length]);

  // 2) reveal each step the first time it is seen
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      setSeen(Object.fromEntries(steps.map((_, i) => [i, true])));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setSeen((s) => ({ ...s, [e.target.dataset.index]: true }));
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.2 },
    );
    stepRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [steps.length]);

  // 3) the vertical line fills while you scroll through the timeline
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let raf = null;
    const update = () => {
      const r = el.getBoundingClientRect();
      const p = Math.min(
        1,
        Math.max(0, (window.innerHeight * 0.5 - r.top) / r.height),
      );
      el.style.setProperty("--tl-progress", p.toFixed(4));
      raf = null;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const goTo = (i) =>
    stepRefs.current[i]?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });

  return (
    <section id={id} className="tl" aria-labelledby={headingId}>
      <div className="tl-wrap">
        <header className="tl-head">
          <p className="tl-eyebrow">{eyebrow}</p>
          <SplitText text={title} className="h2" />
        </header>

        <div className="tl-layout">
          {/* ---------- left: one-sided timeline ---------- */}
          <div className="tl-track" ref={trackRef}>
            <span className="tl-line" aria-hidden="true">
              <span className="tl-line-fill" />
            </span>
            <ol className="tl-list">
              {steps.map((s, i) => (
                <li
                  key={s.year + s.title}
                  ref={(el) => (stepRefs.current[i] = el)}
                  data-index={i}
                  className={`tl-step ${i === active ? "is-active" : ""} ${i < active ? "is-past" : ""} ${seen[i] ? "is-in" : ""}`}
                  aria-current={i === active ? "step" : undefined}
                >
                  <div className="tl-body">
                    <button
                      type="button"
                      className="tl-dot"
                      aria-label={`Go to ${s.year}`}
                      onClick={() => goTo(i)}
                    />
                    <span className="tl-year">{s.year}</span>
                    <SplitText text={s.title} className="h2" />

                    {/* <h3>{s.title}</h3>| */}
                    <p>{s.text}</p>
                    {s.points?.length > 0 && (
                      <ul className="tl-points">
                        {s.points.map((p) => (
                          <li key={p}>{p}</li>
                        ))}
                      </ul>
                    )}
                    {/* phones and tablets: the picture sits below the text */}
                    <figure className="tl-step-img">
                      <img
                        src={s.image}
                        alt={s.alt || s.title}
                        loading="lazy"
                      />
                    </figure>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* ---------- right: sticky picture that changes while you scroll (desktop) ---------- */}
          <div className="tl-stage">
            <div className="tl-frame">
              {steps.map((s, i) => (
                <img
                  key={s.image + i}
                  className={i === active ? "is-active" : ""}
                  src={s.image}
                  alt={s.alt || s.title}
                  aria-hidden={i !== active}
                />
              ))}
              <span className="tl-badge" key={`b${active}`}>
                {steps[active].year}
              </span>
              <span className="tl-counter">
                <b>{pad(active + 1)}</b> / {pad(steps.length)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
