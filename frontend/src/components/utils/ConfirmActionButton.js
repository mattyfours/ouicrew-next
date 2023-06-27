'use client'

import { useCallback, useEffect, useState } from 'react'
import { faL, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { styled } from 'styled-components'
import Modal from './Modal'
import { t } from '@/languages/languages'

export default function ConfirmActionButton ({
  children,
  className,
  message
}) {
  // States
  const [modalOpen, setModelOpen] = useState(false)

  const handleModalToggle = useCallback((value) => {

  }, [])

  return (
    <>
      <button
        className={className}
        onClick={() => handleModalToggle(true)}
      >
        {children}
      </button>

      <Modal
        title={t('general.confirm')}
        active={modalOpen}
      >
        {message}
      </Modal>
    </>
  )
}
