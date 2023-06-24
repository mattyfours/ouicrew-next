import StyledComponentsRegistry from '../components/lib/StyledComponentsRegistry'
import '../styles/main.scss'

export default function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <body>
        <StyledComponentsRegistry>
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
