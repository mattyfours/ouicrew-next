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

export default function NewTeamForm () {
  const { userId } = useParams()

  console.log(userId)

  const router = useRouter()

  // States
  const [nameInput, setNameInput] = useState('')
  const [editorAccessCodeInput, setEditorAccessCodeInput] = useState('')
  const [viewerAccessCodeInput, setViewerAccessCodeInput] = useState('')
  const [racingStandardInput, setRacingStandardInput] = useState('none')

  const [errorMessage, setErrorMessage] = useState('')

  // Submit Handler
  const handleFormSubmit = useCallback(async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL_BASE}/user/${userId}/teams`

      const { data } = await axios.post(url,
        {
          name: nameInput,
          editorAccessCode: editorAccessCodeInput,
          viewerAccessCode: viewerAccessCodeInput,
          racingStandard: racingStandardInput
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-ouicrew-session-token': localStorage.getItem('userSessionToken')
          }
        }
      )

      setErrorMessage('')
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
    nameInput,
    editorAccessCodeInput,
    viewerAccessCodeInput,
    racingStandardInput
  ])

  return (
    <>
      <Form onSubmit={handleFormSubmit} errorMessage={errorMessage}>
        <SingleLineInput
          label={t('forms.team_name')}
          name='teamName'
          type='text'
          value={nameInput}
          setter={setNameInput}
        />

        <SingleLineInput
          label={t('forms.editor_access_code')}
          name='editorAccessCode'
          type='text'
          value={editorAccessCodeInput}
          setter={setEditorAccessCodeInput}
        />

        <SingleLineInput
          label={t('forms.viewer_access_code')}
          name='viewerAccessCode'
          type='text'
          value={viewerAccessCodeInput}
          setter={setViewerAccessCodeInput}
        />

        <Select
          label={t('forms.viewer_access_code')}
          name='viewerAccessCode'
          value={racingStandardInput}
          setter={setRacingStandardInput}
          options={[
            { label: 'None', value: 'none' },
            { label: 'Rowing', value: 'rowing' }
          ]}
        />

        <Button type='submit' centered>{t('forms.submit')}</Button>
      </Form>
    </>
  )
}
