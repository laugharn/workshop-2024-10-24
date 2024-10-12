import { Metadata } from 'next'
import Article from '@/components/article'
import { NavContent } from '@/components/nav'
import type { Post } from '@/sanity/types'
import Posts from '@/components/posts'
import { sanityClient } from '@/lib/sanity'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'The Best Workshop Content in the World - Workshop',
  }
}

async function getPosts() {
  const posts = await sanityClient.fetch<Post[]>(`*[_type == "post"]`)
  return posts
}

export default async function Page() {
  const posts = await getPosts()

  return (
    <>
      <NavContent />
      <Article>
        <h1>The Best Workshop Content in the World</h1>
        <Posts posts={posts} />
      </Article>
    </>
  )
}