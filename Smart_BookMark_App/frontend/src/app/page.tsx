import { createClient } from '@/lib/supabase/server'
import { signInWithGoogle, signOut } from './actions/auth'
import { BookmarkForm } from '@/components/BookmarkForm'
import { BookmarkList } from '@/components/BookmarkList'

export default async function Home() {
  const supabase = await createClient()

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // If not logged in → show Google login
  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-8">
        <h1 className="text-3xl font-bold text-zinc-900 dark:text-zinc-100">
          Smart Bookmark App
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400">
          Sign in with Google to save and manage your bookmarks.
        </p>
        <form action={signInWithGoogle}>
          <button
            type="submit"
            className="flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-6 py-3 font-medium shadow-sm hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
          >
            Sign in with Google
          </button>
        </form>
      </div>
    )
  }

  // Fetch only current user's bookmarks (VERY IMPORTANT)
  const { data: bookmarks, error } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', user.id) // 🔥 required for RLS + privacy
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching bookmarks:', error)
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
            Smart Bookmark App
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">
              {user.email}
            </span>
            <form action={signOut}>
              <button
                type="submit"
                className="rounded-lg bg-zinc-200 px-3 py-1.5 text-sm font-medium hover:bg-zinc-300 dark:bg-zinc-700 dark:hover:bg-zinc-600"
              >
                Sign out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-2xl space-y-8 p-4 py-8">
        <BookmarkForm />

        <section>
          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Your Bookmarks
          </h2>

          <BookmarkList initialBookmarks={bookmarks ?? []} />
        </section>
      </main>
    </div>
  )
}