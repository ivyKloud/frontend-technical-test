import { useMutation } from '@tanstack/react-query'
import { useAuthToken } from '../contexts/AuthContext'
import { createMemeComment } from '../api'
import { useQueryClient } from '@tanstack/react-query'
import { QueryKeys } from './queryKeys'

export const useCreateComment = (memeId: string) => {
  const token = useAuthToken()
  const client = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: async ({ content }: { content: string }) => {
      await createMemeComment(token, memeId, content)
    },
    onSuccess: () => {
      // Invalidate the query to refetch the comments
      client.invalidateQueries({ queryKey: [QueryKeys.MEME_COMMENTS, token, memeId] })
    },
  })
  return {
    createComment: mutate,
  }
}
