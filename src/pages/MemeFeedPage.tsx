import { Flex, StackDivider, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { Loader } from '../components/Loader'
import { LoadNextButton } from '../components/LoadNextButton'
import { MemeDisplay } from '../components/MemeDisplay'
import { useMemeFeed } from '../hooks/useMemeFeed'

export const MemeFeedPage = () => {
  const [activeMeme, setActiveMeme] = useState('')
  const { memes, isLoading, fetchNextPage, hasNextPage } = useMemeFeed()

  useEffect(() => {
    console.log('isLoading', isLoading)
  }, [isLoading])

  useEffect(() => {
    console.log('memes', memes.length)
  }, [memes])

  if (isLoading) {
    return <Loader data-testid="meme-feed-loader" />
  }
  return (
    <Flex width="full" height="full" justifyContent="center" overflowY="auto">
      <VStack p={4} width="full" maxWidth={800} divider={<StackDivider border="gray.200" />}>
        {memes?.map((meme) => {
          return (
            <MemeDisplay
              meme={meme}
              key={meme.id}
              activeMeme={activeMeme}
              setActiveMeme={setActiveMeme}
            />
          )
        })}
        {hasNextPage && <LoadNextButton fetchNextPage={fetchNextPage} />}
      </VStack>
    </Flex>
  )
}
