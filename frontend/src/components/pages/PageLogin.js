'use client'

import { useCallback, useState } from 'react'
import Form from '@/components/formElements/Form'
import SingleLineInput from '@/components/formElements/SingleLineInput'
import LayoutAuth from '@/components/layouts/LayoutAuth'
import { t } from '@/languages/languages'
import Button from '../formElements/Button'
import Link from 'next/link'
import axios from 'axios'

export default function PageRegister () {
  // States
  const [passwordInputValue, setPasswordInputValue] = useState('')
  const [usernameInputValue, setUsernameInputValue] = useState('')

  const [errorMessage, setErrorMessage] = useState('')

  // Submit Handler
  const handleFormSubmit = useCallback(async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL_BASE}/user/login`

      await axios.post(url,
        {
          username: usernameInputValue,
          password: passwordInputValue
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      setErrorMessage()
    } catch (err) {
      setErrorMessage(
        typeof err.response?.data?.error?.[0] === 'undefined'
          ? t('general.unexpected_error')
          : err.response.data.error[0].message
      )
    }
  }, [errorMessage, usernameInputValue, passwordInputValue])

  return (
    <LayoutAuth>
      <h1 className='heading-small'>{t('login_page.title')}</h1>

      <Form onSubmit={handleFormSubmit} errorMessage={errorMessage}>
        <SingleLineInput
          label={t('forms.username')}
          name='username'
          type='text'
          value={usernameInputValue}
          setter={setUsernameInputValue}
        />

        <SingleLineInput
          label={t('forms.password')}
          name='password'
          type='password'
          value={passwordInputValue}
          setter={setPasswordInputValue}
        />

        <Button type='submit' centered>{t('forms.submit')}</Button>
      </Form>

      <div className='bottom-links'>
        <Link href='/login/register'>
          {t('login_page.register_prompt')}
        </Link>

        <Link href='/login/password-reset-request'>
          {t('login_page.password_prompt')}
        </Link>
      </div>

    </LayoutAuth>
  )
}
