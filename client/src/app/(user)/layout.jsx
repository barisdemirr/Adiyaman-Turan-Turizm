import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar/Navbar";
import Footer from "@/components/layout/Footer/Footer";
import AnimationProvider from "@/components/ui/AnimationProvider";
import HandleHashScroll from "@/components/ui/HandleHashScroll";

const plusJakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-plus-jakarta",
    display: "swap",
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter", 
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
        icon: "/attlogo.png",
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
                <AnimationProvider>
                    <Navbar />
                    <HandleHashScroll />
                    <main className="">
                        {children}
                    </main>
                    <Footer />
                </AnimationProvider>
            </body>
        </html>
    );
}