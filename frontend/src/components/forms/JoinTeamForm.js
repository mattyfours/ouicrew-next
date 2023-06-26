'use client'

import { useCallback, useEffect, useState } from 'react'
import Form from '@/components/formElements/Form'
import SingleLineInput from '@/components/formElements/SingleLineInput'
import { t } from '@/languages/languages'
import Button from '../formElements/Button'
import Link from 'next/link'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import Select from '../formElements/Select'

export default function JoinTeamForm ({ refetch }) {
  const { userId } = useParams()

  // States
  const [teamIdInput, setTeamIdInput] = useState('-')
  const [accessCodeInput, setAccessCodeInput] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  const [succesMessage, setSuccessMessage] = useState('')

  const [teamListData, setTeamListData] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_SERVER_URL_BASE}/teams`
        const { data } = await axios.get(url,
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )

        setTeamListData(data)
      } catch (err) {
        setTeamListData({ error: err })
      }
    })()
  }, [])

  // Submit Handler
  const handleFormSubmit = useCallback(async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL_BASE}/user/${userId}/teams/join`

      const { data } = await axios.post(url,
        {
          teamId: teamIdInput,
          accessCode: accessCodeInput
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-ouicrew-session-token': localStorage.getItem('userSessionToken')
          }
        }
      )

      setErrorMessage('')
      setTeamIdInput('-')
      setAccessCodeInput('')
      setSuccessMessage(data.message)

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
    errorMessage,
    teamIdInput,
    accessCodeInput
  ])

  if (!teamListData) {
    return <>{t('general.loading')}</>
  }

  return (
    <>
      <Form
        onSubmit={handleFormSubmit}
        errorMessage={errorMessage}
        succesMessage={succesMessage}
      >
        <Select
          label={t('forms.select_team')}
          name='team'
          value={teamIdInput}
          setter={setTeamIdInput}
          options={[
            { label: '', value: '-' },
            ...teamListData.teamsList.map(team => ({
              label: team.name, value: team.id
            }))
          ]}
        />

        <SingleLineInput
          label={t('forms.access_code')}
          name='accessCode'
          type='text'
          value={accessCodeInput}
          setter={setAccessCodeInput}
        />

        <Button type='submit' centered>{t('dashboard.join_a_team')}</Button>
      </Form>
    </>
  )
}
