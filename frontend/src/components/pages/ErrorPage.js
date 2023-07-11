'use client'

import { styled } from 'styled-components'
import Button from '../formElements/Button'
import Link from 'next/link'
import { t } from '@/languages/languages'
import { useEffect } from 'react'

const StyledErrorPage = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000000;
  width: 100%;
  height: 100vh;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: var(--background-color);

  h1 {
    margin: 0 0 32px;
  }
`

export default function ErrorPage ({ error }) {
  useEffect(() => {
    if (error?.path === 'ouicrewSession') {
      localStorage.removeItem('userSessionToken')
      localStorage.removeItem('userUsername')
      localStorage.removeItem('userId')
      localStorage.removeItem('userEmail')
    }
  }, [error])

  return (
    <StyledErrorPage>
      <h1 className='heading-large'>{error?.message || t('general.unexpected_error')}</h1>

      <Link href='/'>
        <Button>{t('general.return_home')}</Button>
      </Link>

    </StyledErrorPage>
  )
}
