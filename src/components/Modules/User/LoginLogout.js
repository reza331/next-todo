import React from 'react'
import { LuLogOut, LuLogIn } from 'react-icons/lu'
import Link from 'next/link'
import logout from '@/api/auth/logout'
import { redirect } from 'next/navigation'
import { useAuthStore } from '@/store/useAuthStore'

export default function LoginLogout({ width, height }) {

    const { isLoggedIn } = useAuthStore()

    const logOutHandler = async () => {
        const res = await logout()
        if (res.isOk) {
            localStorage.removeItem('passwordRecoveryUI');
            redirect('/login')
        }
    }

    return (
        <div className='hoverLink cursor-pointer'>
            {
                isLoggedIn ? (<button onClick={logOutHandler} className='block'><LuLogOut style={{ width: width, height: height }} /></button>) : (<Link href={'/login'}><LuLogIn style={{ width: width, height: height }} /></Link>)
            }
        </div>
    )
}
