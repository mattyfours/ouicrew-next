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

export default function NewRaceEntryForm ({ refetch, refreshOnStateChange }) {
  const { userId, teamId, raceId } = useParams()

  // States
  const [nameInput, setNameInput] = useState('')
  const [racingStandardCategoryInput, setRacingStandardCategoryInput] = useState('')
  const [racingStandardInput, setRacingStandardInput] = useState('')

  const [categoryList, setCategoryList] = useState([])
  const [standardsList, setStandardsList] = useState([])

  const [errorMessage, setErrorMessage] = useState('')
  const [succesMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Refresh On State Change State
  useEffect(() => {
    setNameInput('')
    setErrorMessage('')
    setSuccessMessage('')
  }, [refreshOnStateChange])

  // Main Data Fetch
  const {
    data: racingStandardList
  } = useDynamicFetch(async () => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL_BASE}/user/${userId}/teams/${teamId}/racing-standards`
    const { data } = await axios.get(url,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-ouicrew-session-token': localStorage.getItem('userSessionToken')
        }
      }
    )

    const categoryList = [
      ...new Set(
        data.standards
          .map(standard => standard.category)
      )
    ].sort()

    const racingStandardList = data.standards
      .filter(standard => standard.category === categoryList[0])

    setCategoryList(categoryList)
    setStandardsList(racingStandardList)
    setRacingStandardCategoryInput(categoryList[0])
    setRacingStandardInput(racingStandardList[0].id)
    return data
  })

  // Submit Handler
  const handleFormSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      const url = [
        process.env.NEXT_PUBLIC_SERVER_URL_BASE,
        `/user/${userId}`,
        `/teams/${teamId}`,
        `/race/${raceId}`,
        '/entry'
      ].join('')

      const { data } = await axios.post(url,
        {
          racingStandardId: racingStandardInput,
          name: nameInput
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
    racingStandardInput,
    errorMessage,
    setIsLoading
  ])

  // Category Change Handler
  const handleCategoryChange = useCallback(({ target: { value: evtValue } }) => {
    setRacingStandardCategoryInput(evtValue)
    const list = racingStandardList.standards
      .filter(standard => standard.category === evtValue)

    setRacingStandardInput(list[0].id)
    setStandardsList(list)
  }, [
    racingStandardList,
    racingStandardCategoryInput
  ])

  if (!racingStandardList) {
    return <>{t('general.loading')}</>
  }

  return (
    <>
      <Form
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

        <Select
          label={t('forms.racing_standard_category')}
          name='racingStandardCategory'
          value={racingStandardCategoryInput}
          onChange={handleCategoryChange}
          options={categoryList.map(category => ({
            value: category,
            label: category
          }))}
        />

        <Select
          label={t('forms.racing_standard')}
          name='racingStandard'
          value={racingStandardInput}
          setter={setRacingStandardInput}
          options={standardsList.map(standard => ({
            value: standard.id,
            label: standard.name
          }))}
        />

        <Button type='submit' centered>{t('forms.add_entry')}</Button>
      </Form>
    </>
  )
}
