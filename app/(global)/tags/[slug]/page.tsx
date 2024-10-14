import type { Post, Tag } from '@/sanity/types'
import Posts from '@/components/posts'
import { sanityClient } from '@/lib/sanity'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

type TypedTag = Tag & { posts: Post[] }

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const tag = await sanityClient.fetch<TypedTag>(
    `*[_type == "tag" && slug.current == $slug]{title, description, "posts": *[_type == "post" && references(^._id)]{title, slug, _createdAt}}[0]`,
    { slug: params.slug },
    { next: { revalidate: Infinity, tags: [`tag-${params.slug}`] } }
  )

  if (!tag) {
    return {
      title: 'Tag Not Found',
    }
  }

  return {
    title: `${tag.title} - Workshop`,
  }
}

export default async function Page({ params }: Props) {
  const tag = await sanityClient.fetch<TypedTag>(
    `*[_type == "tag" && slug.current == $slug]{title, description, "posts": *[_type == "post" && references(^._id)]{title, slug, _createdAt}}[0]`,
    { slug: params.slug },
    { next: { revalidate: Infinity, tags: [`tag-${params.slug}`] } }
  )

  if (!tag) {
    notFound()
  }

  return (
    <article className="grid w-full grid-cols-1 gap-5">
      <header>
        <h1>{tag.title}</h1>
        {tag.description && <p>{tag.description}.</p>}
      </header>
      <Posts posts={tag.posts} />
    </article>
  )
}
