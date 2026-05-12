import React from 'react';

const ServiceCard = ({ icon, title, description }) => {
    return (

        <div className="reveal group bg-surface-container-lowest border border-surface-variant rounded-xl p-5 md:p-8 hover:shadow-md transition-all duration-300">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-secondary-container text-on-secondary-container rounded-lg flex items-center justify-center mb-4 md:mb-6 group-hover:scale-105 transition-transform">
                <p className="text-[24px] md:text-[28px]" >
                    {icon}
                </p>
            </div>
            <h3 className="font-h4 text-base md:text-h4 text-on-surface mb-2 md:mb-3">{title}</h3>
            <p className="font-body-sm text-xs md:text-body-sm text-secondary">
                {description}
            </p>
        </div>
    );
};

export default ServiceCard;