'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GetToursSection, UpdateToursSection } from '@/services/Sections/ToursSectionService'; 

export default function ToursSectionManagementPage() {
    const [formData, setFormData] = useState({ id: 0, title: '', description: '' });
    const [initialData, setInitialData] = useState({ id: 0, title: '', description: '' });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchToursData = async () => {
            try {
                const data = await GetToursSection();
                if (data) {
                    const sectionData = { id: data.id, title: data.title || '', description: data.description || '' };
                    setFormData(sectionData);
                    setInitialData(sectionData);
                }
            } catch (err) {
                setError(err.message || 'Veriler yüklenirken sistemsel bir hata oluştu.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchToursData();
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

        const hasChanges = formData.title.trim() !== initialData.title || formData.description.trim() !== initialData.description;
        if (!hasChanges) {
            setError('Herhangi bir değişiklik algılanmadı. Lütfen güncelleme yaptıktan sonra tekrar deneyiniz.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSaving(true);
        try {
            await UpdateToursSection({
                id: formData.id,
                title: formData.title.trim(),
                description: formData.description.trim()
            });

            alert("Turlar bölümü başarıyla güncellendi!");
            setInitialData({ ...formData, title: formData.title.trim(), description: formData.description.trim() });
        } catch (err) {
            setError(err.message || 'Değişiklikler kaydedilirken sunucu hatası oluştu.');
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
                            <h1 className="text-3xl font-bold text-slate-900">Turlarımız Bölümü Başlık Yönetimi</h1>
                            <p className="text-slate-500 mt-1">Ana sayfanızdaki aktif turlar alanının üst ana başlık ve alt spot açıklama metinlerini buradan yönetebilirsiniz.</p>
                        </div>
                        <div className="flex gap-3">
                            <Link href="/#turlar" target="_blank" className="inline-flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 font-medium transition-colors text-sm">
                                <span className="material-symbols-outlined text-lg">visibility</span>Sitede Önizle
                            </Link>
                        </div>
                    </div>
                </div>

                {error && (
                    <div className="p-4 mb-6 bg-red-500/35 border border-red-500/50 text-red-900 rounded-xl flex items-center gap-2 text-sm font-semibold">
                        <span className="material-symbols-outlined text-lg">error</span><span>{error}</span>
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    {isLoading ? (
                        <div className="p-12 text-center text-slate-500 font-medium animate-pulse">Mevcut turlar başlık bilgileri getiriliyor, lütfen bekleyiniz...</div>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">Turlar Bölüm Başlığı (Title)</label>
                                <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" />
                            </div>
                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">Turlar Bölüm Açıklaması (Description)</label>
                                <textarea id="description" name="description" rows="4" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none" />
                            </div>
                            <div className="pt-4 flex justify-end">
                                <button type="submit" disabled={isSaving} className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 focus:ring-4 focus:ring-primary/20 transition-colors disabled:opacity-50 text-sm cursor-pointer shadow-sm">
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