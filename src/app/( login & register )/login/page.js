'use client'
import logout from "@/api/auth/logout"
import LoginForm from "@/components/Modules/Forms/LoginForm"
import { useTodoStore } from "@/store/useTodoStore"
import { useEffect } from "react"

export default function LoginPage() {

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
      <LoginForm />
    </div>
  )
}
