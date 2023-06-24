import UserTeamDashboardPage from '@/components/pages/UserTeamDashboardPage'
import { t } from '@/languages/languages'

export const metadata = {
  title: `${t('dashboard.metatitle')} | OuiCrew`
}

export default async function DashboardTeam ({ params, req, res }) {
  return <UserTeamDashboardPage />
}
