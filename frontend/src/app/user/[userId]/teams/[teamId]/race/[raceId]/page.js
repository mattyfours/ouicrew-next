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
import LoadingPage from '@/components/pages/LoadingPage'
import { serverDateTimeToReadable } from '@/helpers/dateFormater'
import StyledDashboardTeamList from '@/components/styed/StyledDashboardTeamList'

export default function UserTeamRacePage ({ children }) {
  const { userId, teamId, raceId } = useParams()

  // state
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const {
    data,
    refetch
  } = useDynamicFetch(async () => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL_BASE}/user/${userId}/teams/${teamId}/race/${raceId}`
    const { data } = await axios.get(url,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-ouicrew-timestamp': Date.now(),
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
      const { data: resData } = await axios.delete(url,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-ouicrew-timestamp': Date.now(),
            'x-ouicrew-session-token': localStorage.getItem('userSessionToken')
          }
        }
      )

      setErrorMessage('')
      setSuccessMessage(resData.message)
      return typeof refetch === 'undefined'
        ? null
        : await refetch()
    } catch (err) {
      console.error(err)
      setSuccessMessage('')
      return setErrorMessage(
        typeof err.response?.data?.error?.[0] === 'undefined'
          ? t('general.unexpected_error')
          : err.response.data.error[0].message
      )
    }
  }, [
    data,
    setErrorMessage,
    setSuccessMessage
  ])

  const team = data?.teams?.find(team => teamId === team.id) || {}
  useDocumentTitle(team.name || t('dashboard.metatitle'), [data])

  const [isNewRaceModelOpen, setIsNewRaceModelOpen] = useState(false)

  const handleToogleNewRaceModal = useCallback((value) => {
    setIsNewRaceModelOpen(value)
  }, [setIsNewRaceModelOpen])

  const handleCloseToast = useCallback(() => {
    setErrorMessage('')
    setSuccessMessage('')
  }, [setErrorMessage, setSuccessMessage])

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
        <h2 className='heading-small'>{t('dashboard.details')}</h2>

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
                        {entry.name}
                      </ResponsiveTable.Item>

                      <ResponsiveTable.Item>
                        {
                          (
                            entry.racing_standard_category !== null &&
                            entry.racing_standard_name !== null
                          )
                            ? `${entry.racing_standard_category} | ${entry.racing_standard_name}`
                            : t('general.na')
                        }
                      </ResponsiveTable.Item>

                      {
                        data.team.is_team_editor === true && (
                          <ResponsiveTable.Item>
                            <ConfirmActionButton
                              className='icon-link'
                              message={(
                                <>
                                  Remove {entry.name} entry from {data.race.title}?<br /><br />
                                  <strong>
                                    Warning this will remove all results associated with this entry.
                                  </strong>
                                </>
                              )}
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
          message={errorMessage || successMessage}
          type={
            errorMessage.length !== 0
              ? 'error'
              : 'success'
          }
          active={errorMessage?.length !== 0 || successMessage?.length !== 0}
        />

      </StyledDashboardTeamList>
    </>
  )
}
