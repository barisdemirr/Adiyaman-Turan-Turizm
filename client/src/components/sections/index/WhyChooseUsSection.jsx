import React from 'react';

const WhyChooseUsSection = () => {
  return (
    <section className="py-10 md:py-xl px-4 md:px-6 bg-secondary text-on-secondary">
      <div className="max-w-[1280px] mx-auto">
        {/* Başlık Bölümü */}
        <div className="mb-10 md:mb-16 text-center">
          <h2 className="font-h2 font-bold text-2xl md:text-h2 text-white mb-3 md:mb-4">
            Neden Bizi Tercih Etmelisiniz?
          </h2>
          <p className="font-body-md text-sm md:text-body-md text-secondary-fixed max-w-2xl mx-auto px-4 opacity-90">
            1988'den beri misafirlerimize en kaliteli ve güvenilir seyahat deneyimini sunmak için çalışıyoruz.
          </p>
        </div>

        {/* Kartlar Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            {
              icon: "workspace_premium",
              title: "35 Yıllık Deneyim",
              description:
                "Yarım asra yaklaşan tecrübemizle bölgenin en köklü acentelerinden biriyiz.",
            },
            {
              icon: "explore",
              title: "Uzman Yerel Rehberler",
              description:
                "Bölgeyi en iyi bilen, profesyonel rehberlerle her anı keşfedin.",
            },
            {
              icon: "support_agent",
              title: "7/24 Müşteri Desteği",
              description:
                "Seyahatinizin her aşamasında bir telefon uzağınızdayız.",
            },
            {
              icon: "verified_user",
              title: "TÜRSAB Onaylı Güven",
              description:
                "Tüm turlarımız yasal mevzuata tam uygun şekilde düzenlenir.",
            },
          ].map((card, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md p-6 md:p-8 rounded-xl border border-white/20 hover:bg-white/15 transition-all text-center"
            >
              <div className="text-primary-fixed mb-4 md:mb-6">
                <span className="material-symbols-outlined text-[32px] md:text-[40px]">
                  {card.icon}
                </span>
              </div>
              <h3 className="font-h4 text-base md:text-h4 text-white mb-2 md:mb-3">
                {card.title}
              </h3>
              <p className="font-body-sm text-xs md:text-body-sm text-secondary-fixed leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;