import React from 'react';

const ServicesSection = () => {
  return (
    <section className="py-10 md:py-xl px-4 md:px-6 max-w-[1280px] mx-auto mt-10 md:mt-0 bg-surface">
      {/* Header Section */}
      <div className="mb-10 md:mb-16 text-center">
        <h2 className="reveal font-h2 text-2xl font-bold md:text-h2 text-on-surface mb-3 md:mb-4 px-2">
          Unforgettable Journeys with Expert Guides
        </h2>
        <p className="reveal font-body-md text-sm md:text-body-md text-secondary max-w-2xl mx-auto px-4">
          From the peaks of Mount Nemrut to the historic streets of ancient cities, we provide comprehensive travel
          services tailored for your comfort.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {/* Service Card 1 */}
        <div className="reveal group bg-surface-container-lowest border border-surface-variant rounded-xl p-5 md:p-8 hover:shadow-md transition-all duration-300">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-secondary-container text-on-secondary-container rounded-lg flex items-center justify-center mb-4 md:mb-6 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px] md:text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              tour
            </span>
          </div>
          <h3 className="font-h4 text-base md:text-h4 text-on-surface mb-2 md:mb-3">Daily Tours</h3>
          <p className="font-body-sm text-xs md:text-body-sm text-secondary">
            Short, impactful excursions to must-see local landmarks and historical sites.
          </p>
        </div>

        {/* Service Card 2 */}
        <div className="reveal group bg-surface-container-lowest border border-surface-variant rounded-xl p-5 md:p-8 hover:shadow-md transition-all duration-300">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-primary-fixed text-on-primary-fixed rounded-lg flex items-center justify-center mb-4 md:mb-6 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px] md:text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              museum
            </span>
          </div>
          <h3 className="font-h4 text-base md:text-h4 text-on-surface mb-2 md:mb-3">Cultural Tours</h3>
          <p className="font-body-sm text-xs md:text-body-sm text-secondary">
            Deep dives into the rich heritage, traditions, and ancient histories of the region.
          </p>
        </div>

        {/* Service Card 3 */}
        <div className="reveal group bg-surface-container-lowest border border-surface-variant rounded-xl p-5 md:p-8 hover:shadow-md transition-all duration-300">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-secondary-container text-on-secondary-container rounded-lg flex items-center justify-center mb-4 md:mb-6 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px] md:text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              hotel
            </span>
          </div>
          <h3 className="font-h4 text-base md:text-h4 text-on-surface mb-2 md:mb-3">Stayover Tours</h3>
          <p className="font-body-sm text-xs md:text-body-sm text-secondary">
            Multi-day adventures with selected accommodations for a complete experience.
          </p>
        </div>

        {/* Service Card 4 */}
        <div className="reveal group bg-surface-container-lowest border border-surface-variant rounded-xl p-5 md:p-8 hover:shadow-md transition-all duration-300">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-primary-fixed text-on-primary-fixed rounded-lg flex items-center justify-center mb-4 md:mb-6 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px] md:text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              directions_bus
            </span>
          </div>
          <h3 className="font-h4 text-base md:text-h4 text-on-surface mb-2 md:mb-3">Vehicle Rentals</h3>
          <p className="font-body-sm text-xs md:text-body-sm text-secondary">
            Comfortable, reliable transportation solutions for groups of all sizes.
          </p>
        </div>

        {/* Service Card 5 */}
        <div className="reveal group bg-surface-container-lowest border border-surface-variant rounded-xl p-5 md:p-8 hover:shadow-md transition-all duration-300">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-secondary-container text-on-secondary-container rounded-lg flex items-center justify-center mb-4 md:mb-6 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px] md:text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              flight
            </span>
          </div>
          <h3 className="font-h4 text-base md:text-h4 text-on-surface mb-2 md:mb-3">Air/Bus Tickets</h3>
          <p className="font-body-sm text-xs md:text-body-sm text-secondary">
            Hassle-free ticketing services to connect you to your next destination.
          </p>
        </div>

        {/* Service Card 6 */}
        <div className="reveal group bg-surface-container-lowest border border-surface-variant rounded-xl p-5 md:p-8 hover:shadow-md transition-all duration-300">
          <div className="w-12 h-12 md:w-14 md:h-14 bg-primary-fixed text-on-primary-fixed rounded-lg flex items-center justify-center mb-4 md:mb-6 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[24px] md:text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              airport_shuttle
            </span>
          </div>
          <h3 className="font-h4 text-base md:text-h4 text-on-surface mb-2 md:mb-3">VIP Transfer</h3>
          <p className="font-body-sm text-xs md:text-body-sm text-secondary">
            Premium, private transportation services for ultimate comfort and convenience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;