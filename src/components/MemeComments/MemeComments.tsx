import { Avatar, Box, Collapse, Flex, Input, Text, VStack } from '@chakra-ui/react'
import { MemeComment } from '../../types'
import { format } from 'timeago.js'
import { useState } from 'react'

export const MemeComments = ({ memeId, isOpen }: { memeId: string; isOpen: boolean }) => {
  //   const [commentContent, setCommentContent] = useState<{ [key: string]: string }>({})

  const comments: MemeComment[] = []

  return (
    <Collapse in={isOpen} animateOpacity>
      hhhh
      {/* <Box mb={6}>
        <form
          onSubmit={(event) => {
            event.preventDefault()
            if (commentContent[id]) {
              mutate({
                memeId: id,
                content: commentContent[id],
              })
            }
          }}
        >
          <Flex alignItems="center">
            <Avatar
              borderWidth="1px"
              borderColor="gray.300"
              name={user?.username}
              src={user?.pictureUrl}
              size="sm"
              mr={2}
            />
            <Input
              placeholder="Type your comment here..."
              onChange={(event) => {
                setCommentContent({
                  ...commentContent,
                  [id]: event.target.value,
                })
              }}
              value={commentContent[id]}
            />
          </Flex>
        </form>
      </Box> */}
      <VStack align="stretch" spacing={4}>
        {comments.map((comment) => (
          <Flex key={comment.id}>
            <Avatar
              borderWidth="1px"
              borderColor="gray.300"
              size="sm"
              name={comment.author.username}
              src={comment.author.pictureUrl}
              mr={2}
            />
            <Box p={2} borderRadius={8} bg="gray.50" flexGrow={1}>
              <Flex justifyContent="space-between" alignItems="center">
                <Flex>
                  <Text data-testid={`meme-comment-author-${memeId}-${comment.id}`}>
                    {comment.author.username}
                  </Text>
                </Flex>
                <Text fontStyle="italic" color="gray.500" fontSize="small">
                  {format(comment.createdAt)}
                </Text>
              </Flex>
              <Text
                color="gray.500"
                whiteSpace="pre-line"
                data-testid={`meme-comment-content-${memeId}-${comment.id}`}
              >
                {comment.content}
              </Text>
            </Box>
          </Flex>
        ))}
      </VStack>
    </Collapse>
  )
}
