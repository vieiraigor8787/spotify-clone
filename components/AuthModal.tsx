'use cliente'

import Modal from './Modal'

export default function AuthModal() {
  return (
    <Modal
      title="Bem vindo de volta"
      description="faça o login novamente"
      isOpen
      onChange={() => {}}
    >
      Bem vindo de volta
    </Modal>
  )
}
