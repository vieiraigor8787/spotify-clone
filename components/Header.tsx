'use client'

import { useRouter } from 'next/navigation'
import { twMerge } from 'tailwind-merge'
import { RxCaretLeft, RxCaretRight } from 'react-icons/Rx'
import { HiHome } from 'react-icons/Hi'
import { BiSearch } from 'react-icons/Bi'

import useAuthModal from '@/hooks/useAuthModal'

import Button from './Button'

interface headerProps {
  children: React.ReactNode
  className?: string
}

export default function Header({ className, children }: headerProps) {
  const router = useRouter()
  const { onOpen } = useAuthModal()

  const handleLogout = () => {}

  return (
    <div
      className={twMerge(
        `h-fit bg-gradient-to-b from-emerald-800 p-6`,
        className
      )}
    >
      <div className="w-full mb-4 flex items-center justify-between">
        <div className="hidden md:flex gap-x-2 items-center">
          <button
            onClick={() => router.back()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretLeft className="text-white" size={35} />
          </button>

          <button
            onClick={() => router.forward()}
            className="rounded-full bg-black flex items-center justify-center hover:opacity-75 transition"
          >
            <RxCaretRight className="text-white" size={35} />
          </button>
        </div>

        <div className="flex md:hidden gap-x-2 items-center">
          <button className="rounded-full p-2 bg-white flex items-center hover:opacity-75 transition">
            <HiHome className="text-black" size={20} />
          </button>

          <button className="rounded-full p-2 bg-white flex items-center hover:opacity-75 transition">
            <BiSearch className="text-black" size={20} />
          </button>
        </div>

        <div className="flex justify-between items-center gap-x-4">
          <>
            <div>
              <Button
                onClick={onOpen}
                className="bg-transparent text-neutral-300 font-medium"
              >
                Cadastrar
              </Button>
              <Button onClick={onOpen} className="bg-white px-5 py-2">
                Log in
              </Button>
            </div>
          </>
        </div>
      </div>

      {children}
    </div>
  )
}
