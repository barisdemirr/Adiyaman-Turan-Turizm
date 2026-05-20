"use client";

import React, { useState } from 'react';
import ContactCard from './components/ContactCard';

const ContactSection = ({ ContactData, contact }) => {
  const [accounts, setAccounts] = useState([]);


  const contactItems = [
    {
      href: `https://wa.me/${contact?.whatsappPhone}`,
      icon: "chat",
      bgColor: "bg-green-500/20",
      textColor: "text-green-400",
      label: "WhatsApp",
      content: contact?.whatsappPhone,
    },
    {
      href: `tel:${contact?.phone}`,
      icon: "call",
      bgColor: "bg-primary-fixed/20",
      textColor: "text-primary-fixed",
      label: "Telefon",
      content: contact?.phone,
    },
    {
      href: `mailto:${contact?.email}`,
      icon: "mail",
      bgColor: "bg-blue-500/20",
      textColor: "text-blue-400",
      label: "E-posta",
      content: contact?.email,
    },
    {
      href: `https://instagram.com/${contact?.instagramUsername}`,
      icon: "photo_camera",
      bgColor: "bg-pink-500/20",
      textColor: "text-pink-400",
      label: "Instagram",
      content: contact?.instagramUsername,
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