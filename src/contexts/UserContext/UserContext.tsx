import { createContext, ReactNode, useContext, useState } from 'react'
import { User } from '../../types'

export type UserContextProps = {
  user: User | undefined
  setUser: (user: User) => void
}

export const UserContext = createContext<UserContextProps>({
  user: undefined,
  setUser: () => {},
})

export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider')
  }

  return context
}

export const useUser = () => ({
  user: useUserContext().user,
  setUser: useUserContext().setUser,
})

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | undefined>(undefined)

  const updatedContext: UserContextProps = {
    user,
    setUser,
  }

  return <UserContext.Provider value={updatedContext}>{children}</UserContext.Provider>
}
