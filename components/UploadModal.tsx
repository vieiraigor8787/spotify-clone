'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import toast from 'react-hot-toast'
import uniqid from 'uniqid'

import { useSupabaseClient } from '@supabase/auth-helpers-react'

import useUploadModal from '@/hooks/useUploadModal'
import { useUser } from '@/hooks/useUser'

import Modal from './Modal'
import Input from './Input'
import Button from './Button'

export default function UploadModal() {
  const uploadModal = useUploadModal()
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser()
  const supabaseClient = useSupabaseClient()
  const router = useRouter()

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: '',
      title: '',
      song: null,
      image: null,
    },
  })

  const onChange = (open: boolean) => {
    if (!open) {
      reset()
      uploadModal.onClose()
    }
  }

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    try {
      setIsLoading(true)

      const imageFile = values.image?.[0]
      const songFile = values.song?.[0]

      if (!imageFile || !songFile || !user) {
        toast.error('Faltam preencher campos')
        return
      }

      const uniqId = uniqid()

      //upload songs
      const { data: songData, error: songError } = await supabaseClient.storage
        .from('songs')
        .upload(`song-${values.title}-${uniqId}`, songFile, {
          cacheControl: '3600',
          upsert: false,
        })

      if (songError) {
        setIsLoading(false)
        return toast.error('Falha no upload da música.')
      }

      //upload image
      const { data: imageData, error: imageError } =
        await supabaseClient.storage
          .from('images')
          .upload(`image-${values.title}-${uniqId}`, imageFile, {
            cacheControl: '3600',
            upsert: false,
          })

      if (imageError) {
        setIsLoading(false)
        return toast.error('Falha no upload da imagem.')
      }

      const { error: supaBaseError } = await supabaseClient
        .from('songs')
        .insert({
          user_id: user.id,
          title: values.title,
          author: values.author,
          image_path: imageData.path,
          song_path: songData.path,
        })

      if (supaBaseError) {
        setIsLoading(false)
        return toast.error(supaBaseError.message)
      }

      router.refresh()
      setIsLoading(false)
      toast.success('Música criada com sucesso!')
    } catch (error) {
      toast.error('Ops! Algo deu errado')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Modal
      title="Adicione músicas"
      description="Suba um arquivo mp3"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register('title', { required: true })}
          placeholder="Título da música"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register('author', { required: true })}
          placeholder="Autor da música"
        />
        <div>
          <div className="pb-1 text-sm">Selecione um arquivo de música</div>
          <Input
            id="song"
            type="file"
            disabled={isLoading}
            accept=".mp3"
            {...register('song', { required: true })}
          />
        </div>
        <div>
          <div className="pb-1 text-sm">Selecione um arquivo de imagem</div>
          <Input
            id="image"
            type="file"
            disabled={isLoading}
            accept="image/*"
            {...register('image', { required: true })}
          />
        </div>
        <Button disabled={isLoading}>Criar</Button>
      </form>
    </Modal>
  )
}
