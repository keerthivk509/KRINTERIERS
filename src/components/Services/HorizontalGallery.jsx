import React, { useEffect, useRef, useState } from "react";
import "./HorizontalGallery.css";
import Coverflow from "./Coverflow";
import AnimatedText from "../MotionNew";
import { getPublicProjects } from "../../api";

export default function HorizontalGallery({
  services,
  projects,
  eyebrow = "WHAT WE DO",
  title = "Our Works",
  autoplay = 3600,
}) {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

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
        <Coverflow items={projects} autoplay={autoplay} />
      </div>
    </section>
  );
}
