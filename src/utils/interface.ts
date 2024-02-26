import type React from "react";

export interface User {
  id: string;
  email: string;
  name: string;
  imageUrl: string;
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

export interface IconProps {
  color?: string;
}

export interface SidebarItem {
  id: number;
  name: string;
  href: string;
  icon: (props: IconProps) => React.JSX.Element
}