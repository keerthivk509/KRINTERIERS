import React, { useEffect } from "react";
import "./AboutUs.css";

const content = {
  founder: "Founder Name",
  role: "Founder & Principal Designer",
  story:
    "At KR Interior Designs, we believe every space has a story waiting to unfold. Our approach combines thoughtful planning, timeless aesthetics, and functional design to create interiors that feel personal and meaningful.",
  vision:
    "To create inspiring, timeless spaces that bring beauty, comfort, and purpose into everyday living.",
  mission:
    "To understand every client's needs and transform their vision into thoughtfully designed, functional, and beautiful interiors.",
  videoId: "YOUR_YOUTUBE_VIDEO_ID",
};

export default function AboutUs() {
  useEffect(() => {
    const elements = document.querySelectorAll(".about-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="kr-about">
      {/* Hero */}
      <section className="about-hero">
        <div className="hero-overlay" />
        <div className="hero-content about-reveal">
          <span className="eyebrow">THE ART OF THOUGHTFUL LIVING</span>
          <h1>
            Designed with purpose.
            <br />
            <em>Created with feeling.</em>
          </h1>
          <p>
            We create meaningful interiors that reflect your personality,
            elevate everyday living, and stand the test of time.
          </p>
          <a href="#our-story" className="about-button">
            Discover Our Story <span>↗</span>
          </a>
        </div>
        <span className="hero-index">KR INTERIOR DESIGNS · ABOUT US</span>
      </section>

      {/* Our Story */}
      <section id="our-story" className="about-section story-section">
        <div className="about-image story-image about-reveal">
          <img
            src="/images/our-story.jpg"
            alt="Warm contemporary interior designed by KR"
            loading="lazy"
          />
          <span className="image-caption">Spaces made personal.</span>
        </div>

        <div className="about-copy about-reveal">
          <span className="eyebrow">01 — OUR STORY</span>
          <h2>
            More than spaces.
            <br />
            <em>A feeling of home.</em>
          </h2>
          <p>{content.story}</p>
          <p>
            From the first idea to the final detail, we focus on creating
            environments where aesthetics and everyday functionality come
            together naturally.
          </p>
          <div className="signature">KR Interior Designs</div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="values-section">
        <div className="values-heading about-reveal">
          <span className="eyebrow">02 — WHAT GUIDES US</span>
          <h2>Rooted in purpose.</h2>
          <p>Every detail begins with a meaningful intention.</p>
        </div>

        <div className="values-grid">
          <article className="value-card about-reveal">
            <span className="value-number">01</span>
            <span className="value-symbol">✳</span>
            <h3>Our Vision</h3>
            <p>{content.vision}</p>
          </article>

          <article className="value-card value-card-dark about-reveal">
            <span className="value-number">02</span>
            <span className="value-symbol">✳</span>
            <h3>Our Mission</h3>
            <p>{content.mission}</p>
          </article>
        </div>
      </section>

      {/* Founder */}
      <section className="about-section founder-section">
        <div className="founder-image about-reveal">
          <img
            src="/images/founder.jpg"
            alt="Founder of KR Interior Designs"
            loading="lazy"
          />
        </div>

        <div className="about-copy founder-copy about-reveal">
          <span className="eyebrow">03 — THE PERSON BEHIND THE VISION</span>
          <h2>
            Meet the mind
            <br />
            <em>behind the spaces.</em>
          </h2>
          <h3>{content.founder}</h3>
          <span className="founder-role">{content.role}</span>
          <p>
            With a passion for beautiful, functional spaces, our founder brings
            together creativity, attention to detail, and a deep understanding
            of how people experience their surroundings.
          </p>
          <p>
            Every project is an opportunity to listen, collaborate, and create a
            space that feels uniquely yours.
          </p>
        </div>
      </section>

      {/* YouTube */}
      <section className="motion-section">
        <div className="motion-heading about-reveal">
          <span className="eyebrow">04 — A CLOSER LOOK</span>
          <h2>
            Our work, <em>in motion.</em>
          </h2>
          <p>
            Step inside our world and discover the details that bring every
            design to life.
          </p>
        </div>

        <div className="video-frame about-reveal">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${content.videoId}`}
            title="KR Interior Designs project showcase"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </section>

      {/* Contact CTA */}
      <section className="about-cta about-reveal">
        <span className="eyebrow">05 — LET'S CREATE SOMETHING BEAUTIFUL</span>
        <h2>
          Your space.
          <br />
          <em>Our shared vision.</em>
        </h2>
        <p>
          Have a project in mind? Let's talk about the space you've always
          imagined.
        </p>
        <a href="/contact" className="about-button">
          Discuss Your Project <span>↗</span>
        </a>
      </section>
    </main>
  );
}
