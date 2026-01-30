import type { CommunityCategory, CommunityCategoryLabel } from "@/constants/community";

export type Post = {
  postId: number;
  category: CommunityCategory;
  categoryLabel: CommunityCategoryLabel;
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
