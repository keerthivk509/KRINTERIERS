import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./sections/Footer";
import Home from "./pages/Home";
import ServicePage from "./pages/ServicePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import BlobPage from "./pages/Blob/BlobPage";
const DEFAULT_PAGE = {
  title: "Modular Kitchen Design",
  subtitle:
    "Beautiful, functional, and modern kitchen spaces designed around your lifestyle.",

  parent: "Interior Design",

  image:
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=85",

  content: `
    <p>
      Transform your kitchen into a beautiful and functional space with
      our modern modular kitchen designs. We combine innovative storage
      solutions, premium materials, and elegant finishes to create kitchens
      that match your lifestyle.
    </p>

    <h2>Our Kitchen Design Services</h2>
    <ul>
      <li>Modern modular kitchen layouts</li>
      <li>Custom cabinets and storage solutions</li>
      <li>Premium countertops and finishes</li>
      <li>Space-saving designs for every home</li>
      <li>Complete kitchen interior solutions</li>
    </ul>
  `,

  images: [
    {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85",
      title: "Contemporary Kitchen",
      content:
        "A contemporary kitchen featuring clean lines, elegant finishes, and a practical layout for everyday living.",
    },
    {
      url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85",
      title: "Elegant Interior Finishes",
      content:
        "Carefully selected materials and refined finishes create a comfortable and sophisticated interior.",
    },
    {
      url: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1200&q=85",
      title: "Modern Living Spaces",
      content:
        "Thoughtfully designed interiors that balance functionality, comfort, and timeless style.",
    },
  ],
};
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
    }, 12);

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
          <Route path="/about" element={<AboutPage />} />
          <Route path="/blob" element={<BlobPage page={DEFAULT_PAGE} />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
}
