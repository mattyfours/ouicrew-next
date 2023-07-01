'use client'

import { styled } from 'styled-components'

import { t } from '@/languages/languages'
import Lottie from 'lottie-react'
import loadingAnimation from '../../lottie/loading.json'

const StyledLoadingPage = styled.div`
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

  .loading-page-loading-animation {
    width: 100%;
    margin: 0 auto;
    max-width: 150px;
  }

  h1 {
    margin: 0;
  }
`

export default function LoadingPage () {
  return (
    <StyledLoadingPage>
      <h1 className='heading-large'>{t('general.loading')}</h1>
      <div className='loading-page-loading-animation'>
        <Lottie animationData={loadingAnimation} />
      </div>
    </StyledLoadingPage>
  )
}
