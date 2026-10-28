import React, { useEffect, useRef, useState } from "react";
import "./HorizontalGallery.css";
import Coverflow from "./Coverflow";
import AnimatedText from "../MotionNew";

const gallery = [
  {
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1000&q=85",
    title: "Nordic Living",
    subtitle: "Living Room",
  },
  {
    image:
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1000&q=85",
    title: "Warm Minimal",
    subtitle: "Bedroom",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1000&q=85",
    title: "Clay Studio",
    subtitle: "Workspace",
  },
  {
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1000&q=85",
    title: "Soft Light",
    subtitle: "Living Room",
  },
  {
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&q=85",
    title: "Quiet Corner",
    subtitle: "Reading Nook",
  },
];

export default function HorizontalGallery({
  services,
  eyebrow = "WHAT WE DO",
  title = "Our Services",
  autoplay = 3600,
}) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  const items = services?.length ? services : gallery;

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
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`hg ${visible ? "is-visible" : ""}`}
      aria-label={title || "Services"}
    >
      {(eyebrow || title) && (
        <header className="hg-head">
          {eyebrow && (
            <AnimatedText
              text={eyebrow}
              as="p"
              className="hg-eyebrow"
              delay={0}
              stagger={0.04}
            />
          )}

          {title && (
            <AnimatedText
              text={title}
              as="h2"
              highlightWords={["Services"]}
              highlightColor="#8a3333"
              className="hg-title"
              delay={0.12}
              stagger={0.06}
            />
          )}
        </header>
      )}

      <div className="hg-gallery">
        <Coverflow items={items} autoplay={autoplay} />
      </div>
    </section>
  );
}
