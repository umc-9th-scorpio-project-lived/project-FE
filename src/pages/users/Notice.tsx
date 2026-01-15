const Notice = () => {
  return (
    <div className="w-full h-full flex flex-col gap-5.5 overflow-y-auto overflow-x-hidden">
      {/* 뒤로가기 버튼(<) */}
      <div className="flex justify-center typo-h2_reg20 text-gray-900 pt-13 px-4">공지사항</div>

      {/* 첫 번째 공지사항에만 border-t border-b를, 나머지는 border-b만 적용 */}
      <div className="w-full border-t border-b border-gray-200 px-5 py-2.5 flex flex-col gap-1">
        <span className="typo-body_bold14 text-gray-900">
          공지사항 메뉴입니다. 이곳에서 알려드려야 할 사항을 전달드릴 예정입니다. 앞으로 잘
          부탁드립니다. :)
        </span>
        <span className="typo-body_bold14 text-gray-400">2025.12.26</span>
      </div>
    </div>
  );
};

export default Notice;
