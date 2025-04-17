import { useQuery } from '@tanstack/react-query'
import { getMemes, getUserById } from '../api'
import { Meme, MemeComment, User } from '../types'
import { useEffect } from 'react'

export const useGetMemes = (
  token: string,
  page: number,
  setIsLoading?: (isLoading: boolean) => void
) => {
  console.log('useGetMemes', page)

  const { isLoading, data: memes } = useQuery({
    queryKey: ['memes'],
    queryFn: async () => {
      const memes: Meme[] = []
      const pageMemes = await getMemes(token, page)
      memes.push(...pageMemes.results)

      console.log('memes size', memes.length)
      return memes
      //   const memesWithAuthorAndComments = []
      //   for (const meme of memes) {
      //     const author = await getUserById(token, meme.authorId)
      //     // const comments: GetMemeCommentsResponse["results"] = [];
      //     // const firstPage = await getMemeComments(token, meme.id, 1);
      //     // comments.push(...firstPage.results);
      //     // const remainingCommentPages =
      //     //   Math.ceil(firstPage.total / firstPage.pageSize) - 1;
      //     // for (let i = 0; i < remainingCommentPages; i++) {
      //     //   const page = await getMemeComments(token, meme.id, i + 2);
      //     //   comments.push(...page.results);
      //     // }
      //     const commentsWithAuthor: (MemeComment & {
      //       author: User
      //     })[] = []
      //     // for (let comment of comments) {
      //     //   const author = await getUserById(token, comment.authorId);
      //     //   commentsWithAuthor.push({ ...comment, author });
      //     // }
      //     memesWithAuthorAndComments.push({
      //       ...meme,
      //       author,
      //       comments: commentsWithAuthor,
      //     })
      //   }
      //   return memesWithAuthorAndComments
    },
  })

  useEffect(() => {
    setIsLoading?.(isLoading)
  }, [isLoading])

  return { memes }
}
