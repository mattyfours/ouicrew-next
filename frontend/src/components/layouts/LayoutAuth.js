'use client'

import { minScreen, screenSizes } from '@/helpers/screen'
import styled from 'styled-components'

const StyledLayoutAuth = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: auto;
  display: flex;
  align-items: center;
  justify-content: center;

  .auth-container {
    max-width: ${screenSizes.small};
    background-color: red;
    padding: 24px;

    @media ${minScreen(screenSizes.medium)} {
      max-width: ${screenSizes.medium};
    }
  }
`

function LayoutAuth ({ children }) {
  return (
    <StyledLayoutAuth>
      <div className='auth-container'>
        {children}
      </div>
    </StyledLayoutAuth>
  )
}

export default LayoutAuth
