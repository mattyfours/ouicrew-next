'use client'

import { useCallback, useId } from 'react'
import { styled } from 'styled-components'

const StyledCheckbox = styled.div`
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: center;

  label {
    margin: 0 0 0 12px;
    font-size: 1.2rem;
    text-transform: uppercase;
    line-height: 1;
    flex: 1;
    cursor: pointer;
  }

  input {
    position: relative;
    appearance: none;
    padding: 5px 10px;
    color: var(--background-color);
    opacity: 1;
    font-size: 700;
    outline: none;
    font-size: 1.6rem;
    border-radius: 4px;
    width: 20px;
    height: 20px;
    min-height: 20px;
    min-width: 20px;
    border-radius: 4px;
    cursor: pointer;
    background-color: var(--text-color);

    &:checked {
      background-color: var(--primary-color);

      &:after {
        content: '✔';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.6rem;
      }
    }

    &::placeholder {
      color: var(--background-color);
      opacity: 0.7;
    }
  }
`

export default function Checkbox ({
  label,
  value,
  name,
  setter
}) {
  const inputId = useId()

  const handleInputChange = useCallback(() => {
    return setter(!value)
  }, [setter, value])

  return (
    <StyledCheckbox>
      <label htmlFor={inputId}>{label || name}</label>
      <input
        id={inputId}
        type='checkbox'
        name={name}
        checked={value}
        onChange={handleInputChange}
      />
    </StyledCheckbox>
  )
}
