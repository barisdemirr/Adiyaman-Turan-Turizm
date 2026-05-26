'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { GetDatesByTourId, CreateTourDate, DeleteTourDate } from '@/services/TourDatesService';

function TourDatesManagementPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const tourId = searchParams.get('id');

    const [dates, setDates] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const todayStr = new Date().toISOString().split('T')[0];

    const fetchDates = async () => {
        setIsLoading(true);
        try {
            const data = await GetDatesByTourId(tourId);
            const formattedDates = data.map((item) => ({
                id: item.id,
                dateString: item.date.split('T')[0]
            }));
            setDates(formattedDates);
        } catch (error) {
            alert(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (tourId) {
            fetchDates();
        }
    }, [tourId]);

    const handleDelete = async (id) => {
        const confirmed = window.confirm('Bu tarihi silmek istediğinize emin misiniz?');
        if (!confirmed) return;

        try {
            await DeleteTourDate(id);
            setDates((prev) => prev.filter((item) => item.id !== id));
            alert('Tarih başarıyla kaldırıldı!');
        } catch (error) {
            alert(error.message);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedDate('');
    };

    const handleAddDateSubmit = async (e) => {
        e.preventDefault();
        if (!selectedDate) return;

        setIsSubmitting(true);
        try {
            await CreateTourDate(tourId, selectedDate);
            handleCloseModal();
            alert(`Yeni tur tarihi başarıyla eklendi! ${formatDateForDisplay(selectedDate)} tarihine tur planlandı.`);
            await fetchDates();
        } catch (error) {
            alert(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDateForDisplay = (dateStr) => {
        if (!dateStr) return '';
        const [year, month, day] = dateStr.split('-');
        return `${day}.${month}.${year}`;
    };

    return (
        <main className="flex-1 overflow-y-auto bg-background-light p-6 lg:p-10">
            <div className="max-w-5xl mx-auto">

                <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">Tur Tarihleri Yönetimi</h1>
                        <p className="text-slate-500 mt-1">
                            Seçili tura ait aktif kontenjan tarihlerini listeleyebilir, silebilir ve yeni operasyon tarihleri tanımlayabilirsiniz.
                        </p>
                    </div>
                    <div>
                        <button
                            onClick={() => router.push('/admin/tours')}
                            className="border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-medium py-2 px-4 rounded-lg transition-colors text-sm flex items-center gap-1 cursor-pointer"
                        >
                            <span className="material-symbols-outlined text-lg">arrow_back</span>
                            Turlara Dön
                        </button>
                    </div>
                </div>

                {isLoading ? (
                    <div className="p-12 text-center text-slate-500 font-medium bg-white rounded-xl border border-slate-200 shadow-sm">
                        Aktif tarihler yükleniyor, lütfen bekleyiniz...
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                            {dates.filter((item) => item.dateString >= todayStr).length === 0 ? (
                                <div className="text-center py-6 text-sm text-slate-400 font-medium">
                                    Bu tura tanımlanmış aktif veya ileri tarihli bir operasyon bulunmamaktadır.
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    {dates
                                        .filter((item) => item.dateString >= todayStr)
                                        .map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex items-center justify-between px-5 py-4 border border-slate-100 bg-slate-50/30 rounded-xl hover:bg-slate-50 transition-colors"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <span className="material-symbols-outlined text-slate-400 text-xl">
                                                        calendar_today
                                                    </span>
                                                    <span className="text-sm font-semibold text-slate-800 font-mono">
                                                        {formatDateForDisplay(item.dateString)}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => handleDelete(item.id)}
                                                    className="text-red-600 hover:text-red-900 transition-colors cursor-pointer p-1 rounded-md hover:bg-red-50 flex items-center justify-center"
                                                >
                                                    <span className="material-symbols-outlined text-xl">delete</span>
                                                </button>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>

                        <div className="flex justify-start">
                            <button
                                type="button"
                                onClick={() => setIsModalOpen(true)}
                                className="bg-primary hover:bg-primary/90 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-200 shadow-sm inline-flex items-center gap-2 text-sm cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-lg">add_circle</span>
                                Tarih Ekle
                            </button>
                        </div>
                    </div>
                )}

                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in">
                        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 max-w-md w-full overflow-hidden transform transition-all p-6 space-y-6">

                            <div>
                                <h3 className="text-lg font-bold text-slate-900">Yeni Tur Tarihi Planla</h3>
                                <p className="text-xs text-slate-500 mt-1">
                                    Takvim üzerinden sisteme dahil etmek istediğiniz güncel operasyon tarihini seçiniz.
                                </p>
                            </div>

                            <div>
                                <label htmlFor="modalDate" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                                    Tarih Seçimi
                                </label>
                                <input
                                    type="date"
                                    id="modalDate"
                                    min={todayStr}
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                />
                            </div>

                            {selectedDate && (
                                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-xs text-emerald-800 flex items-center gap-2">
                                    <span className="material-symbols-outlined text-base">check_circle</span>
                                    <span>Seçilen Tarih: <b>{formatDateForDisplay(selectedDate)}</b> olarak listeye eklenecek.</span>
                                </div>
                            )}

                            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    disabled={isSubmitting}
                                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors text-sm cursor-pointer disabled:opacity-50"
                                >
                                    İptal
                                </button>
                                <button
                                    type="button"
                                    onClick={handleAddDateSubmit}
                                    disabled={!selectedDate || selectedDate < todayStr || isSubmitting}
                                    className={`px-5 py-2 font-medium rounded-lg transition-all text-sm flex items-center gap-1 ${selectedDate && selectedDate >= todayStr && !isSubmitting
                                            ? 'bg-primary text-white hover:bg-primary/90 shadow-sm cursor-pointer'
                                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                        }`}
                                >
                                    {isSubmitting ? 'Ekleniyor...' : 'Ekle'}
                                </button>
                            </div>

                        </div>
                    </div>
                )}

            </div>
        </main>
    );
}


export default function EditTourDatesPage() {
    return (
        <Suspense fallback={<div className="p-5 text-center text-gray-500">Yükleniyor...</div>}>
            <TourDatesManagementPage />
        </Suspense>
    );
}