import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./sections/Footer";
import Home from "./pages/Home";
import ServicePage from "./pages/ServicePage";

function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const timer = setTimeout(() => {
      const element = document.getElementById(
        decodeURIComponent(hash.slice(1)),
      );

      element?.scrollIntoView({ behavior: "smooth" });
    }, 120);

    return () => clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
