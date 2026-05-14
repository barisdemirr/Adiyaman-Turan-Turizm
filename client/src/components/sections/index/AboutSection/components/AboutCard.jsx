import React from 'react';

const AboutCard = ({ icon, title, description }) => {
  return (
    <div className="reveal select-none bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all text-center">
      <div className="text-primary-fixed mb-4 md:mb-6">
        <span className="text-[32px] md:text-[40px] grayscale contrast-200 brightness-75">
          {icon}
        </span>
      </div>
      <h3 className="font-h4 text-base md:text-h4 text-white mb-2 md:mb-3">
        {title}
      </h3>
      <p className="font-body-sm text-xs md:text-body-sm text-secondary-fixed leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default AboutCard;