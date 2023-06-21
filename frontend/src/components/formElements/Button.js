'use client'

import { styled } from 'styled-components'

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: 800;
  text-transform: uppercase;
  border-radius: 4px;
  background-color: var(--primary-color);
  width: fit-content;
  min-width: 150px;
  padding: 8px 16px;
  margin: 0;
  color: var(--background-color);
  transform: background-color 0.2s ease;

  &.centered {
    margin: 0 auto;
  }

  &:hover {
    background-color: var(--primary-color-hover);
  }
`

export default function Button ({
  type,
  onClick,
  children,
  centered
}) {
  return (
    <StyledButton
      onClick={onClick}
      type={type}
      className={`${centered && 'centered'}`}
    >
      {children}

    </StyledButton>
  )
}
