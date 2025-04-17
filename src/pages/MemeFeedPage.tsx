import { Flex, StackDivider, VStack } from '@chakra-ui/react'

import { Loader } from '../components/Loader'
import { useMemeFeed } from '../hooks/useMemeFeed'
import { MemeDisplay } from '../components/MemeDisplay'
import { useMemeContext } from '../contexts/MemeContext'
import { useEffect } from 'react'

export const MemeFeedPage = () => {
  const { isLoading } = useMemeFeed()
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
          return <MemeDisplay meme={meme} />
        })}
      </VStack>
    </Flex>
  )
}
