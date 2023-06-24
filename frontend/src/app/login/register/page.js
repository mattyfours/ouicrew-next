import RegisterForm from '@/components/forms/RegisterForm'
import { t } from '@/languages/languages'

export const metadata = {
  title: `${t('register_page.metatitle')} | ${t('general.ouicrew')}`
}

export default async function PageRegister () {
  return <RegisterForm />
}
