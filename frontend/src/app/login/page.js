import PageLogin from '@/components/pages/PageLogin'
import { t } from '@/languages/languages'

export const metadata = {
  title: `${t('login_page.metatitle')} | OuiCrew`
}

export default async function Auth () {
  return <PageLogin />
}
