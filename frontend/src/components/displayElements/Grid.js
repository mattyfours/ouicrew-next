'use client'

import { styled } from 'styled-components'

const StyledGrid = styled.div`
  display: grid;
  grid-auto-flow: column;
  gap: 24px;

`

export default function Grid ({ children }) {
  return (
    <StyledGrid>
      {children}
    </StyledGrid>
  )
}
