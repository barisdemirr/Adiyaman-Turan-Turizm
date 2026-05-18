"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function HashScrollHandler() {
    const pathname = usePathname();

    useEffect(() => {
        const handleHashScroll = () => {
            const hash = window.location.hash;

            if (hash) {
                const targetId = hash.replace("#", "");
                const element = document.getElementById(targetId);

                if (element) {
                    setTimeout(() => {
                        element.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        });
                    }, 100);
                }
            }
        };

        handleHashScroll();

        window.addEventListener("hashchange", handleHashScroll);
        return () => window.removeEventListener("hashchange", handleHashScroll);
    }, [pathname]); 

    return null; 
}