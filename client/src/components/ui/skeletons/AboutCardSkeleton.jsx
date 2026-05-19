import React from 'react';

const AboutCardSkeleton = () => {
    return (
        <div className="bg-white/5 backdrop-blur-md p-6 md:p-8 rounded-xl border border-primary-fixed/20 animate-pulse text-center">
            <div className="h-5 bg-white/20 rounded-md mb-3 md:mb-4 w-1/2 mx-auto"></div>

            <div className="space-y-2 flex flex-col items-center">
                <div className="h-3 bg-white/15 rounded-md w-full"></div>
                <div className="h-3 bg-white/15 rounded-md w-11/12"></div>
                <div className="h-3 bg-white/15 rounded-md w-2/3"></div>
            </div>
        </div>
    );
};

export default AboutCardSkeleton;