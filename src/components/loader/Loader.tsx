import styles from'./Loader.module.scss'

import cn from 'classnames'
import { FoxIcon } from '@/ui/icons/FoxIcon'
import { Audiowide } from 'next/font/google'

const audiowide = Audiowide({ subsets: ['latin-ext'], weight: '400' })

export const Loader = ({ componentDidMount, loaderShouldUnmount }: { componentDidMount: boolean, loaderShouldUnmount: boolean }) => (
  <div className={cn(styles.loader, { [styles.hidden]: componentDidMount }, { [styles.unmounted]: loaderShouldUnmount })}>
    <FoxIcon />
    <span>
      <h1 className={audiowide.className}>LISA MLV</h1>
    </span>
  </div>
)