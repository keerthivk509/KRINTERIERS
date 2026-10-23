import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
} from "framer-motion";
import "./HeroCarousel.css";

const EASE = [0.22, 1, 0.36, 1];
const INTERVAL = 6000;
const SLIDE_DURATION = 2;

const DEFAULT_SLIDES = [
  {
    src: "/images/hero-1.jpg",
    alt: "Modern living room with a statement armchair",
    fallback:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=80",
  },
  {
    src: "/images/hero-2.jpg",
    alt: "Warm contemporary living space",
    fallback:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=80",
  },
  {
    src: "/images/hero-3.jpg",
    alt: "Bright, comfortable family room",
    fallback:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=80",
  },
  {
    src: "/images/hero-4.jpg",
    alt: "Elegant kitchen and dining area",
    fallback:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=80",
  },
];

/* ---------- Text animation variants ---------- */

const textParent = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const lineUp = {
  hidden: { y: "110%" },
  show: {
    y: 0,
    transition: {
      duration: 0.9,
      ease: EASE,
    },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  },
};

const starsParent = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.6,
    },
  },
};

const star = {
  hidden: {
    opacity: 0,
    scale: 0,
    rotate: -40,
  },
  show: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 14,
    },
  },
};

/* ---------- Slide transition variants ---------- */

const slideVariants = {
  enter: ({ dir, reduce }) => ({
    opacity: 0,
    x: reduce ? 0 : dir > 0 ? "100%" : "-100%",
    scale: 1,
  }),

  center: ({ reduce }) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      opacity: {
        duration: reduce ? 0 : 0.5,
      },
      x: {
        duration: reduce ? 0 : SLIDE_DURATION,
        ease: EASE,
      },
    },
  }),

  exit: ({ dir, reduce }) => ({
    opacity: 0,
    x: reduce ? 0 : dir > 0 ? "-100%" : "100%",
    transition: {
      duration: reduce ? 0 : SLIDE_DURATION,
      ease: EASE,
    },
  }),
};

/* ---------- Count-up component ---------- */

