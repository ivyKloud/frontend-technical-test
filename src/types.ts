export type User = {
  id: string
  username: string
  pictureUrl: string
}

export type Meme = {
  id: string
  authorId: string
  pictureUrl: string
  description: string
  commentsCount: string
  texts: {
    content: string
    x: number
    y: number
  }[]
  createdAt: string
  author: User
}

export type MemeComment = {
  id: string
  authorId: string
  memeId: string
  content: string
  createdAt: string
}
