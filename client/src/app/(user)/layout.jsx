import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "material-symbols/outlined.css";
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
    title: "Adıyaman Turan Turizm | Nemrut Dağı ve Kültür Turları",
    description: "Adıyaman Turan Turizm ile Nemrut Dağı gün doğumu turu, Perre Antik Kenti ve Güneydoğu Anadolu turlarına katılın. Rehberli turlar için hemen yerinizi ayırtın.",
    keywords: [
        "Adıyaman Turan Turizm",
        "Turan Turizm Adıyaman",
        "Nemrut Dağı turu",
        "Adıyaman tur şirketleri",
        "Güneydoğu Anadolu turları",
        "Nemrut gün doğumu turu",
        "Perre Antik Kenti gezisi",
        "Cendere Köprüsü turu",
        "Karakuş Tümülüsü",
        "Adıyaman kültür turları",
        "Adıyaman gezi rehberi",
        "Adıyaman uygun fiyatlı turlar"
    ],
    authors: [{ name: "Adıyaman Turan Turizm" }],
    creator: "Adıyaman Turan Turizm",
    publisher: "Adıyaman Turan Turizm",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    openGraph: {
        title: "Adıyaman Turan Turizm | Nemrut Dağı ve Kültür Turları",
        description: "Adıyaman ve Güneydoğu'nun tarihi güzelliklerini Turan Turizm kalitesiyle keşfedin. Güvenli seyahat ve profesyonel rehberlik hizmeti.",
        url: "https://www.adiyamanturanturizm.com",
        siteName: "Adıyaman Turan Turizm",
        locale: "tr_TR",
        type: "website",
        images: [
            {
                url: "/attlogo.png",
                width: 800,
                height: 600,
                alt: "Adıyaman Turan Turizm Logo",
            }
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Adıyaman Turan Turizm | Nemrut Dağı ve Kültür Turları",
        description: "Adıyaman ve Güneydoğu'nun tarihi güzelliklerini Turan Turizm kalitesiyle keşfedin.",
        images: ["/attlogo.png"],
    },
    icons: {
        icon: "/attlogo.png",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="tr" className="light" data-scroll-behavior="smooth">
            <head />
            <body className={`${inter.variable} ${plusJakarta.variable} antialiased`}>
                <AnimationProvider>
                    <Navbar />
                    <HandleHashScroll />
                    <main>
                        {children}
                    </main>
                    <Footer />
                </AnimationProvider>
            </body>
        </html>
    );
}