import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  const next = url.searchParams.get('next') ?? '/'
  let errorMessage = url.searchParams.get('error_description') ?? url.searchParams.get('error') ?? null
  const origin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ?? url.origin

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
    errorMessage = error.message
  }

  const errorUrl = new URL('/auth/error', origin)
  if (errorMessage) errorUrl.searchParams.set('message', encodeURIComponent(errorMessage))
  return NextResponse.redirect(errorUrl.toString())
}
