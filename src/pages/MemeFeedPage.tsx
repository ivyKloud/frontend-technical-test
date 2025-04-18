import { Flex, StackDivider, VStack } from '@chakra-ui/react'
import { useEffect } from 'react'

import { Loader } from '../components/Loader'
import { LoadNextButton } from '../components/LoadNextButton'
import { MemeDisplay } from '../components/MemeDisplay'
import { useMemeContext } from '../contexts/MemeContext'
import { useMemeFeed } from '../hooks/useMemeFeed'

export const MemeFeedPage = () => {
  const { isLoading, fetchNextPage, hasNextPage } = useMemeFeed()
  const { memes } = useMemeContext()
  //   const isLoading = false
  useEffect(() => {
    console.log('isLoading', isLoading)
  }, [isLoading])

  if (isLoading) {
    return <Loader data-testid="meme-feed-loader" />
  }
  return (
    <Flex width="full" height="full" justifyContent="center" overflowY="auto">
      hello
      <VStack p={4} width="full" maxWidth={800} divider={<StackDivider border="gray.200" />}>
        {memes?.map((meme) => {
          return <MemeDisplay meme={meme} key={meme.id} />
        })}
        {hasNextPage && <LoadNextButton loadNextPage={fetchNextPage} />}
      </VStack>
    </Flex>
  )
}
