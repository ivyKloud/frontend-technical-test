import { BASE_URL } from "../constants";
import { checkStatus } from "../helpers/checkStatus";

export type GetMemeCommentsResponse = {
    total: number;
    pageSize: number;
    results: {
      id: string;
      authorId: string;
      memeId: string;
      content: string;
      createdAt: string;
    }[]
  }
  
  /**
   * Get comments for a meme
   * @param token
   * @param memeId
   * @returns
   */
  export async function getMemeComments(token: string, memeId: string, page: number): Promise<GetMemeCommentsResponse> {
    return await fetch(`${BASE_URL}/memes/${memeId}/comments?page=${page}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then(res => checkStatus(res).json())
  }
  
  export type CreateCommentResponse = {
    id: string;
    content: string;
    createdAt: string;
    authorId: string;
    memeId: string;
  }