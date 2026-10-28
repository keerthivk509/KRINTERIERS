import React, { useEffect, useRef, useState } from "react";

/* Fades/slides/wipes its children in once they scroll into view.
   variant: 'up' | 'left' | 'right' | 'zoom' | 'wipe'   delay: ms (use it to stagger siblings) */
export function Reveal({
  as: Tag = "div",
  variant = "up",
  delay = 0,
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${variant} ${shown ? "is-in" : ""} ${className}`.trim()}
      style={{ "--d": `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/* Counts up to a value like "10+" or "500+" when it scrolls into view. */
export function CountUp({ value, duration = 1600 }) {
  const match = String(value).match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setN(target);
      return;
    }
    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

/* Top scroll-progress bar + shrinking navbar (adds class "scrolled" to <body>). */
export function ScrollEffects() {
  const bar = useRef(null);
  useEffect(() => {
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      if (bar.current)
        bar.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      document.body.classList.toggle("scrolled", y > 40);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);
  return <div className="scroll-progress" ref={bar} aria-hidden="true" />;
}

/* words slide up one after another */
export function Words({ text, start = 0 }) {
  return text.split(" ").map((w, i) => (
    <span key={i}>
      <span className="fs-w" style={{ "--w": start + i }}>
        <span>{w}</span>
      </span>{" "}
    </span>
  ));
}
