import LeftChevronIcon from "@/icons/LeftChevronIcon";
import { useNavigate } from "react-router-dom";

const Inquiry = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col gap-5.5 overflow-y-auto overflow-x-hidden">
      <div className="flex justify-center items-center pt-13 px-4 relative">
        <button
          onClick={() => navigate("/lived/my")}
          className="flex justify-center items-center absolute left-4 cursor-pointer"
        >
          <LeftChevronIcon className="w-7 h-7 text-gray-900" />
        </button>
        <span className="typo-h2_reg20 text-gray-900">문의하기</span>
      </div>

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
