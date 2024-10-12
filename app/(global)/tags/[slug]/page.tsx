import type { Post, Tag } from '@/sanity/types'
import { Metadata } from 'next'
import { NavContent } from '@/components/nav'
import Posts from '@/components/posts'
import { sanityClient } from '@/lib/sanity'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = await sanityClient.fetch<Tag>(`*[_type == "tag" && slug.current == $slug][0]`, { slug: params.slug })
  
  if (!tag) {
    return {
      title: 'Tag Not Found',
    }
  }

  return {
    title: `${tag.title} - Workshop`,
  }
}

export default async function TagPage({ params }: Props) {
  const tag = await sanityClient.fetch<Tag>(`*[_type == "tag" && slug.current == $slug][0]`, { slug: params.slug })

  if (!tag) {
    return <div>Tag not found</div>
  }

  const posts = await sanityClient.fetch<Post[]>(`*[_type == "post" && references($tagId)] | order(_createdAt desc)`, {
    tagId: tag._id,
  })

  return (
    <article className="grid w-full grid-cols-1 gap-5">
      <header>
        <h1>{tag.title}</h1>
        {tag.description && <p>{tag.description}.</p>}
      </header>
      <Posts posts={posts} />
    </article>
  )
}