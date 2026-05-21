'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GetAllAboutItems, DeleteAboutItem } from '@/services/AboutItemService';

export default function AboutCardsManagementPage() {
    const [aboutCards, setAboutCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const data = await GetAllAboutItems();
                setAboutCards(data || []);
            } catch (error) {
                console.error('Veriler çekilirken hata oldu:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchItems();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Bu kartı silmek istediğinize emin misiniz?');
        if (!confirmed) return;

        try {
            await DeleteAboutItem(id);

            setAboutCards((prev) => prev.filter((card) => card.id !== id));
            alert('Kart başarıyla silindi!');
        } catch (error) {
            alert(error.message || 'Silme işlemi sırasında bir şeyler yanlış gitti.');
        }
    };

    return (
        <main className="flex-1 overflow-y-auto bg-background-light p-6 lg:p-10">
            <div className="max-w-5xl mx-auto">

                <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Hakkımızda Kartları Yönetimi</h1>
                        <p className="text-slate-500 mt-1">
                            Sitenizdeki hakkımızda alanında listelenen maddeleri ve kartları buradan yönetebilirsiniz.
                        </p>
                    </div>
                    <div>
                        <Link
                            href="/admin/about-cards/add"
                            className="bg-primary hover:bg-primary/90 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-200 shadow-sm inline-flex items-center gap-2 text-sm"
                        >
                            <span className="material-symbols-outlined text-lg">add</span>
                            Yeni Kart Ekle
                        </Link>
                    </div>
                </div>

                {/* Mobil Görünüm */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {isLoading ? (
                        Array.from({ length: 3 }).map((_, index) => (
                            <div key={`skeleton-mob-${index}`} className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm animate-pulse space-y-4">
                                <div className="h-3 w-16 bg-slate-200 rounded" />
                                <div className="h-4 w-48 bg-slate-200 rounded" />
                                <div className="pt-3 border-t border-slate-100 flex gap-4">
                                    <div className="h-8 bg-slate-200/80 rounded flex-1" />
                                    <div className="h-8 bg-slate-200/80 rounded flex-1" />
                                </div>
                            </div>
                        ))
                    ) : aboutCards.length === 0 ? (
                        <div className="bg-white border border-slate-200 p-6 rounded-xl text-center text-sm text-slate-400 font-medium">
                            Henüz hiç hakkımızda kartı eklenmemiş.
                        </div>
                    ) : (
                        aboutCards.map((item) => (
                            <div key={item.id} className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-4">
                                <div>
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kart Başlığı</span>
                                    <p className="text-sm font-semibold text-slate-800 mt-1">{item.title}</p>
                                </div>
                                <div className="pt-3 border-t border-slate-100 flex justify-end gap-4 items-center">
                                    <Link
                                        href={`/admin/about-cards/edit?id=${item.id}`}
                                        className="text-primary hover:text-primary/80 font-medium transition-colors inline-flex items-center gap-1 text-sm bg-primary/5 px-3 py-1.5 rounded-md flex-1 justify-center"
                                    >
                                        <span className="material-symbols-outlined text-base">edit</span>
                                        Düzenle
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="text-red-600 hover:text-red-900 transition-colors bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-md cursor-pointer inline-flex items-center gap-1 text-sm flex-1 justify-center"
                                    >
                                        <span className="material-symbols-outlined text-base">delete</span>
                                        Sil
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Masaüstü Görünüm */}
                <div className="hidden md:block bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-6">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                <th className="px-6 py-4 text-sm font-medium text-slate-500">Kart Başlığı</th>
                                <th className="px-6 py-4 text-sm font-medium text-slate-500 text-right">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                Array.from({ length: 3 }).map((_, index) => (
                                    <tr key={`skeleton-desk-${index}`} className="border-b border-slate-100 animate-pulse">
                                        <td className="px-6 py-4">
                                            <div className="h-4 w-56 bg-slate-200 rounded" />
                                        </td>
                                        <td className="px-6 py-4 flex justify-end gap-6 items-center">
                                            <div className="h-5 w-5 bg-slate-200 rounded" />
                                            <div className="h-5 w-5 bg-slate-200 rounded" />
                                        </td>
                                    </tr>
                                ))
                            ) : aboutCards.length === 0 ? (
                                <tr>
                                    <td colSpan="2" className="px-6 py-10 text-sm text-center text-slate-400 font-medium">
                                        Henüz hiç hakkımızda kartı eklenmemiş.
                                    </td>
                                </tr>
                            ) : (
                                aboutCards.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                                            {item.title}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-right flex justify-end gap-4 items-center">
                                            <Link
                                                href={`/admin/about-cards/edit?id=${item.id}`}
                                                className="text-primary hover:text-primary/80 font-medium transition-colors inline-flex items-center"
                                            >
                                                <span className="material-symbols-outlined text-xl">edit</span>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(item.id)}
                                                className="text-red-600 hover:text-red-900 transition-colors bg-transparent border-0 p-0 cursor-pointer inline-flex items-center"
                                            >
                                                <span className="material-symbols-outlined text-xl">delete</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
        </main>
    );
}