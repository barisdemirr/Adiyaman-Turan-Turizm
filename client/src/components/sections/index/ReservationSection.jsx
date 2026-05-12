import React from 'react';

const ReservationSection = () => {
  return (
    <section className="reveal relative z-20 -mt-6 md:-mt-12 px-4 md:px-6 max-w-5xl mx-auto" id="hizli-rezervasyon">
      <div className="bg-surface-container-lowest rounded-xl shadow-lg p-4 md:p-6 border border-surface-variant flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-end">
        {/* Destination */}
        <div className="w-full md:flex-1 flex flex-col gap-1">
          <label className="font-label-bold text-[9px] md:text-caption text-secondary uppercase tracking-widest px-1">
            Destination
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[18px] md:text-[20px]">
              location_on
            </span>
            <input
              className="w-full pl-9 pr-3 py-2 md:py-3 rounded-lg border border-surface-variant focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-xs md:text-body-md text-on-surface bg-surface-container-lowest transition-all placeholder:text-slate-400"
              placeholder="Where to?"
              type="text"
            />
          </div>
        </div>

        {/* Date */}
        <div className="w-full md:flex-1 flex flex-col gap-1">
          <label className="font-label-bold text-[9px] md:text-caption text-secondary uppercase tracking-widest px-1">
            Date
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[18px] md:text-[20px]">
              calendar_today
            </span>
            <input
              className="w-full pl-9 pr-3 py-2 md:py-3 rounded-lg border border-surface-variant focus:border-secondary focus:ring-1 focus:ring-secondary outline-none text-xs md:text-body-md text-on-surface bg-surface-container-lowest transition-all"
              placeholder="Select dates"
              type="text"
            />
          </div>
        </div>

        {/* Button */}
        <button className="w-full md:w-auto px-6 py-2.5 md:py-3 bg-secondary text-on-secondary font-label-bold text-xs md:text-label-bold rounded-lg hover:bg-on-surface-variant transition-colors shadow-sm whitespace-nowrap flex items-center justify-center gap-2 mt-1 md:mt-0 active:scale-95">
          <span className="material-symbols-outlined text-[18px] md:text-[20px]">search</span>
          Find Tours
        </button>
      </div>
    </section>
  );
};

export default ReservationSection;