import React from 'react'

async function GetAllContacts() {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/contact`;

    try {
        const res = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error(`Backend API hata döndürdü! Durum Kodu: ${res.status}`);
        }

        return await res.json();

    } catch (error) {
        console.error("[ContactService] Kritik Hata Yakalandı:", error);

        throw new Error(
            "Şu anda backend servislerimize ulaşılamıyor. Lütfen .NET API'nizin ayakta ve doğru portta (örn: localhost:5001) çalıştığından emin olun."
        );
    }
}


async function GetContactByName(name) {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/contact/${name}`;

    try {
        const res = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) {
            throw new Error(`Backend API hata döndürdü! Durum Kodu: ${res.status}`);
        }

        return await res.json();

    } catch (error) {
        console.error("[ContactService] Kritik Hata Yakalandı:", error);

        throw new Error(
            "Şu anda backend servislerimize ulaşılamıyor. Lütfen .NET API'nizin ayakta ve doğru portta (örn: localhost:5001) çalıştığından emin olun."
        );
    }
}

 const UpdateContactField = async (name, value) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Contact/update-field`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, value }),
        });

        const textData = await response.text();

        if (!response.ok) {
            const errorObj = textData ? JSON.parse(textData) : {};
            throw new Error(errorObj.message || 'Güncelleme başarısız.');
        }

        return textData ? JSON.parse(textData) : { success: true };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export { GetAllContacts, GetContactByName, UpdateContactField }