import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import project from "../../assets/data/projects";
import "./Works.css";
import { getPublicProjects } from "../../api";

export default function Works() {
  const [location, setLocation] = useState("All");
  const [projects, setProjects] = useState(project);

  useEffect(() => {
    let cancelled = false;

    const fetchProjects = async () => {
      try {
        const response = await getPublicProjects();

        if (!cancelled) {
          const apiProjects = response?.data;

          setProjects(
            Array.isArray(apiProjects) && apiProjects.length > 0
              ? apiProjects
              : project,
          );
        }
      } catch (error) {
        console.error("Unable to load projects:", error);

        if (!cancelled) {
          setProjects(project);
        }
      }
    };

    fetchProjects();

    return () => {
      cancelled = true;
    };
  }, []);

  // Dynamically update locations when projects change
  const locations = useMemo(
    () => [
      "All",
      ...new Set(projects.map((item) => item.location).filter(Boolean)),
    ],
    [projects],
  );

  const filteredProjects = projects.filter(
    (item) => location === "All" || item.location === location,
  );

  // Reset location if it doesn't exist in the updated project list
  useEffect(() => {
    if (location !== "All" && !locations.includes(location)) {
      setLocation("All");
    }
  }, [locations, location]);

  return (
    <main className="works-page">
      <section className="works-hero">
        <motion.span
          className="works-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          OUR PORTFOLIO
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Spaces Designed
          <br />
          <span>To Feel Like Home.</span>
        </motion.h1>

        <p>
          Thoughtfully designed spaces, crafted around the people who live in
          them.
        </p>
      </section>

      <section className="works-container">
        <div className="works-filter">
          <div>
            <span>EXPLORE OUR WORK</span>
            <h2>Selected Projects</h2>
          </div>

          <div className="filter-buttons">
            {locations.map((item) => (
              <button
                key={item}
                className={location === item ? "active" : ""}
                onClick={() => setLocation(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className="works-grid">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="work-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: (index % 4) * 0.08,
              }}
            >
              <Link to={`/works/${project.slug}`} state={{ project }}>
                <div className="work-image">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    loading="lazy"
                  />

                  <div className="work-info-cover">
                    <div className="work-info">
                      <h3>{project.title}</h3>
                    </div>
                  </div>

                  <div className="work-info-h-top"></div>

                  <div className="work-info-h">
                    <h3>{project.title}</h3>
                    <div className="work-info-h-bottom"></div>
                  </div>

                  <span className="work-view">View Project ↗</span>
                </div>

                <div className="work-info">
                  <div>
                    <p>
                      {project.propertyType} · {project.category}
                    </p>
                  </div>

                  <span className="work-location">{project.location}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
