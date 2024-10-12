import type { Post, Tag } from '@/sanity/types'
import Article from '@/components/article'
import { format } from 'date-fns'
import Link from '@/components/link'
import { PortableText } from '@portabletext/react'
import { sanityClient } from '@/lib/sanity'
import { Metadata } from 'next'

type TypedPost = Omit<Post, 'tags'> & { tags: Tag[] }

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await sanityClient.fetch<TypedPost>(`*[_type == "post" && slug.current == $slug]{...,tags[]->}[0]`, {
    slug: params.slug,
  })

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} - Workshop`,
  }
}

export default async function Page({ params }: Props): Promise<JSX.Element> {
  const post = await sanityClient.fetch<TypedPost>(`*[_type == "post" && slug.current == $slug]{...,tags[]->}[0]`, {
    slug: params.slug,
  })

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <Article>
      <header>
        <h1>{post.title}</h1>
        <p>{format(new Date(post._createdAt), 'yyyy-MM-dd')}</p>
      </header>
      {post.body && (
        <div>
          <PortableText value={post.body} />
        </div>
      )}
      <p>
        <span>
          Tagged:{' '}
          {post.tags.map((tag) => (
            <Link key={tag._id} href={`/tags/${tag.slug!.current}`}>
              {tag.title}
            </Link>
          ))}
        </span>
      </p>
    </Article>
  )
}