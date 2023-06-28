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
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Button from '@/components/formElements/Button'
import Modal from '@/components/utils/Modal'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import StyledTeamBar from '@/components/styed/StyledTeamBar'
import RaceMenuBar from '@/components/race/RaceMenuBar'
import NewRaceEntryForm from '@/components/forms/NewRaceEntryForm'
import ConfirmActionButton from '@/components/utils/ConfirmActionButton'
import Toast from '@/components/utils/Toast'

const StyledDashboardTeamList = styled.nav`
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

export default function UserTeamRacePage ({ children }) {
  const { userId, teamId, raceId } = useParams()

  // state
  const [errorMessage, setErrorMessage] = useState('')

  const {
    data,
    refetch
  } = useDynamicFetch(async () => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL_BASE}/user/${userId}/teams/${teamId}/race/${raceId}`
    const { data } = await axios.get(url,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-ouicrew-session-token': localStorage.getItem('userSessionToken')
        }
      }
    )
    return data
  })

  // Remove Entry
  const handleRemoveRaceEntry = useCallback(async (raceEntryId) => {
    try {
      const url = [
        process.env.NEXT_PUBLIC_SERVER_URL_BASE,
        `/user/${userId}`,
        `/teams/${teamId}`,
        `/race/${raceId}`,
        `/entry/${raceEntryId}`
      ].join('')
      await axios.delete(url,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-ouicrew-session-token': localStorage.getItem('userSessionToken')
          }
        }
      )

      setErrorMessage('')
      if (typeof refetch !== 'undefined') {
        await refetch()
      }
    } catch (err) {
      console.error(err)
      setErrorMessage(
        typeof err.response?.data?.error?.[0] === 'undefined'
          ? t('general.unexpected_error')
          : err.response.data.error[0].message
      )
    }
  }, [
    setErrorMessage
  ])

  const team = data?.teams?.find(team => teamId === team.id) || {}
  useDocumentTitle(team.name || t('dashboard.metatitle'), [data])

  const [isNewRaceModelOpen, setIsNewRaceModelOpen] = useState(false)

  const handleToogleNewRaceModal = useCallback((value) => {
    setIsNewRaceModelOpen(value)
  }, [setIsNewRaceModelOpen])

  const handleCloseToast = useCallback(() => {
    setErrorMessage('')
  }, [setErrorMessage])

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

      <StyledDashboardTeamList>
        <h2 className='heading-small'>{t('dashboard.entries')}</h2>

        {
          data.entries?.length === 0
            ? (<p className='no-team-notice'><small>{t('dashboard.no_entries_found')}</small></p>)
            : (
              <ResponsiveTable
                headings={[
                  'Entry Name',
                  'Standard',
                  data.team.is_team_editor === true
                    ? ''
                    : null
                ]}
              >
                {
                  data.entries.map((entry, index) => (
                    <ResponsiveTable.Row key={`entrylist-${entry.id}`}>
                      <ResponsiveTable.Item>
                        {
                          data.team.is_team_editor === true
                            ? (
                              <button
                                className='icon-link'
                              >
                                <FontAwesomeIcon icon={faPencil} />
                                {entry.name}
                              </button>
                              )
                            : entry.name
                        }
                      </ResponsiveTable.Item>

                      <ResponsiveTable.Item>
                        {entry.racing_standard_name}
                      </ResponsiveTable.Item>

                      {
                        data.team.is_team_editor === true && (
                          <ResponsiveTable.Item>

                            <ConfirmActionButton
                              className='icon-link'
                              message={`Remove ${entry.name} entry from ${data.race.title}?`}
                              onAction={() => handleRemoveRaceEntry(entry.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                              {t('dashboard.remove')}
                            </ConfirmActionButton>
                          </ResponsiveTable.Item>
                        )
                      }
                    </ResponsiveTable.Row>
                  ))
                }
              </ResponsiveTable>
              )
        }

        {
          data.team.is_team_editor === true &&
            <>
              <div className='action-buttons'>
                <Button className='new-team-button' size='small' onClick={() => handleToogleNewRaceModal(true)}>
                  {t('dashboard.add_entry')}
                </Button>
              </div>

              <Modal
                title={t('dashboard.add_entry')}
                active={isNewRaceModelOpen}
                onClose={() => handleToogleNewRaceModal(false)}
              >
                <NewRaceEntryForm
                  refetch={refetch}
                  refreshOnStateChange={isNewRaceModelOpen}
                />
              </Modal>
            </>
        }

        <Toast
          onClose={handleCloseToast}
          message={errorMessage}
          type='error'
          active={errorMessage.length !== 0}
        />

      </StyledDashboardTeamList>
    </>
  )
}
