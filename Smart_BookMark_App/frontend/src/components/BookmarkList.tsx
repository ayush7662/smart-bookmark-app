'use client'

import { createClient } from '@/lib/supabase/client'
import { deleteBookmark } from '@/app/actions/bookmarks'
import { useEffect, useState } from 'react'
import type { Database } from '@/types/database'

type Bookmark = Database['public']['Tables']['bookmarks']['Row']

export function BookmarkList({ initialBookmarks }: { initialBookmarks: Bookmark[] }) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    const channel = supabase
      .channel('bookmarks-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookmarks',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setBookmarks((prev) => [payload.new as Bookmark, ...prev])
          } else if (payload.eventType === 'DELETE') {
            setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id))
          }
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  async function handleDelete(id: string) {
    setDeletingId(id)
    try {
      await deleteBookmark(id)
      setBookmarks((prev) => prev.filter((b) => b.id !== id))
    } finally {
      setDeletingId(null)
    }
  }

  if (bookmarks.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-zinc-300 p-8 text-center text-zinc-500 dark:border-zinc-700">
        No bookmarks yet. Add your first one above!
      </p>
    )
  }

  return (
    <ul className="flex flex-col gap-2">
      {bookmarks.map((bookmark) => (
        <li
          key={bookmark.id}
          className="flex items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
        >
          <div className="min-w-0 flex-1">
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block truncate font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              {bookmark.title}
            </a>
            <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
              {bookmark.url}
            </p>
          </div>
          <button
            onClick={() => handleDelete(bookmark.id)}
            disabled={deletingId === bookmark.id}
            className="rounded-lg bg-red-100 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-200 disabled:opacity-50 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
          >
            {deletingId === bookmark.id ? 'Deleting...' : 'Delete'}
          </button>
        </li>
      ))}
    </ul>
  )
}
