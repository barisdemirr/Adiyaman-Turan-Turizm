import React from 'react';
import Image from 'next/image';

const HeroSliderSection = ({ img }) => {
  return (
    <section className="relative w-full max-w-[1280px] mx-auto  px-4 md:px-6 group mt-6 md:mt-12">
      <div className="relative w-full h-[320px] md:h-[500px] overflow-hidden rounded-lg md:rounded-xl shadow-md md:shadow-lg bg-gray-900">

        {/* KATMAN 1: Bulanık Arka Plan (Sadece bu katman bulanık) */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-xl scale-110 opacity-50"
          style={{
            backgroundImage: `url('${img}')`
          }}
        />

        {/* KATMAN 2: Karartma Overlay (Resmin daha iyi seçilmesi için opsiyonel) */}
        <div className="absolute inset-0 bg-black/20" />

        {/* KATMAN 3: Net Ön Plan (Asıl Resim) */}
        <div className="relative z-10 flex w-full h-full items-center justify-center">
          <div className="relative w-full h-full">
            <Image
              src={`${process.env.NEXT_PUBLIC_BASE_URL}${img}`}
              alt="Mount Nemrut Sunrise"
              fill
              className="object-contain drop-shadow-2xl w-auto h-full"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSliderSection;