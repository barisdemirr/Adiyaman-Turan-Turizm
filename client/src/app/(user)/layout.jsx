import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta", // Senin CSS'teki adıyla BİREBİR aynı olmalı
  display: "swap",
  // preload: false yapabilirsin uyarı alıyorsan
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter", // Senin CSS'teki adıyla BİREBİR aynı olmalı
  display: "swap",
});

export const viewport = {
    width: "device-width",
    initialScale: 1,
};

export const metadata = {
    title: "Adıyaman Turan Turizm - Discover the Lands Where History Began",
    description: "Embark on unforgettable journeys through Adıyaman and beyond. Heritage, hospitality, and expert guides await you.",
    icons: {
        icon: "/attlogo.png", // Varsa icon yolun
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="tr" className="light" data-scroll-behavior="smooth">
            <head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                />
            </head>
            <body className={`${inter.variable} ${plusJakarta.variable} antialiased`}>
                <Navbar />
                    <main className="">
                        {children}
                    </main>
                <Footer />
            </body>
        </html>
    );
}