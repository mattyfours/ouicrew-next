'use client'

import { useCallback, useEffect, useState } from 'react'
import { faL, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { styled } from 'styled-components'

// TODO: Add trap focus

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  visibility: hidden;
  padding: 16px;
  text-align: initial;

  &.active {
    visibility: visible;
    pointer-events: all;

    .modal {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .overlay-button {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .modal {
    position: relative;
    z-index: 2;
    height: auto;
    width: 100%;
    max-height: 90vh;
    max-width: var(--width-modal);
    background-color: var(--background-color);
    opacity: 0;
    transition: all 0.4s ease;
    transform: translateY(50px);
    border: 2px solid var(--text-color);
  }

  .modal-header {
    width: 100%;
    background-color: var(--text-color);
    padding: 8px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    button, h2 {
      color: var(--background-color);
      font-size: 1.6rem;
      margin: 0;
    }

    button {
      transition: all 0.2s ease;
      font-size: 1.8rem;
      margin: 0 0 0 16px;
    }

    button:hover {
      opacity: 0.7;
    }
  }

  .modal-content {
    padding: 16px;
    max-height: 80vh;
    overflow: auto;
    width: 100%;
    white-space: normal;
  }
`

export default function Modal ({ children, active, onClose, title }) {
  useEffect(() => {
    const windowEventHandler = (event) => (
      event.key === 'Escape' &&
      active === true
    )
      ? onClose()
      : null

    window.addEventListener('keydown', windowEventHandler)
    return () => window.removeEventListener('keydown', windowEventHandler)
  }, [onClose])

  return (
    <StyledModal className={`${active === true && 'active'}`}>
      <button
        className='overlay-button'
        onClick={onClose}
      />

      <div className='modal'>
        <div className='modal-header'>
          <h2>{title}</h2>
          <button
            className='close-button'
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className='modal-content'>
          {children}
        </div>
      </div>
    </StyledModal>
  )
}
