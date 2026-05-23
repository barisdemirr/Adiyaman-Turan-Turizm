import React from 'react'
import { GetAdminToken } from "./AuthService";

async function GetAllServices() {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/services`;

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
    console.error("[ServiceService] Kritik Hata Yakalandı:", error);

    throw new Error(
      "Şu anda backend servislerimize ulaşılamıyor. Lütfen .NET API'nizin ayakta ve doğru portta (örn: localhost:5001) çalıştığından emin olun."
    );
  }
}

const AddServiceItem = async (serviceData) => {
    const token = GetAdminToken();
    if (!token) {
        throw new Error('Yönetici olarak giriş yapmanız gerekiyor.');
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Services`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(serviceData),
        });

        const textData = await response.text();

        if (!response.ok) {
            const errorObj = textData ? JSON.parse(textData) : {};
            throw new Error(errorObj.message || 'Hizmet ekleme işlemi başarısız oldu.');
        }

        return textData ? JSON.parse(textData) : { success: true };
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const GetServiceItemById = async (id) => {
    const token = GetAdminToken();
    if (!token) {
        throw new Error('Yönetici olarak giriş yapmanız gerekiyor.');
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Services/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const textData = await response.text();

        if (!response.ok) {
            const errorObj = textData ? JSON.parse(textData) : {};
            throw new Error(errorObj.message || 'Servis bilgisi getirilirken bir hata oluştu.');
        }

        return textData ? JSON.parse(textData) : null;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

const UpdateServiceItem = async (serviceData) => {
    const token = GetAdminToken();
    if (!token) {
        throw new Error('Yönetici olarak giriş yapmanız gerekiyor.');
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Services`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(serviceData),
        });

        const textData = await response.text();

        if (!response.ok) {
            const errorObj = textData ? JSON.parse(textData) : {};
            throw new Error(errorObj.message || 'Güncelleme işlemi başarısız oldu.');
        }

        return textData ? JSON.parse(textData) : { success: true };
    } catch (error) {
        console.error(error);
        throw error;
    }
};


const DeleteServiceItem = async (id) => {
    const token = GetAdminToken();
    if (!token) {
        throw new Error('Yönetici olarak giriş yapmanız gerekiyor.');
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/Services/${id}`, {
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

export {GetAllServices, AddServiceItem, GetServiceItemById, UpdateServiceItem, DeleteServiceItem }