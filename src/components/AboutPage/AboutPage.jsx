import React, { useEffect, useRef, useState } from "react";
import "./AboutPage.css";

/*  AboutPage — header, our story, numbers, what we stand for, optional team, call to action.
    Standalone: no router and no libraries. Change the texts through props, or edit the defaults below.
    Props: eyebrow, title, intro, heroImage, story{eyebrow,title,paragraphs,image,ctaLabel,ctaHref},
           stats[{value:"10+",label}], values[{icon,title,text}], team[{name,role,image}], ctaHref          */

const photo = (id, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

const DEFAULT_STORY = {
  eyebrow: "OUR STORY",
  title: "Creating spaces that feel like home",
  paragraphs: [
    "At KR Interior Interior Design, we believe every space has a story. Our mission is to create beautiful, functional and personalised interiors that enhance your everyday life.",
    "From the first conversation to the final handover, we stay close to your ideas, your budget and your schedule, so the result feels like you.",
  ],
  image: photo("photo-1600607687939-ce8a6c25118c"),
  ctaLabel: "Discover Our Services",
  ctaHref: "/#services",
};
const DEFAULT_STATS = [
  { value: "10+", label: "Years of Experience" },
  { value: "500+", label: "Happy Clients" },
  { value: "200+", label: "Projects Completed" },
];
const ICONS = {
  design: (
    <>
      <path pathLength="1" d="M4 20l1-4L16 5a2.1 2.1 0 013 3L8 19l-4 1z" />
      <path pathLength="1" d="M14 7l3 3" />
    </>
  ),
  quality: (
    <>
      <path pathLength="1" d="M12 3l8 4.5v9L12 21l-8-4.5v-9L12 3z" />
      <path pathLength="1" d="M4 7.5l8 4.5 8-4.5" />
      <path pathLength="1" d="M12 12v9" />
    </>
  ),
  delivery: (
    <>
      <circle pathLength="1" cx="12" cy="13" r="7.5" />
      <path pathLength="1" d="M12 9v4l2.5 2" />
      <path pathLength="1" d="M9.5 3h5" />
    </>
  ),
  support: (
    <>
      <path pathLength="1" d="M4 14v-2a8 8 0 0116 0v2" />
      <path pathLength="1" d="M4 14h3v5H6a2 2 0 01-2-2v-3z" />
      <path pathLength="1" d="M20 14h-3v5h1a2 2 0 002-2v-3z" />
    </>
  ),
};
const DEFAULT_VALUES = [
  {
    icon: "design",
    title: "Creative Designs",
    text: "Tailored to your style and the way you live.",
  },
  {
    icon: "quality",
    title: "Quality Materials",
    text: "Long lasting and durable finishes, chosen with care.",
  },
  {
    icon: "delivery",
    title: "On-Time Delivery",
    text: "We value your time and keep every promise.",
  },
  {
    icon: "support",
    title: "Customer Support",
    text: "Always here for you, even after handover.",
  },
];

/* ---------- helpers: scroll reveal + count up ---------- */
function useInView(options) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      options || { threshold: 0.15, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return [ref, seen];
}
function Reveal({ variant = "up", delay = 0, className = "", children }) {
  const [ref, seen] = useInView();
  return (
    <div
      ref={ref}
      className={`ab-reveal ab-${variant} ${seen ? "is-in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` }}
    >
      {children}
    </div>
  );
}
function CountUp({ value }) {
  const m = String(value).match(/^(\d+)(.*)$/);
  const target = m ? Number(m[1]) : 0;
  const suffix = m ? m[2] : String(value);
  const [ref, seen] = useInView({ threshold: 0.6 });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const reduce =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setN(target);
      return;
    }
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / 1600, 1);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, target]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function AboutPage({
  eyebrow = "ABOUT US",
  title = "Designing homes people love to live in",
  intro = "A friendly team of designers, makers and project managers, all focused on one thing: your dream space.",
  heroImage = photo("photo-1616486338812-3dadae4b4ace", 1800),
  story = DEFAULT_STORY,
  stats = DEFAULT_STATS,
  values = DEFAULT_VALUES,
  team = [],
  ctaHref = "#contact",
}) {
  const [heroReady, setHeroReady] = useState(false);
  const s = { ...DEFAULT_STORY, ...story };
  const [valuesRef, valuesSeen] = useInView({ threshold: 0.2 });

  return (
    <article className="ab">
      {/* ---------- header ---------- */}
      <header className="ab-hero">
        {heroImage && (
          <img
            src={heroImage}
            alt=""
            referrerPolicy="no-referrer"
            className={heroReady ? "is-ready" : ""}
            onLoad={() => setHeroReady(true)}
            onError={() => setHeroReady(true)}
          />
        )}
        <div className="ab-shade" />
        <div className="ab-wrap ab-hero-copy">
          <p className="ab-eyebrow">{eyebrow}</p>
          <h1>
            <span>{title}</span>
          </h1>
          <p className="ab-intro">{intro}</p>
        </div>
      </header>

      {/* ---------- story ---------- */}
      <section className="ab-section">
        <div className="ab-wrap ab-story">
          <Reveal variant="wipe" className="ab-story-media">
            <img
              src={s.image}
              alt=""
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </Reveal>
          <Reveal variant="right" delay={150} className="ab-story-copy">
            <p className="ab-eyebrow">{s.eyebrow}</p>
            <h2>{s.title}</h2>
            {s.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            {s.ctaLabel && (
              <a className="ab-btn" href={s.ctaHref}>
                {s.ctaLabel} <span aria-hidden="true">→</span>
              </a>
            )}
          </Reveal>
        </div>
      </section>

      {/* ---------- numbers ---------- */}
      {stats.length > 0 && (
        <section className="ab-stats">
          <div className="ab-wrap ab-stats-grid">
            {stats.map((st, i) => (
              <Reveal
                variant="up"
                delay={i * 120}
                className="ab-stat"
                key={st.label}
              >
                <strong>
                  <CountUp value={st.value} />
                </strong>
                <span>{st.label}</span>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {/* ---------- what we stand for ---------- */}
      {values.length > 0 && (
        <section className="ab-section ab-values-section" ref={valuesRef}>
          <div className="ab-wrap">
            <Reveal className="ab-head">
              <p className="ab-eyebrow">WHY CHOOSE US</p>
              <h2>What we stand for</h2>
            </Reveal>
            <ul className={`ab-values ${valuesSeen ? "is-visible" : ""}`}>
              {values.map((v, i) => (
                <li className="ab-value" style={{ "--i": i }} key={v.title}>
                  <span className="ab-icon" aria-hidden="true">
                    {typeof v.icon === "string" && ICONS[v.icon] ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {ICONS[v.icon]}
                      </svg>
                    ) : (
                      v.icon
                    )}
                  </span>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ---------- team (only when you pass people) ---------- */}
      {team.length > 0 && (
        <section className="ab-section">
          <div className="ab-wrap">
            <Reveal className="ab-head">
              <p className="ab-eyebrow">OUR TEAM</p>
              <h2>The people behind your space</h2>
            </Reveal>
            <div className="ab-team">
              {team.map((m, i) => (
                <Reveal
                  variant="zoom"
                  delay={(i % 4) * 100}
                  className="ab-member"
                  key={m.name}
                >
                  <div className="ab-member-img">
                    {m.image ? (
                      <img
                        src={m.image}
                        alt={m.name}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span>{m.name.slice(0, 1)}</span>
                    )}
                  </div>
                  <h3>{m.name}</h3>
                  <p>{m.role}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="ab-cta">
        <Reveal className="ab-wrap">
          <p className="ab-eyebrow ab-eyebrow-light">LET’S TALK</p>
          <h2>Ready to start your project?</h2>
          <a className="ab-btn ab-btn-light" href={ctaHref}>
            Get it now <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </section>
    </article>
  );
}
