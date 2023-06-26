'use client'

import DashboardNav from '@/components/dashboard/DashboardNav'
import ErrorPage from '@/components/pages/ErrorPage'
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
  const { userId } = useParams()

  const {
    data
  } = useDynamicFetch(async () => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL_BASE}/user/${userId}/teams`
    const { data } = await axios.get(url,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-ouicrew-session-token': localStorage.getItem('userSessionToken')
        }
      }
    )
    return data
  })

  useDocumentTitle(data?.user?.username || t('dashboard.metatitle'), [data])

  if (data === null) {
    return <h1>Loading</h1>
  }

  if (typeof data?.error !== 'undefined') {
    return <ErrorPage error={data.error?.response?.data?.error?.[0]} />
  }

  return (
    <StyledUserDashboardPage>
      <DashboardNav data={data} />

      <div className='container main-container'>
        {children}
      </div>
    </StyledUserDashboardPage>
  )
}
