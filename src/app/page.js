'use client'
import ProjectListContainer from "@/components/Templates/HomePage/ProjectListContainer";
import Controls from "@/components/Templates/HomePage/Control";
import { useAuthStore } from "@/store/useAuthStore";
import Link from "next/link";

export default function Home() {

  const { isLoggedIn } = useAuthStore()

  if (!isLoggedIn) {
    return (
      <div className="h-[calc(100dvh-100px)] items-center flex justify-center overflow-x-hidden">
        <div className="w-fit h-fit  flex gap-3 items-center bg-[var(--colorB)] shadow-md p-10 rounded-2xl">
          <Link className="text-[var(--colorHover)]" href={'/login'}>Login</Link> or <Link className="text-[var(--colorHover)]" href={'/register'}>Register</Link> to use website
        </div>
      </div>
    )
  }

  return (
    <div className="h-[calc(100dvh-100px)] flex flex-col overflow-x-hidden">
      {/* includes create project,search,pagination and other controls  */}
      <Controls />
      {/* includes a container with project cards */}
      <ProjectListContainer />
    </div>
  )

}
