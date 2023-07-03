'use client'

import { useCallback, useState } from 'react'
import Form from '@/components/formElements/Form'
import SingleLineInput from '@/components/formElements/SingleLineInput'
import { t } from '@/languages/languages'
import Button from '../formElements/Button'
import Link from 'next/link'
import axios from 'axios'

export default function PasswordResetRequestForm () {
  // States
  const [usernameInputValue, setUsernameInputValue] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  const [succesMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Submit Handler
  const handleFormSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL_BASE}/user/reset-password-request`
      await axios.post(url,
        {
          username: usernameInputValue
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-ouicrew-timestamp': Date.now()
          }
        }
      )

      setIsLoading(false)
      setErrorMessage()
      setSuccessMessage(t('password_reset_request_page.success'))
    } catch (err) {
      setIsLoading(false)
      setSuccessMessage('')
      setErrorMessage(
        typeof err.response?.data?.error?.[0] === 'undefined'
          ? t('general.unexpected_error')
          : err.response.data.error[0].message
      )
    }
  }, [errorMessage, usernameInputValue, setIsLoading])

  return (
    <>
      <h1 className='heading-small'>{t('password_reset_request_page.title')}</h1>

      <Form
        onSubmit={handleFormSubmit}
        errorMessage={errorMessage}
        succesMessage={succesMessage}
        loading={isLoading}
      >
        <SingleLineInput
          label={t('forms.username')}
          name='username'
          type='text'
          value={usernameInputValue}
          setter={setUsernameInputValue}
        />

        <Button type='submit' centered>{t('forms.submit')}</Button>
      </Form>

      <div className='bottom-links'>
        <Link href='/login'>
          {t('password_reset_request_page.login_prompt')}
        </Link>

        <Link href='/login/register'>
          {t('password_reset_request_page.register_prompt')}
        </Link>
      </div>
    </>
  )
}
