'use client'

import SongItem from './SongItem'
import useOnPlay from '@/hooks/useOnPlay'

import { Song } from '@/types'

interface PageCotentProps {
  songs: Song[]
}

export default function PageContent({ songs }: PageCotentProps) {
  const onPlay = useOnPlay(songs)

  if (songs.length === 0) {
    return (
      <div className="mt-4 text-neutral-400">Nenhuma música disponível</div>
    )
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
      {songs.map((song) => (
        <SongItem
          key={song.id}
          onClick={(id: string) => onPlay(id)}
          data={song}
        />
      ))}
    </div>
  )
}
