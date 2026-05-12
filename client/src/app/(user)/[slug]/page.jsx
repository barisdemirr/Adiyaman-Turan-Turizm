import React from 'react';
import HeroSliderSection from '@/components/sections/tour-detail/HeroSliderSection';
import TitleSection from '@/components/sections/tour-detail/TitleSection';
import InfoBarSection from '@/components/sections/tour-detail/InfoBarSection';
import DescriptionSection from '@/components/sections/tour-detail/DescriptionSection';
import AdditionalImagerySection from '@/components/sections/tour-detail/AdditionalImagerySection';

const TourDetailPage = () => {
  return (
    <>
      <HeroSliderSection />
      <TitleSection />
      <InfoBarSection />
      <DescriptionSection />
      <AdditionalImagerySection />
    </>
  );
};

export default TourDetailPage;