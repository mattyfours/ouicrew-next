'use client'

import DashboardNav from '@/components/dashboard/DashboardNav'
import ErrorPage from '@/components/pages/ErrorPage'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { useDynamicFetch } from '@/hooks/useDynamicFetch'
import { t } from '@/languages/languages'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { styled } from 'styled-components'

const StyledTeamBar = styled.div`
  border-bottom: 2px solid var(--text-color);
  padding: 0 0 8px;
  text-align: left;

`

export default function UserTeamLayout ({ children }) {
  const { userId, teamId } = useParams()

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

  const team = data?.teams?.find(team => teamId === team.teamId) || {}
  useDocumentTitle(team.teamName || t('dashboard.metatitle'), [data])

  return (
    <>
      <StyledTeamBar>
        <h2 className='main-title'>{team.teamName}</h2>
      </StyledTeamBar>
      {children}
    </>

  )
}
