import { Avatar, Box, Flex, Icon, LinkBox, LinkOverlay, Text, VStack } from '@chakra-ui/react'
import { format } from 'timeago.js'

import { MemePicture } from '../MemePicture'
import { Meme } from '../../types'
import { CaretDown, CaretUp, Chat } from '@phosphor-icons/react'
import { useState } from 'react'
import { MemeComments } from '../MemeComments'

export const MemeDisplay = ({ meme }: { meme: Meme }) => {
  const { id, pictureUrl, texts, description, createdAt, commentsCount, author } = meme
  const [openedCommentSection, setOpenedCommentSection] = useState<string | null>(null)

  return (
    <VStack key={id} p={4} width="full" align="stretch">
      <Flex justifyContent="space-between" alignItems="center">
        <Flex>
          <Avatar
            borderWidth="1px"
            borderColor="gray.300"
            size="xs"
            name={author.username}
            src={author.pictureUrl}
          />
          <Text ml={2} data-testid={`meme-author-${id}`}>
            {author.username}
          </Text>
        </Flex>
        <Text fontStyle="italic" color="gray.500" fontSize="small">
          {format(createdAt)}
        </Text>
      </Flex>
      <MemePicture pictureUrl={pictureUrl} texts={texts} dataTestId={`meme-picture-${id}`} />
      <Box>
        <Text fontWeight="bold" fontSize="medium" mb={2}>
          Description:{' '}
        </Text>
        <Box p={2} borderRadius={8} border="1px solid" borderColor="gray.100">
          <Text color="gray.500" whiteSpace="pre-line" data-testid={`meme-description-${id}`}>
            {description}
          </Text>
        </Box>
      </Box>
      <LinkBox as={Box} py={2} borderBottom="1px solid black">
        <Flex justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <LinkOverlay
              data-testid={`meme-comments-section-${id}`}
              cursor="pointer"
              onClick={() => setOpenedCommentSection(openedCommentSection === id ? null : id)}
            >
              <Text data-testid={`meme-comments-count-${id}`}>{commentsCount} comments</Text>
            </LinkOverlay>
            <Icon as={openedCommentSection !== id ? CaretDown : CaretUp} ml={2} mt={1} />
          </Flex>
          <Icon as={Chat} />
        </Flex>
      </LinkBox>
      <MemeComments memeId={id} isOpen={openedCommentSection === id} />
    </VStack>
  )
}
