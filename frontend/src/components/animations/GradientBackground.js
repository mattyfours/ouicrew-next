'use client'

import { keyframes, styled } from 'styled-components'

const backgroundAnimation = keyframes`
    0% {
      background-position: 0 0;
    }

    100% {
      background-position: 0 100%;
    }
`

const waveAnimation = keyframes`
    0% {
      d: path('M0,128L30,144C60,160,120,192,180,170.7C240,149,300,75,360,90.7C420,107,480,213,540,256C600,299,660,277,720,229.3C780,181,840,107,900,69.3C960,32,1020,32,1080,69.3C1140,107,1200,181,1260,197.3C1320,213,1380,171,1410,149.3L1440,128L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z');
    }

    33% {
      d: path('M0,160L30,138.7C60,117,120,75,180,74.7C240,75,300,117,360,149.3C420,181,480,203,540,208C600,213,660,203,720,181.3C780,160,840,128,900,138.7C960,149,1020,203,1080,208C1140,213,1200,171,1260,165.3C1320,160,1380,192,1410,208L1440,224L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z');
    }

    66% {
      d: path('M0,128L30,149.3C60,171,120,213,180,245.3C240,277,300,299,360,277.3C420,256,480,192,540,160C600,128,660,128,720,149.3C780,171,840,213,900,197.3C960,181,1020,107,1080,106.7C1140,107,1200,181,1260,202.7C1320,224,1380,192,1410,176L1440,160L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z');
    }

    100% {
      d: path('M0,128L30,144C60,160,120,192,180,170.7C240,149,300,75,360,90.7C420,107,480,213,540,256C600,299,660,277,720,229.3C780,181,840,107,900,69.3C960,32,1020,32,1080,69.3C1140,107,1200,181,1260,197.3C1320,213,1380,171,1410,149.3L1440,128L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z');
    }
`

const StyledGradientBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: 100% 300%;
  /* background-image: var(--background-gradient); */
  background-position: 100% 0;
  /* animation: ${backgroundAnimation} 20s cubic-bezier(0.175, 0.885, 0.32, 1.275) infinite; */
  overflow: hidden;

  svg {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: auto;
    min-width: 100%;
    min-height: 25vh;
    height: auto;

    path {
      fill: var(--primary-color);
      opacity: 0.15;
      animation: ${waveAnimation} 20s linear infinite;
    }
  }
`

export default function GradientBackground () {
  return (
    <StyledGradientBackground>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'>
        <path fill='transparent' fill-opacity='1' d='M0,128L30,144C60,160,120,192,180,170.7C240,149,300,75,360,90.7C420,107,480,213,540,256C600,299,660,277,720,229.3C780,181,840,107,900,69.3C960,32,1020,32,1080,69.3C1140,107,1200,181,1260,197.3C1320,213,1380,171,1410,149.3L1440,128L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z' />
      </svg>
    </StyledGradientBackground>
  )
}
