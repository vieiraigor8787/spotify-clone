'use client'

import { useState } from 'react'
import { toast } from 'react-hot-toast'

import { postData } from '@/libs/helpers'
import { getStripe } from '@/libs/stripeClient'
import { useUser } from '@/hooks/useUser'

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
  const { user, isLoading, subscription } = useUser()
  const [priceIdLoading, setPriceIdLoading] = useState<string>()

  const handleCheckout = async (price: Price) => {
    setPriceIdLoading(price.id)

    if (!user) {
      setPriceIdLoading(undefined)
      return toast.error('Necessário fazer o login')
    }

    if (subscription) {
      setPriceIdLoading(undefined)
      return toast('Você já é Premium')
    }

    try {
      const { sessionId } = await postData({
        url: '/api/create-checkout-session',
        data: { price },
      })

      const stripe = await getStripe()
      stripe?.redirectToCheckout({ sessionId })
    } catch (error) {
      toast.error((error as Error)?.message)
    } finally {
      setPriceIdLoading(undefined)
    }
  }

  let content = <div className="text-center">Nenhum produto disponível.</div>

  if (products.length) {
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length) {
            return <div key={product.id}>Nenhum preço disponivel</div>
          }
          return product.prices.map((price) => (
            <Button
              key={price.id}
              onClick={() => {}}
              disabled={isLoading || price.id === priceIdLoading}
              className="mb-4"
            >
              {`Seja usuário Premium por apenas ${formatPrice(price)}/mês`}
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
