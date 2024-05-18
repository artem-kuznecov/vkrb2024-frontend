'use client'

import { useContext } from 'react'
import { GlobalContext } from '@/app/providers'

const Calculator = () => {
  const { username, setUsername } = useContext(GlobalContext)

  return (
    <div>
      calculator page
      <p>name: {username}</p>
      <button onClick={() => setUsername('new name from calculator')}>change name</button>
    </div>
  )
}

export default Calculator