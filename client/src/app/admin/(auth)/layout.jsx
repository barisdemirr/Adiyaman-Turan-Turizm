import '@/styles/admin-globals.css';

export const metadata = {
    title: 'Admin Login - Turan Turizm',
    description: 'Yönetim paneli güvenli giriş sayfası.',
};

export default function AdminAuthLayout({ children }) {
    return (
        <html lang="tr">
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            </head>
            <body className="bg-background-light font-display antialiased">
                {children}
            </body>
        </html>
    );
}