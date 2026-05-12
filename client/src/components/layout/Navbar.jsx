import React from 'react';

const Navbar = () => {
    return (
        <header className="fixed top-0 w-full z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-md shadow-sm">
            <div className="flex justify-between items-center max-w-[1280px] mx-auto px-6 h-20">
                {/* Logo */}
                <a className="text-xl font-extrabold tracking-tight text-slate-900 font-h4" href="#">
                    Adıyaman Turan Turizm
                </a>
                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-8">
                    <a
                        className="text-slate-600 hover:text-orange-500 hover:bg-slate-50 transition-all duration-300 font-display font-medium text-sm px-2 py-1 rounded"
                        href="#"
                    >
                        Home
                    </a>
                    <a
                        className="text-slate-600 hover:text-orange-500 hover:bg-slate-50 transition-all duration-300 font-display font-medium text-sm px-2 py-1 rounded"
                        href="#"
                    >
                        About Us
                    </a>
                    <a
                        className="text-slate-600 hover:text-orange-500 hover:bg-slate-50 transition-all duration-300 font-display font-medium text-sm px-2 py-1 rounded"
                        href="#"
                    >
                        Daily Tours
                    </a>
                    <a
                        className="text-slate-600 hover:text-orange-500 hover:bg-slate-50 transition-all duration-300 font-display font-medium text-sm px-2 py-1 rounded"
                        href="#"
                    >
                        Stayovers
                    </a>
                    <a
                        className="text-slate-600 hover:text-orange-500 hover:bg-slate-50 transition-all duration-300 font-display font-medium text-sm px-2 py-1 rounded"
                        href="#"
                    >
                        Blog
                    </a>
                    <a
                        className="text-slate-600 hover:text-orange-500 hover:bg-slate-50 transition-all duration-300 font-display font-medium text-sm px-2 py-1 rounded"
                        href="#"
                    >
                        Contact
                    </a>
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
                    <a
                        className="hidden md:inline-flex items-center justify-center bg-primary text-on-primary font-label-bold text-label-bold px-6 py-3 rounded-full hover:bg-tertiary transition-colors scale-95 active:scale-90 shadow-sm"
                        href="#"
                    >
                        Book Online
                    </a>
                    <button className="md:hidden p-2 text-on-surface hover:bg-surface-container rounded-full transition-colors">
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;