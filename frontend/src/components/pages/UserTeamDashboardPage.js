'use client'

import { useCallback, useEffect, useState } from 'react'
import ErrorPage from '@/components/pages/ErrorPage'
import axios from 'axios'
import { styled } from 'styled-components'
import { useParams } from 'next/navigation'
import DashboardNav from '@/components/dashboard/DashboardNav'
import DashboardNoTeam from '@/components/dashboard/DashboardNoTeam'
import DashboardTeamList from '@/components/dashboard/DashboardTeamList'
import { t } from '@/languages/languages'

const StyledUserTeamDashboardPage = styled.div`
  .main-title {
    text-align: center;
    margin: 64px 0 0;
  }
`

export default function UserTeamDashboardPage ({ children }) {
  const { userId, teamId } = useParams()
  const [data, setData] = useState(null)
  const [refetchData, setRefetchData] = useState(1)

  useEffect(() => {
    (async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_SERVER_URL_BASE}/user/${userId}/teams/${teamId}`
        const { data } = await axios.get(url,
          {
            headers: {
              'Content-Type': 'application/json',
              'x-ouicrew-session-token': localStorage.getItem('userSessionToken')
            }
          }
        )

        setData(data)
      } catch (err) {
        setData({ error: err })
      }
    })()
  }, [refetchData])

  const refetch = useCallback(() => {
    setRefetchData(refetchData + 1)
  }, [refetchData])

  if (data === null) {
    return <h1>Loading</h1>
  }

  if (typeof data?.error !== 'undefined') {
    return <ErrorPage error={data.error?.response?.data?.error?.[0]} />
  }

  return (
    <StyledUserTeamDashboardPage>
      <DashboardNav data={data} />

      <div className='container'>
        <h2 className='heading-large main-title'>{t('dashboard.welcome')} {data.user.username}</h2>

      </div>
    </StyledUserTeamDashboardPage>
  )
}
