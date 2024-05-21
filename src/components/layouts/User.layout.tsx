'use client'

import { useEffect, useState } from 'react'
import { redirect, usePathname } from 'next/navigation'
import { getCookie } from 'cookies-next'
import { Sidenav } from '../sidenav/Sidenav'
import { Loader } from '../loader/Loader'
import { Providers } from '@/app/providers'
import { routes } from '@/data/routes'

export const UserLayout = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const pathname = usePathname()
  const [mounted, setMounted] = useState<boolean>(false)
  const [loaderHidden, setLoaderHidden] = useState<boolean>(false)

  useEffect(() => {
    const cookie_username = getCookie('username')
    if (!cookie_username && !pathname.includes('authentication')) return redirect('/authentication/login')

    setMounted(true)
    setTimeout(() => {
      setLoaderHidden(true)
    }, 2000)
  }, [pathname])

  const shouldMountSidenav =
    !pathname.includes('authentication') &&
    routes.some(route => route.url === pathname)

  return (
    <body>
      <Providers>
        {shouldMountSidenav && <Sidenav animatedLogo={mounted} />}
        <main className={shouldMountSidenav ? 'with_sidenav' : ''}>{children}</main>
        <Loader componentDidMount={mounted} loaderShouldUnmount={loaderHidden} />
      </Providers>
    </body>
  )
}