import React from 'react'

function TourCardSkeleton() {
    return (
        <article
            className="rounded-xl overflow-hidden bg-surface-container-lowest shadow-sm flex flex-col animate-pulse"
        >
            <div className="relative h-48 md:h-64 overflow-hidden bg-slate-200">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                <div className="absolute bottom-3 left-3 right-3 text-left">
                    <div className="h-5 md:h-6 bg-white/30 rounded w-3/4 mb-2 drop-shadow-md"></div>

                    {/* Süre İskeleti (Duration) */}
                    <div className="flex items-center gap-3">
                        <div className="h-3 bg-white/20 rounded w-1/4"></div>
                    </div>
                </div>
            </div>

            <div className="p-4 md:p-6 flex-1 flex flex-col text-left">
                <div className="space-y-2 mb-4 flex-1">
                    <div className="h-3 bg-slate-200 rounded w-full"></div>
                    <div className="h-3 bg-slate-200 rounded w-11/12"></div>
                    <div className="h-3 bg-slate-200 rounded w-4/5"></div>
                </div>

                <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
                    {/* Fiyat İskeleti (Price) */}
                    <div className="h-5 bg-slate-200 rounded w-28"></div>

                    <div className="h-4 bg-slate-200 rounded w-16"></div>
                </div>
            </div>
        </article>
    )
}

export default TourCardSkeleton