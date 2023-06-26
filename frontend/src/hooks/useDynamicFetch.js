import { useCallback, useEffect, useState } from 'react'

export const useDynamicFetch = (callback) => {
  const [data, setData] = useState(null)
  const [refetchData, setRefetchData] = useState(1)

  useEffect(() => {
    (async () => {
      try {
        const resData = await callback()
        setData(resData)
      } catch (err) {
        setData({ error: err })
      }
    })()
  }, [refetchData])

  const refetch = useCallback(() => {
    setRefetchData(refetchData + 1)
  }, [refetchData])

  return {
    data,
    refetch
  }
}
