'use client'

import { Toaster } from 'react-hot-toast'

export default function ToastProvider() {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: '#333',
          color: '#fff',
        },
      }}
    />
  )
}
