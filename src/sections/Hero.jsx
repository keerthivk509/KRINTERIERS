import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { content } from "../data/content";
import { Button, EASE, Marquee, SplitText } from "../components/Motion";

export default function Hero() {
  const { hero } = content;
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 700], [0, -140]);
  const y2 = useTransform(scrollY, [0, 700], [0, -70]);
  const y3 = useTransform(scrollY, [0, 700], [0, -200]);
  const stage = useRef(null);
  const { scrollYProgress } = useScroll({
    target: stage,
    offset: ["start end", "center center"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [56, 24]);
  const [i, setI] = useState(0);
  const n = hero.slides.length;
  const go = (d) => setI((v) => (v + d + n) % n);
  const floats = [y1, y2, y3];

  return (
    <section className="hero">
      <div className="container ">
        <motion.div
          ref={stage}
          className="stage"
          style={{ scale, borderRadius: radius }}
        >
          <AnimatePresence mode="popLayout">
            <motion.img
              key={i}
              src={hero.slides[i]}
              alt=""
              initial={{ opacity: 0, scale: 1.12 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
            />
          </AnimatePresence>
          <div>
            <strong>10,000+</strong>
            <span>Happy customers</span>
          </div>
          <div>
            <strong>★★★★★</strong>
            <span>4.9/5 stars</span>
          </div>
          <div className="arrows">
            <button aria-label="Previous" onClick={() => go(-1)}>
              ‹
            </button>
            <button aria-label="Next" onClick={() => go(1)}>
              ›
            </button>
          </div>
        </motion.div>
      </div>

      {/* <Marquee speed={2}>
        {Array.from({ length: 6 }).map((_, k) => (
          <span className="mq-item" key={k}>
            {content.marquee}
          </span>
        ))}
      </Marquee> */}
    </section>
  );
}
