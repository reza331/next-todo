'use client'
import React, { useState } from 'react'
import LogoComponent from '../Logo/Logo'
import { useForm } from 'react-hook-form'
import TextInput from '../Inputs/TextInput'
import SubmitInput from '../Inputs/SubmitInput'
import sendRecoveryCode from '@/api/auth/sendRecoveryCode'
import { useToast } from '@/context/ToastContext'
import { IoIosArrowBack } from "react-icons/io";
import Link from 'next/link'
import { redirect } from 'next/navigation'


export default function RecoveryForm() {

    const { register, handleSubmit } = useForm()
    const { showToast } = useToast()
    const [isLoading, setIsLoading] = useState(false)

    const recoveryHandler = async (data) => {
        if (isLoading) return
        setIsLoading(true)
        const sendInfo = await sendRecoveryCode(data.email)
        if (sendInfo.isOk) {
            setIsLoading(false)
            showToast(sendInfo.result)
            redirect(`/recovery-password/${data.email}`)
        } else {
            setIsLoading(false)
            showToast(sendInfo.result, 'error')
        }
    }

    return (
        <form onSubmit={handleSubmit(recoveryHandler)} className='bg-[var(--colorB)] w-[300px] lg:w-[450px]  shadow-lg rounded-xl flex flex-col justify-center items-center gap-7 py-10'>

            <div>
                <LogoComponent size={1.5} />
            </div>

            <TextInput place={'Email ...'} registerKey={'email'} register={register} />

            <div className='text-[14px] lg:text-[1rem]'>
                <SubmitInput isLoading={isLoading} buttonText={'Recover Password'} />
            </div>

            <Link href={'login'} className='flex items-center gap-2'>
                <IoIosArrowBack />
                Back
            </Link>

        </form>
    )
}
