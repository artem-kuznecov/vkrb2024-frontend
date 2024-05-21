import styles from'./Spinner.module.scss'

export const LoadSpinner = () => (
  <div className={styles.spinner}>
    <div data-inner-circle></div>
  </div>
)