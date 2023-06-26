'use client'

import ErrorPage from '@/components/pages/ErrorPage'
import axios from 'axios'
import { styled } from 'styled-components'
import { useParams } from 'next/navigation'
import { t } from '@/languages/languages'
import { useDynamicFetch } from '@/hooks/useDynamicFetch'
import { useCallback, useState } from 'react'
import ResponsiveTable from '@/components/displayElements/ResponsiveTable'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import Link from 'next/link'
import Button from '@/components/formElements/Button'
import Modal from '@/components/utils/Modal'
import JoinTeamForm from '@/components/forms/JoinTeamForm'
import NewRaceForm from '@/components/forms/NewRaceForm'

const StyledDashboardTeamList = styled.nav`
  position: relative;
  text-align: left;
  max-width: var(--width-modal);
  margin: 32px auto 0;

  h2 {
    margin: 0 0 8px;
  }

  .view-link {
    display: flex;
    align-items: center;
    justify-content: flex-start;

    svg {
      position: relative;
      top: 1px;
      margin: 0 0 0 5px;
      font-size: 1.0rem;
      width: max-content;
      display: inline-block;
    }
  }

  .new-team-button {
    display: flex;
    margin: 10px 0 0 auto;
  }

  .action-buttons {
    margin: 10px 0 0 auto;
    display: grid;
    width: fit-content;
    grid-auto-flow: column;
    gap: 16px;
  }

  .no-team-notice {
    border: 1px solid var(--text-color);
    padding: 16px;
    margin: 0;
  }
`

export default function UserTeamPage ({ children }) {
  const { userId, teamId } = useParams()

  const {
    data,
    refetch
  } = useDynamicFetch(async () => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL_BASE}/user/${userId}/teams/${teamId}`
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

  const [isNewRaceModelOpen, setIsNewRaceModelOpen] = useState(false)

  const handleToogleNewRaceModal = useCallback((value) => {
    setIsNewRaceModelOpen(value)
  }, [setIsNewRaceModelOpen])

  if (data === null) {
    return <h1>Loading</h1>
  }

  if (typeof data?.error !== 'undefined') {
    return <ErrorPage error={data.error?.response?.data?.error?.[0]} />
  }

  return (
    <>
      <StyledDashboardTeamList>
        <h2 className='heading-small'>{t('dashboard.race_list')}</h2>

        {
          data.races?.length === 0
            ? (<p className='no-team-notice'><small>{t('dashboard.no_races_found')}</small></p>)
            : (
              <ResponsiveTable
                headings={[
                  'Team Name',
                  'Membership'
                ]}
              >
                {
                  data.teams.map((team, index) => (
                    <ResponsiveTable.Row key={`teamlist-${team.teamId}`}>
                      <ResponsiveTable.Item>
                        <Link href={`/user/${userId}/teams/${team.teamId}`} className='view-link'>
                          {team.teamName} <FontAwesomeIcon icon={faRightLong} />
                        </Link>
                      </ResponsiveTable.Item>
                      <ResponsiveTable.Item>
                        {team.isTeamAdmin ? 'Admin' : 'Member'}|
                        {team.isTeamEditor ? 'Editor' : 'Viewer'}
                      </ResponsiveTable.Item>
                    </ResponsiveTable.Row>
                  ))
                }
              </ResponsiveTable>
              )
        }

        {
          (
            data.team.isTeamAdmin === true ||
            data.team.isTeamEditor === true
          ) &&
            <>
              <div className='action-buttons'>
                <Button className='new-team-button' size='small' onClick={() => handleToogleNewRaceModal(true)}>
                  {t('dashboard.new_race')}
                </Button>
              </div>

              <Modal
                title={t('dashboard.new_race')}
                active={isNewRaceModelOpen}
                onClose={() => handleToogleNewRaceModal(false)}
              >
                <NewRaceForm refetch={refetch} />
              </Modal>

            </>
        }

      </StyledDashboardTeamList>
    </>
  )
}
