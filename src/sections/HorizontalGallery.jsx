import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimationControls } from "framer-motion";
import { useServices } from "../hooks/useServices";
import { content } from "../data/content";

export default function HorizontalGallery() {
  const { services } = useServices();
  const controls = useAnimationControls();
  const isPaused = useRef(false);

  const items = services.flatMap((s) =>
    (s.subunits || []).map((u) => ({
      ...u,
      to: `/services/${s.slug}#${u.slug}`,
      parent: s.title,
    })),
  );

  if (!items.length) return null;

  // Duplicate cards to create a seamless loop.
  const marqueeItems = [...items, ...items];

  const startMarquee = async () => {
    if (isPaused.current) return;

    await controls.start({
      x: "-50%",
      transition: {
        duration: Math.max(items.length * 5, 20),
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  };

  const pauseMarquee = () => {
    isPaused.current = true;
    controls.stop();
  };

  const resumeMarquee = () => {
    isPaused.current = false;
    startMarquee();
  };

  return (
    <section className="hs">
      <div className="container hs-head">
        <header className="wcu-head">
          <h2>Services</h2>
          <p>{content.gallery.text}</p>
        </header>
      </div>

      <div
        className="hs-viewport"
        onMouseEnter={pauseMarquee}
        onMouseLeave={resumeMarquee}
        onTouchStart={pauseMarquee}
        onTouchEnd={resumeMarquee}
      >
        <motion.div
          className="hs-track"
          animate={controls}
          initial={{ x: "0%" }}
          onHoverStart={pauseMarquee}
          onHoverEnd={resumeMarquee}
        >
          {marqueeItems.map((it, index) => (
            <Link to={it.to} className="hs-card" key={`${it.id}-${index}`}>
              <div className="hs-img">
                <img src={it.image} alt={it.title} loading="lazy" />

                <motion.div
                  className="hs-overlay"
                  initial={{ opacity: 0, y: 20 }}
                  whileHover={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <h3>{it.title}</h3>
                  <p>{it.parent}</p>
                  <span className="hs-link">Explore Services ↗</span>
                </motion.div>
              </div>

              <div className="hs-card-info">
                <h3>{it.title}</h3>
                <p>{it.parent}</p>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
