import { getPayload } from 'payload'
import Link from 'next/link'

import config from '@/payload.config'

const formatDate = (value?: string | null) => {
  if (!value) return 'Draft'

  return new Date(value).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export default async function BlogPage() {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'posts',
    sort: '-publishedAt',
    depth: 2,
  })

  const posts = result.docs

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.22em] text-muted-foreground">
            Insights
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">Blog</h1>
        </div>
      </div>

      {posts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">
          No blog posts yet. Add some posts from the admin panel.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => {
            const authorName =
              typeof post.author === 'object' && post.author && 'email' in post.author
                ? post.author.name || post.author.email
                : 'Unknown author'
            const coverImageUrl =
              typeof post.coverImage === 'object' && post.coverImage && 'url' in post.coverImage
                ? (post.coverImage.url as string | null)
                : null

            return (
              <Link href={`/blog/${post.slug}`}>
                <article
                  key={post.id}
                  className="overflow-hidden rounded-2xl border border-border bg-card transition-all hover:bg-muted p-6"
                >
                  {coverImageUrl ? (
                    <img
                      src={coverImageUrl}
                      alt={post.title}
                      className="aspect-video w-full object-cover rounded-2xl"
                    />
                  ) : (
                    <div className="flex aspect-video items-center justify-center bg-muted text-sm text-muted-foreground rounded-2xl">
                      No cover image
                    </div>
                  )}

                  <div className="pt-6">
                    <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      <span>{formatDate(post.publishedAt as string | undefined)}</span>
                    </div>

                    <h2 className="mb-3 text-2xl font-semibold tracking-tight text-foreground">
                      {post.title}
                    </h2>

                    <p className="mb-4 text-sm leading-6 text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="mb-5 flex items-center justify-between text-sm text-muted-foreground">
                      <span>By {authorName}</span>
                    </div>

                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                    >
                      Read article
                    </Link>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>
      )}
    </main>
  )
}
