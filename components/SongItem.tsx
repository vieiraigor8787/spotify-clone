'use client'

import { Song } from '@/types'

interface SongItemProps {
  data: Song
  onClick: (id: string) => void
}

export default function SongItem({ data, onClick }: SongItemProps) {
  return <div>SongItem</div>
}
