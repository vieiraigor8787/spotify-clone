import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

import { createOrRetrieveCustomer } from '@/libs/supabaseAdmin'
import { stripe } from '@/libs/stripe'
import { getURL } from '@/libs/helpers'

export async function POST() {
  try {
    const supabase = createRouteHandlerClient({
      cookies,
    })

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) throw new Error('Usuário não encontrado')

    const customer = await createOrRetrieveCustomer({
      uuid: user?.id || '',
      email: user?.email || '',
    })

    if (!customer) throw new Error('Cliente não encontrado')

    const { url } = await stripe.billingPortal.sessions.create({
      customer,
      return_url: `${getURL()}/account`,
    })

    return NextResponse.json({ url })
  } catch (err: any) {
    console.log(err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
