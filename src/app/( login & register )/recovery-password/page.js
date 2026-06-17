'use client'
import logout from '@/api/auth/logout'
import RecoveryForm from '@/components/Modules/Forms/RecoveryForm'
import { useTodoStore } from '@/store/useTodoStore'
import React, { useEffect } from 'react'

export default function page() {

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
            <RecoveryForm />
        </div>
    )
}
