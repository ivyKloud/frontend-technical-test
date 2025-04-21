import { Box, Flex, Input } from '@chakra-ui/react'
import { Avatar } from '../UserDisplay'
import { useState } from 'react'

export const CreateComment = ({ memeId }: { memeId: string }) => {
  const [commentContent, setCommentContent] = useState<{ [key: string]: string }>({})

  const user = undefined // Replace with actual user fetching logic
  return (
    <Box mb={6}>
      <form
        onSubmit={(event) => {
          event.preventDefault()
          console.log('commentContent submit', commentContent)

          // if (commentContent[memeId]) {
          //   mutate({
          //     memeId,
          //     content: commentContent[memeId],
          //   })
          // }
        }}
      >
        <Flex alignItems="center">
          <Avatar username={user?.username} pictureUrl={user?.pictureUrl} />
          <Input
            placeholder="Type your comment here..."
            onChange={(event) => {
              setCommentContent({
                ...commentContent,
                [memeId]: event.target.value,
              })
            }}
            value={commentContent[memeId]}
          />
        </Flex>
      </form>
    </Box>
  )
}
