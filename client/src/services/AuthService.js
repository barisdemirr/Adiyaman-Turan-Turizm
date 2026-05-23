async function LoginAdmin(username, password) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Giriş yapılırken bir kriz çıktı.');
        }

        document.cookie = `admin_token=${data.token}; path=/; max-age=86400; SameSite=Lax; Secure`;
        document.cookie = `admin_username=${data.username}; path=/; max-age=86400; SameSite=Lax; Secure`;

        return data;
    } catch (error) {
        throw new Error(error.message || 'Sunucuyla bağlantı kurulamadı.');
    }
}

function LogoutAdmin() {
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "admin_username=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = '/admin/login';
}

function GetAdminToken() {
    if (typeof document === 'undefined') return null;
    return document.cookie.match(/admin_token=([^;]+)/)?.[1] || null;
}

export { LoginAdmin, LogoutAdmin, GetAdminToken };