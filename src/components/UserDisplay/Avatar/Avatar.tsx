import { Avatar as AvatarUI } from '@chakra-ui/react'

export const Avatar = ({ username, pictureUrl }: { username: string; pictureUrl: string }) => (
  <AvatarUI
    borderWidth="1px"
    borderColor="gray.300"
    size="sm"
    name={username}
    src={pictureUrl}
    mr={2}
  />
)
