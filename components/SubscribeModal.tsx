'use client'

import Button from './Button'
import Modal from './Modal'

import { Price, ProductWithPrice } from '@/types'

interface SubscribeModalProps {
  products: ProductWithPrice[]
}

const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: 2,
  }).format((price?.unit_amount || 0) / 100)

  return priceString
}

export default function SubscribeModal({ products }: SubscribeModalProps) {
  let content = <div className="text-center">Nenhum produto disponível.</div>

  if (products.length) {
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length) {
            return <div key={product.id}>Nenhum preço disponivel</div>
          }
          return product.prices.map((price) => (
            <Button key={price.id} onClick={() => {}} disabled>
              {`Seja premium por apenas ${formatPrice(price)} por mês`}
            </Button>
          ))
        })}
      </div>
    )
  }

  return (
    <Modal
      title="Somente para usuários premium"
      description="Ouça músicas sem anúncios"
      isOpen
      onChange={() => {}}
    >
      {content}
    </Modal>
  )
}
