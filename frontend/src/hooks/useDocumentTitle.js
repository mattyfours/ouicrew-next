import { t } from '@/languages/languages'
import { useEffect } from 'react'

const useDocumentTitle = (title = null, reRenderTriggers) => {
  return useEffect(() => {
    document.title = (typeof title === 'undefined' || title === null)
      ? t('general.ouicrew')
      : `${title} | ${t('general.ouicrew')}`
  }, [...reRenderTriggers])
}
export default useDocumentTitle
