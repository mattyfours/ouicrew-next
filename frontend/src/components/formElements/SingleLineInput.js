'use client'

import { useCallback, useId } from 'react'
import { styled } from 'styled-components'

const StyledSingleLineInput = styled.div`
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;

  label {
    margin: 0 0 5px;
    font-size: 1.2rem;
    text-transform: uppercase;
  }

  input {
    padding: 5px 10px;
    color: var(--background-color);
    opacity: 1;
    font-size: 700;
    outline: none;
    font-size: 1.6rem;
    border-radius: 4px;

    &::placeholder {
      color: var(--background-color);
      opacity: 0.7;
    }
  }
`

export default function SingleLineInput ({
  type,
  label,
  value,
  name,
  setter,
  placeholder
}) {
  const inputId = useId()

  const handleInputChange = useCallback(({ target: { value: evtValue } }) => {
    return setter(evtValue)
  }, [setter])

  return (
    <StyledSingleLineInput>
      <label htmlFor={inputId}>{label || name}</label>
      <input
        id={inputId}
        type={type || 'text'}
        name={name}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
    </StyledSingleLineInput>
  )
}
