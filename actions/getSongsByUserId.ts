import { Song } from '@/types'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

const getSongsByUserId = async (): Promise<Song[]> => {
  const supaBase = createServerComponentClient({
    cookies: cookies,
  })

  const { data: sessionData, error: sessionError } =
    await supaBase.auth.getSession()

  if (sessionError) {
    console.log(sessionError.message)
    return []
  }

  const { data, error } = await supaBase
    .from('/songs')
    .select('*')
    .eq('user_id', sessionData.session?.user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.log(error.message)
  }

  return (data as any) || []
}

export default getSongsByUserId
