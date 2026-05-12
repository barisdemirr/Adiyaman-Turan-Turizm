"use client";

import React, { useState, useEffect } from 'react';
import CustomSelect from '@/components/ui/CustomSelect';

const ReservationSection = () => {
  const [tours, setTours] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTour, setSelectedTour] = useState(null);

  useEffect(() => {
    // Backend'den veri çekme simülasyonu
    const fetchTours = async () => {
      try {
        // const response = await fetch('https://your-api.com/api/tours');
        // const data = await response.json();

        // Şimdilik mock veri:
        const mockData = [
          { id: 1, name: "Nemrut Gün Batımı Turu", dates: ["2024-07-01", "2024-07-15", "2024-08-01"] },
          { id: 2, name: "Mardin Kültür Gezisi", dates: ["2024-07-10", "2024-07-25"] },
          { id: 3, name: "Göbeklitepe Ekspresi", dates: ["2024-08-15", "2024-08-30"] }
        ];
        setTours(mockData);
      } catch (error) {
        console.error("Veri çekilemedi kanka:", error);
      }
    };

    fetchTours();
  }, []);


  useEffect(() => {
    setSelectedDate(null);
  }, [selectedTour]);


  return (
    <section className="reveal relative z-20 -mt-6 md:-mt-12 px-4 md:px-6 max-w-5xl mx-auto" id="hizli-rezervasyon">
      <div className="bg-surface-container-lowest rounded-xl shadow-lg p-4 md:p-6 border border-surface-variant flex flex-col md:flex-row gap-3 md:gap-4 items-stretch md:items-end">
        {/* Destination */}
        <div className="w-full md:flex-1 flex flex-col gap-1">
          <CustomSelect
            label="Tur Seçimi"
            options={tours}
            onSelect={(tour) => setSelectedTour(tour)}
            placeholder="Gezmek istediğiniz turu seçin"
          />
        </div>

        {/* Date */}
        <div className="w-full md:flex-1 flex flex-col gap-1">
          <CustomSelect
            key={selectedTour?.id} 
            label="Tarih Seçimi"
            options={selectedTour ? selectedTour.dates.map((date) => ({ id: date, name: date })) : []}
            onSelect={(date) => setSelectedDate(date.name)}
            placeholder="Gezmek istediğiniz tarihi seçin"
            disabled={!selectedTour} 
            
          />
        </div>

        {/* Button */}
        <button onClick={() => console.log(`yer: ${selectedTour?.name} date: ${selectedDate}`)} className="w-full md:w-auto px-6 py-2.5 md:py-3 bg-emerald-600 text-on-secondary font-label-bold text-xs md:text-label-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-sm whitespace-nowrap flex items-center justify-center gap-2 mt-1 md:mt-0 active:scale-95">
          <span className="material-symbols-outlined text-[18px] md:text-[20px]">arrow_forward</span>
          Rezervasyon
        </button>
      </div>
    </section>
  );
};

export default ReservationSection;