'use client'

import Modal from '@/components/Modal'
import { useState, useEffect } from 'react'

export default function ModalProvider() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <Modal
        title="test modal"
        description="description"
        onChange={() => {}}
        isOpen
      >
        test child
      </Modal>
    </>
  )
}
