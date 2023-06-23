'use client'

import { styled } from 'styled-components'

const StyledModal = styled.div`
`

export default function Modal ({ children, active }) {
  return (
    <StyledModal>
      <div className='modal'>
        <div className='modal-content'>
          {children}
        </div>

      </div>
    </StyledModal>
  )
}
