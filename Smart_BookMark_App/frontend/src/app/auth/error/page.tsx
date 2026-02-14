import Link from 'next/link'
import { RedirectUrlHelper } from '@/components/RedirectUrlHelper'

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>
}) {
  const params = await searchParams

  let message: string | null = null
  if (params.message) {
    try {
      message = decodeURIComponent(params.message)
    } catch {
      message = params.message
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-2xl font-bold text-red-600">Authentication Error</h1>
      <p className="max-w-md text-center text-zinc-600">
        {message ?? 'Something went wrong during sign in. Please try again.'}
      </p>

      <RedirectUrlHelper />

      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-left text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
        <p className="font-semibold">Steps:</p>
        <ol className="mt-2 list-inside list-decimal space-y-1">
          <li>Copy the blue URL above</li>
          <li>Supabase Dashboard → Authentication → URL Configuration</li>
          <li>Paste into Redirect URLs and click Add / Save</li>
          <li>Authentication → Providers → Google: add Client ID & Secret from Google Cloud Console</li>
          <li>In Google Cloud Console, add: <code className="break-all">https://cipdnnkcxmiyryuamoli.supabase.co/auth/v1/callback</code></li>
        </ol>
      </div>
      <Link
        href="/"
        className="rounded-lg bg-zinc-900 px-4 py-2 text-white hover:bg-zinc-800"
      >
        Back to Home
      </Link>
    </div>
  )
}
