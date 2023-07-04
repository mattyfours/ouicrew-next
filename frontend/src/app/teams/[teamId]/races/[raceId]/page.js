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
import { t } from '@/languages/languages'
import { serverDateTimeToReadable } from '@/helpers/dateFormater'
import StyledDashboardTeamList from '@/components/styed/StyledDashboardTeamList'

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

      <StyledDashboardTeamList>
        <ul className='team-list-race-details'>
          <li><strong>{t('forms.race_title')}: </strong>{data.race.title}</li>
          <li><strong>{t('forms.distance')}: </strong>{data.race.distance}m</li>
          <li><strong>{t('forms.race_title')}: </strong>{serverDateTimeToReadable(data.race.event_time)}</li>
          <li><strong>{t('forms.checkpoints')}: </strong>{data.race.checkpoints}</li>
          {
            (
              typeof data.race?.notes !== 'undefined' &&
              data.race?.notes?.length > 0
            ) && (
              <li><strong>{t('forms.notes')}: </strong>{data.race.notes}</li>
            )
          }
          {
            data.race.is_public === true && (
              <li>
                <strong>Public Link: </strong>
                <Link href={`/teams/${teamId}/races/${raceId}`}>
                  {`${window.location.protocol}//${window.location.host}/teams/${teamId}/races/${raceId}`}
                </Link>

              </li>
            )
          }
        </ul>
      </StyledDashboardTeamList>

    </>
  )
}
