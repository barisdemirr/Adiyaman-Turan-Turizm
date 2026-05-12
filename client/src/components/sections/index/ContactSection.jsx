import React from 'react';

const ContactSection = () => {
  return (
    <section
      className="py-10 md:py-xl px-4 md:px-6 bg-secondary text-on-secondary"
      id="iletisim"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Başlık Bölümü */}
        <div className="mb-10 md:mb-16 text-center">
          <h2 className="reveal font-h2 font-bold text-2xl md:text-h2 text-white mb-3 md:mb-4">
            Bizimle İletişime Geçin
          </h2>
          <p className="reveal font-body-md text-xs md:text-body-md text-secondary-fixed max-w-2xl mx-auto px-2 opacity-90">
            Sorularınız ve rezervasyon talepleriniz için bize her zaman ulaşabilirsiniz.
            Ekibimiz size yardımcı olmaktan mutluluk duyacaktır.
          </p>
        </div>

        <address className="not-italic">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 md:gap-6">
            {[
              {
                href: "https://wa.me/905000000000",
                icon: "chat",
                bgColor: "bg-green-500/20",
                textColor: "text-green-400",
                label: "WhatsApp",
                content: "+90 500 000 00 00",
              },
              {
                href: "tel:+904160000000",
                icon: "call",
                bgColor: "bg-primary-fixed/20",
                textColor: "text-primary-fixed",
                label: "Telefon",
                content: "+90 416 000 00 00",
              },
              {
                href: "mailto:info@adiyamanturan.com",
                icon: "mail",
                bgColor: "bg-blue-500/20",
                textColor: "text-blue-400",
                label: "E-posta",
                content: "info@adiyamanturan.com",
              },
              {
                href: "#",
                icon: "photo_camera",
                bgColor: "bg-pink-500/20",
                textColor: "text-pink-400",
                label: "Instagram",
                content: "@adiyamanturan",
              },
              {
                href: "#",
                icon: "public",
                bgColor: "bg-indigo-500/20",
                textColor: "text-indigo-400",
                label: "Facebook",
                content: "Adıyaman Turan",
              },
            ].map((item, index) => (
              <a
                key={index}
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
            ))}
          </div>
        </address>
      </div>
    </section>
  );
};

export default ContactSection;