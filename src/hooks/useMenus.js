import { useEffect, useState } from "react";
import { getMenus } from "../api.js";

export default function useMenus() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    const ctrl = new AbortController();

    getMenus(ctrl.signal)
      .then((data) => {
        if (ctrl.signal.aborted) return;

        const list = Array.isArray(data)
          ? data
          : Array.isArray(data?.menus)
            ? data.menus
            : Array.isArray(data?.data)
              ? data.data
              : [];

        setMenus(list);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.warn("Menus not loaded:", err.message);
        }
      });

    return () => ctrl.abort();
  }, []);

  return menus;
}
