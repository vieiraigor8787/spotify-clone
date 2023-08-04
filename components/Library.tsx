'use client'

import { TbPlaylist } from 'react-icons/Tb'
import { AiOutlinePlus } from 'react-icons/Ai'

import useAuthModal from '@/hooks/useAuthModal'
import useUploadModal from '@/hooks/useUploadModal'
import { useUser } from '@/hooks/useUser'

import { Song } from '@/types'

interface LibraryProps {
  songs: Song[]
}

export default function Library({ songs }: LibraryProps) {
  const authModal = useAuthModal()
  const uploadModal = useUploadModal()
  const { user } = useUser()

  const onClick = () => {
    if (!user) {
      return authModal.onOpen()
    }

    return uploadModal.onOpen()
  }

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 pt-4">
        <div className="inline-flex items-center gap-x-2">
          <TbPlaylist className="text-neutral-400" size={26} />
          <p className="text-neutral-400 font-medium text-md">Sua biblioteca</p>
        </div>
        <AiOutlinePlus
          onClick={onClick}
          size={20}
          className="text-neutral-400 cursor-pointer hover:text-white transition"
        />
      </div>

      <div className="flex flex-col gap-y-2 mt-4 px-3"></div>
    </div>
  )
}
