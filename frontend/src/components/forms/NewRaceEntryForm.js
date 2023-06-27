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
import Grid from '../displayElements/Grid'
import TextArea from '../formElements/TextArea'
import Checkbox from '../formElements/Checkbox'
import { toDateInputFormat } from '@/helpers/dateFormater'
import { useDynamicFetch } from '@/hooks/useDynamicFetch'

export default function NewRaceEntryForm ({ refetch }) {
  const { userId, teamId } = useParams()

  // States
  const [nameInput, setNameInput] = useState('')
  const [racingStandardCategoryInput, setRacingStandardCategoryInput] = useState('')
  const [racingStandardInput, setRacingStandardInput] = useState('')

  const [categoryList, setCategoryList] = useState([])
  const [standardsList, setStandardsList] = useState([])

  const [errorMessage, setErrorMessage] = useState('')
  const [succesMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

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
    setRacingStandardInput(racingStandardList[0])
    return data
  })

  console.log(racingStandardList)

  // Submit Handler
  const handleFormSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL_BASE}/user/${userId}/teams/${teamId}/race`
      const { data } = await axios.post(url,
        {
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
    setIsLoading
  ])

  // Category Change Handler
  useEffect(() => {
    if (racingStandardList) {
      const list = racingStandardList.standards
        .filter(standard => standard.category === racingStandardCategoryInput)

      setRacingStandardInput(list[0])
      setStandardsList(list)
    }
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
          setter={setRacingStandardCategoryInput}
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

        <Button type='submit' centered>{t('forms.create_race')}</Button>
      </Form>
    </>
  )
}
