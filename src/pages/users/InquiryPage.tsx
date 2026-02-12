import LeftChevronIcon from '@/icons/LeftChevronIcon';
import { useNavigate } from 'react-router-dom';

const InquiryPage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col gap-5.5 overflow-y-auto overflow-x-hidden">
      <div className="flex justify-center items-center pt-10 px-4 relative">
        <button
          onClick={() => navigate('/lived/my')}
          className="flex justify-center items-center absolute left-4 cursor-pointer"
        >
          <LeftChevronIcon className="w-7 h-7 text-gray-900" />
        </button>
        <span className="typo-h2_reg20 text-gray-900">문의하기</span>
      </div>

      <div className="px-4 flex justify-center">
        <div className="w-full p-2.5 bg-[#D6D6D6] rounded-lg text-center">
          <span className="typo-body_reg16 text-gray-900">
            문의하기 (saraboni0212@gmail.com)
          </span>
        </div>
      </div>
    </div>
  );
};

export default InquiryPage;
