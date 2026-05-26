import React from 'react';
import AdminSidebar from '@/components/Admin/layout/AdminSidebar';
import '@/styles/admin-globals.css';
export const dynamic = "force-dynamic";

export const metadata = {
    title: 'Dashboard Sections Management',
    description: 'Admin Panel Management System',
};

export default function AdminRootLayout({ children }) {
    return (
        <html lang="en">
            <head>
                <link
                    href="https://fonts.googleapis.com/css2?family=Manrope:wght=300;400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Icons+Outlined&family=Material+Icons&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                    rel="stylesheet"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Material+Icons+Round&display=swap"
                    rel="stylesheet"
                />
            </head>

            <body className="font-display bg-background-light text-slate-800 min-h-screen flex flex-col antialiased">

                {/* Top Navbar */}
                <AdminSidebar />

                {/* Ana İçerik Alanı */}
                <div className="flex flex-1 overflow-hidden w-auto md:ml-64 md:mt-0 mt-12">
                    <div className='mx-auto w-full lg:w-[70%] '>
                        {children}
                    </div>
                </div>

            </body>
        </html>
    );
}