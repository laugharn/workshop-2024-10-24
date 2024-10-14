import { NextResponse } from 'next/server'
import { login } from '@/lib/auth'

export async function POST() {
  const result = await login()
  return NextResponse.json(result, { status: 200 })
}

