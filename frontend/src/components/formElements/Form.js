'use client'

import { t } from '@/languages/languages'
import Lottie from 'lottie-react'
import { styled } from 'styled-components'
import loadingAnimation from '../../lottie/loading.json'

const StyledForm = styled.form`
  position: relative;
  width: 100%;
  display: grid;
  grid-auto-flow: row;
  gap: 24px;

  &.loading {
    pointer-events: none;
  }

  .form-loading {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: rgba(255, 255, 255, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;

      div {
        width: fit-content;
        height: fit-content;
      }

      svg {
        max-width: 150px;
        height: auto;
      }
    }


  .form-error-message {
    background-color: var(--error-color);
    width: 100%;
    color: var(--background-color);
    text-align: center;
    padding: 5px 10px;
    border-radius: 4px;
  }

  .form-success-message {
    background-color: var(--success-color);
    width: 100%;
    color: var(--background-color);
    text-align: center;
    padding: 5px 10px;
    border-radius: 4px;
    font-weight: 700;
  }
`

export default function Form ({
  children,
  onSubmit,
  errorMessage,
  succesMessage,
  loading
}) {
  return (
    <StyledForm
      onSubmit={(event) => {
        event.preventDefault()
        return loading
          ? null
          : onSubmit()
      }}
      className={`${loading && 'loading'}`}
    >
      {
        succesMessage &&
          <div className='form-success-message'>
            {succesMessage}
          </div>
      }

      {
        errorMessage &&
          <div className='form-error-message'>
            {errorMessage}
          </div>
      }

      {children}

      {
        loading && (
          <div className='form-loading'>
            <Lottie animationData={loadingAnimation} />
          </div>
        )
      }
    </StyledForm>
  )
}
