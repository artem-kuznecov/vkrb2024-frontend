import './globals.scss'

import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'LISA',
  description: 'LISA MLV web application',
}

const RootLayout  = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

export default RootLayout