"use client";

import React, { useState, useEffect, useRef } from 'react';
import TourCard from './components/TourCard';
import { GetAllTours } from '@/services/TourService';
import TourCardSkeleton from '@/components/ui/skeletons/TourCardSkeleton';

const ToursSection = ({ ToursData  }) => {
  const [tours, setTours] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("daily");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const prevPage = useRef(currentPage);
  const toursGridRef = useRef(null);

  const filteredTours = tours.filter(t => t.type === selectedCategory);
  const totalPages = Math.ceil(filteredTours.length / itemsPerPage);

  const indexOfLastTour = currentPage * itemsPerPage;
  const indexOfFirstTour = indexOfLastTour - itemsPerPage;
  const currentTours = filteredTours.slice(indexOfFirstTour, indexOfLastTour);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const data = await GetAllTours();
        setTours(data);
      } catch (error) {
        console.error("[ToursSection] Turlar yüklenirken hata oluştu:", error);
      }
      finally {
        setIsLoading(false);
      }
    };
    fetchTours();
  }, []);

  useEffect(() => {
    if (prevPage.current === currentPage) {
      return;
    }

    if (window.innerWidth < 768) {
      const element = document.getElementById("tours-grid");
      if (element) {
        const yOffset = -100;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }

    prevPage.current = currentPage;
  }, [currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <section
      className="md:py-xl bg-slate-50 px-4 md:px-6 border-y border-surface-variant/30 py-20 md:py-10"
      id="turlar"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Başlık ve Tablar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4 md:gap-6">
          <div className="text-center md:text-left">
            <h2 className="reveal font-bold md:font-h2 text-2xl md:text-h2 text-on-surface mb-2 md:mb-4">
              {ToursData?.title}
            </h2>
            <p className="reveal font-body-md text-sm md:text-body-md text-secondary">
              {ToursData?.description}
            </p>
          </div>

          <div className="reveal relative flex p-1 bg-surface-container-highest rounded-lg self-center md:self-end w-fit">
            {/* Günübirlik Butonu */}
            <button
              onClick={() => { setSelectedCategory("daily"); setCurrentPage(1); }}
              className="peer/daily relative cursor-pointer z-10 px-4 md:px-6 py-1.5 md:py-2 font-label-bold text-[11px] md:text-label-bold rounded transition-colors duration-300 text-on-surface"
            >
              Günübirlik
            </button>

            {/* Konaklamalı Butonu */}
            <button
              onClick={() => { setSelectedCategory("overnight"); setCurrentPage(1); }}
              className="peer/overnight cursor-pointer relative z-10 px-4 md:px-6 py-1.5 md:py-2 font-label-bold text-[11px] md:text-label-bold rounded transition-colors duration-300 text-on-surface"
            >
              Konaklamalı
            </button>

            {/* Hareket Eden Beyaz Arka Plan */}
            <div
              className={`absolute top-1 bottom-1 h-[calc(100%-8px)] w-[calc(50%-4px)] bg-surface-container-lowest rounded shadow-sm transition-all duration-300 ease-in-out z-0
            /* Mevcut State'e Göre Konum */
            ${selectedCategory === "overnight" ? "translate-x-full" : "translate-x-0"}
      
            /* Hover Durumunda State'i Geçici Olarak Ezme (CSS Magic) */
            peer-hover/daily:!translate-x-0
            peer-hover/overnight:!translate-x-full
            `}
            />
          </div>
        </div>

        {/* Cards Grid */}
        <div id="tours-grid" className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {isLoading
            ? // Eğer veri yükleniyorsa, itemsPerPage kadar (yani 3 tane) skeleton bas kanka
            Array.from({ length: itemsPerPage }).map((_, index) => (
              <TourCardSkeleton key={`skeleton-${index}`} />
            ))
            : currentTours.map((tour) => (
              <TourCard
                key={tour.slug}
                title={tour.title}
                shortDescription={tour.shortDescription}
                bannerImage={tour.bannerImgUrl}
                price={tour.price}
                slug={tour.slug}
                duration={tour.duration}
              />
            ))}
        </div>

        {/* Pagination */}
        <div>
          <nav className="reveal flex justify-center items-center gap-1.5 md:gap-2 mt-8 md:mt-12 pb-4">
            {/* Geri Butonu */}
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-surface-variant text-secondary hover:bg-surface-container-low transition-colors active:scale-90 disabled:opacity-50 disabled:pointer-events-none"
            >
              <span className="material-symbols-outlined text-[18px] md:text-[20px]">chevron_left</span>
            </button>

            {/* Sayfa Numaraları */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full transition-all ${page === currentPage
                  ? "bg-primary text-on-primary shadow-sm"
                  : "border border-surface-variant text-secondary hover:bg-surface-container-low"
                  } font-label-bold text-xs md:text-sm active:scale-90`}
              >
                {page}
              </button>
            ))}

            {/* İleri Butonu */}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || isLoading}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-surface-variant text-secondary hover:bg-surface-container-low transition-colors active:scale-90 disabled:opacity-50 disabled:pointer-events-none"
            >
              <span className="material-symbols-outlined text-[18px] md:text-[20px]">chevron_right</span>
            </button>
          </nav>
        </div>

      </div >
    </section >
  );
};

export default ToursSection;