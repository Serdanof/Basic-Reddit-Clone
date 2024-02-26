export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  userId: string;
  parentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Vote {
  id: number;
  postId: number;
  userId: string;
  score: string;
}