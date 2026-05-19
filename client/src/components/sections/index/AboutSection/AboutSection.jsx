"use client";

import React, { useState, useEffect } from 'react';
import AboutCard from './components/AboutCard';
import GetAllAboutItems from '@/services/AboutItemService';
import AboutCardSkeleton from '@/components/ui/skeletons/AboutCardSkeleton';

const AboutSection = ({ AboutData }) => {
  const [aboutItems, setAboutItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAboutItems = async () => {
      try {
        const data = await GetAllAboutItems();
        setAboutItems(data);
      } catch (error) {
        console.error("Hakkımızda öğeleri yüklenirken hata oluştu:", error);
      }
      finally {
        setIsLoading(false);
      }
    };
    fetchAboutItems();
  }, []);

  useEffect(() => {
    if (isLoading || !aboutItems || aboutItems.length === 0) return;

    let observer;

    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      const elements = document.querySelectorAll(".about-grid .reveal");
      elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [isLoading, aboutItems]);


  return (
    <section className="py-10 md:py-xl px-4 md:px-6 bg-secondary text-on-secondary" id='hakkimizda'>
      <div className="max-w-[1280px] mx-auto">
        {/* Başlık Bölümü */}
        <div className="mb-10 md:mb-16 text-center">
          <h2 className="reveal font-h2 font-bold text-2xl md:text-h2 text-white mb-3 md:mb-4">
            {AboutData?.title || "Adıyaman Turizm Hakkında"}
          </h2>
          <p className="reveal font-body-md text-sm md:text-body-md text-secondary-fixed max-w-2xl mx-auto px-4 opacity-90">
            {AboutData?.description}
          </p>
        </div>

        {/* Kartlar Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 about-grid">
          {isLoading
            ? 
            Array.from({ length: 4 }).map((_, index) => (
              <AboutCardSkeleton key={`skeleton-${index}`} />
            ))
            : aboutItems.map((card, index) => (
            <AboutCard
              key={index}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;