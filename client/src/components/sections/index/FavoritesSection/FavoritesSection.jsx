"use client"

import React, { useState } from 'react';
import FavoriteTourCard from './components/FavoriteTourCard';
import Link from 'next/link';

const FavoritesSection = () => {
  const [favorites, setFavorites] = useState([
    { id: 1, image: "https://cdn.akkahotels.com/Uploads/Blog/istanbul-kiz-kulesi-mobil_1.png", title: "Cappadocia Sürüşü", slug: "cappadocia-surusü" },
    { id: 2, image: "https://cdn.akkahotels.com/Uploads/Blog/antalyada-kalabalik-sezonda-tatil-yaparken-nelere-dikkat-edilmeli.jpg", title: "Antalya Tatil Pack", slug: "antalya-tatil-pack" }
  ]);

  return (
    <section className="py-10 md:py-xl px-4 md:px-6 bg-secondary text-on-secondary">
      <div className="max-w-[1280px] mx-auto">
        {/* Header Section */}
        <div className="mb-8 md:mb-12 text-center md:text-left">
          <h2 className="reveal font-h2 text-2xl md:text-h2 text-white mb-2 md:mb-4">Favori Turlarınız</h2>
          <p className="reveal font-body-md text-xs md:text-body-md text-secondary-fixed opacity-90">
            Hızlı erişim için beğendiğiniz turları buraya ekleyebilirsiniz.
          </p>
        </div>

        {(!favorites || favorites.length === 0) ? (
          /* Empty State Box */
          <div className="reveal border-2 border-dashed border-white/20 rounded-2xl p-6 md:p-12 text-center bg-white/5 backdrop-blur-md">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-full bg-white/10 text-primary-fixed mb-4 md:mb-6">
              <span className="material-symbols-outlined text-[24px] md:text-[32px]">favorite</span>
            </div>

            <p className="font-h4 text-sm md:text-h4 text-secondary-fixed mb-6 md:mb-8">
              Henüz favori tur eklemediniz
            </p>

            <Link
              href="#tours"
              className="inline-flex items-center justify-center bg-primary text-on-primary font-label-bold text-xs md:text-label-bold px-6 md:px-8 py-2.5 md:py-3 rounded-full hover:bg-tertiary transition-all shadow-md active:scale-95"
            >
              Turları Keşfet
            </Link>
          </div>
        ) : (
          /* Favori Turlar Grid Yapısı */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 place-items-center">
            {favorites.map((tour) => (
              <FavoriteTourCard
                key={tour.id}
                img={tour.image}
                title={tour.title}
                slug={tour.slug} 
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FavoritesSection;