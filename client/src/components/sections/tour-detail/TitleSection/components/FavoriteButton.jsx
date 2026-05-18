"use client";

import { useState, useEffect } from "react";

export default function FavoriteButton({ slug, title, bannerImg }) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setIsFavorite(savedFavorites.some((item) => item.slug === slug));
    }, [slug]);

    const toggleFavorite = () => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

        const isExist = savedFavorites.some((item) => item.slug === slug);
        let updatedFavorites;

        if (isExist) {
            updatedFavorites = savedFavorites.filter((item) => item.slug !== slug);
            setIsFavorite(false);
        } else {
            const tourDataToSave = {
                slug,
                title,
                bannerImg
            };
            updatedFavorites = [...savedFavorites, tourDataToSave];
            setIsFavorite(true);
        }

        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };


    return (
        <button
            onClick={toggleFavorite}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${isFavorite
                ? "bg-red-50 border-red-200 text-red-600 font-bold"
                : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
        >
            <span className="material-symbols-outlined text-[20px] select-none">
                {isFavorite ? "favorite" : "favorite_border"}
            </span>
            {isFavorite ? "Favorilerimde" : "Favorilere Ekle"}
        </button>
    );
}