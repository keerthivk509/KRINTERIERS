import { content } from "../data/content";
import { Marquee } from "../components/Motion";

export default function MarqueeSection() {
  console.log(content?.marquee);
  return (
    <div style={{ margin: "3px 0" }}>
      <Marquee speed={100}>
        {Array.from({ length: 4 }).flatMap((_, k) =>
          (content?.marquee ?? []).map((w, i) => (
            <span className="mq-item" key={`${k}-${i}`}>
              {w.title}
              {/* <i className="bi bi-asterisk" aria-hidden="true" /> */}
            </span>
          )),
        )}
      </Marquee>
    </div>
  );
}
