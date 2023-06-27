'use client'

import { useCallback, useId, useState } from 'react'
import { styled } from 'styled-components'

const StyledSelect = styled.div`
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

  select {
    appearance: none;
    padding: 20px 0 3px;
    color: var(--text-color);
    opacity: 1;
    outline: none;
    font-size: 1.6rem;
    border-radius: 0;
    background-color: transparent;
    border-bottom: 1px solid var(--text-color);
    background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
    background-repeat: no-repeat;
    background-size: 24px;
    background-position: 100% 15px;
    cursor: pointer;

    &::placeholder {
      display: none;
    }
  }
`

export default function Select ({
  label,
  value,
  name,
  setter,
  options,
  onChange
}) {
  const [isFocused, setIsFocused] = useState(false)
  const inputId = useId()

  const handleInputChange = useCallback(async ({ target: { value: evtValue } }) => {
    return setter(evtValue)
  }, [setter])

  const handleFocusState = useCallback((value) => {
    return setIsFocused(value)
  }, [setIsFocused])

  return (
    <StyledSelect className={`${(value.length !== 0 || isFocused) && 'active'}`}>
      <label htmlFor={inputId}>{label || name}</label>
      <select
        id={inputId}
        name={name}
        value={value}
        onFocus={() => handleFocusState(true)}
        onBlur={() => handleFocusState(false)}
        onChange={
          typeof onChange === 'undefined'
            ? handleInputChange
            : onChange
        }
      >
        {
          options.map((option, index) => (
            <option
              key={`${inputId}--${index}`}
              value={option.value}
              disabled={option.value === '-'}
            >
              {option.label}
            </option>
          ))
        }
      </select>
    </StyledSelect>
  )
}
