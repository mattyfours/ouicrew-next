'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import styled from 'styled-components'

const StyledHome = styled.div`
  height: auto;
  display: flex;
  padding: 24px;
  width: 100%;
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
  const [username, setUsername] = useState(null)

  useEffect(() => {
    setUsername(localStorage.getItem('userUsername'))
  }, [setUsername])

  return (
    <StyledHome>
      <div className='container home-container'>
        <h1 className='heading-small'>OuiCrew V3 - Alpha</h1>
        <p>Main time trial functionality is working for rowing. However, there may is some missing features. Check back for the latest additions.</p>
        {
          username === null
            ? (
              <>
                <Link href='/login'>Log In</Link>/<Link href='/login/register'>Register</Link>
              </>
              )
            : (
              <>
                <Link href={`/user/${username}`}>Dashboard</Link>
              </>
              )
        }
      </div>
    </StyledHome>
  )
}
