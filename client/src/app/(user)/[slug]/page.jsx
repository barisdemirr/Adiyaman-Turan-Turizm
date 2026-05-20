import React from 'react';
import HeroSliderSection from '@/components/sections/tour-detail/HeroSliderSection';
import TitleSection from '@/components/sections/tour-detail/TitleSection/TitleSection';
import InfoBarSection from '@/components/sections/tour-detail/InfoBarSection';
import DescriptionSection from '@/components/sections/tour-detail/DescriptionSection';
import AdditionalImagerySection from '@/components/sections/tour-detail/AdditionalImagerySection';
import BookingSection from '@/components/sections/tour-detail/BookingSection';
import { GetTourBySlug } from '@/services/TourService';
import { GetContactByName } from '@/services/ContactService';

const TourDetailPage = async ({ params }) => {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  const [tour, contact] = await Promise.all([
    GetTourBySlug(slug),
    GetContactByName("WhatsApp")
  ]);

  return (
    <div className='flex justify-center mt-24'>
      <div className='w-full md:w-[69%] lg:w-[78%] xl:w-[62%]'>
        <TitleSection title={tour.title} slug={slug} bannerImg={tour.bannerImgUrl} />
        <HeroSliderSection img={tour.imageUrl} />
        <InfoBarSection type={tour.type} duration={tour.duration} price={tour.price} />
        <div className="max-w-[1280px] mx-auto px-4 md:px-6 mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          <DescriptionSection description={tour.description} extras={tour.extras}/>
          <BookingSection  dates={tour.dates} price={tour.price} title={tour.title} phone={contact?.value} />
        </div>
        <AdditionalImagerySection photos={tour.images} />
      </div>
    </div>
  );
};

export default TourDetailPage;