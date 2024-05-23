'use client'

import { useEffect, useState } from 'react'
import { redirect, usePathname } from 'next/navigation'
import { deleteCookie, getCookie } from 'cookies-next'
import { Sidenav } from '../sidenav/Sidenav'
import { Loader } from '../loader/Loader'
import { Providers } from '@/app/providers'
import { routes } from '@/data/routes'
import { logout } from '@/utils/api/auth.api'

export const UserLayout = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const pathname = usePathname()
  const [mounted, setMounted] = useState<boolean>(false)
  const [loaderHidden, setLoaderHidden] = useState<boolean>(false)

  function rememberUser () {
    const isRemembered = getCookie('remember_user')
    if (isRemembered !== 'true') {
      deleteCookie('remember_user')
      deleteCookie('username')
      logout(getCookie('username') as string)
    }
  }

  useEffect(() => {
    const cookie_username = getCookie('username')
    if (!cookie_username && !pathname.includes('authentication') && !pathname.includes('test')) return redirect('/authentication/login')

    setMounted(true)
    setTimeout(() => {
      setLoaderHidden(true)
    }, 2000)
    window.addEventListener('beforeunload', rememberUser)
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