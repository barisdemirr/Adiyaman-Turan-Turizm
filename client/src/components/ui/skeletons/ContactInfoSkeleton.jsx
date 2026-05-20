import React from 'react';

const ContactCardSkeleton = () => {
    return (
        <div className="flex flex-col items-center text-center p-4 md:p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 animate-pulse">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-white/15 rounded-full mb-3 md:mb-4" />
            <div className="h-2.5 w-12 bg-white/10 rounded mb-2" />
            <div className="h-3.5 w-28 bg-white/20 rounded" />
        </div>
    );
};

export default ContactCardSkeleton;