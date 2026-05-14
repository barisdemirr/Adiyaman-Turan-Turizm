"use client";

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import ReservationSection from "@/components/sections/index/ReservationSection";
import HeroSection from "@/components/sections/index/HeroSection";
import ServicesSection from "@/components/sections/index/ServicesSection/ServicesSection";
import ToursSection from "@/components/sections/index/ToursSection/ToursSection";
import FavoritesSection from "@/components/sections/index/FavoritesSection/FavoritesSection";
import GallerySection from "@/components/sections/index/GallerySection";
import AboutSection from "@/components/sections/index/AboutSection/AboutSection";
import ContactSection from "@/components/sections/index/ContactSection/ContactSection";

export default function HomePage() {
  const searchParams = useSearchParams();
  const quickReservation = searchParams.get('quickReservation');

  useEffect(() => {
    if (quickReservation) {
      window.scrollTo({
        top: 550,
        behavior: 'smooth'
      });
    }
  }, [quickReservation]);

  return (
    <div>
      <HeroSection />
      <ReservationSection />
      <ServicesSection />
      <FavoritesSection />
      <ToursSection />
      <AboutSection />
      <GallerySection />
      <ContactSection />
    </div>
  );
}