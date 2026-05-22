async function GetDatesByTourId(tourId) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tourdates/${tourId}`, {
            method: 'GET',
            cache: 'no-store'
        });
        if (!response.ok) throw new Error('Tur tarihleri sunucudan çekilemedi kanka.');
        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'Ağ hatası oluştu.');
    }
}

async function CreateTourDate(tourId, dateString) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tourdates`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                tourId: parseInt(tourId),
                date: dateString
            })
        });

        if (!response.ok) {
            throw new Error('Yeni tarih sisteme kaydedilemedi brom.');
        }

        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'Sunucu bağlantı hatası.');
    }
}

async function DeleteTourDate(id) {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tourdates/${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Tarih silinirken sunucu tarafında kriz çıktı.');
        return await response.json();
    } catch (error) {
        throw new Error(error.message || 'Silme işlemi başarısız oldu.');
    }
}

export { GetDatesByTourId, CreateTourDate, DeleteTourDate };