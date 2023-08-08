import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'

import { stripe } from '@/libs/stripe'
import {
  manageSubscriptionStatusChange,
  upsertPriceRecord,
  upsertProductRecord,
} from '@/libs/supabaseAdmin'

const relevantEvents = new Set([
  'product.created',
  'product.updated',
  'price.created',
  'price.updated',
  'checkout.session.completed',
  'customer.subscription.created',
  'customer.subscription.updated',
  'customer.subscription.deleted',
])

export async function POST(req: Request) {
  const body = await req.text()
  const signature = headers().get('Stripe-Signature')

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  let event: Stripe.Event

  try {
    if (!signature || !webhookSecret) return
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: any) {
    console.error('Erro:', err.message)
    return new NextResponse(`Webhook error: ${err.message}`, { status: 400 })
  }

  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case 'product.created':
        case 'product.updated':
          await upsertProductRecord(event.data.object as Stripe.Product)
          break
        case 'price.created':
        case 'price.updated':
          await upsertPriceRecord(event.data.object as Stripe.Price)
          break
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          const subs = event.data.object as Stripe.Subscription
          await manageSubscriptionStatusChange(
            subs.id,
            subs.customer as string,
            event.type === 'customer.subscription.created'
          )
          break
        case 'checkout.session.completed':
          const checkoutSession = event.data.object as Stripe.Checkout.Session
          if (checkoutSession.mode === 'subscription') {
            const subsId = checkoutSession.subscription
            await manageSubscriptionStatusChange(
              subsId as string,
              checkoutSession.customer as string,
              true
            )
          }
          break
        default:
          throw new Error('Unhandled relevant event')
      }
    } catch (err) {
      console.log(err)
      return new NextResponse('Webhook error', { status: 400 })
    }
  }

  return NextResponse.json({ received: true }, { status: 200 })
}
