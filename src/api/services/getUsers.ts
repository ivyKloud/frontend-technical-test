import { User } from '../../types'
import { BASE_URL } from '../constants'
import { checkStatus } from '../helpers/checkStatus'

/**
 * Get users by their ids
 * @param token
 * @param ids
 * @returns
 */
export async function getUsers(token: string, ids: string[]): Promise<User[]> {
  return await fetch(`${BASE_URL}/users?${ids.map((id) => `ids=${id}`).join('&')}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkStatus(res).json())
}
