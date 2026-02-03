import { authApi } from '@/api';
import type {
  CommentLikeResponse,
  CommentResult,
  CreateCommentRequest,
  CreateCommentResponse,
  DeleteCommentResult,
  EditCommentRequest,
  EditCommentResponse,
} from '@/types/communities/Comment.types';

type GetCommentParams = {
  postId: number;
  cursor?: number;
  size?: number;
};

// 댓글 목록 조회
export const getCommentList = ({
  postId,
  cursor,
  size = 20,
}: GetCommentParams): Promise<CommentResult> => {
  return authApi.get(`/posts/${postId}/comments`, {
    params: {
      postId,
      cursor,
      size,
    },
  });
};

// 댓글 작성
export const createComment = async (
  postId: number,
  body: CreateCommentRequest
): Promise<CreateCommentResponse> => {
  return authApi.post(`/posts/${postId}/comments`, body);
};

// 댓글 삭제
export const deleteComment = async (
  postId: number,
  commentId: number
): Promise<DeleteCommentResult> => {
  return authApi.delete(`/posts/${postId}/comments/${commentId}`);
};

// 댓글 수정
export const editComment = async (
  postId: number,
  commentId: number,
  body: EditCommentRequest
): Promise<EditCommentResponse> => {
  return authApi.patch(`/posts/${postId}/comments/${commentId}`, body);
};

// 댓글 좋아요
export const commentLike = (
  postId: number,
  commentId: number
): Promise<CommentLikeResponse> => {
  return authApi.post(`/posts/${postId}/comments/${commentId}/like`);
};
