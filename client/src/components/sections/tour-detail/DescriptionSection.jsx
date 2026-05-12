import React from 'react';

const DescriptionSection = () => {
  return (
    <section className="max-w-[1280px] mx-auto px-4 md:px-6 mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
      {/* Main Content Area */}
      <div className="lg:col-span-2">
        <h2 className="font-h3 text-xl md:text-h3 mb-4 md:mb-6">Experience the Eighth Wonder</h2>
        <div className="space-y-4 md:space-y-6 text-sm md:text-body-lg text-secondary leading-relaxed">
          <p>
            Embark on a journey back to the 1st century BC, where the ambitious King Antiochus I of
            Commagene built a magnificent hierotheseion atop the highest peak of the Eastern Taurus range.
            Witness the first rays of light illuminating the colossal stone heads.
          </p>
          <p>
            The itinerary goes beyond the summit. We explore the ancient Arsemia, walk across the Roman
            Cendere Bridge, and marvel at the Karakuş Tumulus. This is a profound encounter with the
            heritage of Upper Mesopotamia.
          </p>
        </div>

        <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
          <div className="p-5 md:p-6 bg-surface-container-low rounded-xl border border-outline-variant">
            <span className="material-symbols-outlined text-primary mb-3 md:mb-4 block text-[20px] md:text-[24px]">
              restaurant
            </span>
            <h4 className="font-h4 text-base md:text-h4 mb-1 md:mb-2">Local Cuisine</h4>
            <p className="text-xs md:text-body-sm text-secondary leading-normal">
              Traditional Adıyaman breakfast included at the foot of the mountain.
            </p>
          </div>
          <div className="p-5 md:p-6 bg-surface-container-low rounded-xl border border-outline-variant">
            <span className="material-symbols-outlined text-primary mb-3 md:mb-4 block text-[20px] md:text-[24px]">
              directions_bus
            </span>
            <h4 className="font-h4 text-base md:text-h4 mb-1 md:mb-2">Vip Transport</h4>
            <p className="text-xs md:text-body-sm text-secondary leading-normal">
              Climate-controlled luxury shuttles with panoramic windows.
            </p>
          </div>
        </div>
      </div>

      {/* Booking Sidebar */}
      <aside className="lg:col-span-1 mt-4 md:mt-0">
        <div className="lg:sticky lg:top-28 bg-white p-5 md:p-8 rounded-xl md:rounded-2xl shadow-lg border border-slate-100">
          <div className="flex items-center justify-between mb-6 md:mb-8">
            <h3 className="font-h4 text-base md:text-h4">Available Dates</h3>
            <div className="text-right">
              <span className="text-primary font-bold text-lg md:text-h4">€85</span>
              <span className="block text-[9px] md:text-caption text-secondary font-normal -mt-1">/per person</span>
            </div>
          </div>

          <div className="space-y-3 md:space-y-4">
            <div className="p-3.5 md:p-4 rounded-xl border-2 border-primary bg-primary-fixed/10 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-label-bold text-xs md:text-sm text-on-surface">Oct 24, 2024</p>
                  <p className="text-[10px] md:text-caption text-secondary">Thursday</p>
                </div>
                <div className="text-right">
                  <p className="text-xs md:text-body-sm font-semibold text-primary">€85</p>
                  <p className="text-[9px] uppercase tracking-wider text-green-600 font-bold">Available</p>
                </div>
              </div>
              <button className="w-full bg-primary text-on-primary py-2.5 md:py-3 rounded-lg font-label-bold text-xs md:text-sm hover:bg-on-primary-container transition-colors active:scale-[0.98]">
                Book Now
              </button>
            </div>

            <div className="p-3.5 md:p-4 rounded-xl border border-outline-variant hover:border-primary transition-colors cursor-pointer group">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-label-bold text-xs md:text-sm text-on-surface">Oct 25, 2024</p>
                  <p className="text-[10px] md:text-caption text-secondary">Friday</p>
                </div>
                <div className="text-right">
                  <p className="text-xs md:text-body-sm font-semibold text-secondary group-hover:text-primary transition-colors">
                    €85
                  </p>
                  <p className="text-[9px] uppercase tracking-wider text-green-600 font-bold">Available</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 md:mt-8 flex items-center justify-center gap-4 text-[10px] md:text-caption text-secondary border-t border-slate-50 pt-4">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] md:text-sm text-green-600">verified</span>
              Best Price
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] md:text-sm text-blue-600">cancel</span>
              Free Cancel
            </span>
          </div>
        </div>
      </aside>
    </section>
  );
};

export default DescriptionSection;