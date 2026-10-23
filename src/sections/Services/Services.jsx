import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimationControls } from "framer-motion";
// import { useServices } from "../hooks/useServices";
// import { content } from "../data/content";
import "./Services.css";
import { useServices } from "../../hooks/useServices";
import { content } from "../../data/content";

export default function Services() {
  const { services } = useServices();
  const controls = useAnimationControls();
  const trackRef = useRef(null);
  const frameRef = useRef(null);
  const [paused, setPaused] = useState(false);

  const items = services.flatMap((service) =>
    (service.subunits || []).map((unit) => ({
      ...unit,
      to: `/services/${service.slug}#${unit.slug}`,
      parent: service.title,
    })),
  );

  const duplicatedItems = [...items, ...items];

  useEffect(() => {
    if (!items.length || paused) {
      controls.stop();
      return;
    }

    controls.start({
      x: "-50%",
      transition: {
        duration: Math.max(items.length * 5, 20),
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });

    return () => controls.stop();
  }, [items.length, paused, controls]);

  // Scroll left or right when the pointer approaches the gallery edges.
  const handleMouseMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const edge = 100;

    if (event.clientX < rect.left + edge) {
      setPaused(true);
      controls.stop();
      frameRef.current = "left";
    } else if (event.clientX > rect.right - edge) {
      setPaused(true);
      controls.stop();
      frameRef.current = "right";
    } else {
      frameRef.current = null;
      setPaused(false);
    }
  };

  const moveCards = (direction) => {
    setPaused(true);
    controls.stop();

    const track = trackRef.current;
    if (!track) return;

    const currentX =
      Number(
        getComputedStyle(track)
          .transform.match(/matrix\(([^)]+)\)/)?.[1]
          ?.split(",")[4],
      ) || 0;

    const distance = track.parentElement.clientWidth * 0.7;
    const halfWidth = track.scrollWidth / 2;

    let nextX = currentX + direction * distance;

    // Keep movement inside the duplicated marquee track.
    nextX = Math.max(-halfWidth, Math.min(0, nextX));

    controls.start({
      x: nextX,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    });
  };

  if (!items.length) return null;

  return (
    <main className="services-page">
      <section className="services-hero">
        <span className="services-eyebrow">WHAT WE DO</span>
        <h1>Our Services</h1>
        <p>{content.gallery.text}</p>
      </section>

      <section className="services-gallery">
        <div className="services-gallery-heading">
          <h2>Explore What We Offer</h2>
          <p>Discover the right solution for your needs.</p>
        </div>

        <div
          className="services-marquee"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            frameRef.current = null;
            setPaused(false);
          }}
        >
          <button
            className="marquee-arrow marquee-arrow-left"
            onClick={() => moveCards(1)}
            aria-label="Move cards left"
          >
            &#8592;
          </button>

          <button
            className="marquee-arrow marquee-arrow-right"
            onClick={() => moveCards(-1)}
            aria-label="Move cards right"
          >
            &#8594;
          </button>

          <motion.div
            ref={trackRef}
            className="services-track"
            animate={controls}
            initial={{ x: "0%" }}
          >
            {duplicatedItems.map((item, index) => (
              <Link
                to={item.to}
                className="services-card"
                key={`${item.parent}-${item.id}-${index}`}
              >
                <div className="services-card-image">
                  <img src={item.image} alt={item.title} />

                  <div className="services-card-overlay">
                    <span>{item.parent}</span>
                    <h3>{item.title}</h3>
                    <span>Explore service ↗</span>
                  </div>
                </div>

                <div className="services-card-caption">
                  <h3>{item.title}</h3>
                  <p>{item.parent}</p>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
