import Divider from "@/components/users/Divider";
import MenuRow from "@/components/users/MenuRow";

const UserPage = () => {
  return (
    <div className="w-full h-full flex flex-col pt-12">
      <span className="typo-h2_bold20 text-gray-900 pl-4">마이페이지</span>

      <div className="flex flex-col items-center pt-4">
        <div className="text-gray-800">
          <span className="typo-body_bold16">홍길동</span>
          <span className="typo-body_reg16">의 루틴나무</span>
        </div>

        <div className="pt-3">
          <div className="w-23 h-26 bg-gray-400"></div>
        </div>

        <div className="py-3">
          <button className="px-8 py-3 bg-gray-100 text-gray-800 rounded-3xl">
            <span className="typo-body_bold14">루틴나무 변경하기</span>
          </button>
        </div>
      </div>

      <Divider />

      <div className="w-full px-4 py-4 space-y-4">
        <MenuRow title="공지사항" />
        <MenuRow title="문의하기" />
        <MenuRow title="정보" />
      </div>

      <Divider />

      <div className="w-full px-4 py-4 space-y-4">
        <MenuRow title="계정 관리" />
        <MenuRow title="알림 설정" />
        <MenuRow title="개인정보보호" />
        <MenuRow title="버전" value="1.0.0" />
        <MenuRow title="로그아웃" />
      </div>
    </div>
  );
};

export default UserPage;
