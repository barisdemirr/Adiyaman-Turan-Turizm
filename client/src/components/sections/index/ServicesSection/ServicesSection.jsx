"use client"

import React, { useState,useEffect, use } from 'react';
import ServiceCard from './components/ServiceCard';
import GetAllServices from '@/services/ServiceService';
import ServiceCardSkeleton from '@/components/ui/skeletons/ServiceCardSkeleton';

const ServicesSection = ({ ServicesData }) => {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await GetAllServices();
        setServices(data);
      } catch (error) {
        console.error("Servisler yüklenirken hata oluştu:", error);
      }
      finally {
        setIsLoading(false);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
      if (isLoading || !services || services.length === 0) return;
  
      let observer;
  
      const timer = setTimeout(() => {
        observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.1 }
        );
  
        const elements = document.querySelectorAll(".grid-services .reveal");
        elements.forEach((el) => observer.observe(el));
      }, 100);
  
      return () => {
        clearTimeout(timer);
        if (observer) observer.disconnect();
      };
    }, [isLoading, services]);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 grid-services">
        {isLoading
            ? 
            Array.from({ length: 3 }).map((_, index) => (
              <ServiceCardSkeleton key={`skeleton-${index}`} />
            ))
            : services.map((service, index) => (
          <ServiceCard
            key={index}
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