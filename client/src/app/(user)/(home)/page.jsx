import ReservationSection from "@/components/sections/index/ReservationSection";
import HeroSection from "@/components/sections/index/HeroSection";
import ServicesSection from "@/components/sections/index/ServicesSection/ServicesSection";
import ToursSection from "@/components/sections/index/ToursSection";
import FavoritesSection from "@/components/sections/index/FavoritesSection/FavoritesSection";
import GallerySection from "@/components/sections/index/GallerySection";
import WhyChooseUsSection from "@/components/sections/index/AboutSection";
import ContactSection from "@/components/sections/index/ContactSection";

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <ReservationSection />
      <ServicesSection />
      <FavoritesSection />
      <ToursSection />
      <WhyChooseUsSection />
      <GallerySection />
      <ContactSection />
    </div>
  );
}