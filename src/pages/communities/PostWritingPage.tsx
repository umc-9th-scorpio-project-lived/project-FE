import Category from '@/components/communities/Category';
import ImageError from '@/components/communities/ImageError';
import PostWriteFooter from '@/components/communities/PostWriteFooter';
import {
  COMMUNITY_CATEGORIES,
  type CommunityCategoryLabel,
  type CommunityCategory,
} from '@/constants/community';
import LeftChevronIcon from '@/icons/LeftChevronIcon';
import MiniCloseIcon from '@/icons/MiniCloseIcon';
import { createPost, EditPost, getPostDetail } from '@/services/posts/post';
import { useEffect, useState } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

const CATEGORY_LABEL_TO_CODE = Object.values(COMMUNITY_CATEGORIES).reduce(
  (acc, cur) => {
    if (cur.code) acc[cur.label] = cur.code;
    return acc;
  },
  {} as Record<CommunityCategoryLabel, CommunityCategory>
);

type ExistingImage = {
  imageId: number;
  imageUrl: string;
};

const PostWritingPage = () => {
  const { postId } = useParams<{ postId?: string }>();
  const navigate = useNavigate();

  // 카테고리 선택
  const writeCategories: CommunityCategoryLabel[] = Object.values(
    COMMUNITY_CATEGORIES
  )
    .filter((c) => c.code !== null)
    .map((c) => c.label);
  const [selectedCategory, setSelectedCategory] =
    useState<CommunityCategoryLabel>('자취 일상');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<ExistingImage[]>([]);
  const [deleteImageIds, setDeleteImageIds] = useState<number[]>([]);
  const [imageLimitError, setImageLimitError] = useState(false);

  const isFormValid = title.trim().length > 0 && content.trim().length > 0;

  // 이미지 관련 함수
  useEffect(() => {
    if (!imageLimitError) return;

    const timer = setTimeout(() => {
      setImageLimitError(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [imageLimitError]);

  const handleAddImages = (files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);

    if (imagePreviews.length + newFiles.length > 10) {
      setImageLimitError(true);
      return;
    }

    setImages((prev) => [...prev, ...newFiles]);
    setImagePreviews((prev) => [
      ...prev,
      ...newFiles.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleRemoveImage = (index: number) => {
    if (index < existingImages.length) {
      const target = existingImages[index];
      setDeleteImageIds((prev) =>
        prev.includes(target.imageId) ? prev : [...prev, target.imageId]
      );

      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newIndex = index - existingImages.length;
      setImages((prev) => prev.filter((_, i) => i !== newIndex));
    }

    setImagePreviews((prev) => prev.filter((_, i) => i !== index));
    console.groupEnd();
  };

  const buildImageOrders = () => {
    return existingImages.map((img, index) => ({
      imageId: img.imageId,
      orderIndex: index + 1,
    }));
  };

  // 완료 버튼 누르면 해당 게시글로
  const handleSubmit = async () => {
    if (!isFormValid) return;

    try {
      if (isEdit && postId) {
        await EditPost(Number(postId), {
          category: CATEGORY_LABEL_TO_CODE[selectedCategory],
          title,
          content,
          images,
          deleteImageIds,
          imageOrders: buildImageOrders(),
        });
        navigate(`/lived/community/${postId}`);
      } else {
        const res = await createPost({
          category: CATEGORY_LABEL_TO_CODE[selectedCategory],
          title,
          content,
          images,
        });
        navigate(`/lived/community/${res.postId}`);
      }
    } catch (error) {
      console.error('게시글 작성 실패:', error);
    }
  };

  // 게시글수정 함수
  const isEdit = Boolean(postId);
  useEffect(() => {
    if (!isEdit || !postId) return;

    const fetchPost = async () => {
      const post = await getPostDetail(Number(postId));
      const imgs = post.images.map((img) => ({
        imageId: img.imageId,
        imageUrl: img.imageUrl,
      }));

      setSelectedCategory(post.categoryLabel);
      setTitle(post.title);
      setContent(post.content);
      setExistingImages(imgs);
      setImagePreviews(imgs.map((i) => i.imageUrl));
      setImages([]);
      setDeleteImageIds([]);
    };

    fetchPost();
  }, [isEdit, postId]);

  return (
    <div className="flex flex-col h-dvh pb-25 pt-10">
      {/* 네브바 */}
      <div className="flex justify-between items-center text-gray-900 my-2 mx-4">
        <div className="flex gap-3">
          <NavLink
            to="/lived/community"
            className="flex items-center justify-center"
          >
            <LeftChevronIcon className="w-6 h-6 text-gray-900 pt-0.5" />
          </NavLink>
          <span className="typo-h2_bold20 text-gray-900">글쓰기</span>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`typo-body_bold14 ${isFormValid ? 'text-gray-900' : 'text-gray-500'}`}
        >
          완료
        </button>
      </div>

      {/* 본문 */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex flex-col flex-1 py-5 gap-5.5 overflow-hidden border-b border-gray-100">
          <Category
            categories={writeCategories}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          <div className="flex flex-col flex-1 w-full gap-2.5 px-4">
            <textarea
              rows={1}
              className="resize-none overflow-hidden text-[16px] font-bold text-gray-900 outline-none"
              placeholder="제목을 입력하세요."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onInput={(e) => {
                const target = e.currentTarget;
                target.style.height = 'auto';
                target.style.height = `${target.scrollHeight}px`;
              }}
            />

            <textarea
              className="flex-1 resize-none overflow-y-auto text-[14px] text-gray-900 outline-none"
              placeholder={`자취하며 겪은 이야기, 무엇이든 괜찮아요.
후기, 팁, 고민까지 자유롭게 남겨주세요.`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onInput={(e) => {
                const target = e.currentTarget;
                target.style.height = 'auto';
                target.style.height = `${target.scrollHeight}px`;
              }}
            />

            {imagePreviews.length > 0 && (
              <div className="flex pt-4 -mr-4 gap-2.5 overflow-x-auto flex-nowrap">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="relative shrink-0">
                    <img
                      src={src}
                      alt={`preview-${index}`}
                      className="w-32 h-32 object-cover rounded-lg"
                    />
                    <button
                      className="absolute -top-2 -right-2 bg-gray-200 w-5 h-5 rounded-full flex items-center justify-center"
                      onClick={() => handleRemoveImage(index)}
                    >
                      <MiniCloseIcon className="w-1/2 h-1/2" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 안내 */}
      <div className="flex flex-col typo-body_reg12 text-gray-200 px-4 py-2.5">
        <span>
          *주제에 맞지 않는 글이나 커뮤니티 이용정책에 위배되는 글은 <br />
          신고의 대상이 됩니다.
        </span>
        <span>
          *일정 수 이상의 신고를 받으면 작성한 글이 숨김 및 삭제될 수 있습니다.
        </span>
      </div>

      <PostWriteFooter AddImage={handleAddImages} />
      {imageLimitError && <ImageError />}
    </div>
  );
};

export default PostWritingPage;
