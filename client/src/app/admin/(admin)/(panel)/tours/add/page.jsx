'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TourAddPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        title: '',
        shortDescription: '',
        description: '',
        price: '',
        duration: '',
        category: 'daily'
    });

    const [bannerImg, setBannerImg] = useState(null);
    const [bannerPreview, setBannerPreview] = useState(null);

    const [mainImg, setMainImg] = useState(null);
    const [mainPreview, setMainPreview] = useState(null);

    const [extraImgs, setExtraImgs] = useState([]);
    const [extraPreviews, setExtraPreviews] = useState([]);

    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBannerImg(file);
            setBannerPreview(URL.createObjectURL(file));
        }
    };

    const removeBanner = () => {
        setBannerImg(null);
        setBannerPreview(null);
    };

    const handleMainChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMainImg(file);
            setMainPreview(URL.createObjectURL(file));
        }
    };

    const removeMain = () => {
        setMainImg(null);
        setMainPreview(null);
    };

    const handleExtraChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setExtraImgs((prev) => [...prev, ...files]);
            const newPreviews = files.map((file) => URL.createObjectURL(file));
            setExtraPreviews((prev) => [...prev, ...newPreviews]);
        }
    };

    const removeExtra = (index) => {
        setExtraImgs((prev) => prev.filter((_, i) => i !== index));
        setExtraPreviews((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const trimmedPrice = formData.price.trim();
        const isNumeric = /^\d+$/.test(trimmedPrice);

        if (
            !formData.title.trim() ||
            !formData.shortDescription.trim() ||
            !formData.description.trim() ||
            !trimmedPrice ||
            !formData.duration.trim() ||
            !formData.category ||
            !bannerImg ||
            !mainImg
        ) {
            setError('Zorunlu alanlar boş bırakılamaz. Lütfen zorunlu tüm tur verilerini ve ana görselleri eksiksiz doldurunuz.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        if (!isNumeric) {
            setError('Fiyat alanına sadece rakam girilmelidir. Nokta, virgül, harf veya para sembolü içermemesi gerekir.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSubmitting(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            alert('Yeni tur planlaması sisteme başarıyla kaydedildi kanka!');
            router.push('/admin/tours');
        } catch (err) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setError('Veri tabanı senkronizasyon hatası. Lütfen ağ protokollerini denetleyip tekrar deneyiniz.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="flex-1 overflow-y-auto bg-background-light p-6 lg:p-10">
            <div className="max-w-5xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Yeni Tur Ekle</h1>
                </div>

                {error && (
                    <div className="p-4 mb-6 bg-red-500/35 border border-red-500/50 text-red-900 rounded-xl flex items-center gap-2 text-sm font-semibold">
                        <span className="material-symbols-outlined text-lg">error</span>
                        <span>{error}</span>
                    </div>
                )}

                <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
                                    Tur Başlığı
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
                                <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
                                    Tur Kategorisi
                                </label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 appearance-none"
                                >
                                    <option value="daily">Günübirlik</option>
                                    <option value="overnight">Konaklamalı</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-2">
                                    Tur Fiyatı
                                </label>
                                <input
                                    type="text"
                                    id="price"
                                    name="price"
                                    placeholder="Örn: 4500"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                />
                                <small className="text-xs text-slate-400 mt-1 block">
                                    💡 Fiyat alanına sadece sayı girilmelidir. Nokta, virgül veya TL ibaresi kullanmayınız.
                                </small>
                            </div>

                            <div>
                                <label htmlFor="duration" className="block text-sm font-medium text-slate-700 mb-2">
                                    Tur Süresi
                                </label>
                                <input
                                    type="text"
                                    id="duration"
                                    name="duration"
                                    placeholder="Örn: 08:00 - 18:00 veya 3 Gün 2 Gece"
                                    value={formData.duration}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                />
                                <small className="text-xs text-slate-400 mt-1 block">
                                    💡 Tek gün için saat, diğerleri için gün-gece sayısı yazınız.
                                </small>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="shortDescription" className="block text-sm font-medium text-slate-700 mb-2">
                                Kısa Açıklama
                            </label>
                            <input
                                type="text"
                                id="shortDescription"
                                name="shortDescription"
                                value={formData.shortDescription}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                                Detaylı Tur Açıklaması
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                rows="5"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Kapak Resmi
                                </label>
                                {!bannerPreview ? (
                                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleBannerChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                        <span className="material-symbols-outlined text-slate-400 text-3xl block mb-1">
                                            add_photo_alternate
                                        </span>
                                        <span className="text-xs text-slate-500 font-medium">Görsel Seç</span>
                                    </div>
                                ) : (
                                    <div className="relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50 h-32 w-full max-w-xs">
                                        <img src={bannerPreview} alt="Kapak Önizleme" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={removeBanner}
                                            className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-sm font-bold">close</span>
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">
                                    Ana Resim
                                </label>
                                {!mainPreview ? (
                                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors relative">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleMainChange}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                        <span className="material-symbols-outlined text-slate-400 text-3xl block mb-1">
                                            image
                                        </span>
                                        <span className="text-xs text-slate-500 font-medium">Görsel Seç</span>
                                    </div>
                                ) : (
                                    <div className="relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50 h-32 w-full max-w-xs">
                                        <img src={mainPreview} alt="Ana Resim Önizleme" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={removeMain}
                                            className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-sm font-bold">close</span>
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Ek Resimler
                            </label>

                            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-3">
                                {extraPreviews.map((src, index) => (
                                    <div key={index} className="relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50 h-24 w-full">
                                        <img src={src} alt="Ek Görsel" className="w-full h-full object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => removeExtra(index)}
                                            className="absolute top-1.5 right-1.5 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-xs font-bold">close</span>
                                        </button>
                                    </div>
                                ))}

                                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors relative flex flex-col items-center justify-center h-24">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleExtraChange}
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                    />
                                    <span className="material-symbols-outlined text-slate-400 text-2xl block mb-0.5">
                                        library_add
                                    </span>
                                    <span className="text-[11px] text-slate-500 font-medium">Görsel Ekle</span>
                                </div>
                            </div>
                            <small className="text-xs text-slate-400 block">
                                💡 İsteğe bağlıdır.
                            </small>
                        </div>

                        <div className="pt-4 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() => router.push('/admin/tours')}
                                className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors text-sm"
                            >
                                İptal
                            </button>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 focus:ring-4 focus:ring-primary/20 transition-colors disabled:opacity-50 text-sm"
                            >
                                {isSubmitting ? 'Kaydediliyor...' : 'Turu Kaydet'}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </main>
    );
}