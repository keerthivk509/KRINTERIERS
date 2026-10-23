import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useServices } from "../hooks/useServices";
import { content } from "../data/content";
import { EASE, Reveal, SplitText } from "../components/Motion";

// Image tiles from the CMS sub-units (falls back to services when there are none).
export default function Categories() {
  const { services } = useServices();
  const tiles = services.flatMap((s) =>
    s.subunits.map((u) => ({ ...u, to: `/services/${s.slug}#${u.slug}` })),
  );
  const list = (
    tiles.length
      ? tiles
      : services.map((s) => ({ ...s, to: `/services/${s.slug}` }))
  ).slice(0, 4);
  return (
    <section className="section" id="category">
      <div className="container">
        <div className="split-head">
          <SplitText text={content.categories.title} className="h2" />
          <Reveal>
            <p className="lead">{content.categories.text}</p>
          </Reveal>
        </div>
        <div className="tiles">
          {list.map((t, k) => (
            <motion.div
              key={t.id}
              className="tile-wrap"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: (k % 2) * 0.1 }}
            >
              <Link to={t.to} className="tile">
                <img src={t.image} alt={t.title} loading="lazy" />
                <div className="tile-cap">
                  <b>{t.title}</b>
                  <span>{t.description}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
