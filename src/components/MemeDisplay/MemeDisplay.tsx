import { Box, Flex, Icon, LinkBox, LinkOverlay, Text, VStack } from '@chakra-ui/react'

import { MemePicture } from '../MemePicture'
import { CaretDown, CaretUp, Chat } from '@phosphor-icons/react'
import { MemeComments } from '../MemeComments'
import { Meme, User } from '../../types'
import { Avatar, Username } from '../UserDisplay'
import { DateDisplay } from '../DateDisplay'

const MemeHeader = ({
  memeId,
  author,
  createdAt,
}: {
  memeId: string
  author: User
  createdAt: string
}) => (
  <Flex justifyContent="space-between" alignItems="center">
    <Flex>
      <Avatar username={author.username} pictureUrl={author.pictureUrl} />
      <Username username={author.username} dataTestId={`meme-author-${memeId}`} />
    </Flex>
    <DateDisplay date={createdAt} />
  </Flex>
)

const MemeDescription = ({ memeId, description }: { memeId: string; description: string }) => (
  <Box>
    <Text fontWeight="bold" fontSize="medium" mb={2}>
      Description:{' '}
    </Text>
    <Box p={2} borderRadius={8} border="1px solid" borderColor="gray.100">
      <Text color="gray.500" whiteSpace="pre-line" data-testid={`meme-description-${memeId}`}>
        {description}
      </Text>
    </Box>
  </Box>
)

export const MemeDisplay = ({
  meme,
  activeMeme,
  setActiveMeme,
}: {
  meme: Meme
  activeMeme: string
  setActiveMeme: (id: string) => void
}) => {
  const { id, pictureUrl, texts, description, createdAt, commentsCount, author } = meme

  return (
    <VStack key={id} p={4} width="full" align="stretch">
      <MemeHeader memeId={id} author={author} createdAt={createdAt} />
      <MemePicture pictureUrl={pictureUrl} texts={texts} dataTestId={`meme-picture-${id}`} />
      <MemeDescription memeId={id} description={description} />
      <LinkBox as={Box} py={2} borderBottom="1px solid black">
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <LinkOverlay
              data-testid={`meme-comments-section-${id}`}
              cursor="pointer"
              onClick={() => setActiveMeme(activeMeme === id ? '' : id)}
            >
              <Text data-testid={`meme-comments-count-${id}`}>{commentsCount} comments</Text>
            </LinkOverlay>
            <Icon as={activeMeme !== id ? CaretDown : CaretUp} ml={2} mt={1} />
          </Flex>
          <Icon as={Chat} />
        </Flex>
      </LinkBox>
      <MemeComments
        memeId={id}
        isOpen={activeMeme === id}
        commentsCount={parseInt(commentsCount)}
      />
    </VStack>
  )
}
