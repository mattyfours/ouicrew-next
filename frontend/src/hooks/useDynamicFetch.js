import { t } from '@/languages/languages'
import { useCallback, useEffect, useState } from 'react'

export const useDynamicFetch = (callback) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [refetchData, setRefetchData] = useState(1)
  const [error, setError] = useState('')

  useEffect(() => {
    (async () => {
      try {
        setLoading(true)
        const resData = await callback()
        setLoading(false)
        setData(resData)
        setError('')
      } catch (err) {
        setLoading(false)
        setData({ error: err })
        setError(
          typeof err.response?.data?.error?.[0] === 'undefined'
            ? t('general.unexpected_error')
            : err.response.data.error[0].message
        )
      }
    })()
  }, [
    refetchData,
    setLoading,
    setData,
    setError
  ])

  const refetch = useCallback(() => {
    setRefetchData(refetchData + 1)
  }, [refetchData])

  return {
    data,
    loading,
    refetch,
    error
  }
}
