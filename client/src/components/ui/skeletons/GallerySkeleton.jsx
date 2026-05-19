import React from 'react';

const GallerySkeleton = () => {
    return (
        <div className="relative w-full flex items-center justify-center px-4 md:px-0 h-full">
            <div className="aspect-video relative w-full md:w-[800px] rounded-xl md:rounded-2xl overflow-hidden shadow-xl border-2 md:border-4 border-white bg-neutral-900 animate-pulse flex items-center justify-center">
                <span className="material-symbols-outlined text-neutral-700 text-4xl md:text-5xl select-none">
                    image
                </span>
            </div>
        </div>
    );
};

export default GallerySkeleton;