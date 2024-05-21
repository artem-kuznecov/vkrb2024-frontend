import styles from'./Sidenav.module.scss'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import cn from 'classnames'
import { getCookie, deleteCookie } from 'cookies-next'
import { LogOut } from 'lucide-react'
import { FoxIcon } from '@/ui/icons/FoxIcon'
import { routes } from '@/data/routes'
import { logout } from '@/utils/api/auth.api'

export const Sidenav = ({ animatedLogo }: { animatedLogo: boolean }) => {
  const username_cookie = getCookie('username')
  const pathname = usePathname()

  const handleLogout = async () => {
    const logoutResponse = await logout(username_cookie as string)
    if (logoutResponse.success) {
      deleteCookie('username')
      window.location.reload()
    }
    return
  }

  return (
    <aside className={cn(styles.sidenav, { [styles.animated]: animatedLogo })}>
      <FoxIcon />
      <ul>
        {routes.map(route => (
          <li key={'route_to_' + route.url}>
            <Link href={route.url} data-alias={route.alias_EN} data-active={pathname === route.url}>
              <route.icon />
            </Link>
          </li>
        ))}
      </ul>
      <footer onClick={handleLogout}>
        <LogOut />
      </footer>
    </aside>
  )
}