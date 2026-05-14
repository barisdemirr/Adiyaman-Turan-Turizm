"use client";

import React, { useState, useEffect, useRef } from 'react';
import TourCard from './components/TourCard';

const ToursSection = () => {
  const [tours, setTours] = useState([
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeDn6IBA-nfSUZZuKt5WkXB9ISrRiflx2Q4JyrViGrSj1mKhDz3cI0mIK2PgVfJVsJsSv6vlbx9mF-jo2QEgAqcfA3nidUQkBwCT6V-gdnv-XEW5fknNkg-e8sW1SM51JM1ho5TQ84FITBLAC8q13Zi4znSOh0TNLRAjmEBtmIar5F1CjDGKydDgYdkH6WDf31P0IorZ99V_uTM9eo3ns5LLxF-zUGw0TIxR2t7nlD5a4Vur14c4YVk414vzPzfoIUJYPdje_-Da88",
      title: "Mardin Discovery",
      description: "Explore narrow stone streets, ancient monasteries, and Mesopotamian plains.",
      price: "1,200",
      slug: "mardin-discovery",
      category: "daily"
    },
    {
      img: "https://cdn.akkahotels.com/Uploads/Blog/istanbul-kiz-kulesi-mobil_1.png",
      title: "Cappadocia Sürüşü",
      description: "Kapadokya'nın büyülü vadilerini keşfedin, peri bacalarını görün ve sıcak hava balonlarıyla gökyüzünde süzülün.",
      price: "1,500",
      slug: "cappadocia-surusu",
      category: "overnight"
    },
    {
      img: "https://cdn.akkahotels.com/Uploads/Blog/antalyada-kalabalik-sezonda-tatil-yaparken-nelere-dikkat-edilmeli.jpg",
      title: "Antalya Tatil",
      description: "Antalya'nın en güzel plajlarını ve tarihi yerlerini keşfedin.",
      price: "1,8400",
      slug: "antalya-tatil",
      category: "overnight"
    },
    {
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBeDn6IBA-nfSUZZuKt5WkXB9ISrRiflx2Q4JyrViGrSj1mKhDz3cI0mIK2PgVfJVsJsSv6vlbx9mF-jo2QEgAqcfA3nidUQkBwCT6V-gdnv-XEW5fknNkg-e8sW1SM51JM1ho5TQ84FITBLAC8q13Zi4znSOh0TNLRAjmEBtmIar5F1CjDGKydDgYdkH6WDf31P0IorZ99V_uTM9eo3ns5LLxF-zUGw0TIxR2t7nlD5a4Vur14c4YVk414vzPzfoIUJYPdje_-Da88",
      title: "Mardin Discovery",
      description: "Explore narrow stone streets, ancient monasteries, and Mesopotamian plains.",
      price: "1,200",
      slug: "mardin-discoveryd",
      category: "daily"
    },
    {
      img: "https://cdn.akkahotels.com/Uploads/Blog/istanbul-kiz-kulesi-mobil_1.png",
      title: "Cappadocia Sürüşü",
      description: "Kapadokya'nın büyülü vadilerini keşfedin, peri bacalarını görün ve sıcak hava balonlarıyla gökyüzünde süzülün.",
      price: "1,5300",
      slug: "cappadocia-surusus",
      category: "daily"
    },
    {
      img: "https://cdn.akkahotels.com/Uploads/Blog/antalyada-kalabalik-sezonda-tatil-yaparken-nelere-dikkat-edilmeli.jpg",
      title: "Antalya Tatil",
      description: "Antalya'nın en güzel plajlarını ve tarihi yerlerini keşfedin.",
      price: "1,8020",
      slug: "antalya-tatila",
      category: "daily"
    },
  ]);

  const isFirstRender = useRef(true);

  // category

  const [selectedCategory, setSelectedCategory] = useState("daily");


  // pagination logic

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  // Hangi turların gösterileceğini hesaplıyoruz
  const indexOfLastTour = currentPage * itemsPerPage;
  const indexOfFirstTour = indexOfLastTour - itemsPerPage;
  const currentTours = tours.filter(t => t.category === selectedCategory).slice(indexOfFirstTour, indexOfLastTour);
  // Toplam sayfa sayısı
  const totalPages = Math.ceil(tours.filter(t => t.category === selectedCategory).length / itemsPerPage);





  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
  }

    if (window.innerWidth < 768) {
      const element = document.getElementById("tours-grid");
      if (element) {
        // Kartların 100px üstüne (başlık görünsün diye) yumuşak bir geçiş yapar
        const yOffset = -100;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  }, [currentPage]);

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
              Turlarımızı Keşfedin
            </h2>
            <p className="reveal font-body-md text-sm md:text-body-md text-secondary">
              Bölgenin en iyi yönlerini sergilemek için hazırlanmış özel programlar.
            </p>
          </div>

          <div className="reveal relative flex p-1 bg-surface-container-highest rounded-lg self-center md:self-end w-fit">
            {/* Günübirlik Butonu */}
            <button
              onClick={() => {setSelectedCategory("daily"); setCurrentPage(1);}}
              className="peer/daily relative cursor-pointer z-10 px-4 md:px-6 py-1.5 md:py-2 font-label-bold text-[11px] md:text-label-bold rounded transition-colors duration-300 text-on-surface"
            >
              Günübirlik
            </button>

            {/* Konaklamalı Butonu */}
            <button
              onClick={() => {setSelectedCategory("overnight"); setCurrentPage(1);}}
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
          {currentTours.map((tour) => (
            <TourCard
              key={tour.slug}
              img={tour.img}
              title={tour.title}
              description={tour.description}
              price={tour.price}
              slug={tour.slug}
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
              disabled={currentPage === totalPages}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-surface-variant text-secondary hover:bg-surface-container-low transition-colors active:scale-90 disabled:opacity-50 disabled:pointer-events-none"
            >
              <span className="material-symbols-outlined text-[18px] md:text-[20px]">chevron_right</span>
            </button>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default ToursSection;