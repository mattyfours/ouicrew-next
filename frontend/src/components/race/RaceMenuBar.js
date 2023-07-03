import { t } from '@/languages/languages'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import { styled } from 'styled-components'

const StyledRaceMenuBar = styled.div`
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

export default function RaceMenuBar ({ data }) {
  const { userId, teamId, raceId } = useParams()
  const path = usePathname()

  const navItems = typeof data.user === 'undefined'
    ? [
        {
          path: `/teams/${teamId}/races/${raceId}`,
          title: t('dashboard.overview')
        },
        {
          path: `/teams/${teamId}/races/${raceId}/results`,
          title: t('dashboard.results')
        }
      ]
    : [
        {
          path: `/user/${userId}/teams/${teamId}/race/${raceId}`,
          title: t('dashboard.overview'),
          editorOnly: false
        },
        {
          path: `/user/${userId}/teams/${teamId}/race/${raceId}/officiate`,
          title: t('dashboard.officiate'),
          editorOnly: true
        },
        {
          path: `/user/${userId}/teams/${teamId}/race/${raceId}/results`,
          title: t('dashboard.results'),
          editorOnly: false
        }
      ]

  return (
    <StyledRaceMenuBar>
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

    </StyledRaceMenuBar>
  )
}
