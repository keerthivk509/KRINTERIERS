import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./DesignGallery.css";
import { getPublicDesignCategories } from "../../api";
import { defaultCategories } from "../../assets/data/defaultCategories";
import { useLocation } from "react-router-dom";

// =====================================================
// DATA HELPERS
// =====================================================

const getCategoryId = (category) => String(category.id);

const mapCategory = (category) => ({
  id: getCategoryId(category),
  name: category.title,
  heading: category.title,
  description: category.description || "",
  heroImage: category.image || "",
  slug: category.slug,
  designs: (category.designs || []).map((design) => ({
    ...design,
    id: String(design.id),
    categoryId: getCategoryId(category),

    // Use the API cover image as the first image.
    images: design.images?.length
      ? design.images
      : design.coverImage
        ? [design.coverImage]
        : [],

    shortDescription: design.shortDescription || design.description || "",
  })),

  faqs: category.faqs || [],
});

// =====================================================
// SMALL COMPONENTS
// =====================================================

function DesignHero({ category }) {
  const [loadedImage, setLoadedImage] = useState("");

  useEffect(() => {
    const imageUrl = category?.heroImage;

    if (!imageUrl) {
      setLoadedImage("");
      return;
    }

    let cancelled = false;
    const img = new Image();

    img.onload = () => {
      if (!cancelled) {
        setLoadedImage(imageUrl);
      }
    };

    img.onerror = () => {
      console.error("Hero image failed to load:", imageUrl);
    };

    img.src = imageUrl;

    return () => {
      cancelled = true;
    };
  }, [category?.heroImage]);

  return (
    <section
      className="dg-hero"
      style={{
        backgroundImage: loadedImage
          ? `linear-gradient(90deg, rgba(250,244,236,.98) 0%, rgba(250,244,236,.88) 37%, rgba(250,244,236,.10) 100%), url("${loadedImage}")`
          : "linear-gradient(90deg, #f3f0ea, #e9e4da)",
      }}
    >
      <div className="dg-hero-content">
        <span className="dg-eyebrow">KR INTERIOR DESIGNS</span>
        <h1>{category.heading}</h1>
        <p>{category.description}</p>
      </div>
    </section>
  );
}
function CategoryTabs({ categories, selected, onChange }) {
  return (
    <div className="dg-tabs-wrap">
      <div className="dg-tabs">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`dg-tab ${selected === category.id ? "active" : ""}`}
            onClick={() => onChange(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function DesignCard({ design, onOpen, onContactClick }) {
  const [imageIndex, setImageIndex] = useState(0);

  const images = design.images || [];

  useEffect(() => {
    setImageIndex(0);
  }, [design.id]);

  const previous = (event) => {
    event.stopPropagation();

    setImageIndex((current) =>
      current === 0 ? images.length - 1 : current - 1,
    );
  };

  const next = (event) => {
    event.stopPropagation();

    setImageIndex((current) =>
      current === images.length - 1 ? 0 : current + 1,
    );
  };

  const currentImage = images[imageIndex] || design.coverImage || "";

  return (
    <motion.article
      className="dg-card"
      layout
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 15 }}
      transition={{ duration: 0.35 }}
      onClick={() => onOpen(design)}
    >
      <div className="dg-card-image">
        {currentImage && (
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImage}
              src={currentImage}
              alt={design.title}
              initial={{ opacity: 0.5, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0.6 }}
              transition={{ duration: 0.3 }}
            />
          </AnimatePresence>
        )}

        <div className="dg-card-shade" />

        {images.length > 1 && (
          <>
            <button
              className="dg-image-arrow dg-image-prev"
              onClick={previous}
              aria-label="Previous image"
            >
              ‹
            </button>

            <button
              className="dg-image-arrow dg-image-next"
              onClick={next}
              aria-label="Next image"
            >
              ›
            </button>

            <div className="dg-dots">
              {images.map((image, index) => (
                <button
                  key={`${image}-${index}`}
                  className={index === imageIndex ? "active" : ""}
                  onClick={(event) => {
                    event.stopPropagation();
                    setImageIndex(index);
                  }}
                  aria-label={`Show image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}

        <div className="dg-card-content">
          <div>
            <span className="dg-card-style">{design.style}</span>

            <h3>{design.title}</h3>

            <p>{design.shortDescription}</p>
          </div>

          <button
            className="dg-quote-btn"
            onClick={(event) => {
              event.stopPropagation();
              onContactClick();
            }}
          >
            Get Quote <span>→</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function CategoryFAQ({ faqs, categoryId }) {
  const [openIndex, setOpenIndex] = useState(0);

  useEffect(() => {
    setOpenIndex(0);
  }, [categoryId]);

  if (!faqs?.length) return null;

  return (
    <section className="dg-faq-section">
      <div className="dg-section-heading">
        <span className="dg-eyebrow">HAVE QUESTIONS?</span>
        <h2>Frequently Asked Questions</h2>
        <p>Everything you need to know about our interior design solutions.</p>
      </div>

      <div className="dg-faq-list">
        {faqs.map((faq, index) => (
          <div
            className={`dg-faq-item ${openIndex === index ? "open" : ""}`}
            key={faq.id}
          >
            <button
              className="dg-faq-question"
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              aria-expanded={openIndex === index}
            >
              <span>{faq.question}</span>

              <span className="dg-faq-icon">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  className="dg-faq-answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}

// =====================================================
// MAIN PAGE
// =====================================================

export default function DesignGallery({
  onContactClick,
  onGetQuote,
  onDesignClick,
}) {
  const [projects, setProjects] = useState([]);
  const location = useLocation();
  const activeTab = location?.state?.sub?.activeTab || "all";
  const [selectedCategory, setSelectedCategory] = useState(activeTab);
  const [showAll, setShowAll] = useState(false);
  console.log("selectedCategory", selectedCategory);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ===================================================
  // SINGLE API CALL
  // ===================================================

  useEffect(() => {
    let cancelled = false;

    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getPublicDesignCategories();

        // Supports Axios response or direct fetch JSON.
        const apiCategories = Array.isArray(response)
          ? response
          : Array.isArray(response?.data)
            ? response.data
            : [];

        const formattedCategories = apiCategories
          .filter((category) => category.isActive !== false)
          .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
          .map(mapCategory);

        if (!cancelled) {
          setProjects(formattedCategories);

          // Start with All when data is loaded.
          setSelectedCategory(activeTab);
        }
      } catch (err) {
        console.error("Unable to load design gallery:", err);
        const formattedCategories = defaultCategories
          .filter((category) => category.isActive !== false)
          .sort((a, b) => (a.sortOrder || 0) - (b.sortOrder || 0))
          .map(mapCategory);

        if (!cancelled) {
          setProjects(formattedCategories);

          // Start with All when data is loaded.
          setSelectedCategory(activeTab);
        }

        // if (!cancelled) {
        //   setError("Unable to load designs. Please try again.");
        // }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  // ===================================================
  // DYNAMIC CATEGORY TABS
  // ===================================================

  const allCategory = {
    id: "all",
    name: "All",
    heading: "Explore Our Design Gallery",
    description:
      "Discover inspiring interior designs created for beautiful everyday living.",
    heroImage: projects[0]?.heroImage || "",
    designs: projects.flatMap((category) => category.designs),
    faqs: [],
  };

  const categories = useMemo(() => [allCategory, ...projects], [projects]);

  const activeCategory = useMemo(
    () =>
      categories.find((category) => category.id === selectedCategory) ||
      categories[0],
    [categories, selectedCategory],
  );

  // ===================================================
  // DYNAMIC DESIGNS
  // ===================================================

  const filteredDesigns = useMemo(() => {
    if (selectedCategory === "all") {
      return projects.flatMap((category) => category.designs);
    }

    return (
      projects.find((category) => category.id === selectedCategory)?.designs ||
      []
    );
  }, [projects, selectedCategory]);

  const visibleDesigns = showAll
    ? filteredDesigns
    : filteredDesigns.slice(0, 6);

  // ===================================================
  // CATEGORY CHANGE
  // ===================================================

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setShowAll(false);
  };

  // ===================================================
  // QUOTE / DESIGN DETAIL
  // ===================================================

  const handleGetQuote = (design) => {
    if (onGetQuote) {
      onGetQuote(design);
    } else {
      alert(`Quote requested for: ${design?.title || "Your project"}`);
    }
  };

  const handleDesignOpen = (design) => {
    if (onDesignClick) {
      onDesignClick(design);
    } else {
      handleGetQuote(design);
    }
  };

  // ===================================================
  // LOADING / ERROR
  // ===================================================

  if (loading) {
    return (
      <div className="design-gallery-page">
        <div className="dg-empty">
          <p>Loading beautiful designs...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="design-gallery-page">
        <div className="dg-empty">
          <h3>{error}</h3>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      </div>
    );
  }

  if (!projects.length) {
    return (
      <div className="design-gallery-page">
        <div className="dg-empty">
          <h3>No designs available</h3>
          <p>We are working on adding beautiful designs.</p>
        </div>
      </div>
    );
  }

  // ===================================================
  // RENDER
  // ===================================================

  return (
    <div className="design-gallery-page">
      <DesignHero category={activeCategory} />

      <CategoryTabs
        categories={categories}
        selected={selectedCategory}
        onChange={handleCategoryChange}
      />

      <section className="dg-design-section">
        <div className="dg-results-heading">
          <div>
            <span className="dg-eyebrow">OUR COLLECTION</span>

            <h2>
              {activeCategory.name === "All"
                ? "Explore Designs"
                : activeCategory.name}
            </h2>
          </div>

          <span className="dg-results-count">
            {filteredDesigns.length} Designs
          </span>
        </div>

        {visibleDesigns.length > 0 ? (
          <motion.div layout className="dg-card-grid">
            <AnimatePresence mode="popLayout">
              {visibleDesigns.map((design) => (
                <DesignCard
                  key={design.id}
                  design={design}
                  onOpen={handleDesignOpen}
                  onContactClick={onContactClick}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="dg-empty">
            <h3>More designs coming soon</h3>
            <p>We are working on adding more beautiful designs.</p>
          </div>
        )}

        {filteredDesigns.length > 6 && (
          <div className="dg-explore-wrap">
            <span />

            <button
              className="dg-explore-btn"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "Explore More Designs"}
              <span>{showAll ? "↑" : "→"}</span>
            </button>

            <span />
          </div>
        )}
      </section>

      <CategoryFAQ categoryId={selectedCategory} faqs={activeCategory.faqs} />

      <section className="dg-bottom-cta">
        <div>
          <span className="dg-eyebrow">LET'S CREATE YOUR SPACE</span>

          <h2>Have a design in mind?</h2>

          <p>
            Let's bring your dream interiors to life with a design made around
            you.
          </p>
        </div>

        <button
          className="dg-bottom-cta-btn"
          // onClick={() => handleGetQuote(null)}
          onClick={() => onContactClick()}
        >
          Discuss Your Project <span>→</span>
        </button>
      </section>
    </div>
  );
}
