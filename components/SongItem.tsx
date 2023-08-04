'use client'

import Image from 'next/image'

import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '@/types'

import PlayButton from './PlayButton'

interface SongItemProps {
  data: Song
  onClick: (id: string) => void
}

export default function SongItem({ data, onClick }: SongItemProps) {
  const imagePath = useLoadImage(data)

  return (
    <div className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3">
      <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
        <Image
          className="object-cover"
          src={imagePath || '/images/liked.png'}
          alt="liked"
          fill
        />
      </div>

      <div className="flex flex-col items-start w-full p-4 gap-y-4">
        <p className="font-semibold truncate w-full">{data.title}</p>
        <p className="text-neutral-400 text-sm pb-4 w-full">by {data.author}</p>
      </div>

      <div className="absolute bottom-24 right-5">
        <PlayButton />
      </div>
    </div>
  )
}
