import React, { Suspense } from 'react';
import HeroSliderSection from '@/components/sections/tour-detail/HeroSliderSection';
import TitleSection from '@/components/sections/tour-detail/TitleSection/TitleSection';
import InfoBarSection from '@/components/sections/tour-detail/InfoBarSection';
import DescriptionSection from '@/components/sections/tour-detail/DescriptionSection';
import AdditionalImagerySection from '@/components/sections/tour-detail/AdditionalImagerySection';
import BookingSection from '@/components/sections/tour-detail/BookingSection';
import { GetTourBySlug } from '@/services/TourService';
import { GetContactByName } from '@/services/ContactService';

export const dynamic = "force-dynamic";

const TourDetailContent = async ({ slug }) => {
  const [tour, contact] = await Promise.all([
    GetTourBySlug(slug),
    GetContactByName("WhatsApp")
  ]);

  return (
    <>
      <TitleSection title={tour.title} slug={slug} bannerImg={tour.bannerImgUrl} />
      <HeroSliderSection img={tour.imageUrl} slug={slug} />
      <InfoBarSection type={tour.type} duration={tour.duration} price={tour.price} />
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
        <DescriptionSection description={tour.description} extras={tour.extras} />
        <BookingSection dates={tour.dates} price={tour.price} title={tour.title} phone={contact?.value} />
      </div>
      <AdditionalImagerySection photos={tour.images} />
    </>
  );
};

const TourDetailPage = async ({ params }) => {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;

  return (
    <div className='flex justify-center mt-24 min-h-screen w-full'>
      <div className='w-full md:w-[69%] lg:w-[78%] xl:w-[62%]'>
        <Suspense fallback={
          <div className="animate-pulse space-y-6 w-full">
            <div className="h-10 bg-slate-200 rounded-xl w-2/3" />
            <div className="h-[350px] md:h-[500px] bg-slate-100 rounded-2xl w-full" />
            <div className="h-14 bg-slate-200 rounded-xl w-full" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
              <div className="lg:col-span-2 h-48 bg-slate-100 rounded-xl" />
              <div className="lg:col-span-1 h-64 bg-slate-100 rounded-xl" />
            </div>
          </div>
        }>
          <TourDetailContent slug={slug} />
        </Suspense>
      </div>
    </div>
  );
};

export default TourDetailPage;