const Inquiry = () => {
  return (
    <div className="w-full h-full flex flex-col gap-5.5 overflow-y-auto overflow-x-hidden">
      {/* 뒤로가기 버튼(<) */}
      <div className="flex justify-center typo-h2_reg20 text-gray-900 pt-13 px-4">문의하기</div>

      <div className="px-4 flex justify-center">
        <button
          onClick={() => {
            /* 문의하기 로직 */
          }}
          className="w-full py-3 bg-gray-200 rounded-lg"
        >
          <span className="typo-h2_reg20 text-gray-900">문의하기 (이메일 첨부 예정)</span>
        </button>
      </div>
    </div>
  );
};

export default Inquiry;
