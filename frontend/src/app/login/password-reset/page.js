import PasswordResetForm from '@/components/forms/PasswordResetForm'
import { t } from '@/languages/languages'

export const metadata = {
  title: `${t('password_reset_page.metatitle')} | OuiCrew`
}

export default async function PagePasswordReset () {
  return <PasswordResetForm />
}
