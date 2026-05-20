'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminSidebar() {
    const pathname = usePathname();

    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isPanelOpen, setIsPanelOpen] = useState(false);
    const [isSectionsOpen, setIsSectionsOpen] = useState(false);

    const independentPanelRoutes = [
        '/admin/tours',
        '/admin/about-cards',
        '/admin/contact-info',
        '/admin/service-cards'
    ];

    useEffect(() => {
        const isIndependent = independentPanelRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));

        if (pathname.startsWith('/admin/sections') || isIndependent) {
            setIsPanelOpen(true);
        }

        if (pathname.startsWith('/admin/sections/')) {
            setIsSectionsOpen(true);
        }
    }, [pathname]);

    const getLinkClass = (path, level = 1) => {
        const isActive = path === '/admin' ? pathname === '/admin' : (pathname === path || pathname.startsWith(path + '/'));

        if (level === 3) {
            return `block px-3 py-2 text-xs rounded-md transition-colors ${isActive ? 'font-semibold text-primary bg-primary/10' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`;
        }

        if (level === 2) {
            return `flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors group font-medium ${isActive ? 'bg-primary/5 text-primary font-bold' : 'hover:bg-slate-50 text-slate-600'}`;
        }

        return `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors group font-medium ${isActive ? 'bg-primary/10 text-primary font-bold' : 'hover:bg-slate-50 text-slate-600'}`;
    };

    const isPanelActive = pathname.startsWith('/admin/sections') || independentPanelRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));
    const isSectionsActive = pathname.startsWith('/admin/sections/');

    return (
        <>
            <button
                onClick={() => setIsMobileOpen(true)}
                className={`fixed top-4 left-4 z-50 md:hidden flex items-center justify-center w-10 h-10 bg-white border border-slate-200 rounded-lg text-primary shadow-sm hover:bg-slate-50 transition-colors ${isMobileOpen ? 'hidden' : 'flex'}`}
            >
                <span className="material-icons-round text-2xl">menu</span>
            </button>

            {isMobileOpen && (
                <div
                    onClick={() => setIsMobileOpen(false)}
                    className="fixed inset-0 bg-black/30 z-30 md:hidden animate-fade-in"
                />
            )}

            <aside className={`fixed left-0 top-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col h-screen justify-between flex-shrink-0 transition-transform duration-300 ease-in-out md:translate-x-0 ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                <div className="p-4 flex-1 overflow-y-auto space-y-6">

                    <div className="flex items-center gap-3 px-2 py-3 border-b border-slate-100">
                        <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-white">
                            <span className="material-icons-round text-xl">dashboard</span>
                        </div>
                        <span className="font-bold text-lg tracking-tight text-slate-900">
                            Portfolio<span className="text-primary">Admin</span>
                        </span>
                    </div>

                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-2">
                            Ana Menü
                        </p>

                        <nav className="space-y-1">

                            <Link
                                href="/admin"
                                className={getLinkClass('/admin', 1)}
                                onClick={() => setIsMobileOpen(false)}
                            >
                                <span className="material-icons-outlined">space_dashboard</span>
                                <span>Dashboard</span>
                            </Link>

                            <div className="pt-1">
                                <button
                                    onClick={() => setIsPanelOpen(!isPanelOpen)}
                                    className={`w-full cursor-pointer flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors group font-medium ${isPanelActive ? 'bg-primary/5 text-primary font-bold' : isPanelOpen ? 'bg-slate-50 text-slate-990' : 'hover:bg-slate-50 text-slate-600'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="material-icons-outlined">layers</span>
                                        <span>Panel</span>
                                    </div>
                                    <span className={`material-icons-outlined text-sm transition-transform duration-200 ${isPanelOpen ? 'rotate-180' : ''}`}>
                                        expand_more
                                    </span>
                                </button>

                                {isPanelOpen && (
                                    <div className="pl-4 pr-1 py-2 space-y-2 bg-slate-50/40 border-l-2 border-slate-100 mt-1 rounded-r-lg">

                                        <div>
                                            <button
                                                onClick={() => setIsSectionsOpen(!isSectionsOpen)}
                                                className={`w-full flex items-center cursor-pointer justify-between px-3 py-2 text-sm rounded-lg transition-colors font-medium ${isSectionsActive ? 'text-primary font-bold bg-primary/5' : 'text-slate-600 hover:bg-slate-50'}`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <span className="material-icons-outlined text-base">folder</span>
                                                    <span>Bölümler</span>
                                                </div>
                                                <span className={`material-icons-outlined text-xs transition-transform duration-200 ${isSectionsOpen ? 'rotate-180' : ''}`}>
                                                    expand_more
                                                </span>
                                            </button>

                                            {isSectionsOpen && (
                                                <div className="pl-6 pr-2 py-1 space-y-1 bg-white border border-slate-100 rounded-md mt-1">
                                                    <Link href="/admin/sections/hero" className={getLinkClass('/admin/sections/hero', 3)} onClick={() => setIsMobileOpen(false)}>Giriş</Link>
                                                    <Link href="/admin/sections/services" className={getLinkClass('/admin/sections/services', 3)} onClick={() => setIsMobileOpen(false)}>Servisler</Link>
                                                    <Link href="/admin/sections/favorites" className={getLinkClass('/admin/sections/favorites', 3)} onClick={() => setIsMobileOpen(false)}>Favoriler</Link>
                                                    <Link href="/admin/sections/tours" className={getLinkClass('/admin/sections/tours', 3)} onClick={() => setIsMobileOpen(false)}>Turlar</Link>
                                                    <Link href="/admin/sections/about" className={getLinkClass('/admin/sections/about', 3)} onClick={() => setIsMobileOpen(false)}>Hakkımızda</Link>
                                                    <Link href="/admin/sections/gallery" className={getLinkClass('/admin/sections/gallery', 3)} onClick={() => setIsMobileOpen(false)}>Galeri</Link>
                                                    <Link href="/admin/sections/contact" className={getLinkClass('/admin/sections/contact', 3)} onClick={() => setIsMobileOpen(false)}>İletişim</Link>
                                                </div>
                                            )}
                                        </div>

                                        <Link href="/admin/tours" className={getLinkClass('/admin/tours', 2)} onClick={() => setIsMobileOpen(false)}>
                                            <span className="material-icons-outlined text-base">card_travel</span>
                                            <span>Turlar</span>
                                        </Link>

                                        <Link href="/admin/about-cards" className={getLinkClass('/admin/about-cards', 2)} onClick={() => setIsMobileOpen(false)}>
                                            <span className="material-icons-outlined text-base">badge</span>
                                            <span>Hakkımızda Kartları</span>
                                        </Link>

                                        <Link href="/admin/contact-info" className={getLinkClass('/admin/contact-info', 2)} onClick={() => setIsMobileOpen(false)}>
                                            <span className="material-icons-outlined text-base">contact_phone</span>
                                            <span>İletişim Bilgileri</span>
                                        </Link>

                                        <Link href="/admin/service-cards" className={getLinkClass('/admin/service-cards', 2)} onClick={() => setIsMobileOpen(false)}>
                                            <span className="material-icons-outlined text-base">home_repair_service</span>
                                            <span>Servis Kartları</span>
                                        </Link>

                                    </div>
                                )}
                            </div>

                            <div className="pt-2 border-t border-slate-100 mt-2">
                                <Link href="/admin/settings" className={getLinkClass('/admin/settings', 1)} onClick={() => setIsMobileOpen(false)}>
                                    <span className="material-icons-outlined">settings</span>
                                    <span>Ayarlar</span>
                                </Link>
                            </div>

                        </nav>
                    </div>
                </div>

                <div className="p-4 border-t border-slate-200 bg-white">
                    <Link
                        href="/admin/logout"
                        className="flex items-center gap-3 px-3 py-2.5 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors font-medium w-full"
                    >
                        <span className="material-icons-outlined">logout</span>
                        <span>Çıkış Yap</span>
                    </Link>
                </div>

            </aside>
        </>
    );
}