import React, { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import projects from "../../assets/data/projects";
import "./ProjectDetails.css";

export default function ProjectDetails() {
  const location = useLocation();
  const { slug } = useParams();
  console.log(slug, location.state?.project);
  const [selectedImage, setSelectedImage] = useState(null);

  const project =
    location.state?.project || projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <div className="project-loading">
        <h2>Project Not Found</h2>
        <Link to="/works">Back to Our Works ↗</Link>
      </div>
    );
  }

  const sections = [...(project.sections || [])].sort((a, b) => a.id - b.id);

  const getImage = (image) => (typeof image === "string" ? image : image?.url);

  const projectInfo = [
    ["Client", project.clientName],
    ["Location", project.location],
    ["Duration", project.duration],
    ["Theme", project.theme],
    ["Type", project.propertyType],
    ["Size", project.size],
  ].filter((item) => item[1]);

  const openImage = (image) => {
    if (image) setSelectedImage(image);
  };

  return (
    <main className="project-details">
      {/* PROJECT INTRODUCTION */}

      <section className="project-intro">
        <div className="project-intro-title">
          <span>OUR PROJECTS / RESIDENTIAL INTERIORS</span>
          <h1>{project.title}</h1>
        </div>

        <div className="project-intro-grid">
          <div className="project-intro-description">
            <p>{project.shortDescription}</p>
            <p>{project.description}</p>
          </div>

          <button
            className="project-cover"
            onClick={() => openImage(project.coverImage)}
          >
            <img src={project.coverImage} alt={project.title} />
          </button>
        </div>

        {/* PROJECT INFORMATION */}

        <div className="project-info-grid">
          {projectInfo.map(([label, value]) => (
            <div className="project-info-item" key={label}>
              <span>{label}</span>
              <h4>{value}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* SCOPE OF WORK */}

      {project.scopeOfWork?.length > 0 && (
        <section className="project-scope">
          <div className="scope-heading">
            <h2>Scope of Work</h2>
            <p>Full Interior Design Services</p>
          </div>

          <div className="scope-grid">
            {project.scopeOfWork.map((item, index) => {
              const title = typeof item === "string" ? item : item.title;

              const description =
                typeof item === "string" ? "" : item.description;

              return (
                <div className="scope-item" key={item.id || index}>
                  <span>{String(index + 1).padStart(2, "0")}</span>

                  <h3>{title}</h3>

                  {description && <p>{description}</p>}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* DESIGN SECTIONS */}

      <div className="project-sections">
        {sections.map((section, index) => {
          const images = (section.images || []).map(getImage).filter(Boolean);

          const reverse = index % 2 !== 0;

          return (
            <section
              className={`project-section ${
                reverse ? "image-left" : "image-right"
              }`}
              key={section.id}
            >
              <div className="section-content">
                <span className="section-number">
                  {String(index + 1).padStart(2, "0")} / DESIGN DETAILS
                </span>

                <h2>{section.title}</h2>

                <p>{section.description}</p>

                {section.highlights?.length > 0 && (
                  <div className="section-highlights">
                    <div className="highlight-card">
                      <h4>Space Highlights</h4>

                      <p>{section.highlights[0]}</p>
                    </div>

                    {section.highlights[1] && (
                      <div className="highlight-card">
                        <h4>Design Summary</h4>

                        <p>{section.highlights[1]}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* SECTION IMAGES */}

              {images.length > 0 && (
                <div className="section-visual">
                  <button
                    className="section-main-image"
                    onClick={() => openImage(images[0])}
                  >
                    <img src={images[0]} alt={section.title} loading="lazy" />
                  </button>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* LIGHTBOX */}

      {/* {selectedImage && (
        <div
          className="project-lightbox"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="lightbox-close"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>

          <img
            src={selectedImage}
            alt="Project preview"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )} */}
    </main>
  );
}
