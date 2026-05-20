"use client";

import React, { useState, useEffect } from 'react';
import ContactCard from './components/ContactCard';
import { GetAllContacts } from '@/services/ContactService';
import ContactCardSkeleton from '@/components/ui/skeletons/ContactInfoSkeleton';

const ContactSection = ({ ContactData }) => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await GetAllContacts();
        setContacts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchContacts();
  }, []);

  useEffect(() => {
    if (isLoading || !contacts || contacts.length === 0) return;

    let observer;

    const timer = setTimeout(() => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      const elements = document.querySelectorAll(".contact-grid .reveal");
      elements.forEach((el) => observer.observe(el));
    }, 100);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [isLoading, contacts]);

  const getContactValue = (keyName) => {
    return contacts.find(c => c.name?.toLowerCase() === keyName.toLowerCase())?.value || '';
  };

  const whatsappVal = getContactValue('Whatsapp');
  const phoneVal = getContactValue('Phone');
  const emailVal = getContactValue('Email');
  const instagramVal = getContactValue('Instagram');

  const contactItems = [
    {
      href: `https://wa.me/${whatsappVal}`,
      icon: "chat",
      bgColor: "bg-green-500/20",
      textColor: "text-green-400",
      label: "WhatsApp",
      content: whatsappVal || "Bulunamadı",
    },
    {
      href: `tel:${phoneVal}`,
      icon: "call",
      bgColor: "bg-primary-fixed/20",
      textColor: "text-primary-fixed",
      label: "Telefon",
      content: phoneVal || "Bulunamadı",
    },
    {
      href: `mailto:${emailVal}`,
      icon: "mail",
      bgColor: "bg-blue-500/20",
      textColor: "text-blue-400",
      label: "E-posta",
      content: emailVal || "Bulunamadı",
    },
    {
      href: `https://instagram.com/${instagramVal}`,
      icon: "photo_camera",
      bgColor: "bg-pink-500/20",
      textColor: "text-pink-400",
      label: "Instagram",
      content: instagramVal ? `@${instagramVal}` : "Bulunamadı",
    },
  ];

  return (
    <section
      className="py-10 md:py-xl px-4 md:px-6 bg-secondary text-on-secondary"
      id="iletisim"
    >
      <div className="max-w-[1280px] mx-auto">
        <div className="mb-10 md:mb-16 text-center">
          <h2 className="reveal font-h2 font-bold text-2xl md:text-h2 text-white mb-3 md:mb-4">
            {ContactData?.title}
          </h2>
          <p className="reveal font-body-md text-xs md:text-body-md text-secondary-fixed max-w-2xl mx-auto px-2 opacity-90">
            {ContactData?.description}
          </p>
        </div>

        <address className="not-italic">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 contact-grid">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => (
                <ContactCardSkeleton key={`skeleton-${index}`} />
              ))
              : contactItems.map((item, index) => (
                <ContactCard key={index} item={item} />
              ))}
          </div>
        </address>
      </div>
    </section>
  );
};

export default ContactSection;