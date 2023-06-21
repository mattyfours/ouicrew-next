import PageRegister from '@/components/pages/PageRegister'
import { t } from '@/languages/languages'

export const metadata = {
  title: `${t('register_page.metatitle')} | OuiCrew`
}

export default async function Auth () {
  return <PageRegister />
}
