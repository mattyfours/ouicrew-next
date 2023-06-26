import { t } from '@/languages/languages'
import StyledComponentsRegistry from '../components/lib/StyledComponentsRegistry'
import '../styles/main.scss'

export const metadata = {
  title: t('general.ouicrew'),
  description: 'OuiCrew App'
}

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
