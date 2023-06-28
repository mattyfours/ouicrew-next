'use client'

import { useCallback, useEffect, useState } from 'react'
import { faL, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { styled } from 'styled-components'

const StyledToast = styled.div`
  position: fixed;
  bottom: 50px;
  left: 50%;
  transform: ;
  z-index: 10000;
  width: calc(100% - 32px);
  max-width: 350px;
  background-color: var(--text-color);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
  visibility: hidden;
  padding: 8px 16px;
  margin: 0;
  text-align: initial;
  transform: translateY(50px) translateX(-50%);
  transition: none;
  color: var(--background-color);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);

  &.style--error {
    background-color: var(--error-color);
  }

  &.active {
    visibility: visible;
    pointer-events: all;
    opacity: 1;
    transition: all 0.4s ease;
    transform: translateY(0) translateX(-50%);
  }

  button {
    width: fit-content;
    margin: 0 0 0 16px;
    font-size: 2.8rem;

    &:hover {
      color: var(--background-color);
      opacity: 0.8;
    }
  }
`

export default function Toast ({ message, active, onClose, type }) {
  useEffect(() => {
    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    })
  }, [onClose])

  return (
    <StyledToast
      className={`
        ${active === true && 'active'}
        style--${type}
      `}
    >

      <p>{message}</p>
      <button
        className='close-button'
        onClick={onClose}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </StyledToast>
  )
}
