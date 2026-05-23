'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// 🎯 Senin yazdığın servisi buraya çekiyoruz kanka
import { LoginAdmin } from '@/services/AuthService';

export default function AdminLoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        // 1. Temel Boşluk Kontrolü
        if (!formData.username.trim() || !formData.password) {
            setError('Kullanıcı adı ve şifre alanları boş bırakılamaz.');
            return;
        }

        // 2. 8-16 Karakter Validasyonu
        if (formData.password.length < 8 || formData.password.length > 16) {
            setError('Güvenlik protokolü gereği şifreler en az 8, en fazla 16 karakter uzunluğunda olmalıdır.');
            return;
        }

        setIsLoading(true);

        try {
            // 🎯 3. Senin servisi şak diye tetikliyoruz, çerezleri o zaten hallediyor
            await LoginAdmin(formData.username, formData.password);

            // Giriş başarılıysa panale fırlat kanka
            router.push('/admin/');

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased min-h-screen flex items-center justify-center p-4 w-full relative overflow-hidden">
            <main className="w-full max-w-md relative z-10">

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                        <span className="material-icons text-2xl">admin_panel_settings</span>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Panel</h1>
                </div>

                <div className="bg-white dark:bg-[#231630] rounded-xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden relative z-10">
                    <div className="h-1 w-full bg-gradient-to-r from-primary via-purple-400 to-primary"></div>

                    <div className="p-8 sm:p-10">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {error && (
                                <div className="p-3 text-sm text-red-600 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/30 rounded-lg flex items-center gap-2">
                                    <span className="material-symbols-outlined text-lg">error</span>
                                    <span>{error}</span>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" htmlFor="username">
                                    Username
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <span className="material-icons text-[20px]">person</span>
                                    </div>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleInputChange}
                                        placeholder="Enter your username"
                                        className="block w-full pl-10 pr-3 py-3 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50 dark:bg-[#191022] transition-all duration-200 sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
                                    Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                                        <span className="material-icons text-[20px]">lock</span>
                                    </div>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        placeholder="••••••••"
                                        className="block w-full pl-10 pr-10 py-3 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50 dark:bg-[#191022] transition-all duration-200 sm:text-sm font-mono"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-lg text-white bg-primary hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg shadow-primary/30 transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:transform-none cursor-pointer"
                                >
                                    {isLoading ? 'Sign In...' : 'Sign In'}
                                    <span className="absolute right-4 inset-y-0 flex items-center pl-3">
                                        <span className="material-icons text-white/70 group-hover:text-white transition-colors text-lg">arrow_forward</span>
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <Link
                        href="/"
                        className="inline-flex items-center text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-white transition-colors"
                    >
                        <span className="material-icons text-sm mr-2">west</span>
                        Ana Sayfaya Dön
                    </Link>
                </div>

                <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                    <div className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"></div>
                    <div className="absolute -bottom-[10%] -left-[5%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl"></div>
                </div>

            </main>
        </div>
    );
}