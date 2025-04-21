import { Text } from '@chakra-ui/react'

export const Username = ({
  username,
  dataTestId = '',
}: {
  username: string
  dataTestId?: string
}) => (
  <>
    <Text ml={2} data-testid={dataTestId}>
      {username}
    </Text>
  </>
)
