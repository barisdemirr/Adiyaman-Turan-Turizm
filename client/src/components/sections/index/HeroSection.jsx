"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const HeroSection = ({ HeroData }) => {
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted || !HeroData) {
    return <div className="h-[110vh] bg-black"></div>; 
  }

  return (
    <section className="relative h-[110vh]  flex items-center justify-center overflow-hidden" id='home'>
      <div className="absolute inset-0 z-0">
        <Image
          alt="Mount Nemrut stone heads at sunrise"
          className="object-cover object-center"
          src={HeroData?.backgroundImageUrl}
          fill
          sizes="(max-width: 768px) 100vw, 1900px"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent"></div>
      </div>
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <span className=" inline-block px-3 py-1 md:px-4 md:py-1.5 mb-4 md:mb-6 rounded-full bg-primary-container/90 backdrop-blur-sm text-on-primary-container font-label-bold text-[10px] md:text-caption tracking-widest uppercase">
          {HeroData?.tag}
        </span>
        <h1 className="  font-h1 text-3xl sm:text-4xl md:text-h1 text-white mb-4 md:mb-6 drop-shadow-lg leading-tight">
          {HeroData?.title}
        </h1>
        <p className=" text-sm md:text-body-lg text-white/90 mb-8 md:mb-10 max-w-2xl drop-shadow-md">
          {HeroData?.description}
        </p>
        <div className=" flex flex-col sm:flex-row gap-4">
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