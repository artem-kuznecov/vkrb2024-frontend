import styles from'./Header.module.scss'

export const Header = ({ text }: { text: string }) => (
  <div className={styles.header}>
    <h1>{text}</h1>
    <div data-border-bottom></div>
  </div>
)