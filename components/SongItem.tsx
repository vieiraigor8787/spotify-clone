'use client'

import useLoadImage from '@/hooks/useLoadImage'
import { Song } from '@/types'

interface SongItemProps {
  data: Song
  onClick: (id: string) => void
}

export default function SongItem({ data, onClick }: SongItemProps) {
  const imagePath = useLoadImage(data)

  return (
    <div className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3">
      Song item
    </div>
  )
}
