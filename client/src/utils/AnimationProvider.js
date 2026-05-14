// "use client";
// import { useEffect } from "react";
// import { usePathname } from "next/navigation";

// export default function AnimationProvider({ children }) {
//     const pathname = usePathname();

//     useEffect(() => {
//         // 1. Intersection Observer'ı Tanımla
//         const intersectionObserver = new IntersectionObserver((entries) => {
//             entries.forEach((entry) => {
//                 if (entry.isIntersecting) {
//                     entry.target.classList.add("visible");
//                     intersectionObserver.unobserve(entry.target);
//                 }
//             });
//         }, { threshold: 0.1 });

//         // 2. DOM'u Tara ve Mevcut Elemanları Bağla
//         const refreshObservers = () => {
//             const elements = document.querySelectorAll(".reveal:not(.visible)");
//             elements.forEach((el) => intersectionObserver.observe(el));
//         };

//         // İlk yüklemede çalıştır
//         refreshObservers();

//         // 3. MutationObserver ile DOM Değişikliklerini Dinle (ASIL SIR BURADA)
//         // Sayfa içeriği Next.js tarafından değiştirildiğinde burası tetiklenir
//         const mutationObserver = new MutationObserver(() => {
//             refreshObservers();
//         });

//         mutationObserver.observe(document.body, {
//             childList: true,
//             subtree: true,
//         });

//         // Temizlik
//         return () => {
//             intersectionObserver.disconnect();
//             mutationObserver.disconnect();
//         };
//     }, [pathname]); // Pathname her değiştiğinde sistemi tazele

//     return <>{children}</>;
// }