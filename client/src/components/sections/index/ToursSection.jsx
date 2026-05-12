import React from 'react';

const ToursSection = () => {
  return (
    <section
      className="md:py-xl bg-slate-50 px-4 md:px-6 border-y border-surface-variant/30 py-20 md:py-10"
      id="turlar"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Başlık ve Tablar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4 md:gap-6">
          <div className="text-center md:text-left">
            <h2 className="font-bold md:font-h2 text-2xl md:text-h2 text-on-surface mb-2 md:mb-4">
              Turlarımızı Keşfedin
            </h2>
            <p className="font-body-md text-sm md:text-body-md text-secondary">
              Bölgenin en iyi yönlerini sergilemek için hazırlanmış özel programlar.
            </p>
          </div>
          <div className="flex gap-1.5 p-1 bg-surface-container-highest rounded-lg self-center md:self-end">
            <button className="px-4 md:px-6 py-1.5 md:py-2 bg-surface-container-lowest text-on-surface font-label-bold text-[11px] md:text-label-bold rounded shadow-sm">
              Günübirlik
            </button>
            <button className="px-4 md:px-6 py-1.5 md:py-2 text-secondary hover:text-on-surface font-label-bold text-[11px] md:text-label-bold rounded transition-colors">
              Konaklamalı
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {[1, 2, 3].map((_, index) => (
            <article
              key={index}
              className="group rounded-xl overflow-hidden bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
            >
              <div className="relative h-48 md:h-64 overflow-hidden">
                <img
                  alt="Ancient city of Mardin"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBeDn6IBA-nfSUZZuKt5WkXB9ISrRiflx2Q4JyrViGrSj1mKhDz3cI0mIK2PgVfJVsJsSv6vlbx9mF-jo2QEgAqcfA3nidUQkBwCT6V-gdnv-XEW5fknNkg-e8sW1SM51JM1ho5TQ84FITBLAC8q13Zi4znSOh0TNLRAjmEBtmIar5F1CjDGKydDgYdkH6WDf31P0IorZ99V_uTM9eo3ns5LLxF-zUGw0TIxR2t7nlD5a4Vur14c4YVk414vzPzfoIUJYPdje_-Da88"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-surface-container-lowest/90 backdrop-blur-sm text-on-surface px-2 py-0.5 rounded-full font-label-bold text-[10px] md:text-caption shadow-sm">
                    Cultural
                  </span>
                </div>
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <h3 className="font-h3 text-lg md:text-h3 text-white mb-0.5 drop-shadow-md">
                    Mardin Discovery
                  </h3>
                  <div className="flex items-center text-white/90 font-caption text-[10px] md:text-caption gap-3">
                    <span className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">schedule</span> Full Day
                    </span>
                    <span className="flex items-center gap-1 text-primary-fixed">
                      <span
                        className="material-symbols-outlined text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>{" "}
                      4.9
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-4 md:p-6 flex-1 flex flex-col text-left">
                <p className="font-body-sm text-[12px] md:text-body-sm text-secondary mb-4 flex-1">
                  Explore narrow stone streets, ancient monasteries, and Mesopotamian plains.
                </p>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
                  <div className="font-h4 text-base md:text-h4 text-on-surface">
                    ₺1,200 <span className="text-[10px] md:text-body-sm text-secondary font-normal">/person</span>
                  </div>
                  <a
                    className="text-primary hover:text-tertiary font-label-bold text-[12px] md:text-label-bold flex items-center gap-1 transition-colors"
                    href="#"
                  >
                    Details <span className="material-symbols-outlined text-[16px] md:text-[18px]">arrow_forward</span>
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div>
          <nav className="flex justify-center items-center gap-1.5 md:gap-2 mt-8 md:mt-12 pb-4">
            <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-surface-variant text-secondary hover:bg-surface-container-low transition-colors active:scale-90">
              <span className="material-symbols-outlined text-[18px] md:text-[20px]">chevron_left</span>
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full ${
                  page === 1
                    ? "bg-primary text-on-primary shadow-sm"
                    : "border border-surface-variant text-secondary hover:bg-surface-container-low"
                } font-label-bold text-xs md:text-sm active:scale-90`}
              >
                {page}
              </button>
            ))}
            <button className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-full border border-surface-variant text-secondary hover:bg-surface-container-low transition-colors active:scale-90">
              <span className="material-symbols-outlined text-[18px] md:text-[20px]">chevron_right</span>
            </button>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default ToursSection;