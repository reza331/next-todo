import React from 'react'
import { AiFillGithub, AiFillMail } from 'react-icons/ai'
import { BsFillPenFill } from 'react-icons/bs'
import { FaTelegramPlane } from 'react-icons/fa'

export default function AboutePage() {
  return (
    <div className='container p-5'>
      <div className='px-10'>
        <h1 className='font-bold text-2xl'>About This App :</h1>
        <p className='text-[14px] mt-7'>🎉 Welcome to my <span className='font-semibold text-[var(--colorHover)]'>NEXT-TODO</span> app!</p>
        <p className='text-[12px] mt-1'>A simple and elegant app to help you organize your daily tasks effortlessly.</p>
        <p className='font-semibold mt-7'>With this app, you can :</p>
        <ul className='text-[14px] flex flex-col gap-1 mt-4'>
          <li>- Create and manage tasks in any project</li>
          <li>- Track your progress with ease</li>
          <li>- Enjoy a clean, modern interface without any clutter (theme customization will be added in future)</li>
        </ul>
        <p className='font-semibold mt-7'>This app is designed to make task management easy, fast, and enjoyable, so you can focus on what matters most.</p>
        <p className='font-semibold'>And more features are coming soon! 🚀 Stay tuned as the app keeps evolving over time.</p>
        <p className='font-semibold mt-7 flex items-center gap-2'><BsFillPenFill /> App created by [ Reza Reihani ]</p>
        <p className='text-[14px] my-4'>contact info :</p>
        <ul className='text-[14px] flex flex-col gap-1'>
          <li className='flex items-center gap-1'>- <AiFillMail /> email : <a className='text-[var(--colorHover)]' href="mailto:reza331wn@gmail.com">reza331wn@gmail.com</a></li>
          <li className='flex items-center gap-1'>- <AiFillGithub /> github : <a className='text-[var(--colorHover)]' href="https://github.com/reza331">Github profile</a></li>
          <li className='flex items-center gap-1'>- <FaTelegramPlane /> telegram : <a className='text-[var(--colorHover)]' href="https://t.me/reza_re_frontDev">@reza_re_frontDev</a></li>
        </ul>
      </div>
    </div>
  )
}
