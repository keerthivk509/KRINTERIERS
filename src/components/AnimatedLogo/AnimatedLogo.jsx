import React, { useState } from "react";
import "./AnimatedLogo.css";

export default function AnimatedLogo({
  src = "/LOG0.png",
  alt = "KR Interior Designs",
  replayOnClick = true,
  className = "",
}) {
  const [replay, setReplay] = useState(0);

  const restartAnimation = () => {
    if (replayOnClick) {
      setReplay((value) => value + 1);
    }
  };

  return (
    <div
      className={`kr-logo-scene ${className}`}
      onClick={restartAnimation}
      role={replayOnClick ? "button" : undefined}
      tabIndex={replayOnClick ? 0 : undefined}
      onKeyDown={(event) => {
        if (replayOnClick && (event.key === "Enter" || event.key === " ")) {
          event.preventDefault();
          restartAnimation();
        }
      }}
      aria-label={replayOnClick ? "Replay logo animation" : undefined}
    >
      <div className="kr-logo-stage" key={replay}>
        {/* Roof and hanging lamp */}
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className="kr-logo-layer kr-logo-roof"
          draggable="false"
        />

        {/* KR monogram and window */}
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className="kr-logo-layer kr-logo-symbol"
          draggable="false"
        />

        {/* Company name */}
        <img
          src={src}
          alt=""
          aria-hidden="true"
          className="kr-logo-layer kr-logo-text"
          draggable="false"
        />

        {/* Complete logo, shown at the end */}
        <img
          src={src}
          alt={alt}
          className="kr-logo-layer kr-logo-finish"
          draggable="false"
        />

        {/* Golden light sweep */}
        <div className="kr-logo-shine" aria-hidden="true" />
      </div>

      {/* <span className="kr-logo-caption">INTERIOR DESIGN • ELEVATED LIVING</span> */}
    </div>
  );
}
