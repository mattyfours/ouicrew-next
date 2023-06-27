'use client'

import { styled } from 'styled-components'

const StyledGrid = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(2, 1fr);

`

export default function Grid ({ children }) {
  return (
    <StyledGrid>
      {children}
    </StyledGrid>
  )
}
