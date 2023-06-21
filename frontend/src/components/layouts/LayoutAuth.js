'use client'

import { minScreen, screenSizes } from '@/helpers/screen'
import { t } from '@/languages/languages'
import styled from 'styled-components'

const StyledLayoutAuth = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: auto;

  @media ${minScreen(screenSizes.medium)} {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .auth-container {
    position: relative;
    max-width: ${screenSizes.medium};
    padding: 24px;
    border-radius: 4px;

    @media ${minScreen(screenSizes.medium)} {
      border: 1px solid var(--text-color);
      padding: 64px;
    }
  }

  .heading-logo {
    width: 100%;
    margin: 0 auto 18px;
    text-align: center;
    display: block;
  }

  h1 {
    margin: 0 0 64px;
    text-align: center;
  }

  form {
    max-width: 350px;
    margin: 0 auto;
  }

  .bottom-links {
    display: grid;
    grid-auto-flow: row;
    width: fit-content;
    margin: 48px auto 0;
    gap: 8px;
    text-align: center;
    font-size: 1.4rem;
  }
`

function LayoutAuth ({ children }) {
  return (
    <StyledLayoutAuth>
      <div className='auth-container'>
        <span className='heading-logo'>{t('general.ouicrew')}</span>
        {children}
      </div>
    </StyledLayoutAuth>
  )
}

export default LayoutAuth
