'use client'
import logout from '@/api/auth/logout'
import UpdatePasswordForm from '@/components/Modules/Forms/UpdatePasswordForm'
import { useTodoStore } from '@/store/useTodoStore'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

export default function PasswordUpdatePage() {

    const { email } = useParams()
    const { setTodos } = useTodoStore()

    useEffect(() => {
        const mounthandler = async () => {
            setTodos([])
            await logout()
            localStorage.removeItem('passwordRecoveryUI');
        }
        mounthandler()
    }, [])

    return (
        <div className='w-full h-[100dvh] flex items-center justify-center'>
            <UpdatePasswordForm recoveryEmail={decodeURIComponent(email)} />
        </div>
    )
}
