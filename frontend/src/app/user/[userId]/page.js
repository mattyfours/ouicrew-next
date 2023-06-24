import UserDashboardPage from '@/components/pages/UserDashboardPage'
import { t } from '@/languages/languages'

export const metadata = {
  title: `${t('dashboard.metatitle')} | ${t('general.ouicrew')}`
}

export default async function Dashboard ({ params, req, res }) {
  return <UserDashboardPage />
}
