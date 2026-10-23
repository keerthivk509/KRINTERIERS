import { useEffect, useId, useRef, useState } from "react";
import "./WhyChooseUs.css";

/* Line icons (24x24). pathLength="1" lets the CSS "draw" each line when the section appears. */
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
      <path pathLength="1" d="M18.5 6.5l1.2-1.2" />
    </>
  ),
  support: (
    <>
      <path pathLength="1" d="M4 14v-2a8 8 0 0116 0v2" />
      <path pathLength="1" d="M4 14h3v5H6a2 2 0 01-2-2v-3z" />
      <path pathLength="1" d="M20 14h-3v5h1a2 2 0 002-2v-3z" />
      <path pathLength="1" d="M18 19c0 1.5-2 2.5-5 2.5" />
    </>
  ),
};

const DEFAULT_ITEMS = [
  { icon: "design", title: "Creative Designs", text: "Tailored to your style" },
  {
    icon: "quality",
    title: "Quality Materials",
    text: "Long lasting & durable",
  },
  { icon: "delivery", title: "On-Time Delivery", text: "We value your time" },
  { icon: "support", title: "Customer Support", text: "Always here for you" },
];

/*
  Props
    title, subtitle  heading texts
    items            [{ icon, title, text, href? }]
                     icon = "design" | "quality" | "delivery" | "support"  OR any React element / <img>
                     href (optional) turns the item into a link, e.g. to a service page
  Example for services:
    <WhyChooseUs title="Our Services" subtitle="Everything for your space."
      items={[{ icon: <img src="/i/kitchen.svg" alt="" />, title: "Modular Kitchen", text: "Smart & stylish", href: "/page/modular-kitchen" }]} />
*/
export default function WhyChooseUs({
  title = "Why Choose Us?",
  subtitle = "Your dream space is our priority.",
  items = DEFAULT_ITEMS,
  id,
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const headingId = useId();

  // start the animations when the section scrolls into view (only once)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`wcu ${visible ? "is-visible" : ""}`}
      aria-labelledby={headingId}
    >
      <div className="wcu-card">
        <header className="wcu-head">
          <h2 id={headingId}>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </header>

        <ul className="wcu-grid">
          {items.map((item, i) => {
            const Tag = item.href ? "a" : "div";
            return (
              <li className="wcu-item" style={{ "--i": i }} key={item.title}>
                <Tag
                  className="wcu-inner"
                  {...(item.href ? { href: item.href } : {})}
                >
                  <span className="wcu-icon" aria-hidden="true">
                    {typeof item.icon === "string" && ICONS[item.icon] ? (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        {ICONS[item.icon]}
                      </svg>
                    ) : (
                      item.icon
                    )}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </Tag>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
