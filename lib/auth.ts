'use server'

import { cookies } from 'next/headers'

export async function login() {
  const cookieStore = cookies()
  
  cookieStore.set('workshop_auth', 'true', {
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 3600, // 1 hour
    path: '/',
  })

  return { isAuthenticated: true }
}

export async function logout() {
  const cookieStore = cookies()
  
  cookieStore.delete('workshop_auth')

  return { isAuthenticated: false }
}

export async function checkAuth() {
  const cookieStore = cookies()
  const isAuthenticated = cookieStore.has('workshop_auth')
  
  return { isAuthenticated }
}
