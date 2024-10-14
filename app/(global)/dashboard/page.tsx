import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Metadata } from 'next'
import { unstable_noStore } from 'next/cache'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Dashboard - Workshop',
  }
}

function generateRandomMetrics() {
  unstable_noStore()

  const metricTitles = [
    'Page Views',
    'Unique Visitors',
    'Conversions',
    'Bounce Rate',
    'Session Duration',
    'New Users',
    'Revenue',
    'Click-through Rate',
    'Time on Page',
    'Return Visitors',
    'Goal Completions',
    'Exit Rate',
    'Pages per Session',
    'Social Shares',
    'Email Signups',
  ]

  const metrics = []
  const usedTitles = new Set()

  for (let i = 0; i < 12; i++) {
    let title
    do {
      title = metricTitles[Math.floor(Math.random() * metricTitles.length)]
    } while (usedTitles.has(title))

    usedTitles.add(title)
    const value = Math.floor(Math.random() * 10000)
    metrics.push([title, value])
  }

  return metrics
}

export const dynamic = 'force-dynamic'

export default function DashboardPage() {
  const cookieStore = cookies()
  const authCookie = cookieStore.get('workshop_auth')?.value

  if (!authCookie) {
    redirect('/login?returnTo=/dashboard')
  }

  const data = generateRandomMetrics()

  return (
    <div className="grid grid-cols-2 gap-5 xl:grid-cols-3">
      {data.map(([title, value], index) => (
        <div key={index}>
          <ul>
            <li>{title}</li>
            <li className="opacity-50">{value}</li>
          </ul>
        </div>
      ))}
    </div>
  )
}
