import React, { useState } from 'react'
import LogoComponent from '../Logo/Logo'
import { useForm } from 'react-hook-form'
import TextInput from '../Inputs/TextInput'
import SubmitInput from '../Inputs/SubmitInput'
import PasswordInput from '../Inputs/PasswordInput'
import { useToast } from '@/context/ToastContext'
import updatePassword from '@/api/auth/updatePassword'
import { MdModeEdit } from "react-icons/md";
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { redirect } from 'next/navigation'

export default function UpdatePasswordForm({ recoveryEmail, setIsOpen }) {

    const { register, handleSubmit, reset } = useForm()
    const { showToast } = useToast()
    const [isLoading, setIsLoading] = useState(false)
    const pathname = usePathname()

    const updatePasswordHandler = async (data) => {
        if (isLoading) return
        setIsLoading(true)
        const updateInfo = await updatePassword(recoveryEmail, data.password, data.code)
        if (updateInfo.isOk) {
            setIsLoading(false)
            localStorage.removeItem('passwordRecoveryUI');
            showToast(updateInfo.result)
            setIsOpen ? setIsOpen(false) : redirect('/login')
            reset()
        } else {
            setIsLoading(false)
            showToast(updateInfo.result, 'error')
            setIsOpen ? setIsOpen(false) : null
            reset()
        }
    }

    return (
        <form onSubmit={handleSubmit(updatePasswordHandler)} className='bg-[var(--colorB)] w-[300px] lg:w-[450px]  shadow-lg rounded-xl flex flex-col justify-center items-center gap-7 py-10'>
            {
                pathname === '/login' &&
                <div>
                    <LogoComponent size={1.5} />
                </div>
            }

            <TextInput place={'Recovery Code ...'} registerKey={'code'} register={register} />
            <PasswordInput place={'New password ...'} registerKey={'password'} register={register} />

            <div className='text-[14px] lg:text-[1rem]'>
                <SubmitInput isLoading={isLoading} buttonText={'Update Password'} />
            </div>
            {
                pathname.startsWith('/recovery-password') &&
                <Link href={'/recovery-password'} className='flex items-center gap-2'>
                    <MdModeEdit />
                    Edit Email
                </Link>
            }

        </form>
    )
}
