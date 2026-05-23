'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GetServiceItemById, UpdateServiceItem } from '@/services/ServiceService';

 function ServiceCardEditPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [formData, setFormData] = useState({
        icon: '',
        title: '',
        description: ''
    });
    const [initialData, setInitialData] = useState({
        icon: '',
        title: '',
        description: ''
    });

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const data = await GetServiceItemById(id);

                const cardData = {
                    icon: data.icon || '',
                    title: data.title || '',
                    description: data.description || ''
                };

                setFormData(cardData);
                setInitialData(cardData);
            } catch (err) {
                setError(err.message || 'Veriler yüklenirken sistemsel bir hata oluştu.');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchServiceData();
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!formData.icon.trim() || !formData.title.trim() || !formData.description.trim()) {
            setError('Zorunlu alanlar boş bırakılamaz. Lütfen tüm kurumsal verileri eksiksiz doldurunuz.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const hasChanges = formData.icon.trim() !== initialData.icon ||
            formData.title.trim() !== initialData.title ||
            formData.description.trim() !== initialData.description;

        if (!hasChanges) {
            setError('Herhangi bir değişiklik algılanmadı. Lütfen güncelleme yaptıktan sonra tekrar deneyiniz.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSubmitting(true);

        try {
            await UpdateServiceItem({
                id: Number(id),
                icon: formData.icon.trim(),
                title: formData.title.trim(),
                description: formData.description.trim()
            });

            alert('Servis kartı başarıyla güncellendi!');
            router.push('/admin/service-cards');
        } catch (err) {
            setError(err.message || 'Bağlantı hatası oluştu. Lütfen veri tabanı protokollerini kontrol edip tekrar deneyiniz.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="flex-1 overflow-y-auto bg-background-light p-6 lg:p-10">
            <div className="max-w-5xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Servis Kartını Düzenle</h1>
                </div>

                {error && (
                    <div className="p-4 mb-6 bg-red-500/35 border border-red-500/50 text-red-900 rounded-xl flex items-center gap-2 text-sm font-semibold">
                        <span className="material-symbols-outlined text-lg">error</span>
                        <span>{error}</span>
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    {isLoading ? (
                        <div className="p-12 text-center text-slate-500 font-medium animate-pulse">
                            Mevcut servis bilgileri getiriliyor, lütfen bekleyiniz...
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">

                            <div>
                                <label htmlFor="icon" className="block text-sm font-medium text-slate-700 mb-2">
                                    Servis İkonu (Icon)
                                </label>
                                <input
                                    type="text"
                                    id="icon"
                                    name="icon"
                                    value={formData.icon}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                />
                                <small className="text-xs text-slate-400 mt-1 block">
                                    💡 Lütfen uygun bir emoji giriniz.
                                </small>
                            </div>

                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
                                    Servis Başlığı (Title)
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                                    Açıklama (Description)
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows="4"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none"
                                />
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={() => router.push('/admin/service-cards')}
                                    className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors text-sm cursor-pointer"
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 focus:ring-4 focus:ring-primary/20 transition-colors disabled:opacity-50 text-sm cursor-pointer"
                                >
                                    {isSubmitting ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                                </button>
                            </div>

                        </form>
                    )}
                </div>
            </div>
        </main>
    );
}

export default function EditServiceCardPage() {
    return (
        <Suspense fallback={<div className="p-5 text-center text-gray-500">Yükleniyor...</div>}>
            <ServiceCardEditPage />
        </Suspense>
    );
}