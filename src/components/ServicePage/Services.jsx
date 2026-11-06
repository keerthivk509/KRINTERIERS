import React from "react";
import { Link } from "react-router-dom";
import "./Services.css";

/*
  Static service data for now.
  Later, replace this array with API response data.
*/

const servicesData = [
  {
    id: 1,
    category: "Residential Interiors",
    title: "Beautiful Homes, Thoughtfully Designed",
    description:
      "We create comfortable, elegant and functional living spaces that reflect your personality and lifestyle. From concept to completion, every detail is carefully planned.",
    image:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=85",
    features: [
      "Living Room Design",
      "Bedroom Interiors",
      "Modular Kitchen",
      "Dining Area Design",
      "Space Planning",
      "Custom Furniture",
    ],
    link: "/services/residential-interiors",
  },
  {
    id: 2,
    category: "Commercial Interiors",
    title: "Spaces That Inspire Better Work",
    description:
      "Transform your workplace into a professional and inspiring environment. Our commercial interior solutions balance functionality, aesthetics and brand identity.",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=85",

    features: [
      "Office Interior Design",
      "Reception & Waiting Areas",
      "Retail Showrooms",
      "Workspace Planning",
      "Lighting Design",
      "Custom Workstations",
    ],
    link: "/services/commercial-interiors",
  },
  {
    id: 3,
    category: "Modular Kitchen",
    title: "A Kitchen Made Around Your Lifestyle",
    description:
      "Discover thoughtfully planned kitchens with smart storage, premium finishes and practical layouts designed to make everyday cooking a pleasure.",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85",

    features: [
      "L-Shaped Kitchens",
      "U-Shaped Kitchens",
      "Parallel Kitchens",
      "Island Kitchens",
      "Smart Storage Solutions",
      "Premium Finishes",
    ],
    link: "/services/modular-kitchen",
  },
  {
    id: 4,
    category: "Custom Furniture",
    title: "Designed Around Your Space",
    description:
      "Bring your ideas to life with custom-designed furniture and interiors. Every piece is created to complement your space, taste and everyday needs.",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=85",

    features: [
      "Wardrobe Design",
      "TV Unit Design",
      "Custom Beds",
      "Storage Cabinets",
      "False Ceiling",
      "Decorative Elements",
    ],
    link: "/services/custom-furniture",
  },
];

function ServiceItem({ service, index, onContactClick }) {
  const reverse = index % 2 === 1;

  return (
    <article className={`service-item ${reverse ? "reverse" : ""}`}>
      <div className="service-image">
        <img src={service.image} alt={service.title} loading="lazy" />
        <span className="service-image-number">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="service-content">
        <span className="service-category">{service.category}</span>

        <h2>{service.title}</h2>

        <p className="service-description">{service.description}</p>

        <ul className="service-features">
          {service.features.map((feature, featureIndex) => (
            <li key={featureIndex}>
              <span className="feature-check">✓</span>
              {feature}
            </li>
          ))}
        </ul>

        <Link
          // to={service.link}
          className="service-button"
          onClick={() => onContactClick()}
        >
          Find Out More <span>↗</span>
        </Link>
      </div>
    </article>
  );
}

export default function Services({ onContactClick }) {
  return (
    <main className="services-page">
      <section className="services-header">
        <span className="services-eyebrow">Our Services</span>

        <h1>
          Thoughtfully Designed Spaces,
          <br />
          Beautifully Lived In.
        </h1>

        <p>
          From modern homes to inspiring workspaces, we bring your vision to
          life through thoughtful design, quality craftsmanship and attention to
          every detail.
        </p>
      </section>

      <section className="services-list">
        {servicesData.map((service, index) => (
          <ServiceItem
            key={service.id}
            service={service}
            index={index}
            onContactClick={onContactClick}
          />
        ))}
      </section>

      <section className="services-contact">
        <span>Have a space in mind?</span>
        <h2>Let's Create Something Beautiful Together.</h2>
        <p>
          Tell us about your dream space. We would love to help bring your ideas
          to life.
        </p>
        <Link
          // to="/contact"
          className="service-button"
          onClick={() => onContactClick()}
        >
          Get in Touch <span>↗</span>
        </Link>
      </section>
    </main>
  );
}
