'use client'

import { useCallback, useId, useState } from 'react'
import { styled } from 'styled-components'

const StyledSingleLineInput = styled.div`
  position: relative;
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;

  &.active,
  &:focus {
    label {
      transform: translateY(0);
      font-size: 1.2rem;
    }
  }

  label {
    position: absolute;
    top: 0;
    margin: 0 0 5px;
    font-size: 1.6rem;
    transition: all 0.4s ease;
    transform: translateY(20px);
    pointer-events: none;
  }

  input {
    padding: 20px 0 3px;
    color: var(--text-color);
    opacity: 1;
    outline: none;
    font-size: 1.6rem;
    border-radius: 0;
    background-color: transparent;
    border-bottom: 1px solid var(--text-color);
    cursor: text;

    &::placeholder {
      display: none;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }
`

export default function SingleLineInput ({
  type,
  label,
  value,
  name,
  setter
}) {
  const [isFocused, setIsFocused] = useState(false)
  const inputId = useId()

  const handleInputChange = useCallback(({ target: { value: evtValue } }) => {
    return setter(evtValue)
  }, [setter])

  const handleFocusState = useCallback((value) => {
    setIsFocused(value)
  }, [setIsFocused])

  return (
    <StyledSingleLineInput className={`${(value.length !== 0 || isFocused) && 'active'}`}>
      <label htmlFor={inputId}>{label || name}</label>
      <input
        id={inputId}
        type={type || 'text'}
        name={name}
        value={value}
        onChange={handleInputChange}
        onFocus={() => handleFocusState(true)}
        onBlur={() => handleFocusState(false)}
      />
    </StyledSingleLineInput>
  )
}
