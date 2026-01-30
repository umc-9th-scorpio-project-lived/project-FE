import type { CommunityCategory } from "@/constants/community";

export type Post = {
  postId: number;
  category: string;
  categoryLabel: CommunityCategory;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  thumbnailUrl: string | null;
  imageCount: number;
  isBlocked: boolean;
  createdAt: string;
};

export type PostListResult = {
  content: Post[];
  hasNext: boolean;
  nextCursor: number | null;
};
