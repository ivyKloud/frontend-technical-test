import { User } from '../../types'
import { BASE_URL } from '../constants'
import { checkStatus } from '../helpers/checkStatus'

/**
 * Get a user by their id
 * @param token
 * @param id
 * @returns
 */
export async function getUserById(token: string, id: string): Promise<User> {
  return await fetch(`${BASE_URL}/users/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkStatus(res).json())
}
