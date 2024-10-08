import { type GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import { NavContent } from '@/components/nav'
import nookies from 'nookies'

function generateRandomMetrics() {
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

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const cookies = nookies.get(context)

  if (!!cookies['workshop_auth']) {
    return {
      props: {
        data: generateRandomMetrics(),
      },
    }
  }

  return {
    redirect: {
      destination: '/login?returnTo=/dashboard',
      permanent: false,
    },
  }
}

function Page({ data }: { data: [string, number][] }) {
  return (
    <>
      <Head>
        <title>Dashboard - Workshop</title>
      </Head>
      <NavContent />
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
    </>
  )
}

export default Page
