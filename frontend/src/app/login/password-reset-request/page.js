import PagePasswordResetRequest from '@/components/pages/PagePasswordResetRequest'
import { t } from '@/languages/languages'

export const metadata = {
  title: `${t('password_reset_page.metatitle')} | OuiCrew`
}

export default async function Auth () {
  return <PagePasswordResetRequest />
}
