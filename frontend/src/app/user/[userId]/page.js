'use client'

import Button from '@/components/formElements/Button'
import ErrorPage from '@/components/pages/ErrorPage'
import useDocumentTitle from '@/hooks/useDocumentTitle'
import { useDynamicFetch } from '@/hooks/useDynamicFetch'
import { t } from '@/languages/languages'
import axios from 'axios'
import { useParams } from 'next/navigation'

import { useCallback, useState } from 'react'
import { styled } from 'styled-components'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import Modal from '@/components/utils/Modal'
import ResponsiveTable from '@/components/displayElements/ResponsiveTable'
import NewTeamForm from '@/components/forms/NewTeamForm'
import JoinTeamForm from '@/components/forms/JoinTeamForm'

const StyledDashboardTeamList = styled.nav`
  position: relative;
  text-align: left;
  max-width: var(--width-modal);
  margin: 64px auto 0;

  h2 {
    margin: 0 0 8px;
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

export default function UserPage ({ children }) {
  const { userId } = useParams()

  const {
    data,
    refetch
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

  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false)
  const [isJoinTeamModalOpen, setIsJoinTeamModalOpen] = useState(false)

  const handleToggleCreateTeamModal = useCallback((value) => {
    setIsCreateTeamModalOpen(value)
  }, [setIsCreateTeamModalOpen])

  const handleToggleJoinTeamModal = useCallback((value) => {
    setIsJoinTeamModalOpen(value)
  }, [setIsJoinTeamModalOpen])

  if (data === null) {
    return <h1>Loading</h1>
  }

  if (typeof data?.error !== 'undefined') {
    return <ErrorPage error={data.error?.response?.data?.error?.[0]} />
  }

  return (
    <>
      <h2 className='main-title text-center'>{t('dashboard.welcome')} {data.user.username}</h2>

      <StyledDashboardTeamList>
        <h2 className='heading-small'>{t('dashboard.my_teams')}</h2>

        {
          data.teams?.length === 0
            ? (<p className='no-team-notice'><small>{t('dashboard.no_teams_joined')}</small></p>)
            : (
              <ResponsiveTable
                headings={[
                  'Team Name',
                  'Membership'
                ]}
              >
                {
                  data.teams.map((team, index) => (
                    <ResponsiveTable.Row key={`teamlist-${team.id}`}>
                      <ResponsiveTable.Item>
                        <Link href={`/user/${userId}/teams/${team.id}`} className='view-link'>
                          {team.name} <FontAwesomeIcon icon={faRightLong} />
                        </Link>
                      </ResponsiveTable.Item>
                      <ResponsiveTable.Item>
                        {team.is_team_admin ? 'Admin' : 'Member'}|
                        {team.is_team_editor ? 'Editor' : 'Viewer'}
                      </ResponsiveTable.Item>
                    </ResponsiveTable.Row>
                  ))
                }
              </ResponsiveTable>
              )
        }

        <div className='action-buttons'>
          <Button className='new-team-button' size='small' onClick={() => handleToggleCreateTeamModal(true)}>
            {t('dashboard.create_new_team')}
          </Button>

          <Button className='new-team-button' size='small' onClick={() => handleToggleJoinTeamModal(true)}>
            {t('dashboard.join_a_team')}
          </Button>
        </div>

        <Modal
          title={t('dashboard.create_new_team')}
          active={isCreateTeamModalOpen}
          onClose={() => handleToggleCreateTeamModal(false)}
        >
          <NewTeamForm refetch={refetch} />
        </Modal>

        <Modal
          title={t('dashboard.join_a_team')}
          active={isJoinTeamModalOpen}
          onClose={() => handleToggleJoinTeamModal(false)}
        >
          <JoinTeamForm refetch={refetch} />
        </Modal>

      </StyledDashboardTeamList>
    </>
  )
}
