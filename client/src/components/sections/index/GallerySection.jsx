import React from 'react';

const GallerySection = () => {
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

        {/* Carousel Alanı */}
        <div className="reveal relative perspective-carousel flex items-center justify-center h-[320px] md:h-[500px]">
          {/* Navigasyon Okları */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 z-30 flex justify-between px-2 md:px-12 pointer-events-none">
            <button className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-md text-primary hover:bg-primary hover:text-white transition-all duration-300 pointer-events-auto active:scale-90 border border-surface-variant/10">
              <span className="material-symbols-outlined text-[24px] md:text-[32px]">chevron_left</span>
            </button>
            <button className="w-10 h-10 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-md text-primary hover:bg-primary hover:text-white transition-all duration-300 pointer-events-auto active:scale-90 border border-surface-variant/10">
              <span className="material-symbols-outlined text-[24px] md:text-[32px]">chevron_right</span>
            </button>
          </div>

          {/* Görsel Konteynırı */}
          <div className="relative w-full flex items-center justify-center px-4 md:px-0">
            <div className="aspect-video w-full md:w-[800px] rounded-xl md:rounded-2xl overflow-hidden shadow-xl border-2 md:border-4 border-white">
              <img
                alt="Tour Photo"
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBBSQtCxwsrS8eU-zOrDJGgUECktw0W8jLAx063qV7CY9P7fXR3wIEMupjKuMcYQ5AKGkCXoY_3lppx3edfRkGfEY-UykZb2l5X7YDLoCvBgt6mXUmtTH21NC3GBZhlNWF2DG3xqE1TMP91_x5ZEHt6JNcXVlONlyHHDtV7n2yifj_9XsLcFgiwJtpc0UDnODRfU3QfIMJYMwovKsYyy5UyJFqWdydR_8A6p0mjLJ5SVCwxSknFBZT8UQJjITUGvC3qRfHKDKX_neZj"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;