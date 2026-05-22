'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { GetHeroSection, UpdateHeroSection } from '@/services/Sections/HeroSectionService';

export default function HeroManagementPage() {
    const [formData, setFormData] = useState({
        title: '',
        tag: '',
        description: ''
    });
    const [initialData, setInitialData] = useState({
        title: '',
        tag: '',
        description: '',
        bgImage: ''
    });

    const [bgImageFile, setBgImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const data = await GetHeroSection();
                if (data) {
                    setFormData({
                        title: data.title || '',
                        tag: data.tag || '',
                        description: data.description || ''
                    });
                    setInitialData({
                        title: data.title || '',
                        tag: data.tag || '',
                        description: data.description || '',
                        bgImage: data.backgroundImageUrl || ''
                    });
                    if (data.backgroundImageUrl) {
                        setImagePreview(`${process.env.NEXT_PUBLIC_BASE_URL}${data.backgroundImageUrl}`);
                    }
                }
            } catch (err) {
                setError(err.message || 'Veriler yüklenirken sistemsel bir hata oluştu.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchHeroData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBgImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setBgImageFile(null);
        setImagePreview('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (!imagePreview) {
            setError('Arka plan resmi zorunludur. Yeni bir resim seçilmediği sürece değişiklikler kaydedilemez.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const data = new FormData();
        let changeCount = 0;

        if (formData.title.trim() !== initialData.title) {
            data.append('title', formData.title.trim());
            changeCount++;
        } else {
            data.append('title', initialData.title);
        }

        if (formData.tag.trim() !== initialData.tag) {
            data.append('tag', formData.tag.trim());
            changeCount++;
        } else {
            data.append('tag', initialData.tag);
        }

        if (formData.description.trim() !== initialData.description) {
            data.append('description', formData.description.trim());
            changeCount++;
        } else {
            data.append('description', initialData.description);
        }

        if (bgImageFile) {
            data.append('imageFile', bgImageFile);
            changeCount++;
        }

        if (changeCount === 0) {
            setError('Herhangi bir değişiklik algılanmadı. Lütfen güncelleme yaptıktan sonra tekrar deneyiniz.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSaving(true);

        try {
            await UpdateHeroSection(data);
            alert('Giriş bölümü içerikleri başarıyla güncellendi!');

            setInitialData({
                title: formData.title.trim(),
                tag: formData.tag.trim(),
                description: formData.description.trim(),
                bgImage: imagePreview
            });
            setBgImageFile(null);
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
                            <h1 className="text-3xl font-bold text-slate-900">Giriş Bölümü Yönetimi</h1>
                            <p className="text-slate-500 mt-1">
                                Portföy ana sayfanızın en üstünde (Hero) yer alan içerikleri buradan güncelleyebilirsiniz.
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href="/"
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
                            Mevcut hero bilgileri getiriliyor, lütfen bekleyiniz...
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-6 space-y-6">

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Arka Plan Resmi
                                </label>
                                {!imagePreview ? (
                                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors relative max-w-md">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                        <span className="material-symbols-outlined text-slate-400 text-4xl block mb-2">
                                            add_photo_alternate
                                        </span>
                                        <span className="text-sm text-slate-500 font-medium">Yeni Arka Plan Görseli Seç</span>
                                    </div>
                                ) : (
                                    <div className="relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50 h-48 w-full max-w-md shadow-sm">
                                        <img src={imagePreview} alt="Hero Arka Planı" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={handleRemoveImage}
                                            className="absolute top-3 right-3 w-7 h-7 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition-colors cursor-pointer"
                                        >
                                            <span className="material-symbols-outlined text-base font-bold">close</span>
                                        </button>
                                    </div>
                                )}
                                <p className="text-xs text-slate-400 mt-2">Giriş ekranının arkasında görünecek büyük görsel.</p>
                            </div>

                            <div>
                                <label htmlFor="tag" className="block text-sm font-medium text-slate-700 mb-2">
                                    Etiket (Tag)
                                </label>
                                <input
                                    type="text"
                                    id="tag"
                                    name="tag"
                                    value={formData.tag}
                                    onChange={handleInputChange}
                                    placeholder="Örn: Premium Hizmet"
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                />
                            </div>

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
                                    placeholder="Ana başlık metni"
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
                                    placeholder="Basit bir açıklama metni ekleyebilirsiniz..."
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