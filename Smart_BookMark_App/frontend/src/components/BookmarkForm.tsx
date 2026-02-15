'use client'

import { supabase } from '@/lib/supabase/client'

import { useState } from 'react'

export function BookmarkForm() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)

    try {
      const title = formData.get('title') as string
      const url = formData.get('url') as string

      // get current logged-in user
      const { data: userData } = await supabase.auth.getUser()
      const userId = userData.user?.id
      if (!userId) throw new Error('You must be signed in to add bookmarks.')

      // insert bookmark into Supabase
      const { error } = await supabase
        .from('bookmarks')
        .insert({ title, url, user_id: userId })

      if (error) throw error

      ;(document.getElementById('bookmark-form') as HTMLFormElement)?.reset()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to add bookmark')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      id="bookmark-form"
      action={handleSubmit}
      className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
    >
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Add Bookmark
      </h2>
      <input
        name="title"
        type="text"
        placeholder="Title"
        required
        className="rounded-lg border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
      />
      <input
        name="url"
        type="url"
        placeholder="https://example.com"
        required
        className="rounded-lg border border-zinc-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Adding...' : 'Add Bookmark'}
      </button>
    </form>
  )
}
