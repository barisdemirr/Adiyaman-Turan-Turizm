"use client";

import React, { useState } from 'react';
import AboutCard from './components/AboutCard';

const AboutSection = () => {
  const [aboutItems, setAboutItems] = useState([
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
      icon: "4.5⭐​",
      title: "TÜRSAB Onaylı Güven",
      description:
        "Tüm turlarımız yasal mevzuata tam uygun şekilde düzenlenir.",
    },
  ]);


  return (
    <section className="py-10 md:py-xl px-4 md:px-6 bg-secondary text-on-secondary" id='hakkimizda'>
      <div className="max-w-[1280px] mx-auto">
        {/* Başlık Bölümü */}
        <div className="mb-10 md:mb-16 text-center">
          <h2 className="reveal font-h2 font-bold text-2xl md:text-h2 text-white mb-3 md:mb-4">
            Neden Bizi Tercih Etmelisiniz?
          </h2>
          <p className="reveal font-body-md text-sm md:text-body-md text-secondary-fixed max-w-2xl mx-auto px-4 opacity-90">
            1988'den beri misafirlerimize en kaliteli ve güvenilir seyahat deneyimini sunmak için çalışıyoruz.
          </p>
        </div>

        {/* Kartlar Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {aboutItems.map((card, index) => (
            <AboutCard
              key={index}
              icon={card.icon}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;