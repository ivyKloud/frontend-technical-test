import { MemeComment } from "../../types";
import { BASE_URL } from "../constants";
import { checkStatus } from "../helpers/checkStatus";

type GetMemeCommentsResponse = {
  total: number;
  pageSize: number;
  results: MemeComment[];
};

/**
 * Get comments for a meme
 * @param token
 * @param memeId
 * @returns
 */
export async function getMemeComments(
  token: string,
  memeId: string,
  page: number
): Promise<GetMemeCommentsResponse> {
  return await fetch(`${BASE_URL}/memes/${memeId}/comments?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkStatus(res).json());
}
