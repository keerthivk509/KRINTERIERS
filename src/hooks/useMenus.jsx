import { createContext, useContext, useEffect, useState } from "react";
import { fetchServices } from "../api/cms";

const Ctx = createContext({ services: [], loading: true, fallback: false });

export function MenusProvider({ children }) {
  const [state, setState] = useState({
    services: [],
    loading: true,
    fallback: false,
  });
  useEffect(() => {
    let live = true;
    fetchServices().then((r) => live && setState({ ...r, loading: false }));
    return () => {
      live = false;
    };
  }, []);
  return <Ctx.Provider value={state}>{children}</Ctx.Provider>;
}

export const useMenus = () => useContext(Ctx);
