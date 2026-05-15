"use client";

import React, { useState, useEffect } from 'react';
import HeroSliderSection from '@/components/sections/tour-detail/HeroSliderSection';
import TitleSection from '@/components/sections/tour-detail/TitleSection';
import InfoBarSection from '@/components/sections/tour-detail/InfoBarSection';
import DescriptionSection from '@/components/sections/tour-detail/DescriptionSection';
import AdditionalImagerySection from '@/components/sections/tour-detail/AdditionalImagerySection';
import BookingSection from '@/components/sections/tour-detail/BookingSection';
import LoadingState from '@/components/ui/LoadingState';

const TourDetailPage = ({ params }) => {
  const { slug } = React.use(params);

  const [tour, setTour] = useState(
    {
      img: "https://cdn.akkahotels.com/Uploads/Blog/antalyada-kalabalik-sezonda-tatil-yaparken-nelere-dikkat-edilmeli.jpg",
      title: "Nemrut Sunrise & Commagene Kingdom Tour",
      duration: "14 Hours",
      price: "1,200",
      description: "Experience the breathtaking sunrise over Mount Nemrut, a UNESCO World Heritage site, and explore the ancient Commagene Kingdom's rich history and culture. This unforgettable tour includes visits to the colossal stone heads, royal tombs, and stunning landscapes that define this unique destination.",
      type: "daily",
      extras: [{ title: "Optional Visit to Local Market", description: "Explore the vibrant local market and experience the authentic flavors of the region." }, { title: "Complimentary Snacks", description: "Enjoy delicious snacks and refreshments throughout the tour." },{ title: "Optional Visit to Local Market", description: "Explore the vibrant local market and experience the authentic flavors of the region." }, { title: "Complimentary Snacks", description: "Enjoy delicious snacks and refreshments throughout the tour." }, { title: "Optional Visit to Local Market", description: "Explore the vibrant local market and experience the authentic flavors of the region." }, { title: "Complimentary Snacks", description: "Enjoy delicious snacks and refreshments throughout the tour." }],
      dates: ["2026-08-01", "2026-07-15", "2026-07-01"],
      photos: ["https://cdn.akkahotels.com/Uploads/Blog/antalyada-kalabalik-sezonda-tatil-yaparken-nelere-dikkat-edilmeli.jpg", "https://cdn.akkahotels.com/Uploads/Blog/istanbul-kiz-kulesi-mobil_1.png", "https://cdn.akkahotels.com/Uploads/Blog/antalyada-kalabalik-sezonda-tatil-yaparken-nelere-dikkat-edilmeli.jpg", "https://cdn.akkahotels.com/Uploads/Cms/antedon-1-slider-kis-kampanyasi_2_10.jpg", "https://cdn.akkahotels.com/Uploads/Cms/ana-sayfa-1_13.webp", "https://cdn.akkahotels.com/Uploads/Cms/gorsel--2_6.png"]
    });



  if (!tour) {
    return <LoadingState />;
  }

  return (
    <div className='flex justify-center mt-24'>
      <div className='w-full md:w-[69%] lg:w-[78%] xl:w-[62%]'>
        <TitleSection title={tour.title} />
        <HeroSliderSection img={tour.img} />
        <InfoBarSection type={tour.type} duration={tour.duration} price={tour.price} />
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <DescriptionSection description={tour.description} extras={tour.extras}/>
          <BookingSection  dates={tour.dates} price={tour.price} title={tour.title} />
        </div>
        <AdditionalImagerySection photos={tour.photos} />
      </div>
    </div>
  );
};

export default TourDetailPage;