function CountUp({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (reduce) {
      setValue(to);
      return;
    }

    const controls = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate: (number) => {
        setValue(Math.round(number));
      },
    });

    return () => controls.stop();
  }, [inView, to, reduce]);

  return (
    <span ref={ref}>
      {value.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}

/* ---------- Main hero carousel ---------- */

export default function HeroCarousel({
  slides = DEFAULT_SLIDES,
  ctaHref = "/#contact",
}) {
  const count = slides.length;
  const reduce = useReducedMotion();

  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);
  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);

  const paused = hovered || dragging;

  const progress = useMotionValue(0);
  const progressControls = useRef(null);

  /* ---------- Navigation ---------- */

  const go = useCallback(
    (direction) => {
      if (count < 2) return;

      setDir(direction);
      setIndex((current) => {
        return (current + direction + count) % count;
      });
    },
    [count],
  );

  const jump = useCallback(
    (targetIndex) => {
      if (targetIndex === index) return;

      setDir(targetIndex > index ? 1 : -1);
      setIndex(targetIndex);
    },
    [index],
  );

  /* ---------- Reset progress ---------- */

  useEffect(() => {
    progress.set(0);
  }, [index, progress]);

  /* ---------- Automatic slide movement ---------- */

  useEffect(() => {
    if (count < 2 || paused) return;

    const timer = setTimeout(() => {
      go(1);
    }, INTERVAL);

    return () => {
      clearTimeout(timer);
    };
  }, [index, count, paused, go]);

  /* ---------- Progress bar animation ---------- */

  useEffect(() => {
    if (count < 2) return;

    const controls = animate(progress, 1, {
      duration: INTERVAL / 1000,
      ease: "linear",
    });

    progressControls.current = controls;

    if (paused) {
      controls.pause();
    }

    return () => {
      controls.stop();

      if (progressControls.current === controls) {
        progressControls.current = null;
      }
    };
  }, [index, count, paused, progress]);

  /* ---------- Drag/swipe handling ---------- */

  const onDragEnd = (_, info) => {
    setDragging(false);

    if (info.offset.x < -70 || info.velocity.x < -450) {
      go(1);
    } else if (info.offset.x > 70 || info.velocity.x > 450) {
      go(-1);
    }
  };

  /* ---------- Image fallback ---------- */

  const fallbackImg = (item) => (event) => {
    const image = event.currentTarget;

    if (item.fallback && !image.dataset.fallbackUsed) {
      image.dataset.fallbackUsed = "true";
      image.src = item.fallback;
    }
  };

  if (count === 0) return null;

  const slide = slides[index];
  const next = slides[(index + 1) % count];
  const custom = { dir, reduce };
  const pad = (number) => String(number).padStart(2, "0");

  return (
    <section
      className="hc"
      id="home"
      aria-roledescription="carousel"
      aria-label="Featured furniture"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ---------- Text content ---------- */}

      <motion.div
        className="hc-copy"
        variants={textParent}
        initial={reduce ? "show" : "hidden"}
        animate="show"
      >
        <h1 className="hc-title" aria-label="Crafted for modern living">
          <span className="hc-line" aria-hidden="true">
            <motion.span variants={lineUp}>Crafted for</motion.span>
          </span>

          <span className="hc-line hc-accent" aria-hidden="true">
            <motion.span variants={lineUp}>Modern</motion.span>
          </span>

          <span className="hc-line" aria-hidden="true">
            <motion.span variants={lineUp}>Living</motion.span>
          </span>
        </h1>

        <motion.p className="hc-text" variants={fadeUp}>
          Thoughtfully designed furniture that brings warmth, comfort, and
          character into every room.
        </motion.p>

        <motion.a
          className="hc-btn"
          href={ctaHref}
          variants={fadeUp}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.97 }}
        >
          <span>Get in touch</span>

          <svg
            className="hc-btn-arrow"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </motion.a>

        <motion.div className="hc-proof" variants={fadeUp}>
          <div>
            <strong>
              <CountUp to={10000} suffix="+" />
            </strong>
            <span>Happy customers</span>
          </div>

          <i className="hc-divider" aria-hidden="true" />

          <div>
            <motion.strong
              className="hc-stars"
              variants={starsParent}
              aria-label="5 stars"
            >
              {[0, 1, 2, 3, 4].map((number) => (
                <motion.span key={number} variants={star} aria-hidden="true">
                  ★
                </motion.span>
              ))}
            </motion.strong>

            <span>4.9/5 stars</span>
          </div>
        </motion.div>
      </motion.div>

      {/* ---------- Main image ---------- */}

      <motion.div
        className="hc-media"
        initial={reduce ? false : { opacity: 0, x: 80 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 1.3,
          ease: EASE,
          delay: 0.2,
        }}
      >
        <motion.div
          className="hc-drag"
          drag={count > 1 ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          dragMomentum={false}
          onDragStart={() => setDragging(true)}
          onDragEnd={onDragEnd}
        >
          <AnimatePresence initial={false} custom={custom} mode="sync">
            <motion.img
              key={index}
              className="hc-img"
              src={slide.src || slide?.fallback}
              alt={slide.alt}
              draggable={false}
              custom={custom}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              onError={fallbackImg(slide)}
            />
          </AnimatePresence>
        </motion.div>
      </motion.div>

      {/* ---------- Next slide preview ---------- */}

      {count > 1 && (
        <motion.button
          type="button"
          className="hc-next-card"
          onClick={() => go(1)}
          aria-label="Show next slide"
          whileHover={{ scale: 1.05, y: -4 }}
          whileTap={{ scale: 0.97 }}
        >
          {console.log("ne", next)}
          <img src={next.fallback} alt="" onError={() => fallbackImg(next)} />
          <span>Next</span>
        </motion.button>
      )}

      {/* ---------- Controls ---------- */}

      {count > 1 && (
        <div className="hc-controls">
          <span className="hc-count">
            <b>{pad(index + 1)}</b> / {pad(count)}
          </span>

          <div className="hc-bars" role="group" aria-label="Choose slide">
            {slides.map((item, slideIndex) => (
              <button
                type="button"
                key={slideIndex}
                className="hc-bar"
                aria-pressed={slideIndex === index}
                aria-label={`Go to slide ${slideIndex + 1}`}
                onClick={() => jump(slideIndex)}
              >
                <motion.span
                  className="hc-bar-fill"
                  style={{
                    scaleX:
                      slideIndex === index
                        ? progress
                        : slideIndex < index
                          ? 1
                          : 0,
                    transformOrigin: "left",
                  }}
                />
              </button>
            ))}
          </div>

          <motion.button
            type="button"
            className="hc-arrow"
            onClick={() => go(-1)}
            aria-label="Previous slide"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.92 }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
          </motion.button>

          <motion.button
            type="button"
            className="hc-arrow"
            onClick={() => go(1)}
            aria-label="Next slide"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.92 }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </motion.button>
        </div>
      )}
    </section>
  );
}
