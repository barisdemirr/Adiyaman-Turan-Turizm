'use client';

import { useState, useEffect } from 'react';
import { UpdateContactField, GetAllContacts } from '@/services/ContactService';

export default function ContactInfoManagementPage() {
    const [contactList, setContactList] = useState([]);
    const [initialData, setInitialData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [savingName, setSavingName] = useState(null);

    useEffect(() => {
        const fetchContactFields = async () => {
            try {
                const backendData = await GetAllContacts();

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

    const handleValueChange = (name, value) => {
        setContactList((prev) =>
            prev.map((item) => (item.name === name ? { ...item, value } : item))
        );
    };

    const handleSaveSingleField = async (name) => {
        setError(null);

        const targetItem = contactList.find(item => item.name === name);
        const initialItem = initialData.find(item => item.name === name);

        if (!targetItem.value.trim()) {
            setError(`${targetItem.name} alanı boş bırakılamaz.`);
            return;
        }

        if (targetItem.value.trim() === initialItem.value) {
            setError(`${targetItem.name} alanında herhangi bir değişiklik algılanmadı.`);
            return;
        }

        setSavingName(name);

        try {
            await UpdateContactField(name, targetItem.value.trim());

            alert(`${targetItem.name} başarıyla güncellendi brom!`);

            setInitialData((prev) =>
                prev.map((item) => (item.name === name ? { ...item, value: targetItem.value.trim() } : item))
            );
        } catch (err) {
            setError(err.message || 'Değişiklik kaydedilirken bir sunucu hatası oluştu.');
        } finally {
            setSavingName(null);
        }
    };

    return (
        <main className="flex-1 overflow-y-auto bg-background-light p-6 lg:p-10">
            <div className="max-w-5xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">İletişim Bilgileri Yönetimi</h1>
                    <p className="text-slate-500 mt-1">
                        Sitenizde yer alan aktif iletişim kanallarının içeriklerini tek tek yanlarındaki butonlardan güncelleyebilirsiniz.
                    </p>
                </div>

                {error && (
                    <div className="p-4 mb-6 bg-red-500/35 border border-red-500/50 text-red-900 rounded-xl flex items-center gap-2 text-sm font-semibold">
                        <span className="material-symbols-outlined text-lg">error</span>
                        <span>{error}</span>
                    </div>
                )}

                {isLoading ? (
                    <div className="p-12 text-center text-slate-500 font-medium bg-white rounded-xl border border-slate-200 shadow-sm animate-pulse">
                        Mevcut iletişim bilgileri getiriliyor, lütfen bekleyiniz...
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Mobil Görünüm */}
                        <div className="grid grid-cols-1 gap-4 md:hidden">
                            {contactList.map((item) => (
                                <div key={item.name} className="bg-white border border-slate-200 p-5 rounded-xl shadow-sm space-y-3">
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kanal</span>
                                        <p className="text-sm font-semibold text-slate-800 mt-0.5">{item.name}</p>
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Güncel Değer</span>
                                        <input
                                            type="text"
                                            value={item.value}
                                            onChange={(e) => handleValueChange(item.name, e.target.value)} // Burayı name yaptık
                                            className="w-full mt-1 px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                        />
                                    </div>
                                    <div className="pt-2 flex justify-end">
                                        <button
                                            type="button"
                                            disabled={savingName !== null}
                                            onClick={() => handleSaveSingleField(item.name)}
                                            className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90 transition-colors cursor-pointer disabled:opacity-50"
                                        >
                                            {savingName === item.name ? 'Kaydediliyor...' : 'Kaydet'}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Masaüstü Görünüm */}
                        <div className="hidden md:block bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 border-b border-slate-200">
                                        <th className="px-6 py-4 text-sm font-medium text-slate-500 w-1/4">İletişim Kanalı</th>
                                        <th className="px-6 py-4 text-sm font-medium text-slate-500 w-7/12">Güncel Değer</th>
                                        <th className="px-6 py-4 text-sm font-medium text-slate-500 text-right">Aksiyon</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contactList.map((item) => (
                                        <tr
                                            key={item.name}
                                            className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors"
                                        >
                                            <td className="px-6 py-4 text-sm font-semibold text-slate-800">
                                                {item.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <input
                                                    type="text"
                                                    value={item.value}
                                                    onChange={(e) => handleValueChange(item.name, e.target.value)} // Burayı name yaptık
                                                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-slate-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    type="button"
                                                    disabled={savingName !== null}
                                                    onClick={() => handleSaveSingleField(item.name)}
                                                    className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-lg hover:bg-primary/90 transition-colors cursor-pointer disabled:opacity-50 inline-flex items-center gap-1 shadow-sm"
                                                >
                                                    {savingName === item.name ? (
                                                        <span>Kaydediliyor...</span>
                                                    ) : (
                                                        <>
                                                            <span className="material-symbols-outlined text-sm">save</span>
                                                            <span>Kaydet</span>
                                                        </>
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}