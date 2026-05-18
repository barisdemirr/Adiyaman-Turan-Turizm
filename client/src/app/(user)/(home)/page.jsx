
import ReservationSection from "@/components/sections/index/ReservationSection";
import HeroSection from "@/components/sections/index/HeroSection";
import ServicesSection from "@/components/sections/index/ServicesSection/ServicesSection";
import ToursSection from "@/components/sections/index/ToursSection/ToursSection";
import FavoritesSection from "@/components/sections/index/FavoritesSection/FavoritesSection";
import GallerySection from "@/components/sections/index/GallerySection";
import AboutSection from "@/components/sections/index/AboutSection/AboutSection";
import ContactSection from "@/components/sections/index/ContactSection/ContactSection";
import GetAllSections from '@/services/HomeService';


export default async function HomePage() {
  
  const sections = await GetAllSections();

  return (
    <div>
      <HeroSection HeroData={sections?.heroSection} />
      <ReservationSection />
      <ServicesSection ServicesData={sections?.servicesSection} />
      <FavoritesSection FavoritesData={sections?.favoritesSection} />
      <ToursSection ToursData={sections?.toursSection} />
      <AboutSection AboutData={sections?.aboutSection} />
      <GallerySection GalleryData={sections?.gallerySection} />
      <ContactSection ContactData={sections?.contactSection} />
    </div>
  );
}