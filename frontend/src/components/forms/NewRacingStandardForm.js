'use client'

import { useCallback, useEffect, useState } from 'react'
import Form from '@/components/formElements/Form'
import SingleLineInput from '@/components/formElements/SingleLineInput'
import { t } from '@/languages/languages'
import Button from '../formElements/Button'
import axios from 'axios'
import { useParams } from 'next/navigation'
import Select from '../formElements/Select'

export default function NewRacingStandardForm ({
  refetch,
  refreshOnStateChange,
  categoryList
}) {
  const { userId, teamId } = useParams()

  // States
  const [customCategoryInput, setCustomCategoryInput] = useState('')
  const [categoryInput, setCategoryInput] = useState(categoryList?.[0] || 'other')
  const [nameInput, setNameInput] = useState('')
  const [distanceInput, setDistanceInput] = useState(2000)
  const [timeInput, setTimeInput] = useState('00:00:00.00')

  const [errorMessage, setErrorMessage] = useState('')
  const [succesMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Refresh On State Change State
  useEffect(() => {
    setCustomCategoryInput('')
    setCategoryInput(categoryList?.[0] || 'other')
    setNameInput('')
    setDistanceInput(2000)
    setTimeInput('00:00:00.00')
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
        '/racing-standards'
      ].join('')

      const { data } = await axios.post(url,
        {
          name: nameInput,
          distance: distanceInput,
          time: timeInput,
          category: customCategoryInput === 'other'
            ? customCategoryInput
            : categoryInput
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

  if (!categoryList) {
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

        <Select
          label={t('forms.category')}
          name='category'
          value={categoryInput}
          setter={setCategoryInput}
          options={[
            ...categoryList.map(category => ({
              value: category, label: category
            })),
            { value: 'other', label: 'Other' }
          ]}
        />

        {
          customCategoryInput === 'other' && (
            <SingleLineInput
              label={t('forms.category')}
              name='categoryOther'
              type='text'
              value={customCategoryInput}
              setter={setCategoryInput}
            />
          )
        }

        <SingleLineInput
          label={t('forms.title')}
          name='standardTitle'
          type='text'
          value={nameInput}
          setter={setNameInput}
        />

        <SingleLineInput
          label={t('forms.distance')}
          name='distance'
          type='number'
          value={distanceInput}
          setter={setDistanceInput}
        />

        <SingleLineInput
          label={t('forms.standard_time')}
          name='distance'
          type='text'
          value={timeInput}
          setter={setTimeInput}
        />

        <Button type='submit' centered>{t('forms.add_standard')}</Button>
      </Form>
    </>
  )
}
