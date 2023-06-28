'use client'

import { useCallback, useState } from 'react'
import Form from '@/components/formElements/Form'
import SingleLineInput from '@/components/formElements/SingleLineInput'
import { t } from '@/languages/languages'
import Button from '../formElements/Button'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function LoginForm () {
  const router = useRouter()

  // States
  const [passwordInputValue, setPasswordInputValue] = useState('')
  const [usernameInputValue, setUsernameInputValue] = useState('')

  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Submit Handler
  const handleFormSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL_BASE}/user/login`
      const { data } = await axios.post(url,
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

      setIsLoading(false)
      setErrorMessage('')
      localStorage.setItem('userSessionToken', data.user.session_token)
      localStorage.setItem('userEmail', data.user.email)
      localStorage.setItem('userUsername', data.user.username)
      localStorage.setItem('userId', data.user.userId)
      router.push(`/user/${data.user.userId}`)
    } catch (err) {
      console.error(err)
      setErrorMessage(
        typeof err.response?.data?.error?.[0] === 'undefined'
          ? t('general.unexpected_error')
          : err.response.data.error[0].message
      )
    }
  }, [errorMessage, usernameInputValue, passwordInputValue, setIsLoading])

  return (
    <>
      <h1 className='heading-small'>{t('login_page.title')}</h1>

      <Form
        onSubmit={handleFormSubmit}
        errorMessage={errorMessage}
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

    </>
  )
}
