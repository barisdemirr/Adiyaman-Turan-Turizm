'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GetAllToursAdmin, DeleteTour } from '@/services/TourService';

export default function ToursManagementPage() {
    const [tours, setTours] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTours = async () => {
            try {
                const data = await GetAllToursAdmin();
                setTours(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTours();
    }, []);

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Bu turu silmek istediğinize emin misiniz?');
        if (!confirmed) return;

        try {
            await DeleteTour(id); 
            setTours((prev) => prev.filter((item) => item.id !== id));
            alert('Tur başarıyla silindi!');
        } catch (error) {
            alert(error.message || 'Silme işlemi sırasında bir kriz çıktı.');
        }
    };

    const filteredTours = (tours || []).filter((tour) =>
        tour.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="flex-1 overflow-y-auto bg-background-light p-6 lg:p-10">
            <div className="max-w-5xl mx-auto">

                <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Turlar Yönetimi</h1>
                        <p className="text-slate-500 mt-1">
                            Sitenizde listelenen tüm aktif turları buradan yönetebilir, fiyat güncelleyebilir ve yeni tarihler atayabilirsiniz.
                        </p>
                    </div>
                    <div>
                        <Link
                            href="/admin/tours/add"
                            className="bg-primary hover:bg-primary/90 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-200 shadow-sm inline-flex items-center gap-2 text-sm whitespace-nowrap"
                        >
                            <span className="material-symbols-outlined text-lg">add</span>
                            Yeni Tur Ekle
                        </Link>
                    </div>
                </div>

                <div className="mb-6 relative">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        search
                    </span>
                    <input
                        type="text"
                        placeholder="Tur başlığına göre ara."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        disabled={isLoading}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 disabled:opacity-60 disabled:bg-slate-50"
                    />
                </div>

                {isLoading ? (
                    <div className="bg-white border border-slate-200 rounded-xl p-10 text-center text-slate-500 font-medium shadow-sm">
                        Turlar yükleniyor, bekleyiniz...
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 gap-4 md:hidden">
                            {filteredTours.map((item) => (
                                <div key={item.id} className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-4">
                                    <div className="flex justify-between items-start gap-2">
                                        <div className="min-w-0">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tur Adı</span>
                                            <p className="text-sm font-semibold text-slate-800 mt-0.5 break-words">{item.title}</p>
                                        </div>
                                        <div className="text-right flex-shrink-0">
                                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Fiyat</span>
                                            <p className="text-sm font-bold text-primary mt-0.5 whitespace-nowrap">{item.price} TL</p>
                                        </div>
                                    </div>
                                    <div className="pt-3 border-t border-slate-100 flex gap-2 items-center">
                                        <Link
                                            href={`/admin/tours/edit?id=${item.id}`}
                                            className="text-primary hover:text-primary/80 font-medium transition-colors inline-flex items-center gap-1 text-xs bg-primary/5 px-2.5 py-2 rounded-md flex-1 justify-center"
                                        >
                                            <span className="material-symbols-outlined text-base">edit</span>
                                            Düzenle
                                        </Link>
                                        <Link
                                            href={`/admin/tours/add-date?id=${item.id}`}
                                            className="bg-amber-500 hover:bg-amber-600 text-white font-medium transition-colors inline-flex items-center gap-1 text-xs px-2.5 py-2 rounded-md flex-1 justify-center"
                                        >
                                            <span className="material-symbols-outlined text-base">calendar_month</span>
                                            Tarih
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="text-red-600 hover:text-red-900 transition-colors bg-red-50 hover:bg-red-100 px-2.5 py-2 rounded-md cursor-pointer inline-flex items-center gap-1 text-xs flex-1 justify-center"
                                        >
                                            <span className="material-symbols-outlined text-base">delete</span>
                                            Sil
                                        </button>
                                    </div>
                                </div>
                            ))}
                            {filteredTours.length === 0 && (
                                <div className="bg-white border border-slate-200 p-6 rounded-xl text-center text-sm text-slate-400 font-medium">
                                    Aradığın kriterlere uygun tur bulunamadı.
                                </div>
                            )}
                        </div>

                        <div className="hidden md:block bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden mb-6">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="px-6 py-4 text-sm font-medium text-slate-500">Tur Başlığı</th>
                                        <th className="px-6 py-4 text-sm font-medium text-slate-500">Fiyat</th>
                                        <th className="px-6 py-4 text-sm font-medium text-slate-500 text-right">İşlemler</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredTours.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
                                        >
                                            <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                                                {item.title}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-primary">
                                                {item.price} TL
                                            </td>
                                            <td className="px-6 py-4 text-sm text-right flex justify-end gap-4 items-center">
                                                <Link
                                                    href={`/admin/tours/edit?id=${item.id}`}
                                                    className="text-primary hover:text-primary/80 font-medium transition-colors inline-flex items-center"
                                                >
                                                    <span className="material-symbols-outlined text-xl">edit</span>
                                                </Link>
                                                <Link
                                                    href={`/admin/tours/add-date?id=${item.id}`}
                                                    className="text-amber-500 hover:text-amber-600 font-medium transition-colors inline-flex items-center"
                                                >
                                                    <span className="material-symbols-outlined text-xl">calendar_month</span>
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-red-600 hover:text-red-900 transition-colors bg-transparent border-0 p-0 cursor-pointer inline-flex items-center"
                                                >
                                                    <span className="material-symbols-outlined text-xl">delete</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredTours.length === 0 && (
                                        <tr>
                                            <td colSpan="3" className="px-6 py-10 text-sm text-center text-slate-400 font-medium">
                                                Aradığın kriterlere uygun tur bulunamadı kanka.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </>
                )}

            </div>
        </main>
    );
}