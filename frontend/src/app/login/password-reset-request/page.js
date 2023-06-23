import PasswordResetRequestForm from '@/components/forms/PasswordResetRequestForm'
import { t } from '@/languages/languages'

export const metadata = {
  title: `${t('password_reset_page.metatitle')} | OuiCrew`
}

export default async function PagePasswordResetRequest () {
  return <PasswordResetRequestForm />
}
