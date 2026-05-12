import React from 'react';

const HeroSliderSection = () => {
  return (
    <section className="relative w-full max-w-[1280px] mx-auto mt-4 md:mt-8 px-4 md:px-6 group">
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg md:rounded-xl shadow-md md:shadow-lg">
        <img
          className="w-full h-full object-cover"
          alt="Mount Nemrut Sunrise"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuDN8oT9iQFwQLMT6rR0hmMMyQIYHeQT5y1gCAFr2__AAxV19DamuUP6NUiKd98Msn8pqP0uXCjWIsXtj0vNPw44yWBPpkN7WD5oYeMFICG1TEOM7EaVlpUv3jtWtIAa-jS2F_CaBXZa3HcOYTt-F8yw6Bjb4d0s__UWSG6JBUi6Db1IzXossvsW1G_Clv06kWIAzKfEf5r2Y9R1eFTEQl8Ym7InC6a2p9H1CIXcb8lDaslxa2V7Y5GvxKvzyUogdtD-X-KljMkIk3-M"
        />

        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

        {/* Navigation Arrows */}
        <button className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-2 md:p-3 rounded-full hover:bg-white/40 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 active:scale-90">
          <span className="material-symbols-outlined text-[20px] md:text-[24px]">chevron_left</span>
        </button>
        <button className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white p-2 md:p-3 rounded-full hover:bg-white/40 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100 active:scale-90">
          <span className="material-symbols-outlined text-[20px] md:text-[24px]">chevron_right</span>
        </button>

        {/* Slider Indicators */}
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 md:gap-2">
          <div className="w-5 md:w-8 h-1 bg-white rounded-full"></div>
          <div className="w-5 md:w-8 h-1 bg-white/40 rounded-full"></div>
          <div className="w-5 md:w-8 h-1 bg-white/40 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSliderSection;