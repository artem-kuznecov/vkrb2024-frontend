'use client'

import styles from'./Calculator.module.scss'

// import { useContext } from 'react'
// import { GlobalContext } from '@/app/providers'
import { Header } from '@/ui/header/Header'

const Calculator = () => {
  // const { username, setUsername } = useContext(GlobalContext)

  return (
    <div className={styles.calculator}>
      {/* calculator page
      <p>name: {username}</p>
      <button onClick={() => setUsername('new name from calculator')}>change name</button> */}
      <Header text='Калькулятор' />
    </div>
  )
}

export default Calculator