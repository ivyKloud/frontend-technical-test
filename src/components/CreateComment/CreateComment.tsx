import { Box, Flex, Input } from '@chakra-ui/react'
import { Avatar } from '../UserDisplay'
import { useState } from 'react'
import { useCreateComment } from '../../hooks/useCreateComment'
import { useUser } from '../../contexts/UserContext'

export const CreateComment = ({ memeId }: { memeId: string }) => {
  const [commentContent, setCommentContent] = useState<string>('')
  const { user } = useUser()
  const { createComment } = useCreateComment(memeId)

  return (
    <Box mb={6}>
      <form
        onSubmit={(event) => {
          event.preventDefault()

          if (commentContent) {
            createComment({
              content: commentContent,
            })
            setCommentContent('')
          }
        }}
      >
        <Flex alignItems="center">
          {user && <Avatar username={user.username} pictureUrl={user.pictureUrl} />}
          <Input
            placeholder="Type your comment here..."
            onChange={(event) => {
              setCommentContent(event.target.value)
            }}
            value={commentContent}
          />
        </Flex>
      </form>
    </Box>
  )
}
