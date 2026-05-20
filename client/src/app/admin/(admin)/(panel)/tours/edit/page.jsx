'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function TourEditPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [formData, setFormData] = useState({
        title: '',
        shortDescription: '',
        description: '',
        price: '',
        duration: '',
        category: 'daily'
    });

    const [initialData, setInitialData] = useState({
        title: '',
        shortDescription: '',
        description: '',
        price: '',
        duration: '',
        category: 'daily',
        bannerImg: '',
        mainImg: '',
        extraImgs: []
    });

    const [bannerPreview, setBannerPreview] = useState('');
    const [bannerFile, setBannerFile] = useState(null);

    const [mainPreview, setMainPreview] = useState('');
    const [mainFile, setMainFile] = useState(null);

    const [existingExtraUrls, setExistingExtraUrls] = useState([]);
    const [newExtraFiles, setNewExtraFiles] = useState([]);
    const [newExtraPreviews, setNewExtraPreviews] = useState([]);

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchTourData = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));

                const backendData = {
                    title: 'Kapadokya Balon Turu',
                    shortDescription: 'Eşsiz peri bacaları manzarasında balon keyfi.',
                    description: 'Sabahın erken saatlerinde başlayan bu benzersiz turumuzda, Kapadokya nın tüm güzelliklerini gökyüzünden izleme fırsatı bulacaksınız.',
                    price: '4500',
                    duration: '3 Gün 2 Gece',
                    category: 'overnight',
                    bannerImg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
                    mainImg: 'https://images.unsplash.com/photo-15420518418c7-924371d7e262',
                    extraImgs: [
                        'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
                        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05'
                    ]
                };

                setFormData({
                    title: backendData.title,
                    shortDescription: backendData.shortDescription,
                    description: backendData.description,
                    price: backendData.price,
                    duration: backendData.duration,
                    category: backendData.category
                });
                setInitialData(backendData);
                setBannerPreview(backendData.bannerImg);
                setMainPreview(backendData.mainImg);
                setExistingExtraUrls(backendData.extraImgs);
            } catch (err) {
                setError('Veriler yüklenirken bir hata oluştu.');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) {
            fetchTourData();
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setBannerFile(file);
            setBannerPreview(URL.createObjectURL(file));
        }
    };

    const handleMainChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setMainFile(file);
            setMainPreview(URL.createObjectURL(file));
        }
    };

    const handleExtraChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            setNewExtraFiles((prev) => [...prev, ...files]);
            const previews = files.map((file) => URL.createObjectURL(file));
            setNewExtraPreviews((prev) => [...prev, ...previews]);
        }
    };

    const removeBanner = () => {
        setBannerFile(null);
        setBannerPreview('');
    };

    const removeMain = () => {
        setMainFile(null);
        setMainPreview('');
    };

    const removeExistingExtra = (index) => {
        setExistingExtraUrls((prev) => prev.filter((_, i) => i !== index));
    };

    const removeNewExtra = (index) => {
        setNewExtraFiles((prev) => prev.filter((_, i) => i !== index));
        setNewExtraPreviews((prev) => prev.filter((_, i) => i !== index));
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
            !formData.category
        ) {
            setError('Zorunlu alanlar boş bırakılamaz. Lütfen tüm alanları doldurunuz.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        if (!isNumeric) {
            setError('Fiyat alanına sadece rakam girilmelidir. Nokta, virgül veya harf içeremez.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        if (!bannerPreview) {
            setError('Kapak resmi zorunludur. Yeni bir görsel seçmeden değişiklikleri kaydedemezsiniz.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        if (!mainPreview) {
            setError('Ana resim zorunludur. Yeni bir görsel seçmeden değişiklikleri kaydedemezsiniz.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const data = new FormData();
        let changeCount = 0;

        if (formData.title.trim() !== initialData.title) {
            data.append('title', formData.title.trim());
            changeCount++;
        }
        if (formData.shortDescription.trim() !== initialData.shortDescription) {
            data.append('shortDescription', formData.shortDescription.trim());
            changeCount++;
        }
        if (formData.description.trim() !== initialData.description) {
            data.append('description', formData.description.trim());
            changeCount++;
        }
        if (trimmedPrice !== initialData.price) {
            data.append('price', trimmedPrice);
            changeCount++;
        }
        if (formData.duration.trim() !== initialData.duration) {
            data.append('duration', formData.duration.trim());
            changeCount++;
        }
        if (formData.category !== initialData.category) {
            data.append('category', formData.category);
            changeCount++;
        }

        if (bannerFile) {
            data.append('bannerImg', bannerFile);
            changeCount++;
        }

        if (mainFile) {
            data.append('mainImg', mainFile);
            changeCount++;
        }

        const isExtraChanged =
            JSON.stringify(existingExtraUrls) !== JSON.stringify(initialData.extraImgs) ||
            newExtraFiles.length > 0;

        if (isExtraChanged) {
            data.append('existingExtraUrls', JSON.stringify(existingExtraUrls));
            newExtraFiles.forEach((file) => {
                data.append('newExtraImgs', file);
            });
            changeCount++;
        }

        if (changeCount === 0) {
            setError('Herhangi bir değişiklik algılanmadı. Lütfen düzenleme yaptıktan sonra tekrar deneyiniz.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSubmitting(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            alert('Tur bilgileri başarıyla güncellendi kanka!');
            router.push('/admin/tours');
        } catch (err) {
            setError('Veri tabanı senkronizasyon hatası oluştu.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="flex-1 overflow-y-auto bg-background-light p-6 lg:p-10">
            <div className="max-w-5xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Turu Düzenle</h1>
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
                            Mevcut tur verileri sunucudan çekiliyor, lütfen bekleyiniz...
                        </div>
                    ) : (
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
                                        <div className="relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50 h-32 w-full max-w-xs shadow-sm">
                                            <img src={bannerPreview} alt="Kapak Önizleme" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={removeBanner}
                                                className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition-colors cursor-pointer"
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
                                        <div className="relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50 h-32 w-full max-w-xs shadow-sm">
                                            <img src={mainPreview} alt="Ana Resim Önizleme" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={removeMain}
                                                className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition-colors cursor-pointer"
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
                                    {existingExtraUrls.map((src, index) => (
                                        <div key={`exist-${index}`} className="relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50 h-24 w-full group shadow-sm">
                                            <img src={src} alt="Mevcut Ek Görsel" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeExistingExtra(index)}
                                                className="absolute top-1.5 right-1.5 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition-colors cursor-pointer"
                                            >
                                                <span className="material-symbols-outlined text-xs font-bold">close</span>
                                            </button>
                                        </div>
                                    ))}

                                    {newExtraPreviews.map((src, index) => (
                                        <div key={`new-${index}`} className="relative border border-amber-200 rounded-xl overflow-hidden bg-slate-50 h-24 w-full shadow-sm">
                                            <img src={src} alt="Yeni Ek Görsel" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeNewExtra(index)}
                                                className="absolute top-1.5 right-1.5 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition-colors cursor-pointer"
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
                                    💡 İsteğe bağlıdır, boş bırakılması durumunda sistem hata üretmez.
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
                                    className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 focus:ring-4 focus:ring-primary/20 transition-colors disabled:opacity-50 text-sm cursor-pointer shadow-sm"
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