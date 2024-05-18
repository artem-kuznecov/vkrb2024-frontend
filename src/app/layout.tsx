import './globals.scss'

import { UserLayout } from '@/components/layouts/User.layout'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LISA',
  description: 'LISA MLV web application',
}

const RootLayout  = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  return (
    <html lang="en" suppressHydrationWarning>
      <UserLayout>{children}</UserLayout>
    </html>
  )
}

export default RootLayout