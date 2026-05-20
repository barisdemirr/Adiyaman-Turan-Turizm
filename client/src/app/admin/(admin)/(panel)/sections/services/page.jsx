'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ServicesManagementPage() {
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });
    const [initialData, setInitialData] = useState({
        title: '',
        description: ''
    });

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchServicesData = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                const backendData = {
                    title: 'Hizmetlerimiz',
                    description: 'Sizler için sunduğumuz ayrıcalıklı seyahat, konaklama ve tur çözümlerini buradan inceleyebilirsiniz.'
                };

                setFormData(backendData);
                setInitialData(backendData);
            } catch (err) {
                setError('Veriler yüklenirken sistemsel bir hata oluştu.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchServicesData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!formData.title.trim() || !formData.description.trim()) {
            setError('Zorunlu alanlar boş bırakılamaz. Lütfen verileri eksiksiz doldurunuz.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const updatedFields = {};
        let changeCount = 0;

        if (formData.title.trim() !== initialData.title) {
            updatedFields.title = formData.title.trim();
            changeCount++;
        }
        if (formData.description.trim() !== initialData.description) {
            updatedFields.description = formData.description.trim();
            changeCount++;
        }

        if (changeCount === 0) {
            setError('Herhangi bir değişiklik algılanmadı. Lütfen güncelleme yaptıktan sonra tekrar deneyiniz.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSaving(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log(updatedFields);

            alert("Hizmetler bölümü başarıyla güncellendi kanka!");
            setInitialData({
                title: formData.title.trim(),
                description: formData.description.trim()
            });
        } catch (err) {
            setError('Değişiklikler kaydedilirken sunucu hatası oluştu.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <main className="flex-1 overflow-y-auto bg-background-light p-6 lg:p-10">
            <div className="max-w-5xl mx-auto">

                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-900">Hizmetler Bölümü Yönetimi</h1>
                            <p className="text-slate-500 mt-1">
                                Ana sayfanızdaki hizmetler/servisler alanının üst başlık ve açıklama yazılarını buradan yönetebilirsiniz.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href="/#hizmetlerimiz"
                                target="_blank"
                                className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium transition-colors text-sm"
                            >
                                <span className="material-icons-outlined text-lg">visibility</span>
                                Sitede Önizle
                            </Link>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="p-4 mb-6 bg-red-500/35 border border-red-500/50 text-red-900 rounded-xl flex items-center gap-2 text-sm font-semibold animate-fade-in">
                        <span className="material-symbols-outlined text-lg">error</span>
                        <span>{error}</span>
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <span className="text-xs text-slate-400">Son Güncelleme: Canlı Veri</span>
                    </div>

                    {isLoading ? (
                        <div className="p-12 text-center text-slate-500 font-medium">
                            Mevcut hizmetler bilgileri getiriliyor, lütfen bekleyiniz...
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">

                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
                                    Bölüm Başlığı (Title)
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    placeholder="Örn: Neler Yapıyoruz? / Hizmetlerimiz"
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                                    Bölüm Açıklaması (Description)
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="4"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Hizmetlerinizin genel amacını belirten kısa bir alt metin..."
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none"
                                />
                            </div>

                            <div className="pt-4 flex justify-end">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 focus:ring-4 focus:ring-primary/20 transition-colors disabled:opacity-50 text-sm cursor-pointer shadow-sm"
                                >
                                    {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                                </button>
                            </div>

                        </form>
                    )}
                </div>
            </div>
        </main>
    );
}