import { usePathname } from 'next/navigation'
import React from 'react'
import { IoClose } from 'react-icons/io5'

export default function ModalBase({ isOpen, setIsOpen, children }) {

    const pathname = usePathname()

    const closeHanlder = () => {
        if (pathname === '/profile') {
            localStorage.removeItem('passwordRecoveryUI');
            setIsOpen(false)
        }
        setIsOpen(false)
    }

    return (
        <div className={`${isOpen ? 'opacity-100 z-[999999]' : 'opacity-0 -z-[999999]'} transition-all duration-500 flex fixed items-center justify-center w-screen h-screen left-0 top-0 bg-black/50 backdrop-blur-md`}>

            <button onClick={() => closeHanlder()} className="text-4xl fixed top-5 end-10"><IoClose className='text-white' /></button>

            <div className={`w-full flex flex-col gap-10 items-center justify-center transition-all duration-500 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                {children}

            </div>
        </div>
    )
}
