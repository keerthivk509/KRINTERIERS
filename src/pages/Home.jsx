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
import HorizontalGallery from "../sections/Services/HorizontalGallery";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <WhyChooseUs />
      <OutletTimeline />
      <OurProcess />
      {/* <Services /> */}
      {/* <Hero /> */}
      {/* <MarqueeSection />| */}
      {/* <Stats /> */}
      {/* <ServiceShowcase /> */}
      {/* <Categories /> */}
      <HorizontalGallery />
      <Team />
      <Reviews />
      <FAQ />
      <Contact />
    </>
  );
}
