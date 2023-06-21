'use client'

import { useCallback, useState } from 'react'
import Form from '@/components/formElements/Form'
import SingleLineInput from '@/components/formElements/SingleLineInput'
import LayoutAuth from '@/components/layouts/LayoutAuth'
import { t } from '@/languages/languages'
import Button from '../formElements/Button'
import Link from 'next/link'

export default function PageLogin () {
  // States
  const [emailInputValue, setEmailInputValue] = useState('')
  const [passwordInputValue, setPasswordInputValue] = useState('')

  // Submit Handler
  const handleFormSubmit = useCallback(() => {
    console.log('d')
  }, [emailInputValue])

  return (
    <LayoutAuth>
      <h1 className='heading-small'>{t('login_page.title')}</h1>

      <Form onSubmit={handleFormSubmit}>
        <SingleLineInput
          label={t('forms.email')}
          placeholder={t('forms.email')}
          name='email'
          type='email'
          value={emailInputValue}
          setter={setEmailInputValue}
        />

        <SingleLineInput
          label={t('forms.password')}
          placeholder={t('forms.password')}
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
