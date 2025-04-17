import { useMutation, useQuery } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'

import { createMemeComment, getMemeComments, getMemes, getUserById } from '../api'
import { useAuthToken } from '../contexts/AuthContext'
import { Meme, MemeComment, User } from '../types'
import { useMemes } from '../contexts/MemeContext'
import { useGetMemes } from './useGetMemes'

// const useGetUser = (token: string, userId: string) => {
//   const { data: user } = useQuery({
//     queryKey: ['user'],
//     queryFn: async () => {
//       return await getUserById(token, jwtDecode<{ id: string }>(token).id)
//     },
//   })

//   return user
// }

export const useMemeFeed = () => {
  console.log('useMemeFeed')

  const token = useAuthToken()
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { memes, setMemes } = useMemes()

  const { memes: newMemes = [] } = useGetMemes(token, currentPage, setIsLoading)

  const loadNextPage = () => setCurrentPage((prev) => prev + 1)
  useEffect(() => {
    console.log('coucou')
    console.log('memes', memes)
    console.log('newMemes', newMemes)
    if (newMemes.length === 0) return

    // const user = useGetUser(token, memes[0]?.authorId)
    setMemes([...memes, ...newMemes])

    // return { isLoading, memes }
  }, [newMemes])

  // const [openedCommentSection, setOpenedCommentSection] = useState<string | null>(null)
  // const [commentContent, setCommentContent] = useState<{
  //   [key: string]: string
  // }>({})
  // const { mutate } = useMutation({
  //   mutationFn: async (data: { memeId: string; content: string }) => {
  //     await createMemeComment(token, data.memeId, data.content)
  //   },
  // })
  return { isLoading, loadNextPage }
}
