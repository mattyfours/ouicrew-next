'use client'

import ErrorPage from '@/components/pages/ErrorPage'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { useDynamicFetch } from '@/hooks/useDynamicFetch'
import Link from 'next/link'
import StyledTeamBar from '@/components/styed/StyledTeamBar'
import RaceMenuBar from '@/components/race/RaceMenuBar'
import RaceResults from '@/components/race/RaceResults'
import LoadingPage from '@/components/pages/LoadingPage'

export default function PublicTeamRaceResultsPage ({ children }) {
  const { userId, teamId, raceId } = useParams()

  const {
    data,
    refetch
  } = useDynamicFetch(async () => {
    const url = [
      process.env.NEXT_PUBLIC_SERVER_URL_BASE,
      `/teams/${teamId}`,
      `/races/${raceId}`
    ].join('')
    const { data } = await axios.get(url,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-ouicrew-timestamp': Date.now()
        }
      }
    )

    return data
  }, [])

  if (data === null) {
    return <LoadingPage />
  }

  if (typeof data?.error !== 'undefined') {
    return <ErrorPage error={data.error?.response?.data?.error?.[0]} />
  }

  return (
    <>
      <StyledTeamBar>
        <h2>
          <Link
            href={`/user/${userId}/teams/${teamId}`}
          >
            {data.team.name}
          </Link>
          <span>/</span>
          {data.race.title}
        </h2>
      </StyledTeamBar>

      <RaceMenuBar data={data} />

      <RaceResults
        data={data}
        refetch={refetch}
      />
    </>
  )
}
