'use client'

import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'

import useUploadModal from '@/hooks/useUploadModal'

import Modal from './Modal'

export default function UploadModal() {
  const uploadModal = useUploadModal()

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
      <form onSubmit={handleSubmit(onSubmit)}></form>
    </Modal>
  )
}
