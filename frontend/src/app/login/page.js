import LoginForm from '@/components/forms/LoginForm'
import { t } from '@/languages/languages'

export const metadata = {
  title: `${t('login_page.metatitle')} | ${t('general.ouicrew')}`
}

export default async function Auth () {
  return <LoginForm />
}
