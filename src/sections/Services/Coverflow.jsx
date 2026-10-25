import { useEffect, useState } from "react";
import "./Coverflow.css";

export default function Coverflow({ items = [], autoplay = 3600 }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = items.length;
  const next = () => setActive((i) => (i + 1) % total);
  const prev = () => setActive((i) => (i - 1 + total) % total);
  useEffect(() => {
    if (!total || paused) return;
    const id = setInterval(next, autoplay);
    return () => clearInterval(id);
  }, [total, paused, autoplay]);
  const getOffset = (i) => {
    let o = i - active;
    if (o < -Math.floor(total / 2)) o += total;
    if (o > Math.floor(total / 2)) o -= total;
    return o;
  };
  return (
    <div
      className="coverflow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="coverflow__stage">
        {items.map((item, i) => {
          const o = getOffset(i),
            isActive = o === 0,
            abs = Math.abs(o);
          return (
            <div
              key={i}
              className={`coverflow__card ${isActive ? "is-active" : ""}`}
              onClick={() => setActive(i)}
              style={{
                transform: `translateX(${o * 42}%) translateZ(${-abs * 180}px) rotateY(${o * -28}deg) scale(${1 - abs * 0.08})`,
                opacity: abs > 3 ? 0 : 1 - abs * 0.15,
                zIndex: 10 - abs,
                filter: isActive ? "none" : `brightness(${1 - abs * 0.12})`,
                pointerEvents: abs > 3 ? "none" : "auto",
              }}
            >
              <div className="coverflow__media">
                <img src={item.image} alt={item.title || ""} />
                <div className="coverflow__overlay" />
                {isActive && (
                  <div className="coverflow__info">
                    {item.subtitle && (
                      <span className="coverflow__sub">{item.subtitle}</span>
                    )}
                    {item.title && (
                      <h3 className="coverflow__title">{item.title}</h3>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <button className="coverflow__nav coverflow__nav--prev" onClick={prev}>
        <i className="bi bi-arrow-left" />
      </button>
      <button className="coverflow__nav coverflow__nav--next" onClick={next}>
        <i className="bi bi-arrow-right" />
      </button>
      <div className="coverflow__dots">
        {items.map((_, i) => (
          <button
            key={i}
            className={`coverflow__dot ${i === active ? "is-active" : ""}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
      {/* <style>{`
.coverflow{position:relative;width:100%;padding:2rem 0 4rem;perspective:1600px;overflow:hidden}
.coverflow__stage{position:relative;width:100%;height:clamp(320px,48vw,560px);transform-style:preserve-3d;display:flex;align-items:center;justify-content:center}
.coverflow__card{position:absolute;width:clamp(260px,36vw,480px);height:100%;border-radius:var(--radius-lg);overflow:hidden;transition:transform .7s var(--ease),opacity .7s var(--ease),filter .7s var(--ease);cursor:pointer;box-shadow:var(--shadow)}
.coverflow__card.is-active{box-shadow:var(--shadow-lg)}
.coverflow__media{position:relative;width:100%;height:100%}
.coverflow__media img{width:100%;height:100%;object-fit:cover}
.coverflow__overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(0,0,0,.72),transparent 60%);opacity:0;transition:opacity .6s var(--ease)}
.coverflow__card.is-active .coverflow__overlay{opacity:1}
.coverflow__info{position:absolute;left:0;right:0;bottom:0;padding:2rem;color:#fff;transform:translateY(20px);opacity:0;animation:cfInfoIn .7s var(--ease) .2s forwards}
.coverflow__sub{font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--clay-light);display:block;margin-bottom:.5rem}
.coverflow__title{font-size:clamp(1.3rem,2.4vw,2rem);color:#fff}
.coverflow__nav{position:absolute;top:50%;transform:translateY(-50%);width:52px;height:52px;border-radius:50%;background:var(--paper);color:var(--ink);display:grid;place-items:center;box-shadow:var(--shadow);transition:all .3s var(--ease);z-index:20}
.coverflow__nav:hover{background:var(--clay);color:#fff}
.coverflow__nav--prev{left:max(1rem,3vw)}.coverflow__nav--next{right:max(1rem,3vw)}
.coverflow__dots{display:flex;justify-content:center;gap:.5rem;margin-top:1.5rem}
.coverflow__dot{width:8px;height:8px;border-radius:50%;background:var(--line);transition:all .3s var(--ease)}
.coverflow__dot.is-active{width:28px;border-radius:4px;background:var(--clay)}
      `}</style> */}
    </div>
  );
}
