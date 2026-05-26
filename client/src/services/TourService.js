import React from 'react'
import { GetAdminToken } from "./AuthService";

async function GetAllTours() {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tours`;

  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!res.ok) {
      throw new Error(`Backend API hata döndürdü! Durum Kodu: ${res.status}`);
    }

    return await res.json();

  } catch (error) {
    console.error("🚨 [TourService] Kritik Hata Yakalandı:", error);

    throw new Error(
      "Şu anda backend servislerimize ulaşılamıyor. Lütfen .NET API'nizin ayakta ve doğru portta (örn: localhost:5001) çalıştığından emin olun."
    );
  }
}


async function GetTourBySlug(slug) {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tours/${slug}`;

  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!res.ok) {
      throw new Error(`Backend API hata döndürdü! Durum Kodu: ${res.status}`);
    }

    return await res.json();

  } catch (error) {
    console.error("[TourService] Kritik Hata Yakalandı:", error);

    throw new Error(
      "Şu anda backend servislerimize ulaşılamıyor. Lütfen .NET API'nizin ayakta ve doğru portta (örn: localhost:5001) çalıştığından emin olun."
    );
  }
}


async function GetToursForReservation() {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tours/reservation`;

  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });

    if (!res.ok) {
      throw new Error(`Backend API hata döndürdü! Durum Kodu: ${res.status}`);
    }

    return await res.json();

  } catch (error) {
    console.error("[TourService] Kritik Hata Yakalandı:", error);

    throw new Error(
      "Şu anda backend servislerimize ulaşılamıyor. Lütfen .NET API'nizin ayakta ve doğru portta (örn: localhost:5001) çalıştığından emin olun."
    );
  }
}

async function GetAllToursAdmin() {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/tours/admin`;
  const token = GetAdminToken();
  if (!token) {
    throw new Error('Yönetici olarak giriş yapmanız gerekiyor.');
  }

  try {
    const res = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!res.ok) {
      throw new Error(`Backend API hata döndürdü! Durum Kodu: ${res.status}`);
    }

    return await res.json();

  } catch (error) {
    console.error("🚨 [TourService] Kritik Hata Yakalandı:", error);

    throw new Error(
      "Şu anda backend servislerimize ulaşılamıyor. Lütfen .NET API'nizin ayakta ve doğru portta (örn: localhost:5001) çalıştığından emin olun."
    );
  }
}

async function CreateTour(formData) {
    const token = GetAdminToken();
    if (!token) {
        throw new Error('Yönetici olarak giriş yapmanız gerekiyor.');
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tours`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || 'Tur eklenirken sunucu tarafında bir hata oluştu.');
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }
        
        return await response.text();
    } catch (error) {
        throw new Error(error.message || 'Sunucuyla iletişim kurulurken bir ağ hatası oluştu.');
    }
}


async function GetTourById(id) {
  const token = GetAdminToken();
  if (!token) {
      throw new Error('Yönetici olarak giriş yapmanız gerekiyor.');
  }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tours/${id}`, {
            method: 'GET',
            cache: 'no-store',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Tur detayları sunucudan getirilemedi.');
        }
        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'Ağ bağlantısı hatası oluştu.');
    }
}

async function UpdateTour(formData) {
    const token = GetAdminToken();
    if (!token) {
        throw new Error('Yönetici olarak giriş yapmanız gerekiyor.');
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tours`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || 'Güncelleme sırasında sunucu tarafında bir kriz çıktı.');
        }

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
            return await response.json();
        }
        return await response.text();
    } catch (error) {
        throw new Error(error.message || 'Sunucuyla iletişim kurulurken bir hata oluştu.');
    }
}

async function DeleteTour(id) {
    const token = GetAdminToken();
    if (!token) {
        throw new Error('Yönetici olarak giriş yapmanız gerekiyor.');
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tours/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Tur silinirken sunucu tarafında bir kriz çıktı.');
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'Tur silme işlemi başarısız oldu.');
    }
}

export  {GetAllTours, GetTourBySlug, GetToursForReservation, GetAllToursAdmin, CreateTour, UpdateTour, GetTourById, DeleteTour};