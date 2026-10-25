import { notFound } from 'next/navigation'
import { getPayload } from 'payload'

import config from '@/payload.config'
import { BlogRichText } from '@/components/BlogRichText'

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const result = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
    depth: 2,
    limit: 1,
  })

  const post = result.docs[0]

  if (!post) {
    notFound()
  }

  const authorName =
    typeof post.author === 'object' && post.author && 'email' in post.author
      ? post.author.name || post.author.email
      : 'Unknown author'

  const coverImageUrl =
    typeof post.coverImage === 'object' && post.coverImage && 'url' in post.coverImage
      ? (post.coverImage.url as string | null)
      : null

  return (
    <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <article className="overflow-hidden p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          {post.publishedAt
            ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })
            : 'Draft'}
        </p>

        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          {post.title}
        </h1>

        <div className="mt-4 text-sm text-muted-foreground">By {authorName}</div>

        {post.excerpt ? (
          <p className="mt-6 text-lg leading-8 text-muted-foreground">{post.excerpt}</p>
        ) : null}

        {coverImageUrl ? (
          <img
            src={coverImageUrl}
            alt={post.title}
            className="my-8 aspect-video w-full rounded-2xl object-cover"
          />
        ) : null}

        <div className="prose prose-lg max-w-none dark:prose-invert pt-6">
          <BlogRichText data={post.content} />
        </div>
      </article>
    </main>
  )
}
