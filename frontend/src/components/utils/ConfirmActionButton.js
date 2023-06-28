'use client'

import { useCallback, useState } from 'react'
import { styled } from 'styled-components'
import Modal from './Modal'
import { t } from '@/languages/languages'
import Button from '../formElements/Button'

const StyledConfirmModal = styled.div`
  text-align: center;

  p {
    width: 100%;
    font-size: 1.8rem;
  }

  .action-buttons {
    width: fit-content;
    margin: 24px auto 0;
  }
`

export default function ConfirmActionButton ({
  children,
  className,
  message,
  onAction
}) {
  // States
  const [modalOpen, setModelOpen] = useState(false)

  const handleModalToggle = useCallback((value) => {
    setModelOpen(value)
  }, [setModelOpen])

  const handleOnAction = useCallback(async () => {
    setModelOpen(false)
    return typeof onAction === 'undefined'
      ? null
      : await onAction()
  }, [onAction])

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
        onClose={() => handleModalToggle(false)}
      >
        <StyledConfirmModal>
          <p>{message}</p>
          <div className='action-buttons'>
            <Button
              secondary
              onClick={() => handleModalToggle(false)}
            >
              {t('general.cancel')}
            </Button>
            <Button
              onClick={handleOnAction}
            >
              {t('general.confirm')}
            </Button>
          </div>
        </StyledConfirmModal>
      </Modal>
    </>
  )
}
