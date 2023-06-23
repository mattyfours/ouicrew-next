'use client'

import { t } from '@/languages/languages'
import Link from 'next/link'
import { styled } from 'styled-components'
import Button from '../formElements/Button'

const StyledDashboardNoTeam = styled.nav`
  position: relative;
  text-align: center;
  max-width: 500px;
  margin: 64px auto 0;

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

export default function DashboardNoTeam ({ data }) {
  return (
    <StyledDashboardNoTeam>
      <h2 className='heading-small'>{t('dashboard.no_teams_joined')}</h2>

      <Button>
        {t('dashboard.create_new_team')}
      </Button>

    </StyledDashboardNoTeam>
  )
}
