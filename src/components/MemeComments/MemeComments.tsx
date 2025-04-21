import { Box, Collapse, Flex, Text, VStack } from '@chakra-ui/react'
import { useMemeComments } from '../../hooks/useMemeComments'
import { LoadNextButton } from '../LoadNextButton'
import { Loader } from '../Loader'
import { DateDisplay } from '../DateDisplay'
import { Avatar, Username } from '../UserDisplay'
import { CreateComment } from '../CreateComment'

export const MemeComments = ({
  memeId,
  commentsCount,
  isOpen,
}: {
  memeId: string
  commentsCount: number
  isOpen: boolean
}) => {
  const {
    memeComments: comments,
    hasNextPage,
    fetchNextPage,
    isLoading,
  } = useMemeComments(memeId, isOpen && commentsCount > 0)

  return (
    <Collapse in={isOpen} animateOpacity>
      <CreateComment memeId={memeId} />
      {isLoading ? (
        <Loader data-testid="meme-feed-loader" />
      ) : (
        <VStack align="stretch" spacing={4}>
          {comments.map((comment) => (
            <Flex key={comment.id}>
              <Avatar username={comment.author.username} pictureUrl={comment.author.pictureUrl} />
              <Box p={2} borderRadius={8} bg="gray.50" flexGrow={1}>
                <Flex justifyContent="space-between" alignItems="center">
                  <Flex>
                    <Username
                      username={comment.author.username}
                      dataTestId={`meme-comment-author-${memeId}-${comment.id}`}
                    />
                  </Flex>
                  <DateDisplay date={comment.createdAt} />
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
          {hasNextPage && <LoadNextButton fetchNextPage={fetchNextPage} />}
        </VStack>
      )}
    </Collapse>
  )
}
