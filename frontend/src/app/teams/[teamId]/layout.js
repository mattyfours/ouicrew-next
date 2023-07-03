'use client'

import DashboardNav from '@/components/dashboard/DashboardNav'
import ErrorPage from '@/components/pages/ErrorPage'
import LoadingPage from '@/components/pages/LoadingPage'
import { minScreen, screenSizes } from '@/helpers/screen'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { useDynamicFetch } from '@/hooks/useDynamicFetch'
import { t } from '@/languages/languages'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { styled } from 'styled-components'

const StyledUserDashboardPage = styled.div`
  .breadcrumbs {
    max-width: var(--width-modal);
  }

  .main-container {
    margin-top: 32px;
    max-width: var(--width-modal);

    @media ${minScreen(screenSizes.large)} {
      margin-top: 64px;
    }
  }

  .main-title {
    font-size: 1.8rem;
    margin: 0;
  }
`

export default function UserLayout ({ children }) {
  return (
    <StyledUserDashboardPage>
      <DashboardNav />

      <div className='container main-container'>
        {children}
      </div>
    </StyledUserDashboardPage>
  )
}
