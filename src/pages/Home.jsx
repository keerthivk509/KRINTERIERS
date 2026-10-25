import Hero from "../sections/Hero";
import Stats from "../sections/Stats";
import ServiceShowcase from "../sections/ServiceShowcase";
import Categories from "../sections/Categories";
import { Team, Reviews, FAQ } from "../sections/Extras";
import Contact from "../sections/Contact";
import MarqueeSection from "../sections/MarqueeSection";
import HeroCarousel from "../sections/HeroCarousel/HeroCarousel";
import WhyChooseUs from "../sections/WhyChooseUs/WhyChooseUs";
import OutletTimeline from "../sections/Outlettimeline/OutletTimeline";
import OurProcess from "../sections/Process/OurProcess";
import Services from "../sections/Services/Services";
// import HorizontalGallery from "../sections/Services/HorizontalGallery";
import Coverflow from "../sections/Services/Coverflow";
import "bootstrap-icons/font/bootstrap-icons.css";
import HorizontalGallery from "../sections/Services/HorizontalGallery";
import RecentProjects from "../sections/RecentProjects/RecentProjects";
import FurnitureShowcase from "../sections/FurnitureShowcase/FurnitureShowcase";
const gallery = [
  {
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
    title: "Nordic Living",
    subtitle: "Living Room",
  },
  {
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800",
    title: "Warm Minimal",
    subtitle: "Bedroom",
  },
  {
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800",
    title: "Clay Studio",
    subtitle: "Workspace",
  },
  {
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800",
    title: "Soft Light",
    subtitle: "Living Room",
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
    title: "Quiet Corner",
    subtitle: "Reading Nook",
  },
];

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <WhyChooseUs />
      <OutletTimeline />
      <OurProcess />
      {/* <Coverflow items={gallery} /> */}
      {/* <Coverflow items={gallery} autoplay={3600} /> */}
      {/* <Services /> */}
      {/* <Hero /> */}
      {/* <MarqueeSection />| */}
      {/* <Stats /> */}
      {/* <ServiceShowcase /> */}
      {/* <Categories /> */}
      <HorizontalGallery />
      <FurnitureShowcase />
      {/* <RecentProjects /> */}
      {/* <Team /> */}
      {/* <Reviews /> */}
      <FAQ />
      {/* <Contact /> */}
    </>
  );
}
