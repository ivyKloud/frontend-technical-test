import { useInfiniteQuery } from '@tanstack/react-query'

import { getMemes, getUsers } from '../api'
import { useAuthToken } from '../contexts/AuthContext'

const fetchMemes = async ({ pageParam, queryKey }: { pageParam: number; queryKey: string[] }) => {
  const token = queryKey[1] as string
  const { results: memes, pageSize, total } = await getMemes(token, pageParam)

  // remove duplicates before fetching users
  const userIds = [...new Set(memes.map((meme) => meme.authorId))]
  const users = await getUsers(token, userIds)

  return { memes, users, pageSize, total }
}

export const useMemeFeed = () => {
  const token = useAuthToken()

  const { data, fetchNextPage, status, error, isLoading, hasNextPage } = useInfiniteQuery({
    queryKey: ['memes', token],
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

  const { pages = [] } = data || {}
  const memes = pages.map((page) => page.memes).flat()
  const newUsers = [...new Set(pages.map((page) => page.users).flat())]
  const memesWithAuthor = memes.map((meme) => ({
    ...meme,
    author: newUsers.find((user) => user.id === meme.authorId) || {
      id: 'unknown',
      username: '[unknown user]',
      pictureUrl: '',
    },
  }))

  if (status === 'error') {
    console.log('error', error)
  }

  // const [openedCommentSection, setOpenedCommentSection] = useState<string | null>(null)
  // const [commentContent, setCommentContent] = useState<{
  //   [key: string]: string
  // }>({})
  // const { mutate } = useMutation({
  //   mutationFn: async (data: { memeId: string; content: string }) => {
  //     await createMemeComment(token, data.memeId, data.content)
  //   },
  // })
  return { memes: memesWithAuthor, isLoading, fetchNextPage, hasNextPage }
}
