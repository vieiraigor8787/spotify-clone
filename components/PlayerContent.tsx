'use client'

import { Song } from '@/types'

import MediaItem from './MediaItem'
import LikeButton from './LikeButton'

interface PlayerContentProps {
  song: Song
  songUrl: string
}

export default function PlayerContent({ songUrl, song }: PlayerContentProps) {
  return (
    <div className="grid grid-cols md:grid-cols-3 h-full">
      <div className="flex w-full justify-start">
        <div className="flex items-center gap-x-4">
          <MediaItem data={song} />
          <LikeButton songId={song.id} />
        </div>
      </div>

      <div className="flex md:hidden col-auto w-full justify-end items-center">
        <div
          className="h-10 w-10 flex items-center justify-center rounded-full bg-white p-1 cursor-pointer"
          onClick={() => {}}
        ></div>
      </div>
    </div>
  )
}
