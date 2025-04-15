import { Meme } from "../../types";
import { BASE_URL } from "../constants";
import { checkStatus } from "../helpers/checkStatus";

type GetMemesResponse = {
  total: number;
  pageSize: number;
  results: Meme[];
};

/**
 * Get the list of memes for a given page
 * @param token
 * @param page
 * @returns
 */
export async function getMemes(
  token: string,
  page: number
): Promise<GetMemesResponse> {
  return await fetch(`${BASE_URL}/memes?page=${page}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => checkStatus(res).json());
}
