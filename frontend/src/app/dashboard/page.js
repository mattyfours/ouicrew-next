'use client'

import LoadingPage from '@/components/pages/LoadingPage'
import { useRouter } from 'next/navigation'

export default function Dashboard () {
  const router = useRouter()

  const sessionToken = localStorage.getItem('userSessionToken')

  const newRoute = sessionToken === null
    ? '/'
    : `user/${localStorage.getItem('userId')}`

  router.replace(newRoute)

  return (
    <LoadingPage />
  )
}
