'use client'

import Link from 'next/link'
import styled from 'styled-components'

const StyledHome = styled.div`
  height: auto;
  display: flex;
  margin: 24px;
  max-width: var(--width-modal);

  p {
    text-align: justify;
    font-size: 1.4rem;
    line-height: 1.5;
    margin: 0;
  }

  a {
    display: inline-block;
    position: relative;
    text-decoration: underline;
    margin: 20px 0 0;
    font-size: 1.4rem;
  }
`

export default function Home () {
  return (
    <StyledHome>
      <div className='container home-container'>
        <h1 className='heading-small'>OuiCrew V3 - Alpha</h1>
        <p>Main time trial functionality is working for rowing. However, there may be some missing features. Check back for the latest features</p>
        <Link href='/login'>Log In</Link>/<Link href='/login/register'>Register</Link>
      </div>
    </StyledHome>
  )
}
