'use client'

import { t } from '@/languages/languages'
import { styled } from 'styled-components'

const StyledForm = styled.form`
  width: 100%;
  display: grid;
  grid-auto-flow: row;
  gap: 24px;

  .form-error-message {
    background-color: var(--error-color);
    width: 100%;
    color: var(--text-color);
    text-align: center;
    padding: 5px 10px;
    border-radius: 4px;
  }

  .form-success-message {
    background-color: var(--primary-color);
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
  succesMessage
}) {
  return (
    <StyledForm
      onSubmit={(event) => {
        event.preventDefault()
        return onSubmit()
      }}
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
            <strong>{t('forms.error')}:</strong> {errorMessage}
          </div>
      }

      {children}
    </StyledForm>
  )
}
