import styles from'./Sidenav.module.scss'

import Link from 'next/link'
import cn from 'classnames'
import { FoxIcon } from '@/ui/icons/FoxIcon'
import { routes } from '@/data/routes'

export const Sidenav = ({ animatedLogo }: { animatedLogo: boolean }) => {
  return (
    <aside className={cn(styles.sidenav, { [styles.animated]: animatedLogo })}>
      <FoxIcon />
      <ul>
        {routes.map(route => (
          <li key={'route_to_' + route.url}>
            <Link href={route.url} data-alias={route.alias_EN}>
              <route.icon />
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}