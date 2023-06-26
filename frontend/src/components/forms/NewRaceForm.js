'use client'

import { useCallback, useState } from 'react'
import Form from '@/components/formElements/Form'
import SingleLineInput from '@/components/formElements/SingleLineInput'
import { t } from '@/languages/languages'
import Button from '../formElements/Button'
import Link from 'next/link'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import Select from '../formElements/Select'

export default function NewRaceForm ({ refetch }) {
  const { userId, teamId } = useParams()

  // const router = useRouter()

  // States
  const [raceTitleInput, setRaceTitleInput] = useState('')
  const [startTimeInput, setStartTimeInput] = useState(Date.now())
  const [distanceInput, setDistanceInput] = useState(2000)
  const [checkpointInput, setCheckpointInput] = useState(0)

  const [errorMessage, setErrorMessage] = useState('')
  const [succesMessage, setSuccessMessage] = useState('')

  // Submit Handler
  const handleFormSubmit = useCallback(async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL_BASE}/user/${userId}/teams/${teamId}/race`

      const { data } = await axios.post(url,
        {
          raceTitle: raceTitleInput
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-ouicrew-session-token': localStorage.getItem('userSessionToken')
          }
        }
      )

      setErrorMessage('')
      raceTitleInput('')
      setStartTimeInput(Date.now())
      setDistanceInput(2000)
      setCheckpointInput(0)
      setSuccessMessage(data.message)

      if (typeof refetch !== 'undefined') {
        await refetch()
      }
      // router.push(`/user/${userId}`)
    } catch (err) {
      console.error(err)
      setErrorMessage(
        typeof err.response?.data?.error?.[0] === 'undefined'
          ? t('general.unexpected_error')
          : err.response.data.error[0].message
      )
    }
  }, [
    errorMessage,
    raceTitleInput,
    startTimeInput,
    distanceInput,
    checkpointInput
  ])

  return (
    <>
      <Form
        onSubmit={handleFormSubmit}
        errorMessage={errorMessage}
        succesMessage={succesMessage}
      >
        <SingleLineInput
          label={t('forms.race_title')}
          name='teamName'
          type='text'
          value={raceTitleInput}
          setter={setRaceTitleInput}
        />

        <SingleLineInput
          label={t('forms.start_time')}
          name='editorAccessCode'
          type='datetime-local'
          value={startTimeInput}
          setter={setStartTimeInput}
        />

        <SingleLineInput
          label={t('forms.distance')}
          name='viewerAccessCode'
          type='number'
          value={distanceInput}
          setter={setDistanceInput}
        />

        <SingleLineInput
          label={t('forms.checkpoints')}
          name='viewerAccessCode'
          type='number'
          value={checkpointInput}
          setter={setCheckpointInput}
        />

        <Button type='submit' centered>{t('forms.create_race')}</Button>
      </Form>
    </>
  )
}
