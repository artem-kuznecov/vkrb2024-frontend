'use client'

import { useEffect, useState } from 'react'
import { Inter } from 'next/font/google'
import { Sidenav } from '../sidenav/Sidenav'
import { Loader } from '../loader/Loader'

const inter = Inter({ subsets: ['latin'] })

export const UserLayout = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const [mounted, setMounted] = useState<boolean>(false)
  const [loaderHidden, setLoaderHidden] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
    setTimeout(() => {
      setLoaderHidden(true)
    }, 2000)
  }, [])

  return (
    <body className={inter.className}>
      <>
        <Sidenav animatedLogo={mounted} />
        <main>{children}</main>
        <Loader componentDidMount={mounted} loaderShouldUnmount={loaderHidden} />
      </>
    </body>
  )
}