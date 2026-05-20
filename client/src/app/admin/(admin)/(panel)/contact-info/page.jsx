'use client';

import { useState, useEffect } from 'react';

export default function ContactInfoManagementPage() {
    const [contactList, setContactList] = useState([]);
    const [initialData, setInitialData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchContactFields = async () => {
            try {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                const backendData = [
                    { id: 1, title: 'Telefon (Phone)', value: '+90 (532) 123 45 67' },
                    { id: 2, title: 'E-posta (Email)', value: 'iletisim@portfolio.com' },
                    { id: 3, title: 'WhatsApp', value: 'https://wa.me/905321234567' },
                    { id: 4, title: 'Instagram', value: '@kankatravels' },
                ];
                setContactList(backendData);
                setInitialData(JSON.parse(JSON.stringify(backendData)));
            } catch (err) {
                setError('Veriler yüklenirken bir hata oluştu.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchContactFields();
    }, []);

    const handleValueChange = (id, value) => {
        setContactList((prev) =>
            prev.map((item) => (item.id === id ? { ...item, value } : item))
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const hasEmptyField = contactList.some(item => !item.value.trim());
        if (hasEmptyField) {
            setError('Zorunlu alanlar boş bırakılamaz. Lütfen tüm alanları doldurunuz.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        const isChanged = JSON.stringify(contactList) !== JSON.stringify(initialData);

        if (!isChanged) {
            setError('Herhangi bir değişiklik algılanmadı. Lütfen güncelleme yaptıktan sonra tekrar deneyiniz.');
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }

        setIsSaving(true);

        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log(contactList);
            alert('İletişim bilgileri başarıyla güncellendi kanka!');
            setInitialData(JSON.parse(JSON.stringify(contactList)));
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
                    <h1 className="text-3xl font-bold text-slate-900">İletişim Bilgileri Yönetimi</h1>
                    <p className="text-slate-500 mt-1">
                        Sitenizde yer alan aktif iletişim kanallarının içeriklerini buradan takip edebilir ve düzenleyebilirsiniz.
                    </p>
                </div>

                {error && (
                    <div className="p-4 mb-6 bg-red-500/35 border border-red-500/50 text-red-900 rounded-xl flex items-center gap-2 text-sm font-semibold">
                        <span className="material-symbols-outlined text-lg">error</span>
                        <span>{error}</span>
                    </div>
                )}

                {isLoading ? (
                    <div className="p-12 text-center text-slate-500 font-medium bg-white rounded-xl border border-slate-200 shadow-sm">
                        Mevcut iletişim bilgileri getiriliyor, lütfen bekleyiniz...
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 gap-4 md:hidden">
                            {contactList.map((item) => (
                                <div key={item.id} className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-3">
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kanal</span>
                                        <p className="text-sm font-semibold text-slate-800 mt-0.5">{item.title}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Güncel Değer</span>
                                        <input
                                            type="text"
                                            value={item.value}
                                            onChange={(e) => handleValueChange(item.id, e.target.value)}
                                            className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="hidden md:block bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="px-6 py-4 text-sm font-medium text-slate-500 w-1/3">İletişim Kanalı</th>
                                        <th className="px-6 py-4 text-sm font-medium text-slate-500">Güncel Değer</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contactList.map((item) => (
                                        <tr
                                            key={item.id}
                                            className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
                                        >
                                            <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                                                {item.title}
                                            </td>
                                            <td className="px-6 py-4">
                                                <input
                                                    type="text"
                                                    value={item.value}
                                                    onChange={(e) => handleValueChange(item.id, e.target.value)}
                                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                type="submit"
                                disabled={isSaving}
                                className="px-6 py-2.5 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 focus:ring-4 focus:ring-primary/20 transition-colors disabled:opacity-50 text-sm shadow-sm cursor-pointer"
                            >
                                {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </main>
    );
}