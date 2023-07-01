'use client'

import ErrorPage from '@/components/pages/ErrorPage'
import axios from 'axios'
import { styled } from 'styled-components'
import { useParams } from 'next/navigation'
import { t } from '@/languages/languages'
import { useDynamicFetch } from '@/hooks/useDynamicFetch'
import { useCallback, useState } from 'react'
import ResponsiveTable from '@/components/displayElements/ResponsiveTable'
import Link from 'next/link'
import StyledTeamBar from '@/components/styed/StyledTeamBar'
import RaceMenuBar from '@/components/race/RaceMenuBar'
import { getNowTimeInTimezone, timeToHhMmSsMs } from '@/helpers/dateFormater'

const StyledDashboardResultDisplay = styled.nav`
  position: relative;
  text-align: left;
  max-width: var(--width-modal);
  margin: 24px auto 0;
  border-top: 1px solid var(--text-color);

  h2 {
    margin: 12px 0 8px;
  }

`

export default function UserTeamRaceResultsPage ({ children }) {
  const { userId, teamId, raceId } = useParams()
  const [nowTime, setNowTime] = useState(getNowTimeInTimezone())
  const [ongoingResults, setOngoingResults] = useState([])

  const {
    data,
    refetch
  } = useDynamicFetch(async () => {
    const url = [
      process.env.NEXT_PUBLIC_SERVER_URL_BASE,
      `/user/${userId}`,
      `/teams/${teamId}`,
      `/race/${raceId}`,
      '/results'
    ].join('')
    const { data } = await axios.get(url,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-ouicrew-session-token': localStorage.getItem('userSessionToken')
        }
      }
    )

    console.log(data)

    setNowTime(getNowTimeInTimezone(data.time_zone_offset_ms))
    setOngoingResults(
      data?.results?.filter(result => result.finish_time === null)
    )

    return data
  }, [
    setNowTime,
    setOngoingResults
  ])

  if (data === null) {
    return <h1>Loading</h1>
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

      <StyledDashboardResultDisplay>
        <h2 className='heading-small'>{t('dashboard.in_progress')}</h2>
        {
          ongoingResults.length === 0
            ? (<p className='no-log-notice'><small>{t('dashboard.no_ongoing_results')}</small></p>)
            : (
              <ResponsiveTable
                headings={[
                  'Entry',
                  'Current Time HH:MM:SS.MS'
                ]}
              >
                {
                  ongoingResults.map(result => (
                    <ResponsiveTable.Row key={`${data.race.id}--${result.id}`}>
                      <ResponsiveTable.Item>
                        {result.entry.name}
                      </ResponsiveTable.Item>

                      <ResponsiveTable.Item>

                        e
                      </ResponsiveTable.Item>
                    </ResponsiveTable.Row>
                  ))
                }
              </ResponsiveTable>
              )
        }

      </StyledDashboardResultDisplay>

    </>
  )
}
