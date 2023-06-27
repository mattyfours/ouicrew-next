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

export default function NewTeamForm ({ refetch }) {
  const { userId } = useParams()

  // const router = useRouter()

  // States
  const [nameInput, setNameInput] = useState('')
  const [editorAccessCodeInput, setEditorAccessCodeInput] = useState('')
  const [viewerAccessCodeInput, setViewerAccessCodeInput] = useState('')
  const [racingStandardInput, setRacingStandardInput] = useState('none')

  const [errorMessage, setErrorMessage] = useState('')
  const [succesMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Submit Handler
  const handleFormSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
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

      setIsLoading(false)
      setErrorMessage('')
      setNameInput('')
      setEditorAccessCodeInput('')
      setViewerAccessCodeInput('')
      setRacingStandardInput('none')
      setSuccessMessage(data.message)

      if (typeof refetch !== 'undefined') {
        await refetch()
      }
      // router.push(`/user/${userId}`)
    } catch (err) {
      setIsLoading(false)
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
    racingStandardInput,
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
          label={t('forms.name')}
          name='name'
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
          label={t('forms.racing_standard_defaults')}
          name='viewerAccessCode'
          value={racingStandardInput}
          setter={setRacingStandardInput}
          options={[
            { label: 'None', value: 'none' },
            { label: 'Rowing', value: 'rowing' }
          ]}
        />

        <Button type='submit' centered>{t('dashboard.create_new_team')}</Button>
      </Form>
    </>
  )
}
