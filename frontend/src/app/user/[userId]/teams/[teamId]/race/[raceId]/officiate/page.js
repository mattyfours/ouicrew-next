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
import Button from '@/components/formElements/Button'
import StyledTeamBar from '@/components/styed/StyledTeamBar'
import RaceMenuBar from '@/components/race/RaceMenuBar'
import Toast from '@/components/utils/Toast'
import RaceRecordTableRow from '@/components/race/RaceRecordTableRow'
import Form from '@/components/formElements/Form'
import Grid from '@/components/displayElements/Grid'
import SingleLineInput from '@/components/formElements/SingleLineInput'
import Select from '@/components/formElements/Select'

const StyledDashboardTimeLogList = styled.nav`
  position: relative;
  text-align: left;
  max-width: var(--width-modal);
  margin: 24px auto 0;
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

  // state
  const [recordedTimes, setRecordedTimes] = useState([])
  const [timesToAdd, setTimesToAdd] = useState(1)
  const [currentCheckpoint, setCurrentCheckpoint] = useState('start')
  const [errorMessage, setErrorMessage] = useState('')

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
          'x-ouicrew-session-token': localStorage.getItem('userSessionToken')
        }
      }
    )
    return data
  })

  // Handel Record Time
  const handleRecordTime = useCallback(async () => {
    // Convert to server timezone
    const nowTime = Date.now()
    const severOffsetMs = data?.time_zone_offset_ms || 0
    const clientOffsetMs = new Date().getTimezoneOffset() * 60 * 1000
    const timeZoneDiff = severOffsetMs - clientOffsetMs
    const adjustedNowTime = nowTime + timeZoneDiff

    setRecordedTimes([
      ...recordedTimes,
      ...Array(Number(timesToAdd || 1)).fill({
        time: adjustedNowTime,
        checkpoint: currentCheckpoint
      })
    ])
    // return await refetch()
  }, [
    recordedTimes,
    timesToAdd,
    currentCheckpoint,
    setRecordedTimes
  ])

  // Handle Close Toast
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
                { value: 'finish', label: t('forms.finish') }
              ]}
                // Array(10)
                //   .fill(null)
                //   .map((_, index) => ({
                //     value: index + 1,
                //     label: index + 1
                //   }))

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
                maxheight='calc(100vh - 450px)'
                headings={[
                  'Entry',
                  'Checkpoint',
                  'Recorded Time',
                  ''
                ]}
              >
                {
                  recordedTimes.map((record, index) => (
                    <RaceRecordTableRow
                      record={record}
                      data={data}
                      key={`race-recorded-time-${data.race.id}-${index}`}
                    />
                  ))
                }
              </ResponsiveTable>
              )
        }

        <Toast
          onClose={handleCloseToast}
          message={errorMessage}
          type='error'
          active={errorMessage.length !== 0}
        />

      </StyledDashboardTimeLogList>
    </>
  )
}
