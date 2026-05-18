"use client";

import React, { useState, useEffect, useMemo } from 'react';
import CustomSelect from '@/components/ui/CustomSelect';
import { GetToursForReservation } from '@/services/TourService';

const ReservationSection = () => {
  const [phone, setPhone] = useState("90123456789");
  const [tours, setTours] = useState([]);
  const [selectedTour, setSelectedTour] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const list = await GetToursForReservation();
        setTours(list);
      } catch (error) {
        console.error("Veri çekilemedi kanka:", error);
      }
    };
    fetchTours();
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
    if (!selectedTour || !selectedDate) {
      alert("Lütfen önce tur ve tarih seçiniz.");
      return;
    }
    const message = `Merhaba, ${selectedDate.formatted} tarihine, ${selectedTour.title} için rezervasyon yapmak istiyorum.`;
    const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <section className="reveal relative z-20 -mt-6 md:-mt-12 px-4 md:px-6 max-w-5xl mx-auto" id="hizli-rezervasyon">
      <div className="bg-surface-container-lowest rounded-xl shadow-lg p-4 md:p-6 border border-surface-variant flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-end">

        {/* Tur Seçimi */}
        <div className="w-full md:flex-1 flex flex-col gap-1">
          <CustomSelect
            label="Tur Seçimi"
            options={tours}
            labelKey="title" 
            valueKey="slug"
            onSelect={(tour) => setSelectedTour(tour)}
            value={selectedTour}
          />
        </div>

        {/* Tarih Seçimi */}
        <div className="w-full md:flex-1 flex flex-col gap-1">
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
        </div>

        {/* Rezervasyon Butonu */}
        <button
          onClick={handleReservation}
          className="w-full md:w-auto px-6 py-2.5 md:py-3 bg-emerald-600 text-on-secondary font-label-bold text-xs md:text-label-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm whitespace-nowrap flex items-center justify-center gap-2 mt-1 md:mt-0 active:scale-95"
        >
          <span className="material-symbols-outlined text-[18px] md:text-[20px]">arrow_forward</span>
          Rezervasyon
        </button>
      </div>
    </section>
  );
};

export default ReservationSection;