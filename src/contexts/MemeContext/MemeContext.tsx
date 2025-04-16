import { createContext, ReactNode, useContext, useState } from 'react'
import { Meme, MemeComment, User } from '../../types'

export type MemeContextProps = {
  memes: Meme[]
  memesComments: Record<string, MemeComment[]>
  users: Record<string, User>
  setMemes: (memes: Meme[]) => void
  setMemeComments: (memeId: string, memeComments: MemeComment[]) => void
  setUser: (userId: string, userData: User) => void
}

export const MemeContext = createContext<MemeContextProps>({
  memes: [],
  memesComments: {},
  users: {},
  setMemes: () => {},
  setMemeComments: () => {},
  setUser: () => {},
})

export const useMemeContext = () => {
  const context = useContext(MemeContext)
  if (!context) {
    throw new Error('useMemeContext must be used within a MemeProvider')
  }

  return context
}

export const useMemes = () => useMemeContext().memes
export const useMemeComments = (id: string) => useMemeContext().memesComments[id]
export const useUser = (id: string) => useMemeContext().users[id]

export const MemeProvider = ({ children }: { children: ReactNode }) => {
  const [memes, setMemes] = useState<Meme[]>([])
  const [memesComments, setMemesComments] = useState<Record<string, MemeComment[]>>({})
  const [users, setUsers] = useState<Record<string, User>>({})

  const setMemeComments = (memeId: string, memeComments: MemeComment[]) => {
    setMemesComments((prev) => ({
      ...prev,
      [memeId]: memeComments,
    }))
  }

  const setUser = (userId: string, userData: User) => {
    setUsers((prev) => ({
      ...prev,
      [userId]: userData,
    }))
  }

  const updatedContext: MemeContextProps = {
    memes,
    memesComments,
    users,
    setMemes,
    setMemeComments,
    setUser,
  }

  return <MemeContext.Provider value={updatedContext}>{children}</MemeContext.Provider>
}
