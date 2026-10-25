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
      <Reviews />
      <FAQ />
      {/* <Contact /> */}
    </>
  );
}
