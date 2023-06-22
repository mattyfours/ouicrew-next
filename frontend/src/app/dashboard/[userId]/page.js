import { t } from '@/languages/languages'
import axios from 'axios'
import { useParams } from 'next/navigation'

export const metadata = {
  title: `${t('dashboard.metatitle')} | OuiCrew`
}

export default async function Auth () {
  const url = useParams()
  // const url = `${process.env.NEXT_PUBLIC_SERVER_URL_BASE}/user/teams`
  // await axios.post(url,
  //   {
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //   }
  // )

  return (
    <>
      <h1>hi</h1>
    </>
  )
}
