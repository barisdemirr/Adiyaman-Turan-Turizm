import React from 'react';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="relative h-[110vh]  flex items-center justify-center overflow-hidden" id='home'>
      <div className="absolute inset-0 z-0">
        <Image
          alt="Mount Nemrut stone heads at sunrise"
          className="w-auto h-[110vh] object-cover object-center"
          src="https://cdn.akkahotels.com/Uploads/Blog/antalyada-kalabalik-sezonda-tatil-yaparken-nelere-dikkat-edilmeli.jpg"
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <span className="reveal inline-block px-3 py-1 md:px-4 md:py-1.5 mb-4 md:mb-6 rounded-full bg-primary-container/90 backdrop-blur-sm text-on-primary-container font-label-bold text-[10px] md:text-caption tracking-widest uppercase">
          Premium Travel Experience
        </span>
        <h1 className=" reveal font-h1 text-3xl sm:text-4xl md:text-h1 text-white mb-4 md:mb-6 drop-shadow-lg leading-tight">
          Discover the Lands Where History Began
        </h1>
        <p className="reveal text-sm md:text-body-lg text-white/90 mb-8 md:mb-10 max-w-2xl drop-shadow-md">
          Embark on unforgettable journeys through Adıyaman and beyond. Heritage, hospitality, and expert guides await
          you.
        </p>
        <div className="reveal flex flex-col sm:flex-row gap-4">
          <a
            className="inline-flex items-center justify-center bg-primary text-on-primary font-label-bold text-sm md:text-label-bold px-8 py-3 md:py-4 rounded-full hover:bg-tertiary transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            href="#turlar"
          >
            Explore Tours
            <span className="material-symbols-outlined ml-2 text-[18px] md:text-[20px]">arrow_forward</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;