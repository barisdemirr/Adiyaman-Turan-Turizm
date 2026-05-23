import { GetAdminToken } from "./AuthService";

import React from 'react'

async function GetAllAboutItems() {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/aboutitems`;
    

    try {
        const res = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            next: { revalidate: 3600 }
        });

        if (!res.ok) {
            throw new Error(`Backend API hata döndürdü! Durum Kodu: ${res.status}`);
        }

        return await res.json();

    } catch (error) {
        console.error("[AboutItemService] Kritik Hata Yakalandı:", error);

        throw new Error(
            "Şu anda backend servislerimize ulaşılamıyor. Lütfen .NET API'nizin ayakta ve doğru portta (örn: localhost:5001) çalıştığından emin olun."
        );
    }
}

const GetAboutItemById = async (id) => {
    const token = GetAdminToken();
    if (!token) {
        throw new Error('Yönetici olarak giriş yapmanız gerekiyor.');
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/AboutItems/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            // json() yerine text() alıyoruz ki boş hata gövdelerinde patlamasın kanka
            const errorText = await response.text();
            let errorMessage = 'Kart bilgisi getirilirken bir hata oluştu.';

            try {
                const errorObj = JSON.parse(errorText);
                errorMessage = errorObj.message || errorMessage;
            } catch (e) {
                if (errorText) errorMessage = errorText;
            }

            throw new Error(errorMessage);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;    
    }
};


const AddAboutItem = async (aboutItemData) => {
    const token = GetAdminToken();
    if (!token) {
        throw new Error('Yönetici olarak giriş yapmanız gerekiyor.');
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/AboutItems`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(aboutItemData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Ekleme işlemi başarısız oldu.');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};


const UpdateAboutItem = async (aboutItemData) => {
    const token = GetAdminToken();
    if (!token) {
        throw new Error('Yönetici olarak giriş yapmanız gerekiyor.');
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/AboutItems`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(aboutItemData),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Güncelleme işlemi başarısız oldu.');
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
};


const DeleteAboutItem = async (id) => {
    const token = GetAdminToken();
    if (!token) {
        throw new Error('Yönetici olarak giriş yapmanız gerekiyor.');
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/AboutItems/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        const textData = await response.text();

        if (!response.ok) {
            const errorObj = textData ? JSON.parse(textData) : {};
            throw new Error(errorObj.message || 'Silme işlemi başarısız oldu.');
        }

        return textData ? JSON.parse(textData) : { success: true };
    } catch (error) {
        console.error(error);
        throw error;
    }
};


export { GetAllAboutItems, GetAboutItemById, AddAboutItem, UpdateAboutItem, DeleteAboutItem };