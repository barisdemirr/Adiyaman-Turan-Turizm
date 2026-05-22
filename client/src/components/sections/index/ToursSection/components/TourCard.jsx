import React from 'react'

function TourCard({ title, shortDescription, bannerImage, price, slug, duration }) {
    return (
        <article
            key={slug}
            className="group rounded-xl overflow-hidden bg-surface-container-lowest shadow-sm hover:shadow-md transition-all duration-300 flex flex-col"
        >
            <div className="relative h-48 md:h-64 overflow-hidden">
                <img
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={`${process.env.NEXT_PUBLIC_BASE_URL}${bannerImage}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 text-left">
                    <h3 className="font-h3 text-lg md:text-h3 text-white mb-0.5 drop-shadow-md">
                        {title}
                    </h3>
                    <div className="flex items-center text-white/90 font-caption text-[10px] md:text-caption gap-3">
                        <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[14px]">schedule</span> {duration}
                        </span>
                    </div>
                </div>
            </div>
            <div className="p-4 md:p-6 flex-1 flex flex-col text-left">
                <p className="font-body-sm text-[12px] md:text-body-sm text-secondary mb-4 flex-1">
                    {shortDescription}
                </p>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-100">
                    <div className="font-h4 text-base md:text-h4 text-on-surface">
                        ₺{price} <span className="text-[10px] md:text-body-sm text-secondary font-normal">/person</span>
                    </div>
                    <a
                        className="text-primary hover:text-tertiary font-label-bold text-[12px] md:text-label-bold flex items-center gap-1 transition-colors"
                        href={`/${slug}`}
                    >
                        Details <span className="material-symbols-outlined text-[16px] md:text-[18px]">arrow_forward</span>
                    </a>
                </div>
            </div>
        </article>
    )
}

export default TourCard