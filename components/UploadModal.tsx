'use client'

import useUploadModal from '@/hooks/useUploadModal'

import Modal from './Modal'

export default function UploadModal() {
  const uploadModal = useUploadModal()

  const onChange = (open: boolean) => {
    if (!open) {
      uploadModal.onClose()
    }
  }

  return (
    <Modal
      title="Adicione músicas"
      description="Suba um arquivo mp3"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      Form
    </Modal>
  )
}
