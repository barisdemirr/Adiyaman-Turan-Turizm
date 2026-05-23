'use client';

import React, {useEffect} from 'react'
import { LogoutAdmin } from '@/services/AuthService';

function Logout() {
    useEffect(() => {
        const performLogout = async () => {
            await LogoutAdmin();
        }
        performLogout();
    }, [])

  return (
    <div>Çıkış Yapılıyor...</div>
  )
}

export default Logout