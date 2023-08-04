'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useSessionContext } from '@supabase/auth-helpers-react'

import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'

interface LikeButtonProps {
  songId: string
}

export default function LikeButton({ songId }: LikeButtonProps) {
  const router = useRouter()
  const { supabaseClient } = useSessionContext()

  const authoModal = useAuthModal()
  const { user } = useUser()

  const [isLiked, setIsLiked] = useState(false)

  return <div>LikeButton</div>
}
