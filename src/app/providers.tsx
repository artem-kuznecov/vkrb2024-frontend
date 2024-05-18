import { useState, createContext } from 'react'
import type { ContextInterface } from '@/data/types'

export const GlobalContext = createContext<ContextInterface>({})

export const Providers = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const [username, setUsername] = useState<string>('')

  const contextValue = {
    username,
    setUsername
  }

  return (
    <GlobalContext.Provider value={contextValue}>
      { children }
    </GlobalContext.Provider>
  )
}