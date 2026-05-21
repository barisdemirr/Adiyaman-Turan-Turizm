'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GetAllServices, DeleteServiceItem } from '@/services/ServiceService'; 

export default function ServiceCardsManagementPage() {
    const [serviceCards, setServiceCards] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await GetAllServices();
                setServiceCards(data || []);
            } catch (error) {
                console.error("Servisler yüklenirken bir problem oldu:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchServices();
    }, []);
               

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Bu servis kartını silmek istediğinize emin misiniz?');
        if (!confirmed) return;

        try {
            await DeleteServiceItem(id);
            setServiceCards((prev) => prev.filter((item) => item.id !== id));
            alert('Servis kartı başarıyla silindi!');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main className="flex-1 overflow-y-auto bg-background-light p-6 lg:p-10">
            <div className="max-w-5xl mx-auto">

                <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Servis Kartları Yönetimi</h1>
                        <p className="text-slate-500 mt-1">
                            Ana sayfanızda listelenen hizmetlerin ikonlarını ve başlıklarını buradan yönetebilir, yeni servisler ekleyebilirsiniz.
                        </p>
                    </div>
                    <div>
                        <Link
                            href="/admin/service-cards/add"
                            className="bg-primary hover:bg-primary/90 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-200 shadow-sm inline-flex items-center gap-2 text-sm"
                        >
                            <span className="material-symbols-outlined text-lg">add</span>
                            Yeni Servis Ekle
                        </Link>
                    </div>
                </div>

                {/* Mobil Görünüm */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {isLoading ? (
                        Array.from({ length: 4 }).map((_, index) => (
                            <div key={`skeleton-mob-${index}`} className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm animate-pulse space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-slate-200 flex-shrink-0" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-3 w-16 bg-slate-200 rounded" />
                                        <div className="h-4 w-40 bg-slate-200 rounded" />
                                    </div>
                                </div>
                                <div className="pt-3 border-t border-slate-100 flex gap-4">
                                    <div className="h-8 bg-slate-200 rounded flex-1" />
                                    <div className="h-8 bg-slate-200 rounded flex-1" />
                                </div>
                            </div>
                        ))
                    ) : serviceCards.length === 0 ? (
                        <div className="bg-white border border-slate-200 p-6 rounded-xl text-center text-sm text-slate-400 font-medium">
                            Kayıtlı hiçbir servis kartı bulunmuyor.
                        </div>
                    ) : (
                        serviceCards.map((item) => (
                            <div key={item.id} className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                                        <span className="material-symbols-outlined text-xl">
                                            {item.icon}
                                        </span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Servis Başlığı</span>
                                        <p className="text-sm font-semibold text-slate-800 mt-0.5 break-words">{item.title}</p>
                                    </div>
                                </div>
                                <div className="pt-3 border-t border-slate-100 flex gap-4 items-center">
                                    <Link
                                        href={`/admin/service-cards/edit?id=${item.id}`}
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
                                <th className="px-6 py-4 text-sm font-medium text-slate-500 w-24">İkon</th>
                                <th className="px-6 py-4 text-sm font-medium text-slate-500">Servis Başlığı</th>
                                <th className="px-6 py-4 text-sm font-medium text-slate-500 text-right">İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                            {isLoading ? (
                                Array.from({ length: 4 }).map((_, index) => (
                                    <tr key={`skeleton-desk-${index}`} className="border-b border-slate-100 animate-pulse">
                                        <td className="px-6 py-4">
                                            <div className="w-10 h-10 rounded-lg bg-slate-200" />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="h-4 w-64 bg-slate-200 rounded" />
                                        </td>
                                        <td className="px-6 py-4 flex justify-end gap-6 items-center mt-2">
                                            <div className="h-5 w-5 bg-slate-200 rounded" />
                                            <div className="h-5 w-5 bg-slate-200 rounded" />
                                        </td>
                                    </tr>
                                ))
                            ) : serviceCards.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="px-6 py-10 text-sm text-center text-slate-400 font-medium">
                                        Kayıtlı hiçbir servis kartı bulunmuyor.
                                    </td>
                                </tr>
                            ) : (
                                serviceCards.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
                                                <span className="material-symbols-outlined text-xl">
                                                    {item.icon}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                                            {item.title}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-right flex justify-end gap-4 items-center">
                                            <Link
                                                href={`/admin/service-cards/edit?id=${item.id}`}
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