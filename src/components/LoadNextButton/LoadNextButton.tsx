import { Box, Button } from '@chakra-ui/react'

export const LoadNextButton = ({ fetchNextPage }: { fetchNextPage: () => void }) => {
  return (
    <Box width="full" textAlign="center" p={4}>
      <Button colorScheme="cyan" size="sm" color="white" onClick={fetchNextPage}>
        Load Next
      </Button>
    </Box>
  )
}
