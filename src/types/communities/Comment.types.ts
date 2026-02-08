export type CommentAuthor = {
  userId: number;
  nickname: string;
  profileImageUrl: string | null;
};

export type Comment = {
  commentId: number;
  parentCommentId: number | null;
  content: string;
  likeCount: number;
  isLiked: boolean;
  createdAt: string;
  author: CommentAuthor;
  replies?: Comment[];
};

export type CommentResult = {
  comments: Comment[];
  hasNext: boolean;
  nextCursor: number | null;
};

export type CreateCommentRequest = {
  content: string;
  parentCommentId?: number | null;
};

export type CreateCommentResponse = {
  commentId: number;
  createdAt: string;
};

export type DeleteCommentResult = {
  commentId: number;
};

export type EditCommentRequest = {
  content: string;
};

export type EditCommentResponse = {
  commentId: number;
};

export type CommentLikeResponse = {
  isLiked: boolean;
  likeCount: number;
};
