'use client'

import { t } from '@/languages/languages'
import Link from 'next/link'
import { styled } from 'styled-components'

const StyledDashboardNav = styled.nav`
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  padding: 12px 24px;
  border-bottom: 2px solid var(--text-color);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .logo-link {
    display: block;
    margin: 0;
    width: fit-content;
  }

  .nav-utils {
    width: max-content;
    font-size: 1.6rem;
    font-weight: 400;
  }
`

export default function DashboardNav ({ data }) {
  return (
    <StyledDashboardNav>
      <Link href='/dashboard' className='logo-link'>
        <h1 className='heading-logo'>{t('general.ouicrew')}</h1>
      </Link>

      <div className='nav-utils'>
        Teams
      </div>
    </StyledDashboardNav>
  )
}
