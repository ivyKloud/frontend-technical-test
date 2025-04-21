import { useInfiniteQuery } from '@tanstack/react-query'

import { getMemeComments, getUsers } from '../api'
import { useAuthToken } from '../contexts/AuthContext'

const fetchMemeComments = async (props: { pageParam: number; queryKey: string[] }) => {
  const { pageParam, queryKey } = props
  console.log('pageParam', pageParam)
  const token = queryKey?.[1] as string
  const memeId = queryKey?.[2] as string
  console.log('memeId', memeId)
  console.log('fetchMemeComments', memeId)

  if (!memeId || memeId === '') {
    return { memeComments: [], users: [], pageSize: 0, total: 0 }
  }

  const { results: memeComments, pageSize, total } = await getMemeComments(token, memeId, pageParam)

  // remove duplicates before fetching users
  const userIds = [...new Set(memeComments.map((memeComments) => memeComments.authorId))]
  const users = await getUsers(token, userIds)

  return { memeComments, users, pageSize, total }
}

export const useMemeComments = (memeId: string, enabled: boolean) => {
  console.log('useMemeComments', memeId)

  const token = useAuthToken()

  const { data, fetchNextPage, status, error, isLoading, hasNextPage } = useInfiniteQuery({
    queryKey: ['meme comments', token, memeId],
    queryFn: fetchMemeComments,
    initialPageParam: 1,
    getNextPageParam: ({ pageSize, total }, _, lasPageParam) => {
      if (pageSize * lasPageParam <= total) {
        return lasPageParam + 1
      } else {
        return undefined
      }
    },
    enabled,
  })

  console.log('useMemeComments > data', data)

  const { pages = [] } = data || {}
  const memeComments = pages.map((page) => page.memeComments).flat()
  const newUsers = [...new Set(pages.map((page) => page.users).flat())]
  const memeCommentsWithAuthor = memeComments.map((comment) => ({
    ...comment,
    author: newUsers.find((user) => user.id === comment.authorId) || {
      id: 'unknown',
      username: '[unknown user]',
      pictureUrl: '',
    },
  }))

  if (status === 'error') {
    console.log('error', error)
  }

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
  return {
    isLoading,
    fetchNextPage,
    hasNextPage,
    memeComments: memeCommentsWithAuthor,
  }
}
