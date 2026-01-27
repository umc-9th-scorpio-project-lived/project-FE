import CommentIcon from "@/icons/CommentIcon";
import KebabIcon from "@/icons/KebabIcon";
import LikeIcon from "@/icons/LikeIcon";
import { useEffect, useState } from "react";
import CommunityHamburger from "./CommunityHamburger";
import useBaseModal from "@/stores/modals/baseModal";

const CommunityCommentList = () => {
  const [open, setOpen] = useState<string | null>(null);
  const { isModalOpen } = useBaseModal();

  useEffect(() => {
    if (isModalOpen) {
      setOpen(null);
    }
  }, [isModalOpen]);

  return (
    <div>
      <div className="flex flex-col py-4 px-4 gap-8">
        {/*댓 1 전체*/}
        <div className="flex flex-col gap-4">
          {/*댓 1*/}
          <div className="flex flex-col gap-2.5">
            <div className="gap-1">
              <div className="relative flex w-full justify-between">
                <div className="flex gap-1.5">
                  <div className="w-10 h-10 bg-gray-500 rounded-full" />
                  <div className="flex flex-col gap-1">
                    <span className="typo-body_bold16 text-gray-900">비비</span>
                    <span className="text-[11px] text-[#9C9C9C]">10분 전</span>
                  </div>
                </div>
                <KebabIcon
                  className="w-6 h-6 text-gray-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(open === "1" ? null : "1");
                  }}
                />
                {open === "1" && !isModalOpen && (
                  <div className="absolute right-0 top-8 z-50">
                    <CommunityHamburger type="comment" />
                  </div>
                )}
              </div>
              <span className="typo-body_reg14 text-gray-900">
                난 어제 배째고 그냥 누워있었더니 엄마한테 등짝 맞음 ㅋㅋ
              </span>
            </div>
            <div className="flex gap-2.5">
              <div className="flex gap-1">
                <LikeIcon className="w-4 h-4 text-gray-200" />
                <span className="h-4 text-[11px] text-gray-900">1</span>
              </div>
              <div className="flex gap-1">
                <CommentIcon className="w-4 h-4 text-gray-200" />
                <span className="h-4 text-[11px] text-gray-900">댓글달기</span>
              </div>
            </div>
          </div>
          {/*댓 1에 대한 대댓글*/}
          <div className="flex flex-col pl-5 gap-2.5">
            <div className="gap-1">
              <div className="flex relative w-full justify-between">
                <div className="flex gap-1.5">
                  <div className="w-10 h-10 bg-gray-500 rounded-full" />
                  <div className="flex flex-col gap-1">
                    <span className="typo-body_bold16 text-gray-900">민</span>
                    <span className="text-[11px] text-[#9C9C9C]">14분 전</span>
                  </div>
                </div>
                <KebabIcon
                  className="w-6 h-6 text-gray-400"
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(open === "1-1" ? null : "1-1");
                  }}
                />
                {open === "1-1" && !isModalOpen && (
                  <div className="absolute right-0 top-8 z-50">
                    <CommunityHamburger type="myComment" />
                  </div>
                )}
              </div>
              <span className="typo-body_reg14 text-gray-900">아 제발...</span>
            </div>
            <div className="flex gap-2.5">
              <div className="flex gap-1">
                <LikeIcon className="w-4 h-4 text-gray-200" />
                <span className="h-4 text-[11px] text-gray-900">0</span>
              </div>
            </div>
          </div>
        </div>
        {/*댓 2 전체*/}
        <div className="flex flex-col gap-4">
          {/*댓 2*/}
          <div className="flex flex-col gap-2.5">
            <div className="gap-1">
              <div className="flex w-full justify-between">
                <div className="flex gap-1.5">
                  <div className="w-10 h-10 bg-gray-500 rounded-full" />
                  <div className="flex flex-col gap-1">
                    <span className="typo-body_bold16 text-gray-900">제이</span>
                    <span className="text-[11px] text-[#9C9C9C]">13분 전</span>
                  </div>
                </div>
                <KebabIcon className="w-6 h-6 text-gray-400" />
              </div>
              <span className="typo-body_reg14 text-gray-900">
                와중에 어머니 반찬 부럽다... 나였음 진짜 빡빡 청소함
              </span>
            </div>
            <div className="flex gap-2.5">
              <div className="flex gap-1">
                <LikeIcon className="w-4 h-4 text-gray-200" />
                <span className="h-4 text-[11px] text-gray-900">3</span>
              </div>
              <div className="flex gap-1">
                <CommentIcon className="w-4 h-4 text-gray-200" />
                <span className="h-4 text-[11px] text-gray-900">댓글달기</span>
              </div>
            </div>
          </div>
          {/*댓 2에 대한 대댓글*/}
          <div className="flex flex-col pl-5 gap-2.5">
            <div className="gap-1">
              <div className="flex w-full justify-between">
                <div className="flex gap-1.5">
                  <div className="w-10 h-10 bg-gray-500 rounded-full" />
                  <div className="flex flex-col gap-1">
                    <span className="typo-body_bold16 text-gray-900">민</span>
                    <span className="text-[11px] text-[#9C9C9C]">14분 전</span>
                  </div>
                </div>
                <KebabIcon className="w-6 h-6 text-gray-400" />
              </div>
              <span className="typo-body_reg14 text-gray-900">진짜 왕대박 맛있긴 함 ㅎㅅㅎ</span>
            </div>
            <div className="flex gap-2.5">
              <div className="flex gap-1">
                <LikeIcon className="w-4 h-4 text-gray-200" />
                <span className="h-4 text-[11px] text-gray-900">0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCommentList;
