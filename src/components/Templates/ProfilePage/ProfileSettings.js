'use client'
import { useAuthStore } from '@/store/useAuthStore'
import React, { useEffect, useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import UploadAvatar from './UploadAvatar';
import CropImageModal from '@/components/Modules/Modals/CropModal';
import { useUploadImageStore } from '@/store/useUploadImageStore';
import { useQueryClient } from '@tanstack/react-query';
import deleteAvatar from '@/api/user/deleteAvatar';
import EditUserNameModal from '@/components/Modules/Modals/EditUserNameModal';
import ConfirmModal from '@/components/Modules/Modals/ConfrimModal';
import UpdatePasswordModal from '@/components/Modules/Modals/UpdatePasswordModal';
import sendRecoveryCode from '@/api/auth/sendRecoveryCode';
import { useToast } from '@/context/ToastContext';

export default function ProfileSettings() {

  const { user } = useAuthStore()
  const { showCropper } = useUploadImageStore()
  const { showToast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [updatePassowrdOpen, setUpdatePasswordOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const queryClient = useQueryClient();

  const removeAvatarHandler = async () => {
    const res = await deleteAvatar()
    if (res.isOk) {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      setTimeout(() => {
        showToast(res.result, 'success')
      }, 2000);
    } else {
      setInterval(() => {
        showToast(res.result, 'error')
      }, 2000);
    }
  }

  const updatePasswordHandler = async () => {

    if (isLoading) return

    setIsLoading(true)
    const res = await sendRecoveryCode(user.email)
    if (res.isOk) {
      showToast(res.result)

      localStorage.setItem('passwordRecoveryUI', JSON.stringify({
        email: user.email,
        open: true,
        createdAt: Date.now()
      }));

      setUpdatePasswordOpen(true)
    } else {
      showToast(res.result, 'error')
    }

    setIsLoading(false)
    
  }

  useEffect(() => {
    const data = localStorage.getItem('passwordRecoveryUI');

    if (!data) return;

    const parsed = JSON.parse(data);

    const isExpired = Date.now() - parsed.createdAt > 3 * 60 * 1000;

    if (isExpired) {
      localStorage.removeItem('passwordRecoveryUI');
      return;
    }

    if (parsed.email === user?.email) {
      setUpdatePasswordOpen(true);
    }

  }, [user]);

  return (
    <>
      <div className='container px-10 flex items-center justify-center h-[calc(100dvh-100px)]'>

        {
          showCropper &&
          <CropImageModal />
        }

        {
          user &&
          <div className='w-[500px] bg-[var(--colorB)] p-10 rounded-xl shadow-lg'>

            <div className='w-full text-center mb-7'>
              <span className='bg-[var(--colorA)] rounded-full py-2 px-6'>Your Personal Info</span>
            </div>

            <div className='flex flex-col gap-10 items-center'>

              <div className='flex md:flex-row flex-col items-center gap-5 '>
                {
                  user.avatar ? (
                    <img src={user.avatar} className='w-36 h-36 rounded-full' />
                  ) : (
                    <FaUserCircle className='w-36 h-36' />
                  )
                }
                <div className='flex flex-col items-center md:items-start text-[12px] md:text-[16px]'>
                  <div className='md:text-3xl text-[14px] line-clamp-1'>{user.name}</div>
                  <div className='text-[var(--colorTextB)] break-words line-clamp-1 text-center md:text-start w-[300px] md:w-full'>{user.email}</div>
                </div>
              </div>

              <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                <UploadAvatar />
                <button onClick={() => setConfirmOpen(true)} className='w-[150px] bg-[var(--colorA)] px-5 py-3 rounded-full cursor-pointer text-[12px] block'>Remove Avatar</button>
                <button onClick={() => setIsOpen(true)} className='w-[150px] bg-[var(--colorA)] px-5 py-3 rounded-full cursor-pointer text-[12px] block'>Edit Name</button>
                <button onClick={updatePasswordHandler} className='w-[150px] bg-[var(--colorA)] px-5 py-3 rounded-full cursor-pointer text-[12px] block'>Update Password</button>
              </div>

            </div>

          </div>
        }

      </div>
      {
        user &&
        <>
          <UpdatePasswordModal recoveryEmail={user.email} isOpen={updatePassowrdOpen} setIsOpen={setUpdatePasswordOpen} />
          <EditUserNameModal isOpen={isOpen} setIsOpen={setIsOpen} />
          <ConfirmModal isOpen={confirmOpen} setIsOpen={setConfirmOpen} message={'Delete current avatar ?'} onConfirm={removeAvatarHandler} />
        </>
      }
    </>
  )
}
