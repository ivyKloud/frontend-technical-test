import { BASE_URL } from "../constants";
import { checkStatus } from "../helpers/checkStatus";

export type CreateCommentResponse = {
    id: string;
    content: string;
    createdAt: string;
    authorId: string;
    memeId: string;
  }
  
  /**
   * Create a comment for a meme
   * @param token
   * @param memeId
   * @param content
   */
  export async function createMemeComment(token: string, memeId: string, content: string): Promise<CreateCommentResponse> {
    return await fetch(`${BASE_URL}/memes/${memeId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ content }),
    }).then(res => checkStatus(res).json());
  }