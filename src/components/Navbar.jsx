import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { navigation } from "../data/siteData.js";
import useMenus from "../hooks/useMenus.js";
import logo from "../assets/LOGO.png";
import "./Navbar.css";
import AnimatedLogo from "./AnimatedLogo/AnimatedLogo.jsx";
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [isDesktop, setIsDesktop] = useState(() => window.innerWidth >= 992);
  const menus = useMenus();

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 992);
      setOpenSubmenu(null);

      if (window.innerWidth >= 992) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const close = () => {
    // setMobileOpen(false);
    // setOpenSubmenu(null);
  };

  // Combine static navigation with CMS menus.
  const items = [
    ...navigation.map((item) => {
      const dynamic = menus?.find(
        (menu) =>
          String(menu.title).toLowerCase() === String(item.label).toLowerCase(),
      );

      if (dynamic && dynamic.submenus?.length) {
        return {
          ...item,
          submenu: dynamic.submenus.map((sub) => ({
            label: sub.title,
            to: `/page/${sub.slug}`,
          })),
        };
      }

      return item;
    }),

    // Add CMS menus not already present in static navigation.
    ...menus
      ?.filter(
        (menu) =>
          !navigation.some(
            (item) =>
              String(item.label).toLowerCase() ===
              String(menu.title).toLowerCase(),
          ),
      )
      .map((menu) => ({
        label: menu.title,
        to: menu.slug ? `/page/${menu.slug}` : "#",
        ...(menu.submenus?.length
          ? {
              submenu: menu.submenus.map((sub) => ({
                label: sub.title,
                to: `/page/${sub.slug}`,
              })),
            }
          : {}),
      })),
  ];

  // Desktop: first 5 menus and remaining menus in More.
  // Mobile/tablet: display all menus normally.
  const visibleItems = isDesktop ? items.slice(0, 5) : items;
  const moreItems = isDesktop ? items.slice(5) : [];

  const toggleSubmenu = (key) => {
    setOpenSubmenu((current) => (current === key ? null : key));
  };

  const renderSubmenuLinks = (submenu = []) =>
    submenu.map((sub, index) =>
      sub.to ? (
        <Link to={sub.to} key={`${sub.label}-${index}`} onClick={close}>
          {sub.label}
        </Link>
      ) : (
        <a href={sub.href || "#"} key={`${sub.label}-${index}`} onClick={close}>
          {sub.label}
        </a>
      ),
    );

  const renderMenu = (item, index) => {
    const hasSubmenu = Boolean(item.submenu?.length);
    const key = `menu-${index}`;

    return (
      <div
        className={`nav-item ${hasSubmenu ? "has-submenu" : ""}`}
        key={`${item.label}-${index}`}
        onMouseEnter={() => {
          if (window.innerWidth >= 992 && item.submenu) {
            setOpenSubmenu(index);
          }
        }}
        onMouseLeave={() => {
          if (window.innerWidth >= 992) {
            setOpenSubmenu(null);
          }
        }}
        onClick={() => toggleSubmenu(key)}
      >
        <div className="nav-link-row">
          {item.to ? (
            <Link className="nav-link" to={item.to} onClick={close}>
              {item.label}
            </Link>
          ) : (
            <a className="nav-link" href={item.href || "#"} onClick={close}>
              {item.label}
            </a>
          )}

          {hasSubmenu && (
            <button
              type="button"
              className="submenu-toggle"
              aria-label={`Toggle ${item.label} submenu`}
              aria-expanded={openSubmenu === key}
              onClick={close}
            >
              <i className="bi bi-chevron-down" />
            </button>
          )}
        </div>

        {hasSubmenu && (
          <div
            className={`submenu ${openSubmenu === key ? "submenu-open" : ""}`}
          >
            {renderSubmenuLinks(item.submenu)}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className={`site-navbar ${mobileOpen ? "site-navbar-color" : ""}`}>
      <Link className="brand-lockup" to="/" onClick={close}>
        <AnimatedLogo
          src={logo}
          alt="KR Interior Designs"
          className="brand-logo"
          logo={logo}
        />
        {/* <img src={logo} alt="KR" className="brand-logo" /> */}
      </Link>

      <div className="container nav-inner">
        <button
          type="button"
          className="mobile-toggle"
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
          onClick={() => {
            setMobileOpen((value) => !value);
            setOpenSubmenu(null);
          }}
        >
          <i className={`bi ${mobileOpen ? "bi-x-lg" : "bi-list"}`} />
        </button>

        <div className={`nav-menu ${mobileOpen ? "nav-menu-open" : ""}`}>
          {visibleItems?.map(renderMenu)}

          {/* More menu: desktop only */}
          {moreItems.length > 0 && (
            <div
              className="nav-item has-submenu more-menu"
              onMouseEnter={() => {
                if (isDesktop && hasSubmenu) setOpenSubmenu(key);
              }}
              onMouseLeave={() => {
                if (isDesktop) setOpenSubmenu(null);
              }}
            >
              <div className="nav-link-row">
                <button
                  type="button"
                  className="nav-link more-button"
                  aria-expanded={openSubmenu === "more"}
                  onClick={() => toggleSubmenu("more")}
                >
                  More...
                  <i className="bi bi-chevron-down" />
                </button>
              </div>

              <div
                className={`submenu more-dropdown ${
                  openSubmenu === "more" ? "submenu-open" : "submenu-open"
                }`}
              >
                {moreItems.map((item, index) => {
                  const hasSubmenu = Boolean(item.submenu?.length);
                  const key = `more-item-${index}`;

                  return (
                    <div
                      className={`more-dropdown-group ${
                        hasSubmenu ? "has-side-submenu" : ""
                      }`}
                      key={`${item.label}-${index}`}
                    >
                      <div className="more-item-row">
                        {item.to ? (
                          <Link
                            className="more-main-link"
                            to={item.to}
                            onClick={close}
                          >
                            {item.label}
                          </Link>
                        ) : (
                          <a
                            className="more-main-link"
                            href={item.href || "#"}
                            onClick={close}
                          >
                            {item.label}
                          </a>
                        )}

                        {hasSubmenu && (
                          <i className="bi bi-chevron-right more-side-arrow" />
                        )}
                      </div>

                      {hasSubmenu && (
                        <div className="more-submenu">
                          {renderSubmenuLinks(item.submenu)}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <a className="btn btn-gold nav-quote" href="#contact" onClick={close}>
            Get it now
          </a>
        </div>
      </div>
    </nav>
  );
}
