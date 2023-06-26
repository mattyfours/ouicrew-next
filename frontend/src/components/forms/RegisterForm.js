'use client'

import { useCallback, useState } from 'react'
import Form from '@/components/formElements/Form'
import SingleLineInput from '@/components/formElements/SingleLineInput'
import { t } from '@/languages/languages'
import Button from '../formElements/Button'
import Link from 'next/link'
import axios from 'axios'
import Checkbox from '../formElements/Checkbox'

export default function RegisterForm () {
  // States
  const [emailInputValue, setEmailInputValue] = useState('')
  const [passwordInputValue, setPasswordInputValue] = useState('')
  const [usernameInputValue, setUsernameInputValue] = useState('')
  const [termsInputValue, setTermsInputValue] = useState(false)

  const [errorMessage, setErrorMessage] = useState('')
  const [succesMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Submit Handler
  const handleFormSubmit = useCallback(async () => {
    try {
      setIsLoading(true)
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL_BASE}/user/register`
      await axios.post(url,
        {
          username: usernameInputValue,
          email: emailInputValue,
          password: passwordInputValue,
          agreeToTerms: termsInputValue
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      setIsLoading(false)
      setErrorMessage()
      setSuccessMessage(t('register_page.success'))
    } catch (err) {
      setIsLoading(false)
      setSuccessMessage('')
      setErrorMessage(
        typeof err.response?.data?.error?.[0] === 'undefined'
          ? t('general.unexpected_error')
          : err.response.data.error[0].message
      )
    }
  }, [
    errorMessage,
    usernameInputValue,
    emailInputValue,
    passwordInputValue,
    termsInputValue,
    setIsLoading
  ])

  return (
    <>
      <h1 className='heading-small'>{t('register_page.title')}</h1>

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
          label={t('forms.email')}
          name='email'
          type='email'
          value={emailInputValue}
          setter={setEmailInputValue}
        />

        <SingleLineInput
          label={t('forms.password')}
          name='password'
          type='password'
          value={passwordInputValue}
          setter={setPasswordInputValue}
        />

        <Checkbox
          label={<Link href='/' target='_blank'>{t('register_page.terms_agree')}</Link>}
          name='password'
          value={termsInputValue}
          setter={setTermsInputValue}
        />

        <Button type='submit' centered>{t('forms.submit')}</Button>
      </Form>

      <div className='bottom-links'>
        <Link href='/login'>
          {t('register_page.login_prompt')}
        </Link>

        <Link href='/login/password-reset-request'>
          {t('register_page.password_prompt')}
        </Link>
      </div>

    </>
  )
}
