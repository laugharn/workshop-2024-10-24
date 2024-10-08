import type { Post, Tag } from '@/sanity/types'
import { type GetStaticPaths } from 'next'
import Head from 'next/head'
import { NavContent } from '@/components/nav'
import Posts from '@/components/posts'
import { sanityClient } from '@/lib/sanity'

interface Props {
  posts: Post[]
  tag: Tag
}

export function getStaticPaths(): ReturnType<GetStaticPaths> {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export async function getStaticProps({
  params,
}: {
  params: { slug: string }
}): Promise<{ props: Props } | { notFound: true }> {
  const tag = await sanityClient.fetch<Tag>(`*[_type == "tag" && slug.current == $slug][0]`, { slug: params.slug })

  if (!tag) {
    return {
      notFound: true,
    }
  }

  const posts = await sanityClient.fetch<Post[]>(`*[_type == "post" && references($tagId)] | order(_createdAt desc)`, {
    tagId: tag._id,
  })

  return {
    props: {
      posts,
      tag,
    },
  }
}

export default function TagPage({ posts, tag }: Props): JSX.Element {
  return (
    <>
      <Head>
        <title>{`${tag.title} - Workshop`}</title>
      </Head>
      <NavContent />
      <article className="grid w-full grid-cols-1 gap-5">
        <header>
          <h1>{tag.title}</h1>
          {tag.description && <p>{tag.description}.</p>}
        </header>
        <Posts posts={posts} />
      </article>
    </>
  )
}
