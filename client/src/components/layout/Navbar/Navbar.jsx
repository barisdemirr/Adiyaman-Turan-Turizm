"use client"

import React from 'react';
import { useState } from 'react';
import NavLink from './components/NavLink';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import Image from 'next/image';

const Navbar = () => {
    useScrollReveal();

    const [isActive, setIsActive] = useState('home');
    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleMenu = () => setIsNavOpen(!isNavOpen);

    const handleLinkClick = (id) => {
        setIsActive(id);
        setIsNavOpen(false);
    };

    const scrollDown = () => {
        setIsNavOpen(false);
        window.scrollBy({
            top: 550,
            left: 0,
            behavior: 'smooth'
        });
    };

    return (
        <header className={`fixed top-0 w-full z-50 border-b border-slate-200/50 backdrop-blur-md shadow-sm ${isNavOpen ? 'bg-white' : 'bg-white/80'}`}>
            <div className="flex justify-between items-center max-w-[1280px] mx-auto px-6 h-20">
                {/* Logo */}
                <a className="text-xl font-extrabold tracking-tight text-slate-900 font-h4" href="#">
                    <Image src="/attlogonavbar.png" alt="Adıyaman Turan Turizm" width={0} height={0} sizes="100vw" className='h-[40px] sm:h-[50px] lg:h-[60px] w-auto' />
                </a>
                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <NavLink href="#" title="Anasayfa" isActive={isActive === 'home'} onClick={() => setIsActive('home')} />
                    <NavLink href="#turlar" title="Turları Keşfet" isActive={isActive === 'tours'} onClick={() => setIsActive('tours')} />
                    <NavLink href="#hakkimizda" title="Hakkımızda" isActive={isActive === 'about'} onClick={() => setIsActive('about')} />
                    <NavLink href="#iletisim" title="İletişim" isActive={isActive === 'contact'} onClick={() => setIsActive('contact')} />
                </nav>
                {/* CTA & Mobile Menu */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container text-body-sm font-label-bold cursor-pointer">
                        <span className="material-symbols-outlined text-sm" data-icon="language">
                            language
                        </span>
                        <span>EN</span>
                    </div>
                    <div className="hidden md:block w-px h-6 bg-surface-variant"></div>
                    <button
                        className="hidden md:inline-flex items-center justify-center bg-primary text-on-primary font-label-bold text-label-bold px-6 py-3 rounded-full hover:bg-tertiary transition-colors scale-95 active:scale-90 shadow-sm"
                        onClick={scrollDown}
                    >
                        Hızlı Rezervasyon
                    </button>

                    {/* Hamburger Button */}
                    <button
                        onClick={toggleMenu}
                        className="md:hidden p-2 text-on-surface hover:bg-surface-container rounded-full transition-colors"
                    >
                        <span className="material-symbols-outlined">
                            {isNavOpen ? 'close' : 'menu'}
                        </span>
                    </button>
                </div>
            </div>
            {/* Mobile Menu Content */}
            <div className={`md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-slate-100
                ${isNavOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                <nav className="flex flex-col gap-4 p-6">
                    <NavLink href="#" title="Anasayfa" isActive={isActive === 'home'} onClick={() => handleLinkClick('home')} />
                    <NavLink href="#turlar" title="Turları Keşfet" isActive={isActive === 'tours'} onClick={() => handleLinkClick('tours')} />
                    <NavLink href="#hakkimizda" title="Hakkımızda" isActive={isActive === 'about'} onClick={() => handleLinkClick('about')} />
                    <NavLink href="#iletisim" title="İletişim" isActive={isActive === 'contact'} onClick={() => handleLinkClick('contact')} />

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