"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function AnimationProvider({ children }) {
    const pathname = usePathname();

    useEffect(() => {
        const intersectionObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    intersectionObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px" 
        });

        const refreshObservers = () => {
            const elements = document.querySelectorAll(".reveal:not(.visible)");
            elements.forEach((el) => intersectionObserver.observe(el));
        };

        const timeoutId = setTimeout(() => {
            refreshObservers();
        }, 50);

        return () => {
            intersectionObserver.disconnect();
            clearTimeout(timeoutId);
        };
    }, [pathname]); 

    return <>{children}</>;
}