import { motion, useReducedMotion } from "framer-motion";
import "./ProgressLine.css";

export default function ProgressLine() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="progress-line">
      <motion.div
        className="progress-line-fill"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: false, amount: 0.8 }}
        transition={{
          duration: reduceMotion ? 0 : 1.5,
          ease: "easeInOut",
        }}
      />

      <span className="progress-dot progress-dot-start" />
      <span className="progress-dot progress-dot-end" />
    </div>
  );
}
