'use client'

import { styled } from 'styled-components'
import Button from '../formElements/Button'
import Link from 'next/link'
import { t } from '@/languages/languages'

const StyledErrorPage = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  h1 {
    margin: 0 0 32px;
  }
`

export default function ErrorPage ({ error }) {
  return (
    <StyledErrorPage>
      <h1 className='heading-large'>{error?.message || t('general.unexpected_error')}</h1>

      <Link href='/'>
        <Button>{t('general.return_home')}</Button>
      </Link>

    </StyledErrorPage>
  )
}
