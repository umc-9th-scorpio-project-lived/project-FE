import PostList from '@/components/communities/PostList';
import SearchList from '@/components/communities/SearchList';
import CloseIcon from '@/icons/CloseIcon';
import LeftChevronIcon from '@/icons/LeftChevronIcon';
import { getPostList } from '@/services/posts/post';
import type { Post } from '@/types/communities/Post.types';
import { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

type UIState = 'default' | 'pressed' | 'activate';

const PostSearchPage = () => {
  const navigate = useNavigate();
  const [searchWord, setSearchWord] = useState('');
  const [state, setState] = useState<UIState>('default');
  const [posts, setPosts] = useState<Post[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (state === 'pressed') {
      inputRef?.current?.focus();
    }
  }, [state]);

  const search = async (keyword: string) => {
    setSearchWord(keyword);
    setState('activate');

    try {
      const res = await getPostList({
        keyword,
        size: 20,
      });
      setPosts(res.content);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="border-b-[0.5px] border-gray-400 pt-10">
        {/*네브바*/}
        <div className="flex items-center mx-4 my-3.5 gap-5">
          <div className="flex w-8/9 gap-1.5">
            <NavLink
              to="/lived/community"
              className="flex items-center justify-center"
            >
              <LeftChevronIcon className="w-6 h-6 text-gray-900 pt-0.5" />
            </NavLink>
            {state !== 'activate' && (
              <input
                className="w-full h-8 bg-gray-100 py-2.5 px-4 rounded-full text-[14px] text-gray-900 outline-none"
                placeholder="생활 팁이나 고민을 검색해보세요."
                ref={inputRef}
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                onClick={() => setState('pressed')}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && searchWord.trim()) {
                    search(searchWord.trim());
                  }
                }}
              />
            )}
            {state === 'activate' && (
              <div
                className="flex items-center w-full h-8 py-2.5 px-4 typo-body_bold16 text-gray-900"
                onClick={() => setState('pressed')}
              >
                {searchWord}
              </div>
            )}
          </div>
          <CloseIcon
            className="w-5 h-5 text-gray-900"
            onClick={() => {
              setSearchWord('');
              setState('default');
            }}
          />
        </div>
      </div>
      {state !== 'activate' && (
        <SearchList
          onSelectedKeyword={(keyword) => {
            search(keyword);
          }}
        />
      )}
      {state === 'activate' && (
        <>
          {posts.length === 0 && (
            <div className="flex typo-body_reg12 px-4 pt-4">
              <span className="flex text-gray-900">{searchWord}</span>
              <span className="flex text-gray-600">
                에 대한 검색 결과가 존재하지 않습니다.
              </span>
            </div>
          )}
          {posts.length > 0 && (
            <>
              <div className="flex typo-body_reg12 px-4 pt-4">
                <span className="flex text-gray-900">{searchWord}</span>
                <span className="flex text-gray-600">
                  에 대한 검색 결과입니다.
                </span>
              </div>
              <PostList
                posts={posts}
                onPostClick={(post) => {
                  navigate(`/lived/community/${post.postId}`, {
                    state: { from: 'search' },
                  });
                }}
              />
            </>
          )}
        </>
      )}
    </>
  );
};

export default PostSearchPage;
