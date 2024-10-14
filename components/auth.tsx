'use client';

import { useEffect, useState } from 'react'
import Link from './link'
import { useRouter, usePathname } from 'next/navigation'
import { logout, checkAuth } from '@/lib/auth'

function Auth() {
  const router = useRouter()
  const pathname = usePathname()

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

  useEffect(() => {
    async function checkAuthStatus() {
      const { isAuthenticated } = await checkAuth()
      setIsAuthenticated(isAuthenticated)
    }
    checkAuthStatus()
  }, [pathname])

  if (isAuthenticated === null) {
    return null // Loading state
  }

  if (isAuthenticated) {
    return (
      <button
        className="text-[rgb(0,87,255)] hover:text-[blue]"
        onClick={async () => {
          const result = await logout()
          setIsAuthenticated(result.isAuthenticated)

          if (pathname === '/dashboard') {
            router.push('/login')
          }
        }}
      >
        Logout.
      </button>
    )
  }

  return (
    <Link href="/login" prefetch={false}>
      Login.
    </Link>
  )
}

export default Auth

