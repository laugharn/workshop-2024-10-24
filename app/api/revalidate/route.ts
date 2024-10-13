import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const tags = request.nextUrl.searchParams.get('tags')

  // Check for secret to confirm this is a valid request
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  if (!tags) {
    return NextResponse.json({ message: 'No tags provided' }, { status: 400 })
  }

  try {
    const tagArray = tags.split(',').map(tag => tag.trim())

    for (const tag of tagArray) {
      await revalidateTag(tag)
    }

    return NextResponse.json({
      revalidated: true,
      message: `Revalidated tags: ${tagArray.join(', ')}`
    })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}

