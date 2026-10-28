import { useEffect, useState } from "react";
import { getCarousels } from "../api.js";

export default function useSlide() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const ctrl = new AbortController();

    getCarousels(ctrl.signal)
      .then((data) => {
        if (!ctrl.signal.aborted) {
          setSlides(Array.isArray(data) ? data : []);
        }
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.warn("Carousels not loaded:", err.message);
          setError(err.message);
        }
      })
      .finally(() => {
        if (!ctrl.signal.aborted) setLoading(false);
      });

    return () => ctrl.abort();
  }, []);

  return { slides, loading, error };
}
