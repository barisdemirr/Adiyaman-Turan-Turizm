'use client';

import { useState, useEffect } from 'react';
import { GetAdminDetails, ChangePassword, ChangeUsername } from "@/services/AdminService";
import { GetAdminUsername } from "@/services/AuthService";

export default function AdminProfilePage() {
    const [profile, setProfile] = useState({
        fullName: '',
        username: ''
    });

    // Şifre formu state'i
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });

    // Kullanıcı adı formu state'i
    const [isUsernameModalOpen, setIsUsernameModalOpen] = useState(false);
    const [newUsername, setNewUsername] = useState('');
    const [usernameError, setUsernameError] = useState(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const currentUsername = GetAdminUsername() || 'admin';

                const data = await GetAdminDetails(currentUsername);

                setProfile({
                    fullName: data.nameSurname,
                    username: data.username
                });
            } catch (err) {
                console.error(err);
                setError(err.message || "Profil bilgileri yüklenirken bir hata oluştu.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handlePasswordInputChange = (e) => {
        const { name, value } = e.target;
        setPasswordData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
        setError(null);
    };

    const handleCloseUsernameModal = () => {
        setIsUsernameModalOpen(false);
        setNewUsername('');
        setUsernameError(null);
    };

    const handleUsernameSubmit = async (e) => {
        e.preventDefault();
        setUsernameError(null);

        if (!newUsername.trim()) {
            setUsernameError('Kullanıcı adı alanı boş bırakılamaz.');
            return;
        }

        if (newUsername.trim() === profile.username) {
            setUsernameError('Yeni kullanıcı adı mevcut kullanıcı adınız ile aynı olamaz.');
            return;
        }

        setIsSubmitting(true);
        try {
            const dto = {
                currentUsername: profile.username,
                newUsername: newUsername.trim()
            };

            await ChangeUsername(dto);

            // Arayüzdeki veriyi güncelle ve cookie'yi tazele
            setProfile((prev) => ({ ...prev, username: newUsername.trim() }));
            document.cookie = `admin_username=${newUsername.trim()}; path=/;`;

            alert('Kullanıcı adın başarıyla güncellendi!');
            handleCloseUsernameModal();
        } catch (err) {
            setUsernameError(err.message || 'Kullanıcı adı güncellenirken sunucu tarafında bir hata oluştu.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // 1. Boş alan kontrolü
        if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmNewPassword) {
            setError('Lütfen tüm şifre alanlarını eksiksiz doldurunuz.');
            return;
        }

        // 2. 🎯 8-16 Karakter Uzunluk Kontrolü
        const currentLen = passwordData.currentPassword.length;
        const newLen = passwordData.newPassword.length;
        const confirmLen = passwordData.confirmNewPassword.length;

        if (
            currentLen < 8 || currentLen > 16 ||
            newLen < 8 || newLen > 16 ||
            confirmLen < 8 || confirmLen > 16
        ) {
            setError('Güvenlik protokolü gereği şifreler en az 8, en fazla 16 karakter uzunluğunda olmalıdır.');
            return;
        }

        // 3. Uyuşma Kontrolü
        if (passwordData.newPassword !== passwordData.confirmNewPassword) {
            setError('Yeni şifreler birbiriyle eşleşmiyor, kontrol ediniz.');
            return;
        }

        // 4. Eski Şifreyle Aynı Olma Kontrolü
        if (passwordData.newPassword === passwordData.currentPassword) {
            setError('Yeni şifreniz mevcut şifrenizle aynı olamaz.');
            return;
        }

        setIsSubmitting(true);
        try {
            const dto = {
                username: profile.username,
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            };

            await ChangePassword(dto);

            alert('Şifren başarıyla güncellendi! Bir sonraki girişte yeni şifreni kullanabilirsin.');
            handleCloseModal();
        } catch (err) {
            setError(err.message || 'Şifre güncellenirken sunucu tarafında bir hata oluştu.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main className="flex-1 overflow-y-auto bg-background-light p-6 lg:p-10">
            <div className="max-w-2xl mx-auto">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900">Profil Ayarları</h1>
                    <p className="text-slate-500 mt-1">Yönetici hesabına ait temel bilgiler ve güvenlik seçenekleri.</p>
                </div>

                {isLoading ? (
                    <div className="p-12 text-center text-slate-500 font-medium bg-white rounded-2xl border border-slate-200 shadow-sm">
                        Profil bilgileri yükleniyor...
                    </div>
                ) : (
                    <div className="space-y-6">
                        {/* Profil Bilgi Kartı */}
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                            <div className="p-8">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-20 h-20 bg-primary/10 text-primary rounded-2xl flex items-center justify-center border border-primary/20">
                                        <span className="material-symbols-outlined text-4xl">admin_panel_settings</span>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-900">{profile.fullName}</h2>
                                        <p className="text-sm text-slate-500 uppercase tracking-widest font-semibold">Sistem Yöneticisi</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 gap-6 border-t border-slate-100 pt-8">
                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">İsim Soyisim</label>
                                        <p className="text-slate-800 font-medium mt-1">{profile.fullName}</p>
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Kullanıcı Adı</label>
                                        <p className="text-slate-800 font-mono text-sm mt-1">@{profile.username}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-50/50 p-6 border-t border-slate-100 flex justify-end gap-3">
                                <button
                                    onClick={() => setIsUsernameModalOpen(true)}
                                    className="bg-white border border-slate-300 hover:border-primary hover:text-primary text-slate-700 font-bold py-2.5 px-6 rounded-xl transition-all duration-200 shadow-sm text-sm flex items-center gap-2 cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-lg">person_edit</span>
                                    Kullanıcı Adını Güncelle
                                </button>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-white border border-slate-300 hover:border-primary hover:text-primary text-slate-700 font-bold py-2.5 px-6 rounded-xl transition-all duration-200 shadow-sm text-sm flex items-center gap-2 cursor-pointer"
                                >
                                    <span className="material-symbols-outlined text-lg">lock_reset</span>
                                    Şifreyi Güncelle
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Şifre Güncelleme Modal (Pop-up) */}
                {isModalOpen && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in">
                        <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-md w-full overflow-hidden transform transition-all p-8">

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-slate-900">Güvenlik Ayarları</h3>
                                <p className="text-sm text-slate-500 mt-1">Lütfen mevcut ve yeni şifrenizi giriniz.</p>
                            </div>

                            {error && (
                                <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-700 rounded-xl text-xs font-semibold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-base">error</span>
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handlePasswordSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Mevcut Şifre</label>
                                    <input
                                        type="password"
                                        name="currentPassword"
                                        value={passwordData.currentPassword}
                                        onChange={handlePasswordInputChange}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <div className="h-px bg-slate-100 my-2"></div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Yeni Şifre</label>
                                    <input
                                        type="password"
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordInputChange}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        placeholder="Yeni şifreniz"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Yeni Şifre (Tekrar)</label>
                                    <input
                                        type="password"
                                        name="confirmNewPassword"
                                        value={passwordData.confirmNewPassword}
                                        onChange={handlePasswordInputChange}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        placeholder="Yeni şifreniz tekrar"
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={handleCloseModal}
                                        disabled={isSubmitting}
                                        className="px-5 py-2.5 text-slate-500 hover:text-slate-800 font-bold transition-colors text-sm cursor-pointer disabled:opacity-50"
                                    >
                                        İptal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-8 rounded-xl transition-all duration-200 shadow-md text-sm cursor-pointer disabled:opacity-50 min-w-[140px]"
                                    >
                                        {isSubmitting ? 'Güncelleniyor...' : 'Güncelle'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Kullanıcı Adı Güncelleme Modal (Pop-up) */}
                {isUsernameModalOpen && (
                    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fade-in">
                        <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 max-w-md w-full overflow-hidden transform transition-all p-8">

                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-slate-900">Kullanıcı Adı Ayarları</h3>
                                <p className="text-sm text-slate-500 mt-1">Lütfen yeni kullanıcı adınızı giriniz.</p>
                            </div>

                            {usernameError && (
                                <div className="mb-6 p-3 bg-red-50 border border-red-100 text-red-700 rounded-xl text-xs font-semibold flex items-center gap-2">
                                    <span className="material-symbols-outlined text-base">error</span>
                                    {usernameError}
                                </div>
                            )}

                            <form onSubmit={handleUsernameSubmit} className="space-y-5">
                                <div>
                                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Yeni Kullanıcı Adı</label>
                                    <input
                                        type="text"
                                        name="newUsername"
                                        value={newUsername}
                                        onChange={(e) => setNewUsername(e.target.value)}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                                        placeholder="yeni_kullanici_adi"
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={handleCloseUsernameModal}
                                        disabled={isSubmitting}
                                        className="px-5 py-2.5 text-slate-500 hover:text-slate-800 font-bold transition-colors text-sm cursor-pointer disabled:opacity-50"
                                    >
                                        İptal
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="bg-primary hover:bg-primary/90 text-white font-bold py-2.5 px-8 rounded-xl transition-all duration-200 shadow-md text-sm cursor-pointer disabled:opacity-50 min-w-[140px]"
                                    >
                                        {isSubmitting ? 'Güncelleniyor...' : 'Güncelle'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}