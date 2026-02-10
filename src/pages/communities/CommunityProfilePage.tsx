import ProfilePostList from '@/components/communities/ProfilePostList';
import CameraIcon from '@/icons/CameraIcon';
import LeftChevronIcon from '@/icons/LeftChevronIcon';
import WriteIcon from '@/icons/WriteIcon';
import {
  EditCommunityProfile,
  getCommunityProfile,
} from '@/services/posts/profile';
import type { ProfileFruites } from '@/types/communities/Profile.types';
import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

const CommunityProfilePage = () => {
  const [editMode, setEditMode] = useState(false);
  const [nickname, setNickname] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  const [livingPeriod, setLivingPeriod] = useState('');
  const [fruits, setFruits] = useState<ProfileFruites[]>([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await getCommunityProfile();
      setNickname(res.nickname);
      setLivingPeriod(res.livingPeriod);
      setFruits(res.fruits);

      const imageUrl =
        res.profileImageUrl && res.profileImageUrl.trim() !== ''
          ? res.profileImageUrl
          : null;

      setProfileImageUrl(imageUrl);
      setImagePreview(imageUrl);
    };

    fetchProfile();
  }, []);

  // 이미지
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);
  const ImageInputRef = useRef<HTMLInputElement>(null);

  const handleSvgClick = () => {
    ImageInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return null;

    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  // 수정 완료 버튼
  const handleSubmitProfile = async () => {
    if (!nickname.trim()) {
      console.warn('닉네임이 비어 있습니다.');
      return;
    }

    try {
      const body = {
        request: {
          nickname: nickname.trim(),
        },
        image: imageFile ?? undefined,
      };

      const res = await EditCommunityProfile(body);
      setNickname(res.nickname);
      setProfileImageUrl(res.profileImageUrl ?? null);
      setImagePreview(res.profileImageUrl ?? null);
      setImageFile(null);
      setEditMode(false);
    } catch (e) {
      console.error(e);
    }
  };

  // 닉네임
  const [isNicknameLong, setIsNicknameLong] = useState(false);

  const resizeWidth = () => {
    if (!inputRef.current || !spanRef.current) return;

    spanRef.current.textContent = nickname || inputRef.current.value;
    inputRef.current.style.width = `${spanRef.current.offsetWidth}px`;
  };

  useEffect(() => {
    resizeWidth();
  }, [nickname, editMode]);

  // 자취년차
  const changeLivingPriod: Record<string, string> = {
    PRE: '예비 자취인',
    YEAR_1_3: '자취 1~3년차',
    YEAR_3_5: '자취 3~5년차',
    OVER_5Y: '자취 5년 이상',
  };

  return (
    <div className="flex flex-col min-h-dvh pt-10">
      <div className="flex flex-col gap-5.5">
        {/*네브바*/}
        <div className="flex justify-between items-center text-gray-900 px-4">
          <div className="flex gap-3">
            <NavLink
              to="/lived/community"
              className="flex items-center justify-center"
            >
              <LeftChevronIcon className="w-7 h-7 text-gray-900 pt-0.5" />
            </NavLink>
            <span className="typo-h2_bold20">커뮤니티 프로필</span>
          </div>
        </div>

        {/*프로필창*/}
        <div className="flex flex-col border-b border-gray-100 px-4 pt-2.5 pb-5 gap-3.75">
          <div className="flex gap-2.5">
            {/* 이미지 */}
            <div className="relative w-20 h-20 rounded-full bg-gray-50">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt={profileImageUrl || 'profile'}
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-user bg-top bg-size-[95px]" />
              )}
              {editMode && (
                <button
                  className="flex absolute items-center justify-center w-5 h-5 rounded-full bg-gray-200 top-0 right-0"
                  onClick={handleSvgClick}
                >
                  <CameraIcon className="w-3.5 h-3.5 text-gray-600" />
                  <input
                    type="file"
                    accept="image/*"
                    ref={ImageInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </button>
              )}
            </div>

            {/* 자취 정보 & 대형 열매 */}
            <div className="flex flex-col gap-2 justify-center">
              <div className="flex flex-col gap-2">
                <div className="text-[12px] text-gray-600">
                  {changeLivingPriod[livingPeriod]}
                </div>
                <div className="h-6 flex gap-1 items-center">
                  {editMode ? (
                    <div className="flex relative flex-col gap-1">
                      {isNicknameLong && (
                        <div
                          className={`absolute -top-5 left-5 typo-body_bold12 text-alert-50 bg-gray-100`}
                        >
                          12글자까지 입력 가능합니다.
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <WriteIcon className="w-4 h-4 text-gray-700" />
                        <div className="relative inline-block">
                          <input
                            ref={inputRef}
                            className="font-bold"
                            maxLength={12}
                            value={nickname}
                            onChange={(e) => {
                              setNickname(e.target.value);
                              setIsNicknameLong(e.target.value.length > 12);
                            }}
                            style={{
                              minWidth: '40px',
                              boxSizing: 'content-box',
                            }}
                          />
                          <span
                            ref={spanRef}
                            className="typo-body_bold16"
                            style={{
                              position: 'absolute',
                              visibility: 'hidden',
                              whiteSpace: 'pre',
                            }}
                          ></span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="typo-body_bold16">{nickname}</div>
                  )}
                </div>
              </div>
              {/*대형열매 5개*/}
              <div className="flex gap-2">
                {fruits.slice(0, 5).map((fruit) => (
                  <div
                    key={fruit.fruitId}
                    className="w-8 h-8 rounded-full bg-[#2E2E2E]"
                  />
                ))}
                {Array.from({ length: 5 - fruits.length }).map((_, index) => (
                  <div
                    key={`empty-${index}`}
                    className="w-8 h-8 rounded-full bg-gray-300/40"
                  />
                ))}
              </div>
            </div>
          </div>

          <button
            className={`p-2.5 rounded-lg text-center text-body_12 text-gray-900 ${editMode ? 'bg-primary-30' : 'bg-gray-100 '}`}
            onClick={() => {
              if (editMode) {
                handleSubmitProfile();
              } else {
                setEditMode(true);
              }
            }}
          >
            {editMode ? '프로필 수정 완료' : '프로필 수정'}
          </button>
        </div>
      </div>
      <ProfilePostList />
    </div>
  );
};

export default CommunityProfilePage;
