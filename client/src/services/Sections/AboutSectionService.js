import { GetAdminToken } from "../AuthService";  


const UpdateAboutSection = async (sectionData) => {
    const token = GetAdminToken();
    if (!token) {
        throw new Error('Yönetici olarak giriş yapmanız gerekiyor.');
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/AboutSection`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(sectionData),
        });

        const textData = await response.text();

        if (!response.ok) {
            const errorObj = textData ? JSON.parse(textData) : {};
            throw new Error(errorObj.message || 'Hakkımızda başlığı güncellenirken bir hata oluştu.');
        }

        return textData ? JSON.parse(textData) : { success: true };
    } catch (error) {
        alert(error.message || 'Sunucuyla iletişim kurulurken bir sorun çıktı.');
        console.error(error);
        throw error;
    }
};

const GetAboutSection = async () => {
    const token = GetAdminToken();
    if (!token) {
        throw new Error('Yönetici olarak giriş yapmanız gerekiyor.');
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/AboutSection`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const textData = await response.text();

        if (!response.ok) {
            const errorObj = textData ? JSON.parse(textData) : {};
            throw new Error(errorObj.message || 'Hakkımızda başlık bilgisi getirilemedi.');
        }

        return textData ? JSON.parse(textData) : null;
    } catch (error) {
        alert(error.message || 'Sunucuyla iletişim kurulurken bir sorun çıktı.');
        console.error(error);
        throw error;
    }
};

export { UpdateAboutSection, GetAboutSection };