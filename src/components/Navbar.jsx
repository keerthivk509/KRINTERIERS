import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useServices } from "../hooks/useServices";
import { EASE } from "./Motion";
import logo from "../../public/images/logo.svg";
export default function Navbar() {
  const { services } = useServices();
  const { pathname, hash } = useLocation();
  const [mega, setMega] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolid(y > 24);
    setHidden(y > prev && y > 220 && !mega && !mobile);
  });
  useEffect(() => {
    setMega(false);
    setMobile(false);
  }, [pathname, hash]);
  useEffect(() => {
    document.body.style.overflow = mobile ? "hidden" : "";
  }, [mobile]);

  return (
    <motion.header
      className={"nav" + (solid ? "" : "")}
      // animate={{ y: hidden ? "-110%" : 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      onMouseLeave={() => setMega(false)}
    >
      <div className="nav-bar W-75 container">
        {/* LOGO SECTION */}
        <Link
          to="/"
          className="logo"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            textDecoration: "none",
            zIndex: 50, // Ensures it stays clickable above mega menus
          }}
        >
          <img
            src={logo}
            alt="KR Interior Logo"
            height={40}
            style={{ display: "block" }} // Removes tiny bottom gap under images
          />
          <span
            style={{
              fontSize: "22px",
              fontWeight: "700",
              color: "#3E1514", // Matches the dark brown of the roof/K
              letterSpacing: "1px",
              fontFamily: "sans-serif", // Replace with your specific font
              whiteSpace: "nowrap",
            }}
          >
            KR INTERIOR
          </span>
        </Link>
        {/* END LOGO SECTION */}

        <nav className="nav-links" aria-label="Main">
          <NavLink to="/" end className="nl">
            Designs
          </NavLink>
          <button
            className={"nl nl-btn open" + (mega ? " open" : "")}
            aria-expanded={mega}
            onMouseEnter={() => setMega(true)}
            onFocus={() => setMega(true)}
            onClick={() => setMega((v) => !v)}
          >
            Services <span className="caret" />
          </button>
          <Link className="nl">Work</Link>
          <Link to={"/about"} className="nl">
            About Us
          </Link>
          <Link to={"/blob"} className="nl">
            Blog
          </Link>
        </nav>

        <Link className="btn btn-dark nav-cta" to="/#contact">
          <span className="" data-text="Get it now">
            Get it now
          </span>
        </Link>
        <button
          className={"burger" + (mobile ? " on" : "")}
          aria-label="Menu"
          onClick={() => setMobile((v) => !v)}
        >
          <i />
          <i />
        </button>
      </div>

      <AnimatePresence>
        {mega && (
          <motion.div
            className="mega W-75"
            initial={{ opacity: 0, y: -12, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, y: -8, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="container mega-grid">
              {services.map((s, i) => (
                <motion.div
                  className="mega-col"
                  key={s.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.05, ease: EASE }}
                >
                  <Link
                    // to={`/services/${s.slug}`}
                    className="mega-title"
                  >
                    {s.title}
                  </Link>
                  {s.subunits.map((u) => (
                    <Link
                      key={u.id}
                      // to={`/services/${s.slug}#${u.slug}`}
                      className="mega-sub"
                    >
                      {u.title}
                    </Link>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobile && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <Link to="/"> Designs</Link>
            {services.map((s) => (
              <div key={s.id} className="m-group">
                <Link
                  //  to={`/services/${s.slug}`}
                  className="m-service"
                >
                  {s.title}
                </Link>
                {s.subunits.map((u) => (
                  <Link
                    key={u.id}
                    // to={`/services/${s.slug}#${u.slug}`}
                    className="m-sub"
                  >
                    {u.title}
                  </Link>
                ))}
              </div>
            ))}
            <Link className="nl">Work</Link>
            <Link to={"/about"} className="nl">
              About Us
            </Link>
            <Link to={"/blob"} className="nl">
              Blog
            </Link>
            <Link to="/#contact">Get it now</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
