import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
// import { useServices } from "../hooks/useMenus";
import { EASE, Reveal, SplitText, pad } from "../components/Motion";
import Contact from "../sections/Contact";
import { useServices } from "../hooks/useServices";

export default function ServicePage() {
  const { slug } = useParams();
  const { services, loading } = useServices();
  const s = services.find((x) => x.slug === slug);

  if (loading) return <div className="page-pad container">Loading…</div>;
  if (!s)
    return (
      <div className="page-pad container">
        <h1 className="h2">Service not found</h1>
        <Link className="link" to="/">
          Back to home
        </Link>
      </div>
    );

  return (
    <>
      <section className="svc-hero container">
        <Link to="/" className="link">
          Back
        </Link>
        <SplitText
          as="h1"
          className="hero-title sm"
          text={s.title}
          delay={0.1}
        />
        <p className="lead">{s.tagline}</p>
        <motion.div
          className="svc-cover"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1.1, ease: EASE }}
        >
          <img src={s.image} alt={s.title} />
        </motion.div>
        <p className="lead wide">{s.description}</p>
      </section>

      <section className="container units">
        {s.subunits.map((u, i) => (
          <article
            id={u.slug}
            key={u.id}
            className={"unit" + (i % 2 ? " flip" : "")}
          >
            <Reveal>
              <div className="unit-img">
                <img src={u.image} alt={u.title} loading="lazy" />
              </div>
            </Reveal>
            <Reveal delay={0.1} className="unit-text">
              <span className="num">{pad(i + 1)}</span>
              <h2>{u.title}</h2>
              <p>{u.description}</p>
              <Link className="link" to={`/services/${s.slug}#contact`}>
                Enquire about {u.title}
              </Link>
            </Reveal>
          </article>
        ))}
      </section>
      <Contact />
    </>
  );
}
