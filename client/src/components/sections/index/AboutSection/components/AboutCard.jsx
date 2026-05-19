import React from 'react';

const AboutCard = ({ icon, title, description }) => {
  return (
    <div className="reveal flex items-center select-none bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-xl border border-primary-fixed/40 hover:bg-white/30 transition-all text-center">
      <div>
        <h3 className="font-h4 text-base md:text-h4 text-white mb-2 md:mb-3">
          {title}
        </h3>
        <p className="font-body-sm text-xs md:text-body-sm text-secondary-fixed leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AboutCard;