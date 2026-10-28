import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, animate, useInView } from "framer-motion";
import "./Motion.css";

export const EASE = [0.22, 1, 0.36, 1];
export const pad = (n) => String(n).padStart(2, "0");

// Words slide up out of a mask (the Framer-style headline reveal).
export function SplitText({ text, as = "h2", className = "", delay = 0 }) {
  const Tag = as;
  return (
    <Tag className={className} aria-label={text}>
      {text.split(" ").map((w, i) => (
        <span className="mask" key={i} aria-hidden="true">
          <motion.span
            style={{ display: "inline-block" }}
            initial={{ y: "115%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10% 0px" }}
            transition={{ duration: 0.9, ease: EASE, delay: delay + i * 0.07 }}
          >
            {w}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function Reveal({ children, delay = 0, y = 28, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-8% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({ to, suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, {
      duration: 2,
      ease: EASE,
      onUpdate: (v) =>
        ref.current &&
        (ref.current.textContent = Math.round(v).toLocaleString() + suffix),
    });
    return () => c.stop();
  }, [inView, to, suffix]);
  return (
    <span style={{ letterSpacing: "0px" }} ref={ref}>
      0{suffix}
    </span>
  );
}

export function Marquee({ children, reverse = false, speed = 30 }) {
  return (
    <div className="marquee">
      <div
        className={"marquee-track" + (reverse ? " rev" : "")}
        style={{ animationDuration: speed + "s" }}
      >
        <div className="marquee-set">{children}</div>
        <div className="marquee-set" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}

export function Button({
  to,
  href,
  children,
  onClick,
  type = "button",
  variant = "dark",
}) {
  const cls = `btn btn-${variant}`;
  const inner = (
    <span className="btn-label" data-text={children}>
      {children}
    </span>
  );
  if (to)
    return (
      <Link className={cls} to={to}>
        {inner}
      </Link>
    );
  if (href)
    return (
      <a className={cls} href={href}>
        {inner}
      </a>
    );
  return (
    <button className={cls} type={type} onClick={onClick}>
      {inner}
    </button>
  );
}

export default function AnimatedText({
  text = "",
  as: Tag = "h1",
  className = "",
  animation = "pop",
  delay = 0,
  stagger = 0.15,
  color,
  highlightWords = [],
  highlightColor = "#AA8D6F",
  fontSize,
  fontFamily = "",
  align = "left",
  ease = "cubic-bezier(0.22, 1, 0.36, 1)",
}) {
  const words = String(text).split(/\s+/).filter(Boolean);

  return (
    <Tag
      className={`animated-text ${className}`}
      style={{
        color,
        fontSize,
        fontFamily,
        textAlign: align,
        "--text-ease": ease,
      }}
    >
      {words.map((word, index) => {
        const isHighlighted = highlightWords.includes(
          word.replace(/[.,!?;:]+$/, ""),
        );

        return (
          <span
            key={`${word}-${index}`}
            className={`animated-text-word ${animation} ${
              isHighlighted ? "highlighted" : ""
            }`}
            style={{
              "--word-delay": `${delay + index * stagger}s`,
              "--highlight-color": highlightColor,
            }}
          >
            {word}
          </span>
        );
      })}
    </Tag>
  );
}
