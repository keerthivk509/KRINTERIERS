import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { content } from "../data/content";
import { EASE, Marquee, Reveal, SplitText } from "../components/Motion";

export function Team() {
  const { team } = content;
  return (
    <section className="section" id="team">
      <div className="container">
        <div className="split-head">
          <SplitText text={team.title} className="h2" />
          <Reveal><p className="lead">{team.text}</p></Reveal>
        </div>
        <div className="team">
          {team.people.map(([name, role, img], k) => (
            <Reveal key={name} delay={k * 0.1}>
              <div className="person">
                <div className="person-img"><img src={img} alt={name} loading="lazy" /></div>
                <b>{name}</b><span>{role}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const Card = ({ r }) => (
  <figure className="review">
    <div className="stars">★★★★★</div>
    <blockquote>{r[2]}</blockquote>
    <figcaption><b>{r[0]}</b><span>{r[1]}</span></figcaption>
  </figure>
);

export function Reviews() {
  const { reviews } = content;
  return (
    <section className="section">
      <div className="container">
        <div className="split-head">
          <SplitText text={reviews.title} className="h2" />
          <Reveal><p className="lead">{reviews.text}</p></Reveal>
        </div>
      </div>
      <Marquee speed={45}>{reviews.items.map((r) => <Card key={r[0]} r={r} />)}</Marquee>
      <Marquee speed={55} reverse>{[...reviews.items].reverse().map((r) => <Card key={r[0]} r={r} />)}</Marquee>
    </section>
  );
}

export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section" id="faqs">
      <div className="container faq-wrap">
        <SplitText text="Frequently asked questions" className="h2" />
        <div className="faq">
          {content.faqs.map(([q, a], i) => (
            <div key={q} className={"faq-item" + (open === i ? " on" : "")}>
              <button onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span>{q}</span><i className="plus" />
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.45, ease: EASE }} style={{ overflow: "hidden" }}>
                    <p>{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
