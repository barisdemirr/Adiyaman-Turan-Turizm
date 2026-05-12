import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-slate-50 border-t border-slate-200 w-full mt-12 md:mt-24">
      <div className="max-w-[1280px] mx-auto py-10 md:py-16 px-6 md:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
        {/* Brand / Copyright */}
        <div className="flex flex-col gap-3 md:gap-4">
          <span className="text-base md:text-lg font-bold text-slate-800 font-h4">Adıyaman Turan Turizm</span>
          <p className="font-['Plus_Jakarta_Sans'] text-xs md:text-sm leading-relaxed text-slate-500 opacity-90">
            © 2024 Adıyaman Turan Turizm. Heritage and Hospitality since 1988.
          </p>
        </div>

        {/* Links Column 1 */}
        <div className="flex flex-col gap-2 md:gap-3">
          <h4 className="font-label-bold text-[10px] md:text-caption text-slate-800 uppercase tracking-widest mb-1 md:mb-2">
            Tours
          </h4>
          <a
            className="text-slate-500 hover:text-orange-500 transition-all font-['Plus_Jakarta_Sans'] text-xs md:text-sm"
            href="#"
          >
            Daily Tours
          </a>
          <a
            className="text-slate-500 hover:text-orange-500 transition-all font-['Plus_Jakarta_Sans'] text-xs md:text-sm"
            href="#"
          >
            Cultural Tours
          </a>
          <a
            className="text-slate-500 hover:text-orange-500 transition-all font-['Plus_Jakarta_Sans'] text-xs md:text-sm"
            href="#"
          >
            Stayovers
          </a>
        </div>

        {/* Links Column 2 */}
        <div className="flex flex-col gap-2 md:gap-3">
          <h4 className="font-label-bold text-[10px] md:text-caption text-slate-800 uppercase tracking-widest mb-1 md:mb-2">
            Services
          </h4>
          <a
            className="text-slate-500 hover:text-orange-500 transition-all font-['Plus_Jakarta_Sans'] text-xs md:text-sm"
            href="#"
          >
            Vehicle Rentals
          </a>
          <a
            className="text-slate-500 hover:text-orange-500 transition-all font-['Plus_Jakarta_Sans'] text-xs md:text-sm"
            href="#"
          >
            Privacy Policy
          </a>
          <a
            className="text-slate-500 hover:text-orange-500 transition-all font-['Plus_Jakarta_Sans'] text-xs md:text-sm"
            href="#"
          >
            Contact
          </a>
        </div>

        {/* Contact / Badges */}
        <div className="flex flex-col gap-3 md:gap-4">
          <h4 className="font-label-bold text-[10px] md:text-caption text-slate-800 uppercase tracking-widest mb-1 md:mb-2">
            Connect With Us
          </h4>
          <a className="flex items-center gap-2 text-slate-500 hover:text-orange-500 transition-colors" href="#">
            <span className="material-symbols-outlined text-[18px] md:text-[20px]">call</span>
            <span className="font-['Plus_Jakarta_Sans'] text-xs md:text-sm">+90 555 123 4567</span>
          </a>
          <a className="flex items-center gap-2 text-slate-500 hover:text-orange-500 transition-colors" href="#">
            <span className="material-symbols-outlined text-[18px] md:text-[20px]">mail</span>
            <span className="font-['Plus_Jakarta_Sans'] text-xs md:text-sm break-all">info@turanturizm.com</span>
          </a>
          <div className="mt-2 md:mt-4 p-2.5 md:p-3 bg-white border border-slate-200 rounded-lg inline-block self-start shadow-sm">
            <div className="text-[9px] md:text-xs font-bold text-slate-600 text-center flex flex-col items-center">
              <span className="material-symbols-outlined text-orange-600 mb-0.5 text-[18px] md:text-[20px]">verified</span>
              TÜRSAB MEMBER
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;