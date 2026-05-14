"use client"

import React from 'react';
import { useState, useEffect } from 'react';
import NavLink from './components/NavLink';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const router = useRouter();

    const [isNavOpen, setIsNavOpen] = useState(false);

    const [activeSection, setActiveSection] = useState("");

    const toggleMenu = () => setIsNavOpen(!isNavOpen);


    const scrollDown = () => {
        setIsNavOpen(false);
        router.push('/?quickReservation=true');
    };


    useEffect(() => {
        const sectionIds = ["home", "turlar", "hakkimizda", "iletisim"]; 

        const observerOptions = {
            root: null, 
            rootMargin: "-20% 0px -70% 0px", 
            threshold: 0, 
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sectionIds.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect(); 
    }, []);

    return (
        <header className={`fixed top-0 w-full z-50 border-b border-slate-200/50 backdrop-blur-md shadow-sm ${isNavOpen ? 'bg-white' : 'bg-white/80'}`}>
            <div className="flex justify-between items-center max-w-[1280px] mx-auto px-6 h-20">
                {/* Logo */}
                <a className="text-xl font-extrabold tracking-tight text-slate-900 font-h4" href="#">
                    <Image src="/attlogonavbar.png" loading="eager" alt="Adıyaman Turan Turizm" width={0} height={0} sizes="100vw" className='h-[40px] sm:h-[50px] lg:h-[60px] w-auto' />
                </a>
                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-8">
                    <NavLink href="/#" title="Anasayfa" isActive={activeSection === 'home'}/>
                    <NavLink href="/#turlar" title="Turları Keşfet" isActive={activeSection === 'turlar'}/>
                    <NavLink href="/#hakkimizda" title="Hakkımızda" isActive={activeSection === 'hakkimizda'}/>
                    <NavLink href="/#iletisim" title="İletişim" isActive={activeSection === 'iletisim'}/>
                </nav>
                {/* CTA & Mobile Menu */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container text-body-sm font-label-bold cursor-pointer">
                        <span className="material-symbols-outlined text-sm" data-icon="language">
                            language
                        </span>
                        <span>EN</span>
                    </div>
                    <div className="hidden lg:block w-px h-6 bg-surface-variant"></div>
                    <button
                        className="hidden lg:inline-flex items-center justify-center bg-primary text-on-primary font-label-bold text-label-bold px-6 py-3 rounded-full hover:bg-tertiary transition-colors scale-95 active:scale-90 shadow-sm"
                        onClick={scrollDown}
                    >
                        Hızlı Rezervasyon
                    </button>

                    {/* Hamburger Button */}
                    <button
                        onClick={toggleMenu}
                        className="lg:hidden p-2 text-on-surface hover:bg-surface-container rounded-full transition-colors"
                    >
                        <span className="material-symbols-outlined">
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

                    <button
                        className="w-full flex items-center justify-center bg-primary text-on-primary font-label-bold px-6 py-4 rounded-xl shadow-sm active:scale-95 transition-transform"
                        onClick={scrollDown}
                    >
                        Hızlı Rezervasyon
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;