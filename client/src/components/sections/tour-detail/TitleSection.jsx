import React from 'react';

const TitleSection = ({ title }) => {
  return (
    <section className="max-w-[1280px] mx-auto px-4 md:px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6">
        <div>
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 md:gap-2 text-[10px] md:text-caption text-secondary mb-2 md:mb-4">
            <span>Daily Tours</span>
            <span className="material-symbols-outlined text-[12px] md:text-[14px]">chevron_right</span>
            <span className="text-primary font-medium">Adıyaman</span>
          </nav>
          {/* Title */}
          <h1 className="font-h1 font-bold text-2xl md:text-h2 text-on-surface leading-tight">
            {title}
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-5 md:gap-4 border-t md:border-t-0 border-slate-100 pt-3 md:pt-0">
          <button className="flex items-center gap-1.5 md:gap-2 text-[11px]  md:text-body-sm font-label-bold text-secondary hover:text-primary transition-colors active:scale-95">
            <span className="material-symbols-outlined text-[18px] md:text-[20px]">favorite</span> Favorilere Ekle
          </button>
        </div>
      </div>
    </section>
  );
};

export default TitleSection;