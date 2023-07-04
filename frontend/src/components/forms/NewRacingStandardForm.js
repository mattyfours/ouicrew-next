'use client'

import { useCallback, useEffect, useState } from 'react'
import Form from '@/components/formElements/Form'
import SingleLineInput from '@/components/formElements/SingleLineInput'
import { t } from '@/languages/languages'
import Button from '../formElements/Button'
import axios from 'axios'
import { useParams } from 'next/navigation'
import Select from '../formElements/Select'
import { useDynamicFetch } from '@/hooks/useDynamicFetch'

export default function NewRacingStandardForm ({
  refetch,
  refreshOnStateChange,
  categoryList
}) {
  const { userId, teamId, raceId } = useParams()

  // States
  const [customCategoryInput, setCustomCategoryInput] = useState('other')
  const [categoryInput, setCategoryInput] = useState('')
  const [nameInput, setNameInput] = useState('')
  const [distanceInput, setdistanceInput] = useState(2000)
  const [timeInput, setTimeInput] = useState('00:00:00:00')

  const [errorMessage, setErrorMessage] = useState('')
  const [succesMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Refresh On State Change State
  useEffect(() => {
    setCustomCategoryInput('other')
    setCategoryInput('')
    setNameInput('')
    setdistanceInput(2000)
    setTimeInput('00:00:00:00')
    setErrorMessage('')
    setSuccessMessage('')
  }, [refreshOnStateChange])

  // Submit Handler
  const handleFormSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      const url = [
        process.env.NEXT_PUBLIC_SERVER_URL_BASE,
        `/user/${userId}`,
        `/teams/${teamId}`,
        `/race/${raceId}`,
        '/racing-standards'
      ].join('')

      const { data } = await axios.post(url,
        {
          name: nameInput
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-ouicrew-timestamp': Date.now(),
            'x-ouicrew-session-token': localStorage.getItem('userSessionToken')
          }
        }
      )

      setIsLoading(false)
      setErrorMessage('')
      setNameInput('')
      setSuccessMessage(data.message)

      if (typeof refetch !== 'undefined') {
        await refetch()
      }
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
    nameInput,
    categoryInput,
    customCategoryInput,
    distanceInput,
    timeInput,
    errorMessage,
    setIsLoading
  ])

  // Category Change Handler
  // const handleCategoryChange = useCallback(({ target: { value: evtValue } }) => {
  //   setRacingStandardCategoryInput(evtValue)
  //   const list = racingStandardList.standards
  //     .filter(standard => standard.category === evtValue)

  //   setRacingStandardInput(list[0].id)
  //   setStandardsList(list)
  // }, [
  //   racingStandardList,
  //   racingStandardCategoryInput
  // ])

  // TODO: Build Add Standard Form
  if (!categoryList) {
    return <>{t('general.loading')}</>
  }

  return (
    <>
      COMING SOON
      {/* <Form
        onSubmit={handleFormSubmit}
        errorMessage={errorMessage}
        succesMessage={succesMessage}
        loading={isLoading}
      >

        <SingleLineInput
          label={t('forms.entry_name')}
          name='entryName'
          type='text'
          value={nameInput}
          setter={setNameInput}
        />

        <Button type='submit' centered>{t('forms.add_standard')}</Button>
      </Form> */}
    </>
  )
}
