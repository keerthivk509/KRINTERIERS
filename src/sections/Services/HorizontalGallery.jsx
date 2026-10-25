import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import "./HorizontalGallery.css";
import Coverflow from "./Coverflow";
const gallery = [
  {
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
    title: "Nordic Living",
    subtitle: "Living Room",
  },
  {
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
    title: "Warm Minimal",
    subtitle: "Bedroom",
  },
  {
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
    title: "Clay Studio",
    subtitle: "Workspace",
  },
  {
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800",
    title: "Soft Light",
    subtitle: "Living Room",
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    title: "Quiet Corner",
    subtitle: "Reading Nook",
  },
];

export default function HorizontalGallery({
  services,
  eyebrow = "WHAT WE DO",
  title = "Our Services",
  linkBase = "/services",
  autoplay = 10500,
}) {
  return (
    <section
      className="hg"
      aria-label={title || "Services"}
      aria-roledescription="carousel"
    >
      {(eyebrow || title) && (
        <header className="hg-head">
          {eyebrow && <p className="hg-eyebrow">{eyebrow}</p>}
          {title && <h2>{title}</h2>}
        </header>
      )}
      <Coverflow items={gallery} />
    </section>
  );
}
