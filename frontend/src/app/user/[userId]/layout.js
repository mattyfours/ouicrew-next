'use client'

import { useEffect, useState } from 'react'
import ErrorPage from '@/components/pages/ErrorPage'
import axios from 'axios'
import { styled } from 'styled-components'
import { useParams } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSliders } from '@fortawesome/free-solid-svg-icons'
import DashboardNav from '@/components/dashboard/DashboardNav'
import DashboardNoTeam from '@/components/dashboard/DashboardNoTeam'

const StyledUserDashboardLayout = styled.div`

`

const getData = async (userId) => {

}

export default function UserDashboardLayout ({ children }) {
  const { userId } = useParams()
  const [data, setData] = useState(null)

  useEffect(() => {
    (async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_SERVER_URL_BASE}/user/${userId}/teams`
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
  }, [])

  console.log(data)

  if (data === null) {
    return <h1>Loading</h1>
  }

  if (typeof data?.error !== 'undefined') {
    return <ErrorPage error={data.error?.response?.data?.error?.[0]} />
  }

  return (
    <StyledUserDashboardLayout>
      <DashboardNav data={data} />

      <div className='container'>
        {
          data.teams?.length === 0
            ? <DashboardNoTeam />
            : 'Has Teams'
        }
      </div>

      <FontAwesomeIcon icon={faSliders} />
      {data.user.username}
    </StyledUserDashboardLayout>
  )
}
