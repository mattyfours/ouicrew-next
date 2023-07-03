'use client'

import ErrorPage from '@/components/pages/ErrorPage'
import axios from 'axios'
import { styled } from 'styled-components'
import { useParams } from 'next/navigation'
import { t } from '@/languages/languages'
import { useDynamicFetch } from '@/hooks/useDynamicFetch'
import { useCallback, useMemo, useState } from 'react'
import ResponsiveTable from '@/components/displayElements/ResponsiveTable'
import Link from 'next/link'
import Button from '@/components/formElements/Button'
import StyledTeamBar from '@/components/styed/StyledTeamBar'
import RaceMenuBar from '@/components/race/RaceMenuBar'
import Toast from '@/components/utils/Toast'
import RaceRecordTableRow from '@/components/race/RaceRecordTableRow'
import Form from '@/components/formElements/Form'
import Grid from '@/components/displayElements/Grid'
import Select from '@/components/formElements/Select'
import { getAdjustedNowTime } from '@/helpers/dateFormater'
import LoadingPage from '@/components/pages/LoadingPage'

const StyledDashboardTimeLogList = styled.nav`
  position: relative;
  text-align: left;
  max-width: var(--width-modal);
  margin: 12px auto 0;
  border-top: 1px solid var(--text-color);

  h2 {
    margin: 0 0 8px;
  }

  form {
    margin: 12px auto 24px;
  }

  .new-log-button {
    width: 100%;
    padding: 24px;
  }

  .no-log-notice {
    border: 1px solid var(--text-color);
    padding: 16px;
    margin: 0;
  }
`

export default function UserTeamRaceOfficiatePage ({ children }) {
  const { userId, teamId, raceId } = useParams()

  // Audo Object for ping
  const audioPing = useMemo(() => new Audio('/assets/audio/ping.mp3'))

  // state
  const [recordedTimes, setRecordedTimes] = useState([])
  const [timesToAdd, setTimesToAdd] = useState(1)
  const [currentCheckpoint, setCurrentCheckpoint] = useState('start')
  const [errorMessage, setErrorMessage] = useState('')
  const [succesMessage, setSuccessMessage] = useState('')

  const {
    data,
    refetch
  } = useDynamicFetch(async () => {
    const url = [
      process.env.NEXT_PUBLIC_SERVER_URL_BASE,
      `/user/${userId}`,
      `/teams/${teamId}`,
      `/race/${raceId}`,
      '/officiate'
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
    return data
  })

  // Handel Record Time
  const handleRecordTime = useCallback(async () => {
    setRecordedTimes(oldRecordTimes => [
      ...oldRecordTimes,
      ...Array(Number(timesToAdd || 1)).fill({
        time: getAdjustedNowTime(data.client_server_time_diff),
        checkpoint: currentCheckpoint
      })
    ])

    await refetch()

    if (typeof audioPing?.play !== 'undefined') {
      audioPing.play()
    }

    if (typeof navigator?.vibrate !== 'undefined') {
      navigator.vibrate(200)
    }
  }, [
    data,
    recordedTimes,
    timesToAdd,
    currentCheckpoint,
    setRecordedTimes
  ])

  // Handle Close Toast
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

      <StyledDashboardTimeLogList>
        <Form
          onSubmit={handleRecordTime}
        >
          <Grid>
            <Select
              value={timesToAdd}
              setter={setTimesToAdd}
              label={t('forms.times_to_add')}
              options={
                Array(10)
                  .fill(null)
                  .map((_, index) => ({
                    value: index + 1,
                    label: index + 1
                  }))
              }
            />

            <Select
              value={currentCheckpoint}
              setter={setCurrentCheckpoint}
              label={t('forms.checkpoint')}
              options={[
                { value: 'start', label: t('forms.start') },
                ...Array(data.race.checkpoints)
                  .fill(null)
                  .map((_, index) => ({
                    value: `checkpoint-${index + 1}`,
                    label: `Checkpoint ${index + 1}`
                  })),
                { value: 'finish', label: t('forms.finish') },
                { value: 'dns', label: t('forms.dns') },
                { value: 'dnf', label: t('forms.dnf') }
              ]}
            />
          </Grid>
          <Button
            type='submit'
            className='new-log-button'
          >
            {t('dashboard.record_time')}
          </Button>
        </Form>

        <h2 className='heading-small'>{t('dashboard.recorded_times')}</h2>
        {
          recordedTimes.length === 0
            ? (<p className='no-log-notice'><small>{t('dashboard.no_times_recorded')}</small></p>)
            : (
              <ResponsiveTable
                autoScroll
                maxheight='calc(100vh - 550px)'
                headings={[
                  'Entry',
                  'Time',
                  ''
                ]}
              >
                {
                  recordedTimes
                    .map((record, index) => (
                      <RaceRecordTableRow
                        record={record}
                        data={data}
                        setErrorMessage={setErrorMessage}
                        setSuccessMessage={setSuccessMessage}
                        key={`race-recorded-time-${data.race.id}-${index}`}
                      />
                    ))
                }
              </ResponsiveTable>
              )
        }

        <Toast
          onClose={handleCloseToast}
          message={errorMessage || succesMessage}
          type={
            errorMessage.length !== 0
              ? 'error'
              : 'success'
          }
          active={errorMessage.length !== 0 || succesMessage.length !== 0}
        />

      </StyledDashboardTimeLogList>
    </>
  )
}
