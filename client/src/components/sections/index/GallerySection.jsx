"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const GallerySection = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState('next');

  const images = [
    "https://cdn.akkahotels.com/Uploads/Blog/antalyada-kalabalik-sezonda-tatil-yaparken-nelere-dikkat-edilmeli.jpg",
    "https://cdn.akkahotels.com/Uploads/Blog/istanbul-kiz-kulesi-mobil_1.png"
  ];

  const nextImage = () => {
    setDirection('next');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  // Geri Gitme
  const prevImage = () => {
    setDirection('prev');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    if (!isFullscreen) {
      const timer = setInterval(() => {
        nextImage();
      }, 3000);
      return () => clearInterval(timer);
    }


  }, [isFullscreen, currentIndex]);


  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  }

  const onTouchEnd = (e, directionCallback) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;

    // Sağa kaydırma (Geri)
    if (distance < -minSwipeDistance) {
      prevImage()
    }
    // Sola kaydırma (İleri)
    if (distance > minSwipeDistance) {
      nextImage()
    }
  };

  return (
    <section className="py-20 md:py-10 md:py-xl px-4 md:px-6 bg-slate-50 border-y border-surface-variant/30 overflow-hidden">
      <div className="max-w-[1280px] mx-auto">
        {/* Başlık Bölümü */}
        <div className="mb-10 md:mb-16 text-center">
          <h2 className="reveal font-h2 font-bold text-2xl md:text-h2 text-on-surface mb-3 md:mb-4 px-2">
            Turlarımızdan Kareler
          </h2>
          <p className="reveal font-body-md text-xs md:text-body-md text-secondary max-w-2xl mx-auto px-4">
            Misafirlerimizin objektifinden unutulmaz anlar ve Anadolu'nun eşsiz güzellikleri.
          </p>
        </div>

        <>
          {/* ANA SLIDER (Normal Görünüm) */}
          <div
            className="reveal relative perspective-carousel flex items-center justify-center h-[320px] md:h-[500px] group"
          >
            {/* Navigasyon Okları (Sadece PC'de) */}
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 hidden md:flex justify-between px-12 pointer-events-none">
              <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="w-14 h-14 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-md text-primary hover:bg-primary hover:text-white transition-all pointer-events-auto active:scale-90">
                <span className="material-symbols-outlined text-[32px]">chevron_left</span>
              </button>
              <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="w-14 h-14 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-md text-primary hover:bg-primary hover:text-white transition-all pointer-events-auto active:scale-90">
                <span className="material-symbols-outlined text-[32px]">chevron_right</span>
              </button>
            </div>

            {/* Görsel Konteynırı */}
            <div className="relative w-full flex items-center justify-center px-4 md:px-0 h-full">
              <div
                onTouchStart={onTouchStart}
                onTouchEnd={(e) => onTouchEnd(e)}
                onClick={() => setIsFullscreen(true)}
                className="aspect-video cursor-zoom-in relative w-full md:w-[800px] rounded-xl md:rounded-2xl overflow-hidden shadow-xl border-2 md:border-4 border-white bg-neutral-900"
              >
                <Image
                  key={currentIndex} // Animasyonun tetiklenmesi için KRİTİK
                  src={images[currentIndex]}
                  alt={`Slide ${currentIndex}`}
                  fill
                  className={`object-contain ${direction === 'next' ? 'animate-next' : 'animate-prev'}`}
                  sizes="(max-width: 768px) 100vw, 800px"
                  draggable={false}
                />
              </div>
            </div>
          </div>

          {/* TAM EKRAN MODAL */}
          {isFullscreen && (
            <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center select-none animate-in fade-in duration-300">

              {/* Kapat Butonu */}
              <button
                onClick={(e) => { e.stopPropagation(); setIsFullscreen(false); }}
                className="absolute top-6 right-6 z-[110] text-white hover:rotate-90 transition-transform duration-300 bg-white/10 p-2 rounded-full backdrop-blur-md"
              >
                <span className="material-symbols-outlined text-[40px]">close</span>
              </button>

              {/* Tam Ekran Oklar */}
              <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-[105] hidden md:flex justify-between px-8 pointer-events-none">
                <button onClick={(e) => { e.stopPropagation(); prevImage(); }} className="w-14 h-14 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 text-white backdrop-blur-sm border border-white/50 shadow-md transition-all pointer-events-auto active:scale-90">
                  <span className="material-symbols-outlined text-[48px]">chevron_left</span>
                </button>
                <button onClick={(e) => { e.stopPropagation(); nextImage(); }} className="w-14 h-14 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 text-white backdrop-blur-sm border border-white/50 shadow-md transition-all pointer-events-auto active:scale-90">
                  <span className="material-symbols-outlined text-[48px]">chevron_right</span>
                </button>
              </div>

              {/* Tam Ekran Görsel Alanı */}
              <div
                className="relative w-[95vw] h-[85vh] flex items-center justify-center"
                onTouchStart={onTouchStart}
                onTouchEnd={(e) => onTouchEnd(e)}
              >
                <Image
                  key={currentIndex} // Tam ekranda da animasyon oynaması için
                  src={images[currentIndex]}
                  alt={`Full Slide ${currentIndex}`}
                  fill
                  className={`object-contain drop-shadow-2xl ${direction === 'next' ? 'animate-next' : 'animate-prev'}`}
                  sizes="95vw"
                  draggable={false}
                />
              </div>
            </div>
          )}
        </>
      </div>
    </section>
  );
};

export default GallerySection;