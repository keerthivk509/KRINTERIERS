import { useEffect, useId, useRef, useState } from "react";
import "./OurProcess.css";

const ICONS = {
  consultation: (
    <>
      <path d="M3 5h11a2 2 0 012 2v4a2 2 0 01-2 2H8l-3 3v-3H3a2 2 0 01-2-2V7a2 2 0 012-2z" />
      <path d="M17 10h3a2 2 0 012 2v4a2 2 0 01-2 2h-1v3l-3-3h-3.5" />
    </>
  ),
  measure: (
    <>
      <path d="M3 17L17 3l4 4L7 21l-4-4z" />
      <path d="M7 13l2 2M10 10l2 2M13 7l2 2" />
    </>
  ),
  design: (
    <>
      <path d="M3 4h18v16H3z" />
      <path d="M3 10h18M10 10v10" />
    </>
  ),
  material: (
    <>
      <path d="M12 2l9 5-9 5-9-5 9-5z" />
      <path d="M3 12l9 5 9-5M3 16.5l9 5 9-5" />
    </>
  ),
  execution: (
    <>
      <path d="M12.5 4.5l7 7-3 3-7-7 3-3z" />
      <path d="M10.5 13.5L4 20M14 3l1.5 1.5" />
    </>
  ),
  handover: (
    <>
      <circle cx="8" cy="15" r="4" />
      <path d="M11 12l9-9M16 7l3 3M13.5 9.5l2 2" />
    </>
  ),
};

const DEFAULT_STEPS = [
  {
    icon: "consultation",
    title: "Consultation",
    text: "We listen to your ideas and needs.",
  },
  {
    icon: "measure",
    title: "Site Measurement",
    text: "Exact measurements of your space.",
  },
  {
    icon: "design",
    title: "Design & Planning",
    text: "Layouts and 3D designs for approval.",
  },
  {
    icon: "material",
    title: "Material Selection",
    text: "Choose finishes, fabrics and colours.",
  },
  {
    icon: "execution",
    title: "Execution",
    text: "Skilled crafting and installation.",
  },
  {
    icon: "handover",
    title: "Handover",
    text: "A final check, then your keys.",
  },
];

export default function OurProcess({
  title = "Our Process",
  subtitle = "A simple and transparent process, from concept to completion.",
  steps = DEFAULT_STEPS,
  showDescriptions = true,
  id,
}) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const headingId = useId();

  useEffect(() => {
    const element = sectionRef.current;
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
      {
        threshold: 0.1,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`proc ${visible ? "is-visible" : ""}`}
      aria-labelledby={headingId}
      style={{ "--n": steps.length }}
    >
      <div className="proc-card">
        <header className="proc-head">
          <h2 id={headingId}>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </header>

        <ol className="proc-list">
          {steps.map((step, index) => (
            <li
              className="proc-step"
              key={`${step.title}-${index}`}
              style={{ "--i": index }}
            >
              <span className="proc-icon" aria-hidden="true">
                {typeof step.icon === "string" && ICONS[step.icon] ? (
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {ICONS[step.icon]}
                  </svg>
                ) : (
                  step.icon
                )}
              </span>

              <div className="proc-text">
                <h3>
                  <span className="proc-num">{index + 1}.</span> {step.title}
                </h3>

                {showDescriptions && step.text && <p>{step.text}</p>}
              </div>

              {index < steps.length - 1 && (
                <span
                  className="proc-connector"
                  aria-hidden="true"
                  style={{ "--i": index }}
                >
                  <span className="proc-connector-fill" />
                  <span className="proc-connector-runner" />
                </span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
