import { useQuery } from '@tanstack/react-query'
import { QueryKeys } from './queryKeys'
import { AuthenticationState } from '../contexts/AuthContext'
import { getUserById } from '../api'

export const useUserData = (state: AuthenticationState) => {
  const { data: user, isLoading } = useQuery({
    queryKey: [QueryKeys.USER, state.isAuthenticated ? state.userId : 'anon'],
    queryFn: () => {
      if (state.isAuthenticated) {
        return getUserById(state.token, state.userId)
      }
      return undefined
    },
    enabled: state.isAuthenticated,
  })

  return { user, isLoading }
}
