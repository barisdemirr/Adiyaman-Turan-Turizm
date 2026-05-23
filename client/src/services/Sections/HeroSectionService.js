import { GetAdminToken } from "../AuthService";

const GetHeroSection = async () => {
    const token = GetAdminToken();
    if (!token) {
        throw new Error('Yönetici olarak giriş yapmanız gerekiyor.');
    }
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/HeroSection`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const textData = await response.text();

        if (!response.ok) {
            const errorObj = textData ? JSON.parse(textData) : {};
            throw new Error(errorObj.message || 'Hero bilgileri getirilirken bir hata oluştu.');
        }

        return textData ? JSON.parse(textData) : null;
    } catch (error) {
        console.error("GetHeroSection Hatası:", error);
        throw error;
    }
};

const UpdateHeroSection = async (formDataPayload) => {
    const token = GetAdminToken();
    if (!token) {
        throw new Error('Yönetici olarak giriş yapmanız gerekiyor.');
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/HeroSection`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formDataPayload, 
        });

        const textData = await response.text();

        if (!response.ok) {
            const errorObj = textData ? JSON.parse(textData) : {};
            throw new Error(errorObj.message || 'Hero Section güncellenirken bir sorun çıktı.');
        }

        return textData ? JSON.parse(textData) : { success: true };
    } catch (error) {
        console.error("UpdateHeroSection Hatası:", error);
        throw error;
    }
};


export { GetHeroSection, UpdateHeroSection };