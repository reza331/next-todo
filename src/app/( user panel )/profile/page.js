import ProfileSettings from '@/components/Templates/ProfilePage/ProfileSettings'
import { checkUser } from '@/utils/auth/checkUser'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function Profile() {

    const authResult = await checkUser()

    if (authResult.response.status !== 200) redirect('/login')

    return (
        <>
            <ProfileSettings />
        </>
    )

}
