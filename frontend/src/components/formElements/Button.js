'use client'

import { styled } from 'styled-components'

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  letter-spacing: 0.05rem;
  font-weight: 400;
  text-transform: uppercase;
  border-radius: 4px;
  background-color: var(--primary-color);
  width: fit-content;
  min-width: 150px;
  padding: 8px 16px;
  margin: 0;
  color: var(--background-color);
  transform: background-color 0.2s ease;

  &.size-small {
    padding: 4px 8px;
    font-size: 1.4rem;
    min-width: fit-content;
  }

  &.centered {
    margin: 0 auto;
  }

  &:hover {
    background-color: var(--primary-color-hover);
    color: var(--background-color);
  }
`

export default function Button ({
  type,
  onClick,
  children,
  centered,
  size,
  className
}) {
  return (
    <StyledButton
      onClick={onClick}
      type={type}
      className={`${centered && 'centered'} ${size && `size-${size}`} ${className}`}
    >
      {children}

    </StyledButton>
  )
}
