import { createContext, ReactNode, useContext, useState } from 'react'
import { Meme, MemeComment, User } from '../../types'

export type MemeContextProps = {
  memes: Meme[]
  memesComments: Record<string, MemeComment[]>
  users: Record<string, User>
  setMemes: (memes: Meme[]) => void
  setMemesComments: (memesComments: Record<string, MemeComment[]>) => void
  setUsers: (users: Record<string, User>) => void
}

export const MemeContext = createContext<MemeContextProps>({
  memes: [],
  memesComments: {},
  users: {},
  setMemes: () => {},
  setMemesComments: () => {},
  setUsers: () => {},
})

export const useMemeContext = () => {
  const context = useContext(MemeContext)
  if (!context) {
    throw new Error('useMemeContext must be used within a MemeProvider')
  }

  return context
}

export const useMemes = () => ({
  memes: useMemeContext().memes,
  setMemes: useMemeContext().setMemes,
})
export const useUsers = () => ({
  users: useMemeContext().users,
  setUsers: useMemeContext().setUsers,
})
export const useMemeComments = () => ({
  memesComments: useMemeContext().memesComments,
  setMemesComments: useMemeContext().setMemesComments,
})

export const useUser = (id: string) => useMemeContext().users[id]

export const MemeProvider = ({ children }: { children: ReactNode }) => {
  const [memes, setMemes] = useState<Meme[]>([])
  const [memesComments, setMemesComments] = useState<Record<string, MemeComment[]>>({})
  const [users, setUsers] = useState<Record<string, User>>({})

  const updatedContext: MemeContextProps = {
    memes,
    memesComments,
    users,
    setMemes,
    setMemesComments,
    setUsers,
  }

  return <MemeContext.Provider value={updatedContext}>{children}</MemeContext.Provider>
}
