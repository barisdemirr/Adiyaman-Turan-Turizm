'use client';

import React, { useState, useEffect } from 'react';
import { GetAdminsNumber } from "@/services/AdminService";
import { GetToursNumber } from "@/services/TourService";
import { GetServicesNumber } from "@/services/ServiceService";
import { GetAdminUsername } from "@/services/AuthService";

export default function DashboardPage() {
    const [counts, setCounts] = useState({
        tourCount: 0,
        serviceCount: 0,
        adminCount: 1
    });
    const [adminName, setAdminName] = useState("Admin");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const username = GetAdminUsername() || "Yönetici";
                setAdminName(username);

                const [toursData, servicesData, adminsData] = await Promise.all([
                    GetToursNumber(),
                    GetServicesNumber(),
                    GetAdminsNumber()
                ]);

                setCounts({
                    tourCount: toursData?.count ?? toursData ?? 0,
                    serviceCount: servicesData?.count ?? servicesData ?? 0,
                    adminCount: adminsData?.count ?? adminsData ?? 1
                });
            } catch (error) {
                console.error("Dashboard verileri yüklenirken hata oluştu:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-background-light flex items-center justify-center">
                <div className="text-slate-500 font-medium p-6 bg-white rounded-xl shadow-sm border border-slate-100">
                    İstatistikler yükleniyor...
                </div>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-background-light p-6 md:p-10">

            <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-1">Genel Bakış</p>
                    <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
                        Tekrar hoş geldin, <span className="text-primary">{adminName}</span>
                    </h1>
                    <p className="mt-2 text-slate-500 max-w-2xl">
                        Sistem ve portföy durumuna dair bugünün güncel verileri aşağıda listelenmiştir.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">

                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                            <span className="material-icons-round text-2xl">card_travel</span>
                        </div>
                    </div>
                    <h3 className="text-slate-500 text-sm font-medium">Toplam Turlar</h3>
                    <div className="flex items-baseline mt-1">
                        <p className="text-3xl font-bold text-slate-900">{counts.tourCount}</p>
                        <p className="ml-2 text-sm text-slate-500">Aktif Tur</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                            <span className="material-icons-round text-2xl">home_repair_service</span>
                        </div>
                    </div>
                    <h3 className="text-slate-500 text-sm font-medium">Hizmetler</h3>
                    <div className="flex items-baseline mt-1">
                        <p className="text-3xl font-bold text-slate-900">{counts.serviceCount}</p>
                        <p className="ml-2 text-sm text-slate-500">Sunulan Hizmet</p>
                    </div>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100 hover:shadow-lg hover:shadow-primary/5 hover:border-primary/20 transition-all duration-300 group">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                            <span className="material-icons-round text-2xl">manage_accounts</span>
                        </div>
                    </div>
                    <h3 className="text-slate-500 text-sm font-medium">Yöneticiler</h3>
                    <div className="flex items-baseline mt-1">
                        <p className="text-3xl font-bold text-slate-900">{counts.adminCount}</p>
                        <p className="ml-2 text-sm text-slate-500">Yetkili Hesap</p>
                    </div>
                </div>

            </div>
        </main>
    );
}