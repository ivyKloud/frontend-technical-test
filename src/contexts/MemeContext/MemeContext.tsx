import { createContext, ReactNode, useContext, useState } from 'react'
import { Meme, MemeComment, User } from '../../types'

export type MemeContextProps = {
  memes: Meme[]
  memesComments: Record<string, MemeComment[]>
  setMemes: (memes: Meme[]) => void
  setMemesComments: (memesComments: Record<string, MemeComment[]>) => void
}

export const MemeContext = createContext<MemeContextProps>({
  memes: [],
  memesComments: {},
  setMemes: () => {},
  setMemesComments: () => {},
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
export const useMemeComments = () => ({
  memesComments: useMemeContext().memesComments,
  setMemesComments: useMemeContext().setMemesComments,
})

export const MemeProvider = ({ children }: { children: ReactNode }) => {
  const [memes, setMemes] = useState<Meme[]>([])
  const [memesComments, setMemesComments] = useState<Record<string, MemeComment[]>>({})

  const updatedContext: MemeContextProps = {
    memes,
    memesComments,
    setMemes,
    setMemesComments,
  }

  return <MemeContext.Provider value={updatedContext}>{children}</MemeContext.Provider>
}
