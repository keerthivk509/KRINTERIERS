import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useServices } from "../hooks/useServices";
import { content } from "../data/content";
import { EASE, SplitText, pad } from "../components/Motion";

// Numbered services list: hover/focus a row to expand it and wipe in its image. Fed by KR InteriorCMS.
export default function ServiceShowcase() {
  const { services } = useServices();
  const [a, setA] = useState(0);
  if (!services.length) return null;
  const cur = services[Math.min(a, services.length - 1)];

  return (
    <section className="section" id="services">
      <div className="container">
        <SplitText text={content.showcase.title} className="h2" />
        <div className="showcase">
          <ul className="svc-list">
            {services.map((s, i) => (
              <li
                key={s.id}
                className={i === a ? "on" : ""}
                onMouseEnter={() => setA(i)}
                onFocus={() => setA(i)}
                onTouchStart={() => setA(i)}
              >
                <Link to={`/services/${s.slug}`} className="svc-row">
                  <span className="num">{pad(i + 1)}</span>
                  <h3>{s.title}</h3>
                </Link>
                <AnimatePresence initial={false}>
                  {i === a && (
                    <motion.div
                      className="svc-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.55, ease: EASE }}
                    >
                      <div className="svc-inner">
                        <p className="tag">{s.tagline}</p>
                        <p>{s.description}</p>
                        {s.subunits.length > 0 && (
                          <div className="chips">
                            {s.subunits.map((u) => (
                              <Link
                                key={u.id}
                                to={`/services/${s.slug}#${u.slug}`}
                              >
                                {u.title}
                              </Link>
                            ))}
                          </div>
                        )}
                        <Link className="link" to={`/services/${s.slug}`}>
                          Read about it
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
          <div className="svc-media">
            <AnimatePresence mode="popLayout">
              <motion.img
                key={cur.id}
                src={cur.image}
                alt={cur.title}
                initial={{ clipPath: "inset(100% 0 0 0)", scale: 1.2 }}
                animate={{ clipPath: "inset(0% 0 0 0)", scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.85, ease: EASE }}
              />
            </AnimatePresence>
            <span className="count">
              {pad(a + 1)} / {pad(services.length)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
