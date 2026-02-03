import { authApi } from '@/api';
import type { PopularPost } from '@/types/communities/PopularPost.types';
import type {
  CreatePostRequest,
  CreatePostResponse,
  DeletePostResult,
  EditPostRequest,
  EditPostResponse,
  PostListResult,
} from '@/types/communities/Post.types';
import type { PostDetail } from '@/types/communities/PostDetail.types';
import type {
  PostLikeResponse,
  PostScrapResponse,
} from '@/types/communities/PostStatus.types';

type GetPostParams = {
  keyword?: string;
  category?: string;
  cursor?: number;
  size?: number;
};

type PopularPostListResult = {
  content: PopularPost[];
};

// 게시글 목록 조회
export const getPostList = ({
  keyword,
  category,
  cursor,
  size = 20,
}: GetPostParams = {}): Promise<PostListResult> => {
  return authApi.get('/posts', {
    params: {
      keyword,
      category,
      cursor,
      size,
    },
  });
};

//게시글 상세 조회
export const getPostDetail = async (postId: number): Promise<PostDetail> => {
  return authApi.get(`/posts/${postId}`);
};

// 게시글 작성
export const createPost = async (
  body: CreatePostRequest
): Promise<CreatePostResponse> => {
  const formdata = new FormData();

  formdata.append('category', body.category);
  formdata.append('title', body.title);
  formdata.append('content', body.content);

  body.images?.slice(0, 10).forEach((image) => {
    formdata.append('images', image);
  });

  return authApi.post(`/posts`, formdata, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

// 게시글 삭제
export const deletePost = async (postId: number): Promise<DeletePostResult> => {
  return authApi.delete(`/posts/${postId}`);
};

// 게시글 수정
export const EditPost = async (
  postId: number,
  body: EditPostRequest
): Promise<EditPostResponse> => {
  const formdata = new FormData();

  formdata.append('category', body.category);
  formdata.append('title', body.title);
  formdata.append('content', body.content);

  // ✅ deleteImageIds: array<Integer>
  if (body.deleteImageIds && body.deleteImageIds.length > 0) {
    formdata.append(
      'deleteImageIds',
      new Blob([JSON.stringify(body.deleteImageIds)], {
        type: 'application/json',
      })
    );
  }

  // ✅ imageOrders: array<{ imageId, orderIndex }>
  if (body.imageOrders && body.imageOrders.length > 0) {
    formdata.append(
      'imageOrders',
      new Blob([JSON.stringify(body.imageOrders)], {
        type: 'application/json',
      })
    );
  }

  body.images?.slice(0, 10).forEach((image) => {
    formdata.append('images', image);
  });

  // 🔍 확인용 (지금은 꼭 찍어봐)
  for (const [key, value] of formdata.entries()) {
    console.log('[FormData]', key, value);
  }

  return authApi.patch(`/posts/${postId}`, formdata, {
    headers: {
      'Content-Type': undefined,
    },
  });
};

// 인기글 조회
export const getPopularPostList = async (): Promise<PopularPostListResult> => {
  return authApi.get(`/posts/popular`);
};

// 게시글 좋아요
export const postLike = (postId: number): Promise<PostLikeResponse> => {
  return authApi.post(`/posts/${postId}/like`);
};

// 게시글 스크랩
export const postScrap = (postId: number): Promise<PostScrapResponse> => {
  return authApi.post(`/posts/${postId}/scrap`);
};
