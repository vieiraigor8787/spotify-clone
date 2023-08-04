'use client'

import MediaItem from '@/components/MediaItem'

import { Song } from '@/types'

interface SearcContentProps {
  songs: Song[]
}

export default function SearchContent({ songs }: SearcContentProps) {
  if (songs.length === 0) {
    return (
      <div className="flex flex-col gap-y-2 w-full px-6 text-neutral-400">
        Nenhuma música encontrada
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-2 w-full px-6">
      {songs.map((song) => (
        <div key={song.id} className="flex items-center gap-x-4 w-full">
          <div className="flex-1">
            <MediaItem data={song} onClick={() => {}} />
          </div>
        </div>
      ))}
    </div>
  )
}