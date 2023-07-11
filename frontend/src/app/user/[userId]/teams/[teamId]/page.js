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
import { faRightLong, faTrash } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Button from '@/components/formElements/Button'
import Modal from '@/components/utils/Modal'
import NewRaceForm from '@/components/forms/NewRaceForm'
import { serverDateTimeToReadable } from '@/helpers/dateFormater'
import StyledTeamBar from '@/components/styed/StyledTeamBar'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import LoadingPage from '@/components/pages/LoadingPage'
import StyledDashboardTeamList from '@/components/styed/StyledDashboardTeamList'
import TeamMenuBar from '@/components/team/TeamMenuBar'
import ConfirmActionButton from '@/components/utils/ConfirmActionButton'
import Toast from '@/components/utils/Toast'

export default function UserTeamPage ({ children }) {
  const { userId, teamId } = useParams()

  // state
  const [isNewRaceModelOpen, setIsNewRaceModelOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // Main Fetch
  const {
    data,
    refetch
  } = useDynamicFetch(async () => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL_BASE}/user/${userId}/teams/${teamId}`
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
  const handleDeleteRace = useCallback(async (raceId) => {
    try {
      const url = [
        process.env.NEXT_PUBLIC_SERVER_URL_BASE,
        `/user/${userId}`,
        `/teams/${teamId}`,
        `/race/${raceId}`
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

  // Handle New race modal
  const handleToogleNewRaceModal = useCallback((value) => {
    setIsNewRaceModelOpen(value)
  }, [setIsNewRaceModelOpen])

  // Handle toast close
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
        <h2>{data.team.name}</h2>
      </StyledTeamBar>

      <TeamMenuBar data={data} />

      <StyledDashboardTeamList>
        <h2 className='heading-small'>{t('dashboard.details')}</h2>

        <ul className='team-list-race-details'>
          <li>

            <strong>{t('dashboard.public_link')}: </strong>
            <Link href={`/teams/${data.team.handle}`}>
              {`${window.location.protocol}//${window.location.host}/teams/${data.team.handle}`}
            </Link>
          </li>
          {
            data.team.editor_access_code && (
              <li>
                <strong>{t('forms.editor_access_code')}: </strong>
                {data.team.editor_access_code}
              </li>
            )
          }

          <li>
            <strong>{t('forms.viewer_access_code')}: </strong>
            {data.team.viewer_access_code}
          </li>
        </ul>
      </StyledDashboardTeamList>

      <StyledDashboardTeamList>
        <h2 className='heading-small'>{t('dashboard.race_list')}</h2>

        {
          data.races?.length === 0
            ? (<p className='no-team-notice'><small>{t('dashboard.no_races_found')}</small></p>)
            : (
              <ResponsiveTable
                headings={[
                  'Race Title',
                  'Event Time',
                  'Distance',
                  data.team.is_team_editor === true
                    ? ''
                    : null
                ]}
              >
                {
                  data.races.map((race, index) => (
                    <ResponsiveTable.Row key={`teamlist-${race.id}`}>
                      <ResponsiveTable.Item>
                        <Link href={`/user/${userId}/teams/${teamId}/race/${race.id}`} className='icon-link'>
                          {race.title} <FontAwesomeIcon icon={faRightLong} />
                        </Link>
                      </ResponsiveTable.Item>

                      <ResponsiveTable.Item>
                        {serverDateTimeToReadable(race.event_time)}
                      </ResponsiveTable.Item>

                      <ResponsiveTable.Item>
                        {race.distance}m
                      </ResponsiveTable.Item>

                      {
                        data.team.is_team_editor === true && (
                          <ResponsiveTable.Item>
                            <ConfirmActionButton
                              className='icon-link'
                              message={(
                                <>
                                  Delete race "{race.title}"?<br /><br />
                                  <strong>
                                    Warning this will remove all results associated with this race.
                                  </strong>
                                </>
                              )}
                              onAction={() => handleDeleteRace(race.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                              {t('dashboard.delete')}
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
                  {t('dashboard.new_race')}
                </Button>
              </div>

              <Modal
                title={t('dashboard.new_race')}
                active={isNewRaceModelOpen}
                onClose={() => handleToogleNewRaceModal(false)}
              >
                <NewRaceForm
                  refetch={refetch}
                  refreshOnStateChange={isNewRaceModelOpen}
                />
              </Modal>
            </>
        }

        {
          data.team.is_team_editor === true &&
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
        }

      </StyledDashboardTeamList>
    </>
  )
}
