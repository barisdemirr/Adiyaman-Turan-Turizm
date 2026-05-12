"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export const useScrollReveal = () => {
    const pathname = usePathname();

    useEffect(() => {
        const observerOptions = {
            threshold: 0.15,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        }, observerOptions);

        // DOM'daki tüm .reveal sınıflarını yakala
        const revealElements = document.querySelectorAll(".reveal");
        revealElements.forEach((el) => observer.observe(el));

        return () => {
            revealElements.forEach((el) => observer.unobserve(el));
        };
    }, [pathname]); // Sayfa değiştiğinde (SPA geçişlerinde) tekrar tara
};