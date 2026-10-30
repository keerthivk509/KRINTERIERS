import React, { useEffect, useState } from "react";
import "./Faq.css";
import { getPublicFAQs } from "../../api";
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
export default function Faq() {
  const [faqs, setFaqs] = useState([]);
  const [openId, setOpenId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    getPublicFAQs()
      .then((data) => {
        console.log("FAQ", data);
        if (!cancelled) {
          setFaqs(Array.isArray(data.faqs) ? data.faqs : DEFAULT_ITEMS);
        }
      })
      .catch((error) => {
        console.error("Unable to load FAQs:", error);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="public-faq">
      <header className="public-faq-hero">
        <span>HERE TO HELP</span>
        <h1>Frequently Asked Questions</h1>
        <p>
          Find answers to common questions about our designs, services, and
          process.
        </p>
      </header>

      <section className="public-faq-content">
        {loading ? (
          <p className="public-faq-message">Loading questions...</p>
        ) : faqs.length === 0 ? (
          <p className="public-faq-message">
            Our FAQs are being updated. Please contact us if you need help.
          </p>
        ) : (
          faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <article className="public-faq-item" key={faq.id}>
                <button
                  type="button"
                  className="public-faq-question"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${faq.id}`}
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                >
                  <span>{faq.question}</span>
                  <span
                    className={`public-faq-icon ${isOpen ? "is-open" : ""}`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${faq.id}`}
                    className="public-faq-answer"
                  >
                    {faq.answer}
                  </div>
                )}
              </article>
            );
          })
        )}
      </section>
    </main>
  );
}
