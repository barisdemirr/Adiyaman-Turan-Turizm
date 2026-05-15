import React from 'react';

const LoadingState = () => {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-2xl overflow-hidden transition-all duration-500">

            {/* ANA KAPSAYICI - Perspektif katmak için */}
            <div className="relative flex flex-col items-center justify-center w-full max-w-lg h-64">

                {/* HIZ ÇİZGİLERİ (Rüzgar Efekti) - Arkaplanı dolu gösteren detay */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-[-10%] w-24 h-[1px] bg-gray-300 animate-wind-fast opacity-50" />
                    <div className="absolute top-1/2 left-[-20%] w-32 h-[1px] bg-gray-400 animate-wind-slow opacity-30" />
                    <div className="absolute top-3/4 left-[-15%] w-20 h-[1px] bg-gray-300 animate-wind-fast opacity-40" />
                </div>

                {/* FIAT DUCATO STYLE SHUTTLE */}
                <div className="relative z-10 animate-van-vibrate">
                    <div className="relative">
                        {/* Gövde - Ducato Formu (Yüksek Tavan, Dik Ön) */}
                        <div className="w-24 h-12 bg-gray-400 rounded-sm relative shadow-xl">
                            {/* Ön Cam ve Kabin */}
                            <div className="absolute top-1 right-1 w-6 h-5 bg-white/30 rounded-sm skew-x-[-10deg]" />
                            {/* Yan Camlar */}
                            <div className="absolute top-1 left-2 w-5 h-4 bg-white/20 rounded-sm" />
                            <div className="absolute top-1 left-8 w-5 h-4 bg-white/20 rounded-sm" />

                            {/* Detay: Kapı Kolu ve Yan Çizgi */}
                            <div className="absolute top-7 left-1 w-full h-[1px] bg-black/10" />
                            <div className="absolute top-6 left-12 w-2 h-1 bg-black/20 rounded-full" />

                            {/* Arka Stop Lambası */}
                            <div className="absolute top-2 left-0 w-1 h-3 bg-red-600/60 rounded-r-full" />
                            {/* Ön Far */}
                            <div className="absolute top-8 right-0 w-1 h-2 bg-yellow-200 shadow-[0_0_8px_white]" />
                        </div>

                        {/* Tekerlekler ve Hareket Efekti */}
                        <div className="absolute -bottom-1 left-3 w-3 h-3 bg-gray-900 rounded-full border-2 border-white animate-wheel-spin" />
                        <div className="absolute -bottom-1 right-4 w-3 h-3 bg-gray-900 rounded-full border-2 border-white animate-wheel-spin" />

                        {/* Alt Gölge */}
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-1 bg-black/10 blur-sm rounded-full" />
                    </div>
                </div>

                {/* SONSUZ YOL (SLIDER) */}
                <div className="absolute bottom-24 w-64 h-[2px] bg-gray-200 overflow-hidden">
                    <div className="h-full w-full flex space-x-12 animate-road-infinite">
                        {[...Array(6)].map((_, i) => (
                            <span key={i} className="h-full w-12 bg-gray-400 shrink-0" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingState;