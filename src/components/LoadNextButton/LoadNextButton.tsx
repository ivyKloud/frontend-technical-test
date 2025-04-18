import { Box, Button } from '@chakra-ui/react'

export const LoadNextButton = ({ loadNextPage }: { loadNextPage: () => void }) => {
  return (
    <Box width="full" textAlign="center" p={4}>
      <Button colorScheme="cyan" size="sm" color="white" onClick={loadNextPage}>
        Load Next
      </Button>
    </Box>
  )
}
