import React, { useState } from "react";
import { Reveal } from "../Motion";
import { services } from "../../data/siteData";
function Title({ eyebrow, title, description }) {
  return (
    <Reveal className="section-heading ">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {description && <p className="muted-copy">{description}</p>}
    </Reveal>
  );
}
function Service() {
  return (
    <section className="section-space services-section" id="services">
      <div className="container">
        <Title
          title="OUR SERVICES"
          eyebrow="Thoughtful Design for Every Space"
          description="From a single room to a complete renovation, we help you make every corner count."
        />
        <div className="row g-3">
          {services.map((s, i) => (
            <Reveal
              className="col-md-6 col-lg-4 service-main"
              delay={i * 10}
              key={s.title}
            >
              <article className="service-card">
                <div className="service-img">
                  <img src={s.image} alt={s.title} loading="lazy" />
                </div>
                <div className="service-card-body">
                  <span className="service-icon">
                    <i className={`bi ${s.icon}`} />
                  </span>
                  <h3>{s.title}</h3>
                  <p>{s.description}</p>
                  {/* <a href="#contact">
                    Explore service <i className="bi bi-arrow-right" />
                  </a> */}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Service };
