import type { CommunityCategory } from "@/constants/community";

export type Post = {
  id: number;
  category: CommunityCategory;
  title: string;
  content: string;
  imageCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  isSaved?: boolean;
  isCommented?: boolean;
};
