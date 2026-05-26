"use client"

import React, { useMemo } from 'react'

function BookingSection({ dates, price, title, phone }) {

    const processedDates = useMemo(() => {
        const todayTime = new Date().getTime();

        const validDates = dates
            .map(date => date.date)
            .filter(date => new Date(date).getTime() >= todayTime);

        const sorted = [...validDates].sort((a, b) => {
            const dateA = new Date(a);
            const dateB = new Date(b);
            return Math.abs(dateA - todayTime) - Math.abs(dateB - todayTime);
        });

        const formatted = sorted.map(dateStr => {
            return new Date(dateStr).toLocaleDateString('tr-TR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });
        });

        const days = sorted.map(dateStr => {
            return new Date(dateStr).toLocaleDateString('tr-TR', { weekday: 'long' });
        });

        return { formatted, days };
    }, [dates]);

    return (
        <section className="lg:col-span-1 mt-4 md:mt-0">
            <div className="lg:sticky lg:top-28 bg-white p-5 md:p-8 rounded-xl md:rounded-2xl shadow-lg border border-slate-100">
                <div className="flex items-center justify-between mb-6 md:mb-8">
                    <h3 className="font-h4 text-base md:text-h4">Aktif Tarihler</h3>
                    <div className="text-right">
                        <span className="text-primary font-bold text-lg md:text-h4">€{price}</span>
                        <span className="block text-[9px] md:text-caption text-secondary font-normal -mt-1">/kişi başı</span>
                    </div>
                </div>

                <div className="space-y-3 md:space-y-4">
                    {processedDates.formatted.map((date, index) => (
                        <div key={index} className="p-3.5 md:p-4 rounded-xl border-2 border-primary bg-primary-fixed/10 flex flex-col gap-3">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-label-bold text-xs md:text-sm text-on-surface">{date}</p>
                                    <p className="text-[10px] md:text-caption text-secondary">{processedDates.days[index]}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs md:text-body-sm font-semibold text-primary">€{price}</p>
                                    <p className="text-[9px] uppercase tracking-wider text-green-600 font-bold">uygun</p>
                                </div>
                            </div>
                            <a href={`https://wa.me/${phone}?text=${encodeURIComponent(`Merhaba, ${date} tarihine, ${title} için rezervasyon yapmak istiyorum.`)}`} target="_blank" rel="noopener noreferrer" className="w-full bg-primary text-on-primary py-2.5 md:py-3 px-4 rounded-lg font-label-bold text-xs md:text-sm hover:bg-on-primary-container transition-colors text-center active:scale-[0.98]">
                                Rezervasyon Yap
                            </a>
                        </div>
                    ))}
                </div>

                <div className="mt-6 md:mt-8 flex items-center justify-center gap-4 text-[10px] md:text-caption text-secondary border-t border-slate-50 pt-4">
                    <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] md:text-sm w-4 h-4 flex items-center justify-center text-green-600 shrink-0 select-none">verified</span>
                        En iyi fiyat
                    </span>
                    <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] md:text-sm w-4 h-4 flex items-center justify-center text-blue-600 shrink-0 select-none">cancel</span>
                        Ücretsiz iptal
                    </span>
                </div>
            </div>
        </section>
    );
}

export default BookingSection;