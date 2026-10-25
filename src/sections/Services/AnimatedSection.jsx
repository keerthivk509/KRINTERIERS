import { useEffect, useRef, useState } from "react";
export default function AnimatedSection({
  variant = "up",
  delay = 0,
  className = "",
  as: Tag = "div",
  children,
  ...rest
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          io.unobserve(e.target);
        }
      },
      { threshold: 0.14 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const v =
    variant === "stagger"
      ? "reveal-stagger"
      : variant === "left"
        ? "reveal reveal--left"
        : variant === "right"
          ? "reveal reveal--right"
          : "reveal";
  return (
    <Tag
      ref={ref}
      className={`${v} ${visible ? "is-visible" : ""} ${className}`}
      style={delay ? { transitionDelay: delay + "ms" } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  );
}
