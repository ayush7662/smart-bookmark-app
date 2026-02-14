'use client'

import { useEffect, useState } from 'react'

export function RedirectUrlHelper() {
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null)

  useEffect(() => {
    setRedirectUrl(`${window.location.origin}/auth/callback`)
  }, [])

  return (
    <div className="w-full max-w-md rounded-lg border-2 border-blue-300 bg-blue-50 p-4 text-sm dark:border-blue-700 dark:bg-blue-950/50">
      <p className="font-bold text-blue-900 dark:text-blue-100">
        Add this exact URL to Supabase Redirect URLs:
      </p>
      <code className="mt-2 block break-all rounded bg-blue-100 px-2 py-2 font-mono text-blue-900 dark:bg-blue-900/50 dark:text-blue-100">
        {redirectUrl ?? 'http://localhost:3000/auth/callback'}
      </code>
      <p className="mt-2 text-blue-800 dark:text-blue-200">
        If you use both localhost and 127.0.0.1, add both variants.
      </p>
    </div>
  )
}
