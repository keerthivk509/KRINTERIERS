import React from "react";
import "./Marquee.css";
import { SplitText } from "../MotionNew";

const benefits = [
  {
    title: "In-House Manufacturing",
    description:
      "Our own production facility ensures precision, better quality and complete control.",
    icon: "bi-building",
  },
  {
    title: "10-Year Warranty",
    description:
      "Enjoy peace of mind with our 10-year warranty on eligible interior products and workmanship.",
    icon: "bi-shield-check",
  },
  {
    title: "Budget-Friendly Solutions",
    description:
      "Beautiful interiors that fit your budget, without compromising on quality.",
    icon: "bi-piggy-bank",
  },
  {
    title: "Customized Interior Designs",
    description:
      "Tailored to your lifestyle, preferences, needs and space requirements.",
    icon: "bi-pencil-ruler",
  },
  {
    title: "Premium Quality Materials",
    description:
      "We use reliable materials and finishes for durability, functionality and a refined look.",
    icon: "bi-layers",
  },
  {
    title: "Smart Space Planning",
    description:
      "Every inch counts. We design spaces that are practical, functional and efficient.",
    icon: "bi-grid-3x3",
  },
  {
    title: "End-to-End Interior Solutions",
    description:
      "From concept to completion, we handle design, materials, manufacturing and installation.",
    icon: "bi-house-check",
  },
  {
    title: "Quality Craftsmanship",
    description:
      "Attention to detail, precision and consistency in every aspect of our work.",
    icon: "bi-tools",
  },
  {
    title: "45-Day Project Timeline",
    description:
      "Project completion within 45 days, subject to project scope and site readiness.",
    icon: "bi-calendar-check",
  },
];

export default function Marquee({ logo = "/images/kr-logo.png" }) {
  const title = "Why Choose Us?";
  const subtitle = "Your dream space is our priority.";

  // Duplicate the list for continuous scrolling.
  const repeatedBenefits = [
    ...benefits,
    ...benefits,
    // ...benefits,
    // ...benefits,
    // ...benefits,
  ];
  return (
    <section className="section reviews-section">
      <div className="container">
        <div className="split-head reviews-heading">
          <div className="reviews-title">
            <SplitText text={title} className="h2" />
            <p></p>
            <p></p>
            {subtitle && <SplitText text={subtitle} as="p" className="p" />}
          </div>
        </div>
      </div>
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {repeatedBenefits.map((item, index) => (
            <article
              className="why-marquee-card"
              key={`${item.title}-${index}`}
            >
              <div className="why-marquee-icon">
                <i className={`bi ${item.icon}`} aria-hidden="true" />
              </div>

              <div className="why-marquee-content">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
