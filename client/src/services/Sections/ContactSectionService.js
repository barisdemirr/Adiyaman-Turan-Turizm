const UpdateContactSection = async (sectionData) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ContactSection`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sectionData),
        });

        const textData = await response.text();

        if (!response.ok) {
            const errorObj = textData ? JSON.parse(textData) : {};
            throw new Error(errorObj.message || 'İletişim başlığı güncellenirken bir hata oluştu.');
        }

        return textData ? JSON.parse(textData) : { success: true };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const GetContactSection = async () => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/ContactSection`);
        const textData = await response.text();

        if (!response.ok) {
            const errorObj = textData ? JSON.parse(textData) : {};
            throw new Error(errorObj.message || 'İletişim başlık bilgisi getirilemedi kanka.');
        }

        return textData ? JSON.parse(textData) : null;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { UpdateContactSection, GetContactSection };