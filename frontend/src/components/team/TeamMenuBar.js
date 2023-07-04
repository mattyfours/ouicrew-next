import { t } from '@/languages/languages'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { styled } from 'styled-components'

const StyledTeamMenuBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin: 2px -2px 0;
  width: calc(100% + 4px);

  a {
    text-align: center;
    border: 2px solid white;
    padding: 8px 8px;
    width: 100%;
    background-color: var(--primary-color);
    color: var(--background-color);
    font-size: 1.4rem;

    &:hover {
      color: var(--background-color);
      background-color: var(--primary-color-hover);
    }

    &.active {
      background-color: var(--light-grey-color);
      color: var(--text-color);

      &:hover {
        color: var(--text-color);
        background-color: var(--dark-grey-color);
      }
    }
  }
`

export default function TeamMenuBar ({ data }) {
  const { userId, teamId } = useParams()
  const path = usePathname()

  const navItems = [
    {
      path: `/user/${userId}/teams/${teamId}`,
      title: t('dashboard.overview'),
      editorOnly: false
    },
    {
      path: `/user/${userId}/teams/${teamId}/racing-standards`,
      title: t('dashboard.racing_standards'),
      editorOnly: false
    }
  ]

  return (
    <StyledTeamMenuBar>
      {
        navItems.map((link, index) => (
          link.editorOnly === true &&
          data.team.is_team_editor === false
        )
          ? null
          : (
            <Link
              href={link.path}
              key={`race-menu-bar-link--${index}`}
              className={`${path === link.path && 'active'}`}
            >
              {link.title}
            </Link>
            )
        )

      }

    </StyledTeamMenuBar>
  )
}
