import { Prisma } from "@prisma/client";

interface Social {
  twitter?: string;
  facebook?: string;
  instagram?: string;
  linkedin?: string;
}

export type User = {
  id: string;
  clerkId: string;
  name: string;
  username: string;
  email: string;
  bio: string | null;
  avatar: string | null;
  cover: string | null;
  website: string | null;
  location: string | null;
  social: Social | null | Prisma.JsonValue;
  createdAt: Date;
  updatedAt: Date;
  isfollowed?: boolean;
  _count: {
    followers: number;
    following: number;
    posts: number;
    likes: number;
  };
};

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category: string;
  authorId: string;
  createdAt: Date;
  readTime: string;
  image?: string;
  isFeatured: boolean;
  isPinned: boolean;
  published: boolean;
  tags: string[];
  views: number;
  isLiked: boolean;
  _count: {
    likes: number;
    comments: number;
  };
  comments: string[];
}
