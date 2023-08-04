'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/Ai'
import { useSessionContext } from '@supabase/auth-helpers-react'

import useAuthModal from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'

interface LikeButtonProps {
  songId: string
}

export default function LikeButton({ songId }: LikeButtonProps) {
  const router = useRouter()
  const { supabaseClient } = useSessionContext()

  const authModal = useAuthModal()
  const { user } = useUser()

  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (!user?.id) {
      return
    }

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .single()

      if (!error && data) {
        setIsLiked(true)
      }
    }

    fetchData()
  }, [songId, supabaseClient, user?.id])

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart

  const handleClick = async () => {
    //se nao está logado, abre o popup de autenticação
    if (!user) {
      return authModal.onOpen()
    } //
    //se ja está marcado como 'gostei', desmarca
    if (isLiked) {
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', songId)

      if (error) {
        toast.error(error.message)
      } else {
        setIsLiked(false)
      }
      //
      //marcar como 'gostei'
    } else {
      const { error } = await supabaseClient.from('liked_songs').insert({
        song_id: songId,
        user_id: user.id,
      })

      if (error) {
        toast.error(error.message)
      } else {
        setIsLiked(true)
        toast.success('Gostei')
      }
    }
    //
    router.refresh()
  }

  return (
    <button onClick={handleClick}>
      <Icon color={isLiked ? '#22c55e' : 'white'} size={25} />
    </button>
  )
}
