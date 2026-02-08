import type {
  CommunityCategory,
  CommunityCategoryLabel,
} from '@/constants/community';

export type Post = {
  postId: number;
  category: CommunityCategory;
  categoryLabel: CommunityCategoryLabel;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  thumbnailUrl?: string;
  imageCount: number;
  isBlocked: boolean;
  createdAt: string;
};

export type PostListResult = {
  content: Post[];
  hasNext: boolean;
  nextCursor: number | null;
};

export type CreatePostRequest = {
  category: CommunityCategory;
  title: string;
  content: string;
  images?: File[];
};

export type CreatePostResponse = {
  postId: number;
};

export type DeletePostResult = {
  postId: number;
};

export type EditPostRequest = {
  category: CommunityCategory;
  title: string;
  content: string;
  deleteImageIds?: number[];
  imageOrders?: {
    imageId: number;
    orderIndex: number;
  }[];
  images?: File[];
};

export type EditPostResponse = {
  postId: number;
};
