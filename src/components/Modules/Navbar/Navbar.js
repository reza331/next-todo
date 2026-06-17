'use client'
import React, { useEffect } from 'react'
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { useQuery } from '@tanstack/react-query';
import getUser from '@/api/auth/getuser';
import NavbarMobile from './NavbarMobile';
import NavbarDesktop from './NavbarDesktop';

export default function Navbar() {

  const { setIsLoggedIn, setUser } = useAuthStore()
  const path = usePathname()

  // get user info if logged in 

  const { data, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUser
  })

  // setting info 

  useEffect(() => {
    setIsLoggedIn(!!data)
    setUser(data)
  }, [data])

  // no need to render navbar in login or register page 

  if (path === '/login' || path === '/register' || path.startsWith('/recovery-password')) {
    return null
  }

  // normal render in other routes

  return (

    <>

      <NavbarMobile isLoading={isLoading} />

      <NavbarDesktop isLoading={isLoading} />

    </>

  )
}
