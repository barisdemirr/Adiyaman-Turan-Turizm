'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AboutCardEditPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

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
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchCardData = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));

                const backendData = {
                    title: 'Geniş Araç Filosu',
                    description: 'En son model konforlu lüks araçlarımızla seyahat deneyiminizi üst seviyeye çıkarıyoruz.'
                };

                setFormData(backendData);
                setInitialData(backendData);
            } catch (err) {
                setError('Veriler yüklenirken sistemsel bir hata oluştu.');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchCardData();
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!formData.title.trim() || !formData.description.trim()) {
            setError('Zorunlu alanlar boş bırakılamaz. Lütfen tüm verileri eksiksiz doldurunuz.');
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

        setIsSubmitting(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log(updatedFields);

            alert('Hakkımızda kartı başarıyla güncellendi kanka!');
            router.push('/admin/about-cards');
        } catch (err) {
            setError('Bağlantı hatası oluştu. Lütfen tekrar deneyiniz.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="flex-1 overflow-y-auto bg-background-light p-6 lg:p-10">
            <div className="max-w-5xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Kartı Düzenle</h1>
                </div>

                {error && (
                    <div className="p-4 mb-6 bg-red-500/35 border border-red-500/50 text-red-900 rounded-xl flex items-center gap-2 text-sm font-semibold">
                        <span className="material-symbols-outlined text-lg">error</span>
                        <span>{error}</span>
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    {isLoading ? (
                        <div className="p-12 text-center text-slate-500 font-medium">
                            Mevcut kart bilgileri getiriliyor, lütfen bekleyiniz...
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">

                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
                                    Başlık (Title)
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
                                    onClick={() => router.push('/admin/about-cards')}
                                    className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors text-sm"
                                >
                                    İptal
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 focus:ring-4 focus:ring-primary/20 transition-colors disabled:opacity-50 text-sm"
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