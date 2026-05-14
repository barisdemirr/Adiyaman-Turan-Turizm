import React from 'react';

const ContactCard = ({ item }) => {
  return (
    <a
      className="reveal group flex flex-col items-center text-center p-4 md:p-6 bg-white/10 backdrop-blur-md rounded-xl border border-white/20 transition-all duration-300 hover:bg-white/15 active:scale-95"
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div
        className={`w-12 h-12 md:w-14 md:h-14 ${item.bgColor} ${item.textColor} rounded-full flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform`}
      >
        <span
          className="material-symbols-outlined text-[22px] md:text-[28px]"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {item.icon}
        </span>
      </div>
      <span className="font-label-bold text-[9px] md:text-[11px] text-secondary-fixed uppercase tracking-widest mb-1">
        {item.label}
      </span>
      <span className="font-bold text-white text-xs md:text-sm break-all">
        {item.content}
      </span>
    </a>
  );
};

export default ContactCard;