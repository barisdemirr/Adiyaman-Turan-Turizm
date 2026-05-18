"use client";

import React, { useState } from 'react';
import ContactCard from './components/ContactCard';

const ContactSection = ({ ContactData }) => {
  const [accounts, setAccounts] = useState([]);


  const contactItems = [
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
      href: "https://instagram.com/adiyamanturanturizm",
      icon: "photo_camera",
      bgColor: "bg-pink-500/20",
      textColor: "text-pink-400",
      label: "Instagram",
      content: "@adiyamanturanturizm",
    },
  ];

  return (
    <section
      className="py-10 md:py-xl px-4 md:px-6 bg-secondary text-on-secondary"
      id="iletisim"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Başlık Bölümü */}
        <div className="mb-10 md:mb-16 text-center">
          <h2 className="reveal font-h2 font-bold text-2xl md:text-h2 text-white mb-3 md:mb-4">
            {ContactData?.title}
          </h2>
          <p className="reveal font-body-md text-xs md:text-body-md text-secondary-fixed max-w-2xl mx-auto px-2 opacity-90">
            {ContactData?.description}
          </p>
        </div>

        <address className="not-italic">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {contactItems.map((item, index) => (
              <ContactCard key={index} item={item} />
            ))}
          </div>
        </address>
      </div>
    </section>
  );
};

export default ContactSection;