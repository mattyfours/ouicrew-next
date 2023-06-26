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
import Grid from '../displayElements/Grid'
import TextArea from '../formElements/TextArea'
import Checkbox from '../formElements/Checkbox'
import { toDateInputFormat } from '@/helpers/dateFormater'

export default function NewRaceForm ({ refetch }) {
  const { userId, teamId } = useParams()

  // const router = useRouter()

  // States
  const [raceTitleInput, setRaceTitleInput] = useState('')
  const [startTimeInput, setStartTimeInput] = useState(toDateInputFormat(Date.now()))
  const [distanceInput, setDistanceInput] = useState(2000)
  const [checkpointsInput, setCheckpointsInput] = useState(0)
  const [notesInput, setNotesInput] = useState('')
  const [isPublicInput, setIsPublicInput] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')
  const [succesMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Submit Handler
  const handleFormSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL_BASE}/user/${userId}/teams/${teamId}/race`
      const { data } = await axios.post(url,
        {
          raceTitle: raceTitleInput,
          startTime: startTimeInput,
          distance: distanceInput,
          checkpoints: checkpointsInput,
          notes: notesInput,
          isPublic: isPublicInput
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-ouicrew-session-token': localStorage.getItem('userSessionToken')
          }
        }
      )

      setIsLoading(false)
      setErrorMessage('')
      setRaceTitleInput('')
      setStartTimeInput(toDateInputFormat(Date.now()))
      setDistanceInput(2000)
      setCheckpointsInput(0)
      setNotesInput('')
      setIsPublicInput(false)
      setSuccessMessage(data.message)

      if (typeof refetch !== 'undefined') {
        await refetch()
      }
      // router.push(`/user/${userId}`)
    } catch (err) {
      setIsLoading(false)
      setSuccessMessage('')
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
    checkpointsInput,
    notesInput,
    isPublicInput,
    setIsLoading
  ])

  return (
    <>
      <Form
        onSubmit={handleFormSubmit}
        errorMessage={errorMessage}
        succesMessage={succesMessage}
        loading={isLoading}
      >
        <SingleLineInput
          label={t('forms.race_title')}
          name='raceTitle'
          type='text'
          value={raceTitleInput}
          setter={setRaceTitleInput}
        />

        <SingleLineInput
          label={t('forms.start_time')}
          name='startTime'
          type='datetime-local'
          value={startTimeInput}
          setter={setStartTimeInput}
        />

        <Grid>
          <SingleLineInput
            label={t('forms.distance')}
            name='distance'
            type='number'
            value={distanceInput}
            setter={setDistanceInput}
          />

          <SingleLineInput
            label={t('forms.checkpoints')}
            name='checkpoints'
            type='number'
            value={checkpointsInput}
            setter={setCheckpointsInput}
          />
        </Grid>

        <TextArea
          label={t('forms.notes')}
          name='teamNotes'
          value={notesInput}
          setter={setNotesInput}
        />

        <Checkbox
          label={t('forms.is_public_race')}
          name='ispublic'
          type='checkbox'
          value={isPublicInput}
          setter={setIsPublicInput}
        />

        <Button type='submit' centered>{t('forms.create_race')}</Button>
      </Form>
    </>
  )
}
