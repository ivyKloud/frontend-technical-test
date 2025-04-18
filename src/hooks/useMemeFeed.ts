import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'

import { createMemeComment, getMemeComments, getMemes, getUserById } from '../api'
import { useAuthToken } from '../contexts/AuthContext'
import { Meme, MemeComment, User } from '../types'
import { useMemes } from '../contexts/MemeContext'
import { useGetMemes } from './useGetMemes'
import { a } from 'vitest/dist/chunks/suite.CcK46U-P.js'

export const useMemeFeed = () => {
  console.log('useMemeFeed')

  const token = useAuthToken()
  //   const [isLoading, setIsLoading] = useState(false)
  const { memes, setMemes } = useMemes()

  const fetchMemes = async ({ pageParam }: { pageParam: number }) => {
    const memes = await getMemes(token, pageParam)
    console.log('memes size', memes.results.length)

    return memes
  }

  const { data, fetchNextPage, status, error, isLoading, hasNextPage } = useInfiniteQuery({
    queryKey: ['memes'],
    queryFn: fetchMemes,
    initialPageParam: 1,
    getNextPageParam: ({ pageSize, total }, _, lasPageParam) => {
      if (pageSize * lasPageParam <= total) {
        return lasPageParam + 1
      } else {
        return undefined
      }
    },
  })

  //   if (status === 'success') {
  //     setIsLoading(false)
  //     console.log('success')

  //     // console.log('data on success', data)

  //     //   setMemes((prev) => [...prev, ...data.pages.flat()])
  //   }

  if (status === 'error') {
    // setIsLoading(false)
    console.log('error', error)
  }

  console.log('data', data)

  //   const { memes: newMemes = [] } = useGetMemes(token, currentPage, setIsLoading)

  //   useEffect(() => {
  //     console.log('coucou')
  //     console.log('memes', memes)
  //     console.log('newMemes', newMemes)
  //     if (newMemes.length === 0) return

  //     // const user = useGetUser(token, memes[0]?.authorId)
  //     setMemes([...memes, ...newMemes])

  //     // return { isLoading, memes }
  //   }, [newMemes])

  useEffect(() => {
    console.log('memes from context', memes)
  }, [memes.length])

  // const [openedCommentSection, setOpenedCommentSection] = useState<string | null>(null)
  // const [commentContent, setCommentContent] = useState<{
  //   [key: string]: string
  // }>({})
  // const { mutate } = useMutation({
  //   mutationFn: async (data: { memeId: string; content: string }) => {
  //     await createMemeComment(token, data.memeId, data.content)
  //   },
  // })
  return { isLoading, fetchNextPage, hasNextPage }
}
