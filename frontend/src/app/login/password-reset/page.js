import PagePasswordRequest from '@/components/pages/PagePasswordReset'
import { t } from '@/languages/languages'

export const metadata = {
  title: `${t('password_reset_page.metatitle')} | OuiCrew`
}

export default async function Auth () {
  return <PagePasswordRequest />
}
