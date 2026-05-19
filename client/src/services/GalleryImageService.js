import React from 'react'

async function GetAllGalleryImages() {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/gallery`;

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
    console.error("[GalleryImageService] Kritik Hata Yakalandı:", error);

    throw new Error(
      "Şu anda backend servislerimize ulaşılamıyor. Lütfen .NET API'nizin ayakta ve doğru portta (örn: localhost:5001) çalıştığından emin olun."
    );
  }
}

export default GetAllGalleryImages