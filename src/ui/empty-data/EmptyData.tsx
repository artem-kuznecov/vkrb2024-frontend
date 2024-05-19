import styles from'./EmptyData.module.scss'

import { PackageOpen } from 'lucide-react'

export const EmptyData = ({ text }: { text: string }) => (
  <div className={styles.empty_data}>
    <PackageOpen />
    <p>{text}</p>
  </div>
)