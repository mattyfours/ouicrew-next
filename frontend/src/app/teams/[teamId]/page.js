'use client'

import ErrorPage from '@/components/pages/ErrorPage'
import axios from 'axios'
import { styled } from 'styled-components'
import { useParams } from 'next/navigation'
import { t } from '@/languages/languages'
import { useDynamicFetch } from '@/hooks/useDynamicFetch'
import { useCallback, useState } from 'react'
import ResponsiveTable from '@/components/displayElements/ResponsiveTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Button from '@/components/formElements/Button'
import Modal from '@/components/utils/Modal'
import NewRaceForm from '@/components/forms/NewRaceForm'
import { serverDateTimeToReadable } from '@/helpers/dateFormater'
import StyledTeamBar from '@/components/styed/StyledTeamBar'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import LoadingPage from '@/components/pages/LoadingPage'

const StyledPublicTeam = styled.nav`
  position: relative;
  text-align: left;
  max-width: var(--width-modal);
  margin: 32px auto 0;

  h2 {
    margin: 0 0 8px;
  }

  .new-team-button {
    display: flex;
    margin: 10px 0 0 auto;
  }

  .action-buttons {
    margin: 10px 0 0 auto;
    display: grid;
    width: fit-content;
    grid-auto-flow: column;
    gap: 16px;
  }

  .no-team-notice {
    border: 1px solid var(--text-color);
    padding: 16px;
    margin: 0;
  }
`

export default function TeamPage ({ children }) {
  const { teamId } = useParams()

  const {
    data
  } = useDynamicFetch(async () => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL_BASE}/teams/${teamId}`
    const { data } = await axios.get(url,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    return data
  })

  const team = data?.teams?.find(team => teamId === team.id) || {}
  useDocumentTitle(team.name || t('dashboard.metatitle'), [data])

  if (data === null) {
    return <LoadingPage />
  }

  if (typeof data?.error !== 'undefined') {
    return <ErrorPage error={data.error?.response?.data?.error?.[0]} />
  }

  return (
    <>
      <StyledTeamBar>
        <h2>{data.team.name}</h2>
      </StyledTeamBar>

      <StyledPublicTeam>

        <h2 className='heading-small'>{t('dashboard.public_race_list')}</h2>
        {
          data.public_races?.length === 0
            ? (<p className='no-team-notice'><small>{t('dashboard.no_races_found')}</small></p>)
            : (
              <ResponsiveTable
                headings={[
                  'Race Title',
                  'Event Time',
                  'Distance'
                ]}
              >
                {
                  data.public_races.map((race, index) => (
                    <ResponsiveTable.Row key={`teamlist-${race.id}`}>
                      <ResponsiveTable.Item>
                        <Link href={`/teams/${teamId}/races/${race.id}`} className='icon-link'>
                          {race.title} <FontAwesomeIcon icon={faRightLong} />
                        </Link>
                      </ResponsiveTable.Item>
                      <ResponsiveTable.Item>
                        {serverDateTimeToReadable(race.event_time)}
                      </ResponsiveTable.Item>
                      <ResponsiveTable.Item>
                        {race.distance}m
                      </ResponsiveTable.Item>
                    </ResponsiveTable.Row>
                  ))
                }
              </ResponsiveTable>
              )
        }
      </StyledPublicTeam>
    </>
  )
}
