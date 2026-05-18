
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';

const FavoriteTourCard = ({ img, title, slug, onRemove }) => {

    

    return (
        <Link
            href={`/${slug}`}
            className="group relative block h-[300px] w-[300px] border border-primary-fixed aspect-square rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500"
        >
            {/* Silme Butonu - Sağ Üst */}
            <button
                onClick={(e) => {
                    e.preventDefault(); 
                    e.stopPropagation(); 
                    onRemove(slug);
                }}
                className="absolute top-4 right-4 z-30 flex items-center justify-center w-10 h-10 rounded-full border border-primary-fixed text-primary-fixed bg-transparent hover:bg-primary-fixed hover:text-black transition-all duration-300 active:scale-90 shadow-lg"
                title="Favorilerden Kaldır"
            >
                <span className="material-symbols-outlined text-[20px]">delete</span>
            </button>

            <Image
                src={img}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                fill
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-100 group-hover:bg-black/40 transition-all duration-500"></div>

            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
                <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    {title}
                </h3>
                <div className="w-0 group-hover:w-12 h-1 bg-primary mt-2 transition-all duration-500"></div>
            </div>
        </Link>
    )
}

export default FavoriteTourCard