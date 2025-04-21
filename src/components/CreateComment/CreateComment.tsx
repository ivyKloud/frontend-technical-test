import { Box, Flex, Input } from '@chakra-ui/react'
// import { Avatar } from '../UserDisplay'
import { useState } from 'react'
import { useCreateComment } from '../../hooks/useCreateComment'

export const CreateComment = ({ memeId }: { memeId: string }) => {
  const [commentContent, setCommentContent] = useState<string>('')
  const { createComment } = useCreateComment(memeId)
  const user = undefined // Replace with actual user fetching logic
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
          {/* <Avatar username={user?.username} pictureUrl={user?.pictureUrl} /> */}
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
