"use client";

import React, { useState, useEffect, useMemo } from 'react';
import CustomSelect from '@/components/ui/CustomSelect';
import SelectSkeleton from '@/components/ui/skeletons/SelectSkeleton';
import { GetToursForReservation } from '@/services/TourService';
import { GetContactByName } from '@/services/ContactService';

const ReservationSection = ({ phone }) => {
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [whatsapp, setWhatsapp] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [toursList, whatsappData] = await Promise.all([
          GetToursForReservation(),
          GetContactByName("whatsapp")
        ]);
        setTours(toursList);
        setWhatsapp(whatsappData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const formattedDates = useMemo(() => {
    if (!selectedTour || !selectedTour.dates) return [];

    const todayTime = new Date().getTime();

    return selectedTour.dates
      .filter(item => new Date(item.date).getTime() >= todayTime)
      .sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return Math.abs(dateA - todayTime) - Math.abs(dateB - todayTime);
      })
      .map(item => {
        const date = new Date(item.date);
        return {
          id: item.id,
          formatted: date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
        };
      });
  }, [selectedTour]);

  useEffect(() => {
    setSelectedDate(null);
  }, [selectedTour]);

  const handleReservation = () => {
    if (isLoading || !selectedTour || !selectedDate) {
      return;
    }

    const whatsappNumber = whatsapp?.value || phone;
    if (!whatsappNumber) {
      return;
    }

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Merhaba, ${selectedDate.formatted} tarihine, ${selectedTour.title} için rezervasyon yapmak istiyorum.`)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section suppressHydrationWarning={true} className="reveal relative z-20 -mt-6 md:-mt-12 px-4 md:px-6 max-w-5xl mx-auto" id="hizli-rezervasyon">
      <div className="bg-surface-container-lowest rounded-xl shadow-lg p-4 md:p-6 border border-surface-variant flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-end">

        <div className="w-full md:flex-1 flex flex-col gap-1">
          {isLoading ? (
            <SelectSkeleton label="Tur Seçimi" />
          ) : (
            <CustomSelect
              label="Tur Seçimi"
              options={tours}
              labelKey="title"
              valueKey="slug"
              onSelect={(tour) => setSelectedTour(tour)}
              value={selectedTour}
            />
          )}
        </div>

        <div className="w-full md:flex-1 flex flex-col gap-1">
          {isLoading ? (
            <SelectSkeleton label="Tarih Seçimi" />
          ) : (
            <CustomSelect
              label="Tarih Seçimi"
              options={formattedDates}
              labelKey="formatted"
              valueKey="id"
              disabled={!selectedTour}
              onSelect={(dateObj) => setSelectedDate(dateObj)}
              value={selectedDate}
              placeholder={selectedTour ? "Tarih Seçiniz..." : "Önce tur seçiniz."}
            />
          )}
        </div>

        <button
          onClick={handleReservation}
          disabled={isLoading || !selectedTour || !selectedDate}
          className={`w-full md:w-auto px-6 py-2.5 md:py-3 text-on-secondary font-label-bold text-xs md:text-label-bold rounded-lg transition-colors shadow-sm whitespace-nowrap flex items-center justify-center gap-2 mt-1 md:mt-0 ${isLoading || !selectedTour || !selectedDate
              ? 'bg-slate-300 dark:bg-white/10 text-slate-500 cursor-not-allowed'
              : 'bg-emerald-600 hover:bg-emerald-700 active:scale-95 cursor-pointer'
            }`}
        >
          <span className="material-symbols-outlined text-[18px] md:text-[20px]">arrow_forward</span>
          Rezervasyon
        </button>
      </div>
    </section>
  );
};

export default ReservationSection;