import { content } from "../data/content";
import { CountUp, Reveal, SplitText } from "../components/Motion";

export default function Stats() {
  const { about, stats } = content;
  return (
    <section className="section">
      <div className="container">
        <div className="split-head">
          <SplitText text={about.title} className="h2" />
          <Reveal>
            <p className="lead">{about.text}</p>
          </Reveal>
        </div>
        <div className="stats">
          {stats.map(([label, v, suf], k) => (
            <Reveal key={label} delay={k * 0.07} className="stat">
              <strong>
                <CountUp to={v} suffix={suf} />
              </strong>
              <span>{label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
