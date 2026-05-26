import { GetAdminToken } from "./AuthService";

async function GetAdminDetails(username) {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/details/${username}`;

    try {
        const res = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GetAdminToken()}`,
            },
        });

        if (!res.ok) {
            throw new Error(`Backend API hata döndürdü! Durum Kodu: ${res.status}`);
        }

        return await res.json();

    } catch (error) {
        console.error("[AdminController] Kritik Hata Yakalandı:", error);

        throw new Error(
            "Şu anda backend servislerimize ulaşılamıyor. Lütfen .NET API'nizin ayakta ve doğru portta (örn: localhost:5001) çalıştığından emin olun."
        );
    }
}

async function GetAdminsNumber() {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/adminsnumber`;

    try {
        const res = await fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GetAdminToken()}`,
            },
        });

        if (!res.ok) {
            throw new Error(`Backend API hata döndürdü! Durum Kodu: ${res.status}`);
        }

        return await res.json();

    } catch (error) {
        console.error("[AdminController] Kritik Hata Yakalandı:", error);

        throw new Error(
            "Şu anda backend servislerimize ulaşılamıyor. Lütfen .NET API'nizin ayakta ve doğru portta (örn: localhost:5001) çalıştığından emin olun."
        );
    }
}

async function ChangePassword(changePasswordDto) {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/change-password`;

    try {
        const res = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GetAdminToken()}`,
            },
            body: JSON.stringify(changePasswordDto),
        });

        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));

            throw new Error(errorData.message || `Bir hata oluştu! Durum Kodu: ${res.status}`);
        }

        return await res.json();

    } catch (error) {

        throw new Error(
            error
        );
    }
}

async function ChangeUsername(changeUsernameDto) {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/change-username`;

    try {
        const res = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GetAdminToken()}`,
            },
            body: JSON.stringify(changeUsernameDto),
        });

        if (!res.ok) {
            throw new Error(`Backend API hata döndürdü! Durum Kodu: ${res.status}`);
        }

        return await res.json();

    } catch (error) {
        console.error("[AdminController] Kritik Hata Yakalandı:", error);

        throw new Error(
            "Şu anda backend servislerimize ulaşılamıyor. Lütfen .NET API'nizin ayakta ve doğru portta (örn: localhost:5001) çalıştığından emin olun."
        );
    }
}



export { GetAdminDetails, GetAdminsNumber, ChangePassword, ChangeUsername };