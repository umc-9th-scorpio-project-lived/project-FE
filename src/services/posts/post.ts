import { authApi } from "@/api";
import type { PostListResult } from "@/types/communities/Post.types";
import type { PostDetail } from "@/types/communities/PostDetail.types";

type GetPostParams = {
  memberId: number;
  keyword?: string;
  category?: string;
  cursor?: number;
  size?: number;
};

export const getPostList = ({
  memberId,
  keyword,
  category,
  cursor,
  size = 20,
}: GetPostParams): Promise<PostListResult> => {
  return authApi.get("/posts", {
    params: {
      memberId,
      keyword,
      category,
      cursor,
      size,
    },
  });
};

export const getPostDetail = async (postId: number): Promise<PostDetail> => {
  return authApi.get(`/posts/${postId}`);
};
