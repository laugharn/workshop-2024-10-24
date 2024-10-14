import type { Post } from '@/sanity/types'
import Posts from '@/components/posts'
import { sanityClient } from '@/lib/sanity'

export default async function Page() {
  const posts = await sanityClient.fetch<Post[]>(
    `*[_type == "post"] | order(_createdAt desc)`,
    {},
    { next: { revalidate: Infinity } },
  )

  return (
    <article className="grid w-full grid-cols-1 gap-5">
      <header>
        <h1>Welcome to the Workshop</h1>
      </header>
      <Posts posts={posts} />
    </article>
  )
}
