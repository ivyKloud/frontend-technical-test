import { NotFoundError, UnauthorizedError } from "../errors";

export const checkStatus = (response: Response) => {
  if (response.status === 401) {
    throw new UnauthorizedError();
  }
  if (response.status === 404) {
    throw new NotFoundError();
  }
  return response;
};
