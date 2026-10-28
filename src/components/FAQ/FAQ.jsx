import React, { useEffect, useId, useRef, useState } from "react";
import "./FAQ.css";

const DEFAULT_ITEMS = [
  {
    question: "What types of furniture do you offer?",
    answer:
      "We create thoughtfully designed seating, tables, and bedroom pieces for modern interiors.",
  },
  {
    question: "Can I order furniture online?",
    answer:
      "Yes. Send an enquiry and our team will confirm availability and delivery.",
  },
  {
    question: "Do you offer different materials and finishes?",
    answer: "Yes, most pieces come in several woods, fabrics, and finishes.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Most orders arrive within two to four weeks, depending on the piece.",
  },
  {
    question: "Can I request fabric or material samples?",
    answer: "Yes. Tell us what you are considering and we will send samples.",
  },
];

export default function FAQ({
  title = "Frequently",
  titleSoft = "asked questions",
  items = DEFAULT_ITEMS,
  id = "faqs",
}) {
  const ref = useRef(null);
  const headingId = useId();

  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(0);

  // Trigger the entrance animation when the section enters the viewport
  useEffect(() => {
    const element = ref.current;

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
      { threshold: 0.1 },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id={id}
      ref={ref}
      className={`faq-section ${visible ? "is-visible" : ""}`}
      aria-labelledby={headingId}
    >
      <div className="container-fluid faq-container">
        <div className="row faq-layout">
          {/* Left heading */}
          <div className="col-lg-5 faq-heading-col">
            <h2 id={headingId} className="faq-heading">
              <span className="faq-title-main">{title}</span>
              <span className="faq-title-soft">{titleSoft}</span>
            </h2>
          </div>

          {/* Right FAQ accordion */}
          <div className="col-lg-7 faq-content-col">
            <div className="faq-list">
              {items.map((item, index) => {
                const isOpen = open === index;
                const answerId = `${headingId}-answer-${index}`;

                return (
                  <article
                    className={`faq-item ${isOpen ? "is-open" : ""}`}
                    key={item.question}
                    style={{ "--faq-index": index }}
                  >
                    <button
                      type="button"
                      className="faq-question"
                      onClick={() => setOpen(isOpen ? -1 : index)}
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                    >
                      <span className="faq-question-text">{item.question}</span>

                      <span
                        className={`faq-toggle ${
                          isOpen ? "is-minus" : "is-plus"
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    <div
                      id={answerId}
                      className={`faq-answer-wrap ${
                        isOpen ? "is-expanded" : ""
                      }`}
                      aria-hidden={!isOpen}
                      inert={!isOpen}
                    >
                      <div className="faq-answer-inner">
                        <p className="faq-answer">{item.answer}</p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
