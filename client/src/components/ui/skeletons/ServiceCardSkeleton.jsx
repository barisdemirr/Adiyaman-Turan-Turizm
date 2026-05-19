import React from 'react';

const ServiceCardSkeleton = () => {
    return (
        <div className="bg-surface-container-lowest border border-surface-variant rounded-xl p-5 md:p-8 animate-pulse">
            {/* İkon İskeleti */}
            <div className="w-12 h-12 md:w-14 md:h-14 bg-surface-variant/60 rounded-lg mb-4 md:mb-6"></div>

            {/* Başlık İskeleti */}
            <div className="h-5 bg-surface-variant/80 rounded-md mb-2 md:mb-3 w-1/2"></div>

            {/* Açıklama Satırları İskeleti */}
            <div className="space-y-2">
                <div className="h-3 bg-surface-variant/40 rounded-md w-full"></div>
                <div className="h-3 bg-surface-variant/40 rounded-md w-11/12"></div>
                <div className="h-3 bg-surface-variant/40 rounded-md w-2/3"></div>
            </div>
        </div>
    );
};

export default ServiceCardSkeleton;