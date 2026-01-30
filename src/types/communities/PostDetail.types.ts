import type { CommunityCategory, CommunityCategoryLabel } from "@/constants/community";

export type PostAuthor = {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
};

export type PostImages = {
  imageId: number;
  imageUrl: string;
  orderIndex: number;
};

export type PostDetail = {
  postId: number;
  category: CommunityCategory;
  categoryLabel: CommunityCategoryLabel;
  title: string;
  content: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  isScrapped: boolean;
  createdAt: string;
  author: PostAuthor;
  images: PostImages[];
};
