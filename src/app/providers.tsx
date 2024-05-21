import { createContext, useState } from 'react'
// import type { ContextInterface } from '@/data/types'

export const GlobalContext = createContext<any>({})

export const Providers = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  // const [username, setUsername] = useState<string>('')
  // const [snackData, setSnackData] = useState({
  //   openState: false,
  //   text: 'default snack text'
  // })
  // const [snackOpen, setSnackOpen] = useState<boolean>(true)
  // const [snackText, setSnackText] = useState<string>('some default text')
  const [kbValue, setKbValue] = useState<any[]>([])

  const contextValue = {
    // open: snackOpen,
    // text: snackText,
    // setSnackOpen: setSnackOpen,
    // setSnackText: setSnackText,
    kbValue,
    setKbValue
  }

  return (
    <GlobalContext.Provider value={contextValue}>
      { children }
    </GlobalContext.Provider>
  )
}