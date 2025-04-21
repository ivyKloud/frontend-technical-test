import { useInfiniteQuery } from '@tanstack/react-query'

import { getMemeComments, getUsers } from '../api'
import { useAuthToken } from '../contexts/AuthContext'
import { QueryKeys } from './queryKeys'

const fetchMemeComments = async ({
  pageParam,
  queryKey,
}: {
  pageParam: number
  queryKey: string[]
}) => {
  const token = queryKey?.[1] as string
  const memeId = queryKey?.[2] as string

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
  const token = useAuthToken()

  const { data, fetchNextPage, status, error, isLoading, hasNextPage } = useInfiniteQuery({
    queryKey: [QueryKeys.MEME_COMMENTS, token, memeId],
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

  return {
    isLoading,
    fetchNextPage,
    hasNextPage,
    memeComments: memeCommentsWithAuthor,
  }
}
