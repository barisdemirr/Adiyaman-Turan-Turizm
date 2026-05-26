"use client"

import React, { useCallback, useState, useEffect } from 'react';
import NavLink from './components/NavLink';
import Image from 'next/image';

const Navbar = () => {
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [navClass, setNavClass] = useState("translate-y-0");

    const toggleMenu = useCallback(() => setIsNavOpen((prev) => !prev), []);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        let accumulatedDown = 0;
        let accumulatedUp = 0;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY <= 150) {
                setNavClass("translate-y-0");
                accumulatedDown = 0;
                accumulatedUp = 0;
            } else {
                const diff = currentScrollY - lastScrollY;

                if (diff > 0) {
                    accumulatedUp = 0;
                    accumulatedDown += diff;
                    if (accumulatedDown >= 50) {
                        setNavClass("-translate-y-full");
                    }
                } else if (diff < 0) {
                    accumulatedDown = 0;
                    accumulatedUp += Math.abs(diff);
                    if (accumulatedUp >= 10) {
                        setNavClass("translate-y-0");
                    }
                }
            }
            lastScrollY = currentScrollY;
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const sectionIds = ["home", "turlar", "hakkimizda", "iletisim"];

        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -70% 0px",
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        const observedElements = new Set();

        const handleScrollAndBind = () => {
            sectionIds.forEach((id) => {
                if (!observedElements.has(id)) {
                    const el = document.getElementById(id);
                    if (el) {
                        observer.observe(el);
                        observedElements.add(id);
                    }
                }
            });
        };

        handleScrollAndBind();

        window.addEventListener("scroll", handleScrollAndBind, { passive: true });

        return () => {
            observer.disconnect();
            window.removeEventListener("scroll", handleScrollAndBind);
        };
    }, []);

    return (
        <header className={`fixed top-0 w-full z-50 border-b border-slate-200/50 backdrop-blur-md shadow-sm transition-transform duration-300 ${navClass} ${isNavOpen ? 'bg-white' : 'bg-white/80'}`}>
            <div className="flex justify-between items-center max-w-[1280px] mx-auto px-6 h-20">
                {/* Logo */}
                <a className="text-xl font-extrabold tracking-tight text-slate-900 font-h4" href="#">
                    <Image
                        src="/attlogonavbar.png"
                        loading="eager"
                        alt="Adıyaman Turan Turizm"
                        fetchPriority="high"
                        width={110}
                        height={40}
                        className="object-contain"
                        quality={75}
                    />
                </a>
                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8">
                    <NavLink href="/#" title="Anasayfa" isActive={activeSection === 'home'} />
                    <NavLink href="/#turlar" title="Turları Keşfet" isActive={activeSection === 'turlar'} />
                    <NavLink href="/#hakkimizda" title="Hakkımızda" isActive={activeSection === 'hakkimizda'} />
                    <NavLink href="/#iletisim" title="İletişim" isActive={activeSection === 'iletisim'} />
                </nav>
                {/* CTA & Mobile Menu */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container text-body-sm font-label-bold cursor-pointer">
                        <span className="material-symbols-outlined text-sm w-6 h-6 inline-flex items-center justify-center overflow-hidden shrink-0" data-icon="language">
                            language
                        </span>
                        <span>EN</span>
                    </div>
                    <div className="hidden lg:block w-px h-6 bg-surface-variant"></div>
                    <a
                        href='/#hizli-rezervasyon'
                        className="hidden lg:inline-flex items-center justify-center bg-primary text-on-primary font-label-bold text-label-bold px-6 py-3 rounded-full hover:bg-tertiary transition-colors scale-95 active:scale-90 shadow-sm"
                    >
                        Hızlı Rezervasyon
                    </a>

                    {/* Hamburger Button */}
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden p-2 text-on-surface hover:bg-surface-container rounded-full transition-colors"
                    >
                        <span className="material-symbols-outlined w-6 h-6 inline-flex items-center justify-center overflow-hidden shrink-0">
                            {isNavOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>
            {/* Mobile Menu Content */}
            <div className={`lg:hidden overflow-hidden transition-all duration-300 bg-white border-t border-slate-100
                ${isNavOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <nav className="flex flex-col gap-4 p-6">
                    <NavLink href="/#" title="Anasayfa" isActive={activeSection === 'home'} onClick={() => setIsNavOpen(false)} />
                    <NavLink href="/#turlar" title="Turları Keşfet" isActive={activeSection === 'turlar'} onClick={() => setIsNavOpen(false)} />
                    <NavLink href="/#hakkimizda" title="Hakkımızda" isActive={activeSection === 'hakkimizda'} onClick={() => setIsNavOpen(false)} />
                    <NavLink href="/#iletisim" title="İletişim" isActive={activeSection === 'iletisim'} onClick={() => setIsNavOpen(false)} />

                    <hr className="border-slate-100 my-2" />

                    <a
                        href='/#hizli-rezervasyon'
                        onClick={() => setIsNavOpen(false)}
                        className="w-full flex items-center justify-center bg-primary text-on-primary font-label-bold px-6 py-4 rounded-xl shadow-sm active:scale-95 transition-transform"
                    >
                        Hızlı Rezervasyon
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;