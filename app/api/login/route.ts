import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ isAuthenticated: true }, { status: 200 })

  response.cookies.set('workshop_auth', 'true', {
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 3600, // 1 hour
    path: '/',
  })

  return response
}
