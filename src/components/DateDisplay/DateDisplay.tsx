import { format } from 'timeago.js'
import { Text } from '@chakra-ui/react'

export const DateDisplay = ({ date }: { date: string }) => (
  <Text fontStyle="italic" color="gray.500" fontSize="small">
    {format(date)}
  </Text>
)
