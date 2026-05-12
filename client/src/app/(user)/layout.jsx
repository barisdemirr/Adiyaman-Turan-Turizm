import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

// Fontları Next.js üzerinden optimize ederek çağırıyoruz
const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-inter",
    display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "800"],
    variable: "--font-plus-jakarta",
    display: "swap", // Font yüklenene kadar boşluk kalmasın diye
});

export const viewport = {
    width: "device-width",
    initialScale: 1,
};

export const metadata = {
    title: "Adıyaman Turan Turizm - Discover the Lands Where History Began",
    description: "Embark on unforgettable journeys through Adıyaman and beyond. Heritage, hospitality, and expert guides await you.",
    icons: {
        icon: "/favicon.ico", // Varsa icon yolun
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en" className="light">
            <head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                />
            </head>
            <body className={`${inter.variable} ${plusJakarta.variable} antialiased`}>
                <Navbar />
                <main className="pt-20">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}