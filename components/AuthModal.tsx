'use cliente'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import {
  useSessionContext,
  useSupabaseClient,
} from '@supabase/auth-helpers-react'

import useAuthModal from '@/hooks/useAuthModal'

import Modal from './Modal'

export default function AuthModal() {
  const supabaseClient = useSupabaseClient()
  const router = useRouter()
  const { session } = useSessionContext()
  const { onClose, isOpen } = useAuthModal()

  useEffect(() => {
    if (session) {
      router.refresh()
      onClose()
    }
  }, [session, router, onClose])

  const onChange = (open: boolean) => {
    if (!isOpen) {
      onClose()
    }
  }

  return (
    <Modal
      title="Bem vindo de volta"
      description="faça o login novamente"
      isOpen={isOpen}
      onChange={onChange}
    >
      <Auth
        theme="dark"
        providers={['github', 'google']}
        supabaseClient={supabaseClient}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#404040',
                brandAccent: '#22c55e',
              },
            },
          },
        }}
      />
    </Modal>
  )
}
