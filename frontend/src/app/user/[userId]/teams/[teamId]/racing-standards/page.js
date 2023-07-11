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
import { serverDateTimeToReadable, timeToHhMmSsMs } from '@/helpers/dateFormater'
import StyledTeamBar from '@/components/styed/StyledTeamBar'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import LoadingPage from '@/components/pages/LoadingPage'
import StyledDashboardTeamList from '@/components/styed/StyledDashboardTeamList'
import TeamMenuBar from '@/components/team/TeamMenuBar'
import NewRacingStandardForm from '@/components/forms/NewRacingStandardForm'
import Toast from '@/components/utils/Toast'
import ConfirmActionButton from '@/components/utils/ConfirmActionButton'

export default function UserTeamPageStandards ({ children }) {
  const { userId, teamId } = useParams()
  const [categoryList, setCategoryList] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isNewStandardModelOpen, setIsNewStandardModelOpen] = useState(false)

  // Main Fetch
  const {
    data,
    refetch
  } = useDynamicFetch(async () => {
    const url = [
      process.env.NEXT_PUBLIC_SERVER_URL_BASE,
      `/user/${userId}`,
      `/teams/${teamId}`,
      '/racing-standards'
    ].join('')
    const { data } = await axios.get(url,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-ouicrew-timestamp': Date.now(),
          'x-ouicrew-session-token': localStorage.getItem('userSessionToken')
        }
      }
    )

    const categoryDataList = [
      ...new Set(
        data.standards
          .map(standard => standard.category)
      )
    ].sort()

    setCategoryList(categoryDataList)

    return data
  })

  const team = data?.teams?.find(team => teamId === team.id) || {}
  useDocumentTitle(team.name || t('dashboard.metatitle'), [data])

  // Remove Standard
  const handleDeleteStandard = useCallback(async (racingStandardId) => {
    try {
      const url = [
        process.env.NEXT_PUBLIC_SERVER_URL_BASE,
        `/user/${userId}`,
        `/teams/${teamId}`,
        `/racing-standards/${racingStandardId}`
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

  // Handle Modal
  const handleToogleNewStandardModal = useCallback((value) => {
    setIsNewStandardModelOpen(value)
  }, [setIsNewStandardModelOpen])

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
        <h2 className='heading-small'>{t('dashboard.racing_standards')}</h2>

        {
          data.standards?.length === 0
            ? (<p className='no-team-notice'><small>{t('dashboard.no_races_found')}</small></p>)
            : (
              <ResponsiveTable
                headings={[
                  'Category',
                  'Name',
                  'Distance',
                  'Time',
                  data.team.is_team_editor === true
                    ? ''
                    : null
                ]}
              >
                {
                  data.standards.map((standard, index) => (
                    <ResponsiveTable.Row key={`teamlist--standard-${standard.id}`}>
                      <ResponsiveTable.Item>
                        {standard.category}
                      </ResponsiveTable.Item>

                      <ResponsiveTable.Item>
                        {standard.name}
                      </ResponsiveTable.Item>

                      <ResponsiveTable.Item>
                        {standard.distance}m
                      </ResponsiveTable.Item>

                      <ResponsiveTable.Item>
                        {timeToHhMmSsMs(standard.time_in_ms)}
                      </ResponsiveTable.Item>

                      {
                        data.team.is_team_editor === true && (
                          <ResponsiveTable.Item>
                            <ConfirmActionButton
                              className='icon-link'
                              message={(
                                <>
                                  Delete race "{standard.category} {standard.name}"?<br /><br />
                                </>
                              )}
                              onAction={() => handleDeleteStandard(standard.id)}
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
                <Button className='new-team-button' size='small' onClick={() => handleToogleNewStandardModal(true)}>
                  {t('dashboard.new_racing_standard')}
                </Button>
              </div>

              <Modal
                title={t('dashboard.new_racing_standard')}
                active={isNewStandardModelOpen}
                onClose={() => handleToogleNewStandardModal(false)}
              >
                <NewRacingStandardForm
                  refetch={refetch}
                  refreshOnStateChange={isNewStandardModelOpen}
                  categoryList={categoryList}
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
