'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { GetTourById, UpdateTour } from '@/services/TourService';
import Image from 'next/image';

function TourEditPage() {
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

    const [initialData, setInitialData] = useState(null);

    const [bannerPreview, setBannerPreview] = useState('');
    const [bannerFile, setBannerFile] = useState(null);

    const [mainPreview, setMainPreview] = useState('');
    const [mainFile, setMainFile] = useState(null);

    const [existingExtraImages, setExistingExtraImages] = useState([]);
    const [newExtraImages, setNewExtraImages] = useState([]);

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const fetchTourData = async () => {
            try {
                const data = await GetTourById(id);

                if (data) {
                    const parsedData = {
                        title: data.title || '',
                        shortDescription: data.shortDescription || '',
                        description: data.description || '',
                        price: String(data.price || ''),
                        duration: data.duration || '',
                        category: data.category || 'daily'
                    };

                    setFormData(parsedData);
                    setInitialData(parsedData);

                    setBannerPreview(data.bannerImgUrl ? `${process.env.NEXT_PUBLIC_BASE_URL}${data.bannerImgUrl}` : '');
                    setMainPreview(data.imageUrl ? `${process.env.NEXT_PUBLIC_BASE_URL}${data.imageUrl}` : '');

                    if (data.images) {
                        const mappedExisting = data.images.map(img => ({
                            id: img.id,
                            imageUrl: `${process.env.NEXT_PUBLIC_BASE_URL}${img.imageUrl}`,
                            isInGallery: img.isInGallery || false,
                            isDeleted: false
                        }));
                        setExistingExtraImages(mappedExisting);
                    }
                }
            } catch (err) {
                setError(err.message || 'Mevcut tur verileri sunucudan çekilirken bir hata oluştu.');
            } finally {
                setIsLoading(false);
            }
        };

        if (id) fetchTourData();
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
            const newEntries = files.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
                isInGallery: false
            }));
            setNewExtraImages((prev) => [...prev, ...newEntries]);
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
        setExistingExtraImages((prev) =>
            prev.map((img, i) => i === index ? { ...img, isDeleted: true } : img)
        );
    };

    const removeNewExtra = (index) => {
        setNewExtraImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleExistingGalleryCheckChange = (index) => {
        setExistingExtraImages((prev) =>
            prev.map((img, i) => i === index ? { ...img, isInGallery: !img.isInGallery } : img)
        );
    };

    const handleNewGalleryCheckChange = (index) => {
        setNewExtraImages((prev) =>
            prev.map((img, i) => i === index ? { ...img, isInGallery: !img.isInGallery } : img)
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const trimmedPrice = formData.price.trim();
        const isNumeric = /^\d+$/.test(trimmedPrice);

        if (!formData.title.trim() || !formData.shortDescription.trim() || !formData.description.trim() || !trimmedPrice || !formData.duration.trim() || !formData.category) {
            setError('Zorunlu alanlar boş bırakılamaz.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        if (!isNumeric) {
            setError('Fiyat alanına sadece rakam girilmelidir.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        if (!bannerPreview || !mainPreview) {
            setError('Kapak resmi ve Ana resim alanları zorunludur.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSubmitting(true);

        try {
            const data = new FormData();
            data.append('id', id);

            data.append('title', formData.title.trim());
            data.append('shortDescription', formData.shortDescription.trim());
            data.append('description', formData.description.trim());
            data.append('price', trimmedPrice);
            data.append('duration', formData.duration.trim());
            data.append('category', formData.category);

            if (bannerFile) {
                data.append('bannerFile', bannerFile);
            }
            if (mainFile) {
                data.append('mainFile', mainFile);
            }

            existingExtraImages.forEach((img, index) => {
                data.append(`existingImages[${index}].id`, img.id);
                data.append(`existingImages[${index}].isInGallery`, img.isInGallery);
                data.append(`existingImages[${index}].isDeleted`, img.isDeleted);
            });

            newExtraImages.forEach((img, index) => {
                data.append(`newImages[${index}].file`, img.file);
                data.append(`newImages[${index}].isInGallery`, img.isInGallery);
            });

            await UpdateTour(data);

            alert('Tur bilgileri başarıyla güncellendi kanka!');
            router.push('/admin/tours');
        } catch (err) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            setError(err.message || 'Güncelleme senkronizasyon hatası.');
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
                                    <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">Tur Başlığı</label>
                                    <input type="text" id="title" name="title" value={formData.title} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" />
                                </div>
                                <div>
                                    <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">Tur Kategorisi</label>
                                    <select id="category" name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 appearance-none">
                                        <option value="daily">Günübirlik</option>
                                        <option value="overnight">Konaklamalı</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-2">Tur Fiyatı</label>
                                    <input type="text" id="price" name="price" value={formData.price} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" />
                                </div>
                                <div>
                                    <label htmlFor="duration" className="block text-sm font-medium text-slate-700 mb-2">Tur Süresi</label>
                                    <input type="text" id="duration" name="duration" value={formData.duration} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="shortDescription" className="block text-sm font-medium text-slate-700 mb-2">Kısa Açıklama</label>
                                <input type="text" id="shortDescription" name="shortDescription" value={formData.shortDescription} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200" />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">Detaylı Tur Açıklaması</label>
                                <textarea id="description" name="description" rows="5" value={formData.description} onChange={handleInputChange} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 resize-none" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Kapak Resmi</label>
                                    {!bannerPreview ? (
                                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors relative">
                                            <input type="file" accept="image/*" onChange={handleBannerChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                            <span className="material-symbols-outlined text-slate-400 text-3xl block mb-1">add_photo_alternate</span>
                                            <span className="text-xs text-slate-500 font-medium">Yeni Görsel Seç</span>
                                        </div>
                                    ) : (
                                        <div className="relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50 h-32 w-full max-w-xs shadow-sm">
                                            <Image
                                                src={bannerPreview}
                                                alt="Kapak Önizleme"
                                                className="object-cover"
                                                fill
                                                quality={10}
                                                sizes="(max-width: 768px) 100vw, 320px"
                                            />
                                            <button type="button" onClick={removeBanner} className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition-colors cursor-pointer z-10"><span className="material-symbols-outlined text-sm font-bold">close</span></button>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">Ana Resim</label>
                                    {!mainPreview ? (
                                        <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:bg-slate-50 transition-colors relative">
                                            <input type="file" accept="image/*" onChange={handleMainChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                            <span className="material-symbols-outlined text-slate-400 text-3xl block mb-1">image</span>
                                            <span className="text-xs text-slate-500 font-medium">Yeni Görsel Seç</span>
                                        </div>
                                    ) : (
                                        <div className="relative border border-slate-200 rounded-xl overflow-hidden bg-slate-50 h-32 w-full max-w-xs shadow-sm">
                                            <Image
                                                src={mainPreview}
                                                alt="Ana Resim Önizleme"
                                                className="object-cover"
                                                fill
                                                quality={10}
                                                sizes="(max-width: 768px) 100vw, 320px"
                                            />
                                            <button type="button" onClick={removeMain} className="absolute top-2 right-2 w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition-colors cursor-pointer z-10"><span className="material-symbols-outlined text-sm font-bold">close</span></button>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-2">Ek Resimler</label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4 mb-3">

                                    {existingExtraImages.filter(img => !img.isDeleted).map((img, index) => {
                                        const realIndex = existingExtraImages.findIndex(x => x.id === img.id);
                                        return (
                                            <div key={`exist-${img.id}`} className="flex flex-col gap-2 border border-slate-200 rounded-xl p-2 bg-slate-50/50">
                                                <div className="relative h-24 w-full rounded-lg overflow-hidden bg-slate-100">
                                                    <Image
                                                        src={img.imageUrl}
                                                        alt="Mevcut Ek Görsel"
                                                        className="object-cover"
                                                        fill
                                                        quality={10}
                                                        sizes="150px"
                                                    />
                                                    <button type="button" onClick={() => removeExistingExtra(realIndex)} className="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition-colors cursor-pointer z-10"><span className="material-symbols-outlined text-xs font-bold">close</span></button>
                                                </div>
                                                <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 cursor-pointer select-none px-1 py-0.5">
                                                    <input type="checkbox" checked={img.isInGallery} onChange={() => handleExistingGalleryCheckChange(realIndex)} className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20 accent-primary cursor-pointer" />
                                                    Galeri'ye ekle
                                                </label>
                                            </div>
                                        );
                                    })}

                                    {newExtraImages.map((img, index) => (
                                        <div key={`new-${index}`} className="flex flex-col gap-2 border border-amber-200 rounded-xl p-2 bg-amber-50/20">
                                            <div className="relative h-24 w-full rounded-lg overflow-hidden bg-slate-100">
                                                <Image
                                                    src={img.preview}
                                                    alt="Yeni Ek Görsel"
                                                    className="object-cover"
                                                    fill
                                                    quality={10}
                                                    sizes="150px"
                                                />
                                                <button type="button" onClick={() => removeNewExtra(index)} className="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center shadow-md hover:bg-red-700 transition-colors cursor-pointer z-10"><span className="material-symbols-outlined text-xs font-bold">close</span></button>
                                            </div>
                                            <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 cursor-pointer select-none px-1 py-0.5">
                                                <input type="checkbox" checked={img.isInGallery} onChange={() => handleNewGalleryCheckChange(index)} className="w-4 h-4 rounded border-slate-300 text-primary focus:ring-primary/20 accent-primary cursor-pointer" />
                                                Galeri'ye ekle
                                            </label>
                                        </div>
                                    ))}

                                    <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:bg-slate-50 transition-colors relative flex flex-col items-center justify-center min-h-[134px]">
                                        <input type="file" accept="image/*" multiple onChange={handleExtraChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                                        <span className="material-symbols-outlined text-slate-400 text-2xl block mb-0.5">library_add</span>
                                        <span className="text-[11px] text-slate-500 font-medium">Görsel Ekle</span>
                                    </div>
                                </div>
                                <small className="text-xs text-slate-400 block">💡 Eklenen resimlerin yanındaki kutucukları güncelleyerek genel galerideki görünme durumlarını yönetebilirsiniz kanka.</small>
                            </div>

                            <div className="pt-4 flex justify-end gap-3">
                                <button type="button" onClick={() => router.push('/admin/tours')} className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-lg transition-colors text-sm">İptal</button>
                                <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 focus:ring-4 focus:ring-primary/20 transition-colors disabled:opacity-50 text-sm cursor-pointer shadow-sm">
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


export default function EditTourPage() {
    return (
        <Suspense fallback={<div className="p-5 text-center text-gray-500">Yükleniyor...</div>}>
            <TourEditPage />
        </Suspense>
    );
}