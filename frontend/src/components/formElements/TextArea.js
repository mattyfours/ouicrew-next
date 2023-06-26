'use client'

import { useCallback, useId, useState } from 'react'
import { styled } from 'styled-components'

const StyledTextArea = styled.div`
  position: relative;
  width: 100%;
  margin: 0;
  display: flex;
  flex-direction: column;



  label {
    position: relative;
    top: 0;
    margin: 0 0 5px;
    font-size: 1.2rem;
    transition: all 0.4s ease;
  }

  textarea {
    appearance: none;
    padding: 8px;
    color: var(--text-color);
    opacity: 1;
    outline: none;
    font-size: 1.6rem;
    border-radius: 0;
    background-color: transparent;
    border: 1px solid var(--text-color);
    cursor: pointer;
    resize: none;
    height: 80px;

    &::placeholder {
      display: none;
    }
  }
`

export default function TextArea ({
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
    <StyledTextArea className={`${(value.length !== 0 || isFocused) && 'active'}`}>
      <label htmlFor={inputId}>{label || name}</label>
      <textarea
        id={inputId}
        name={name}
        value={value}
        onChange={handleInputChange}
        onFocus={() => handleFocusState(true)}
        onBlur={() => handleFocusState(false)}
      />
    </StyledTextArea>
  )
}
