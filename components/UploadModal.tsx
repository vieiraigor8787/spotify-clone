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
      title="test"
      description="test"
      isOpen={uploadModal.isOpen}
      onChange={onChange}
    >
      content uploaded
    </Modal>
  )
}
