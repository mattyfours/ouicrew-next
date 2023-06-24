'use client'

import { useCallback, useState } from 'react'
import { t } from '@/languages/languages'
import { styled } from 'styled-components'
import Button from '../formElements/Button'
import Modal from '../utils/Modal'
import NewTeamForm from '../forms/NewTeamForm'
import ResponsiveTable from '../displayElements/ResponsiveTable'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRightLong } from '@fortawesome/free-solid-svg-icons'
import JoinTeamForm from '../forms/JoinTeamForm'

const StyledDashboardTeamList = styled.nav`
  position: relative;
  text-align: left;
  max-width: var(--width-modal);
  margin: 64px auto 0;

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

export default function DashboardTeamList ({ data, refetch }) {
  const { userId } = useParams()
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false)
  const [isJoinTeamModalOpen, setIsJoinTeamModalOpen] = useState(false)

  const handleToggleCreateTeamModal = useCallback((value) => {
    setIsCreateTeamModalOpen(value)
  }, [setIsCreateTeamModalOpen])

  const handleToggleJoinTeamModal = useCallback((value) => {
    setIsJoinTeamModalOpen(value)
  }, [setIsJoinTeamModalOpen])

  return (
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
  )
}
