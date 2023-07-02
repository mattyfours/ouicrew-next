'use client'

import { t } from '@/languages/languages'
import axios from 'axios'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { styled } from 'styled-components'

const StyledDashboardNav = styled.nav`
  position: sticky;
  z-index: 1000000;
  top: 0;
  left: 0;
  width: 100%;
  padding: 12px 0;
  border-bottom: 2px solid var(--text-color);
  background-color: var(--background-color);

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo-link {
    display: block;
    margin: 0;
    width: fit-content;
  }

  .nav-utils {
    width: max-content;
    font-size: 1.4rem;
    font-weight: 400;
    display: grid;
    grid-auto-flow: column;
    gap: 16px;
  }
`

export default function DashboardNav ({ data }) {
  const { userId } = useParams()
  const router = useRouter()

  const handleLogOut = useCallback(async () => {
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL_BASE}/user/${userId}/logout`
      await axios.post(url, {},
        {
          headers: {
            'Content-Type': 'application/json',
            'x-ouicrew-session-token': localStorage.getItem('userSessionToken')
          }
        }
      )

      router.push('/')
    } catch (err) {
      console.error(err)
    }
  }, [])

  return (
    <StyledDashboardNav>
      <div className='container'>
        <Link href={`/user/${userId}`} className='logo-link'>
          <h1 className='heading-logo'>{t('general.ouicrew')}</h1>
        </Link>

        <div className='nav-utils'>
          <Link
            href={`/user/${userId}`}
          >
            {t('dashboard.dashboard')}
          </Link>
          <button
            onClick={handleLogOut}
          >
            {t('general.log_out')}
          </button>
        </div>
      </div>
    </StyledDashboardNav>
  )
}
