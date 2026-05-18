"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({ error, reset }) {
    useEffect(() => {
        // Hatayı konsola basıyoruz ki debug ederken ne olduğunu görebilelim kanka
        console.error("Uygulama Hatası Yakalandı:", error);
    }, [error]);

    return (
        <div className="min-h-[70vh] mt-24 flex flex-col items-center justify-center px-6 text-center bg-background text-on-background">

            <div className="w-30 h-30 bg-error-container/10 text-error rounded-full flex items-center justify-center mb-6 animate-pulse">
                <span className="material-symbols-outlined text-[140px]!">warning</span>
            </div>

            {/* Başlık ve Açıklama */}
            <h1 className="font-h1 text-3xl md:text-4xl text-on-background mb-3 font-bold tracking-tight">
                Bir Şeyler Ters Gitti!
            </h1>
            <p className="text-sm md:text-body-lg text-outline mb-8 mt-2">
                Sayfa yüklenirken ufak bir teknik arıza yaşandı. Yeniden yüklemeyi deneyebilir veya ana sayfaya güvenli bir dönüş yapabilirsiniz.
            </p>

            {/* Aksiyon Butonları */}
            <div className="flex flex-col sm:flex-row gap-4 items-center">
                {/* Yeniden Dene Butonu */}
                <button
                    onClick={() => reset()} 
                    className="inline-flex items-center justify-center bg-primary text-on-primary font-label-bold text-sm px-6 py-3 rounded-full hover:bg-primary/95 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
                >
                    <span className="material-symbols-outlined mr-2 text-[18px]">refresh</span>
                    Yeniden Dene
                </button>

                {/* Ana Sayfaya Dön Butonu */}
                <Link
                    href="/"
                    className="inline-flex items-center justify-center bg-surface border border-outline/30 text-on-surface font-label-bold text-sm px-6 py-3 rounded-full hover:bg-surface-variant transition-all transform hover:-translate-y-0.5"
                >
                    <span className="material-symbols-outlined mr-2 text-[18px]">home</span>
                    Ana Sayfaya Dön
                </Link>
            </div>
        </div>
    );
}