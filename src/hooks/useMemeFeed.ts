import { useInfiniteQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

import { getMemes } from '../api'
import { useAuthToken } from '../contexts/AuthContext'
import { useMemes } from '../contexts/MemeContext'
import { getUsers } from '../api/services/getUsers'

export const useMemeFeed = () => {
  console.log('useMemeFeed')

  const token = useAuthToken()
  const { setMemes } = useMemes()

  const fetchMemes = async ({ pageParam }: { pageParam: number }) => {
    const { results: memes, pageSize, total } = await getMemes(token, pageParam)

    // remove duplicates before fetching users
    const userIds = [...new Set(memes.map((meme) => meme.authorId))]
    const users = await getUsers(token, userIds)

    return { memes, users, pageSize, total }
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

  useEffect(() => {
    console.log('data', data)
    const { pages = [] } = data || {}
    const newMemes = pages.map((page) => page.memes).flat()
    const newUsers = [...new Set(pages.map((page) => page.users).flat())]
    setMemes(
      newMemes.map((meme) => ({
        ...meme,
        author: newUsers.find((user) => user.id === meme.authorId) || {
          id: 'unknown',
          username: '[unknown user]',
          pictureUrl: '',
        },
      }))
    )
  }, [data?.pages?.length])

  if (status === 'error') {
    console.log('error', error)
  }

  // useEffect(() => {
  //   console.log('users', users)
  // }, [users])

  //   const { memes: newMemes = [] } = useGetMemes(token, currentPage, setIsLoading)

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
