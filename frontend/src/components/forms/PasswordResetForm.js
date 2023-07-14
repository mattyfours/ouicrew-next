'use client'

import { useCallback, useState } from 'react'
import Form from '@/components/formElements/Form'
import SingleLineInput from '@/components/formElements/SingleLineInput'
import { t } from '@/languages/languages'
import Button from '../formElements/Button'
import Link from 'next/link'
import axios from 'axios'
import { useSearchParams } from 'next/navigation'

export default function PasswordResetForm () {
  const urlParams = useSearchParams()
  const resetToken = urlParams.get('reset-token')

  // States
  const [usernameInputValue, setUsernameInputValue] = useState('')
  const [passwordInputValue, setPasswordInputValue] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  const [succesMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Submit Handler
  const handleFormSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL_BASE}/user/reset-password`
      await axios.post(url,
        {
          username: usernameInputValue,
          password: passwordInputValue,
          resetToken
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
      setSuccessMessage(t('password_reset_page.success'))
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
      <h1 className='heading-small'>{t('password_reset_page.title')}</h1>

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

        <SingleLineInput
          label={t('forms.new_password')}
          name='password'
          type='password'
          value={passwordInputValue}
          setter={setPasswordInputValue}
        />

        <Button type='submit' centered>{t('forms.submit')}</Button>
      </Form>

      <div className='bottom-links'>
        <Link href='/login'>
          {t('password_reset_page.login_prompt')}
        </Link>

        <Link href='/login/register'>
          {t('password_reset_page.register_prompt')}
        </Link>
      </div>
    </>
  )
}
