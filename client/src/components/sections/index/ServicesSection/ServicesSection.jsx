"use client"

import React, { useState } from 'react';
import ServiceCard from './components/ServiceCard';

const ServicesSection = ({ ServicesData }) => {
  const [mockServices, setMockServices] = useState([
    {
      id: 1,
      title: "Daily Tours",
      icon: "🎨",
      description: "Short, impactful excursions to must-see local landmarks and historical sites."
    },
    {
      id: 2,
      title: "Cultural Tours",
      icon: "🎨",
      description: "Deep dives into the rich heritage, traditions, and ancient histories of the region."
    },
    {
      id: 3,
      title: "Stayover Tours",
      icon: "✈️​",
      description: "Multi-day adventures with selected accommodations for a complete experience."
    }
  ]);

  return (
    <section className="py-10 md:py-xl px-4 md:px-6 max-w-[1280px] mx-auto mt-10 md:mt-0 bg-surface">
      {/* Header Section */}
      <div className="mb-10 md:mb-16 text-center">
        <h2 className="reveal font-h2 text-2xl font-bold md:text-h2 text-on-surface mb-3 md:mb-4 px-2">
          {ServicesData?.title}
        </h2>
        <p className="reveal font-body-md text-sm md:text-body-md text-secondary max-w-2xl mx-auto px-4">
          {ServicesData?.description}
        </p>
      </div>
      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {mockServices.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            icon={service.icon}
            description={service.description}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;