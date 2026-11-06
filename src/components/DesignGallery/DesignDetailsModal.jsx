import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import {
  X,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Check,
} from "lucide-react";

import "./DesignDetailsModal.css";

export default function DesignDetailsModal({ design, onClose, onGetQuote }) {
  const [activeImage, setActiveImage] = useState(0);

  const images = design?.images || [];

  // Reset active image whenever a different design is selected
  useEffect(() => {
    setActiveImage(0);
  }, [design?.id]);

  // Lock background scroll and handle Escape key
  useEffect(() => {
    if (!design) return;

    const previousOverflow = document.body.style.overflow;
    const previousPaddingRight = document.body.style.paddingRight;

    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;

    document.body.style.overflow = "hidden";

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }

      if (event.key === "ArrowRight") {
        setActiveImage((prev) =>
          images.length ? (prev + 1) % images.length : 0,
        );
      }

      if (event.key === "ArrowLeft") {
        setActiveImage((prev) =>
          images.length ? (prev - 1 + images.length) % images.length : 0,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.paddingRight = previousPaddingRight;

      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [design, onClose, images.length]);

  const nextImage = () => {
    if (!images.length) return;

    setActiveImage((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    if (!images.length) return;

    setActiveImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleQuote = () => {
    onGetQuote?.(design);
  };

  return (
    <AnimatePresence>
      {design && (
        <motion.div
          className="design-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              onClose?.();
            }
          }}
        >
          <motion.div
            className="design-modal"
            role="dialog"
            aria-modal="true"
            aria-label={design.title || "Design details"}
            initial={{
              opacity: 0,
              scale: 0.94,
              y: 25,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.96,
              y: 20,
            }}
            transition={{
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* CLOSE BUTTON */}
            <button
              className="design-modal-close"
              onClick={onClose}
              aria-label="Close modal"
              type="button"
            >
              <X size={21} />
            </button>

            {/* LEFT IMAGE GALLERY */}
            <div className="design-modal-gallery">
              {images.length > 0 ? (
                <>
                  <div className="design-modal-main-image">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={images[activeImage]}
                        src={images[activeImage]}
                        alt={`${design.title} ${activeImage + 1}`}
                        initial={{ opacity: 0, scale: 1.04 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                      />
                    </AnimatePresence>

                    {images.length > 1 && (
                      <>
                        <button
                          className="design-modal-image-nav prev"
                          onClick={previousImage}
                          type="button"
                          aria-label="Previous image"
                        >
                          <ChevronLeft size={22} />
                        </button>

                        <button
                          className="design-modal-image-nav next"
                          onClick={nextImage}
                          type="button"
                          aria-label="Next image"
                        >
                          <ChevronRight size={22} />
                        </button>
                      </>
                    )}

                    <div className="design-modal-image-count">
                      {String(activeImage + 1).padStart(2, "0")}
                      <span>/</span>
                      {String(images.length).padStart(2, "0")}
                    </div>
                  </div>

                  {images.length > 1 && (
                    <div className="design-modal-thumbnails">
                      {images.map((image, index) => (
                        <button
                          key={`${image}-${index}`}
                          type="button"
                          className={`design-modal-thumb ${
                            activeImage === index ? "active" : ""
                          }`}
                          onClick={() => setActiveImage(index)}
                          aria-label={`View image ${index + 1}`}
                        >
                          <img src={image} alt="" />
                        </button>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="design-modal-no-image">No images available</div>
              )}
            </div>

            {/* RIGHT SCROLLABLE CONTENT */}
            <div className="design-modal-info">
              <div className="design-modal-content">
                <div className="design-modal-kicker">
                  <span />
                  OUR DESIGN COLLECTION
                </div>

                <div className="design-modal-heading">
                  <p className="design-modal-category">
                    {design.category || design.style || "Interior Design"}
                  </p>

                  <h2>{design.title}</h2>

                  {design.location && (
                    <p className="design-modal-location">{design.location}</p>
                  )}
                </div>

                {design.description && (
                  <div className="design-modal-description">
                    <h3>About This Design</h3>
                    <p>{design.description}</p>
                  </div>
                )}

                {design.features?.length > 0 && (
                  <div className="design-modal-features">
                    <h3>Design Highlights</h3>

                    <ul>
                      {design.features.map((feature, index) => (
                        <li key={index}>
                          <span className="design-modal-check">
                            <Check size={14} />
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {design.suitableFor?.length > 0 && (
                  <div className="design-modal-suitable">
                    <h3>Suitable For</h3>

                    <div className="design-modal-tags">
                      {design.suitableFor.map((item, index) => (
                        <span key={index}>{item}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="design-modal-bottom">
                  <div>
                    <p>Have a similar vision?</p>
                    <h3>Let's create your space.</h3>
                  </div>

                  <button
                    type="button"
                    className="design-modal-quote-btn"
                    onClick={handleQuote}
                  >
                    Get a Quote
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
