import React, { useEffect, useState } from "react";
import { getSlides } from "../../api";
const slideds1 = [
  // {
  //   image:
  //     "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2000&q=85",
  //   eyebrow: "TRANSFORMING SPACES",
  //   title: "Beautiful Interiors",
  //   second: "for a Better Life",
  //   desc: "We design spaces that inspire, comfort and reflect your unique style. From modern minimalism to timeless elegance, we bring your vision to life.",
  // },
  // {
  //   image:
  //     "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2000&q=85",
  //   eyebrow: "DESIGNED AROUND YOU",
  //   title: "A Home That Feels",
  //   second: "Uniquely Yours",
  //   desc: "Thoughtful materials, balanced colours and beautiful details come together to make your space feel personal.",
  // },
  {
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=2000&q=85",
    eyebrow: "FORM MEETS FUNCTION",
    title: "Every Detail",
    second: "Has a Purpose",
    desc: "We combine practical layouts with timeless style to create spaces that look beautiful and work effortlessly.",
  },
];
function Hero() {
  const [active, setActive] = useState(0);
  const [slides, setSlides] = useState(slideds1);

  useEffect(() => {
    let mounted = true;

    getSlides()
      .then((data) => {
        const apiData = Array.isArray(data)
          ? data
          : (data?.carousels ?? data?.data ?? []);

        // Keep default slides if API returns no data
        if (!Array.isArray(apiData) || apiData.length === 0) return;

        const convertedSlides = apiData
          .filter((item) => item.isActive !== false)
          .map((item) => {
            const words = (item.header || "").trim().split(/\s+/);
            const midpoint = Math.ceil(words.length / 2);

            return {
              image: item.image,
              eyebrow: item.title || "",
              title: words.slice(0, midpoint).join(" "),
              second: words.slice(midpoint).join(" "),
              desc: item.subHeader || "",
            };
          })
          .filter((item) => item.image && item.title);

        if (mounted && convertedSlides.length > 0) {
          setSlides(convertedSlides);
          setActive(0);
        }
      })
      .catch((err) => {
        console.error("Slides:", err);
        // Keep slideds1 if the API fails
      });

    return () => {
      mounted = false;
    };
  }, []);

  // Autoplay updates whenever the slide count changes
  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setActive((current) => (current + 1) % slides.length);
    }, 6500);

    return () => clearInterval(timer);
  }, [slides.length]);

  // Prevent invalid active indexes
  const safeActive = slides.length > 0 ? active % slides.length : 0;
  const slide = slides[safeActive];

  if (!slide) return null;

  return (
    <header id="home" className="hero">
      {slides.map((s, i) => (
        <div
          key={`${s.eyebrow}-${i}`}
          className={`hero-bg ${safeActive === i ? "active" : ""}`}
          style={{ backgroundImage: `url("${s.image}")` }}
          aria-hidden="true"
        />
      ))}

      <div className="hero-shade" />

      <div className="container hero-content" key={safeActive}>
        <p className="eyebrow light-eyebrow">{slide.eyebrow}</p>

        <h1>
          <span className="line">
            <span>{slide.title}</span>
          </span>
          <span className="line line-2">
            <span>{slide.second}</span>
          </span>
        </h1>

        <p className="hero-text">{slide.desc}</p>

        <div className="hero-actions">
          <a className="btn btn-burgundy" href="#gallery">
            Explore Our Work <i className="bi bi-arrow-right ms-2" />
          </a>
          <a className="btn btn-outline-light" href="#contact">
            Get it now
          </a>
        </div>
      </div>

      {slides.length > 1 && (
        <>
          <button
            className="hero-arrow hero-prev"
            aria-label="Previous slide"
            onClick={() =>
              setActive(
                (current) => (current - 1 + slides.length) % slides.length,
              )
            }
          >
            <i className="bi bi-chevron-left" />
          </button>

          <button
            className="hero-arrow hero-next"
            aria-label="Next slide"
            onClick={() =>
              setActive((current) => (current + 1) % slides.length)
            }
          >
            <i className="bi bi-chevron-right" />
          </button>

          <div className="hero-dots">
            {slides.map((s, i) => (
              <button
                key={`${s.eyebrow}-${i}`}
                className={`hero-dot ${safeActive === i ? "active" : ""}`}
                aria-label={`Show slide ${i + 1}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>
        </>
      )}
    </header>
  );
}

export { Hero };
