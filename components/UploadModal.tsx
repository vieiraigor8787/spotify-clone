'use client'

import { useState } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'

import useUploadModal from '@/hooks/useUploadModal'

import Modal from './Modal'
import Input from './Input'
import Button from './Button'

export default function UploadModal() {
  const uploadModal = useUploadModal()
  const [isLoading, setIsLoading] = useState(false)

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

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {}

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
