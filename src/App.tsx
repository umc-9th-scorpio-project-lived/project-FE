import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/homes/HomePage";
import TreePage from "./pages/trees/TreePage";
import CommunityPage from "./pages/communities/CommunityPage";
import UserPage from "./pages/users/UserPage";
import ModalPage from "./pages/commons/ModalPage";
import SubLayout from "./layouts/SubLayout";
import LoginPage from "./pages/onboardings/LoginPage";
import Notice from "./pages/users/Notice";
import Inquiry from "./pages/users/Inquiry";
import Info from "./pages/users/Info";
import Account from "./pages/users/Account";
import Notifications from "./pages/users/Notifications";
import Privacy from "./pages/users/Privacy";
import Blocked from "./pages/users/Blocked";

function App() {
  return (
    <BrowserRouter>
      <ModalPage />
      <Routes>
        <Route element={<SubLayout />}>
          <Route path="/" element={<LoginPage />} />
        </Route>

        <Route path="/lived" element={<MainLayout />}>
          {/* 홈 */}
          <Route index element={<HomePage />} />

          {/* 루틴 나무 */}
          <Route path="tree" element={<TreePage />} />

          {/* 커뮤니티 */}
          <Route path="community" element={<CommunityPage />} />

          {/* 마이 */}
          <Route path="my" element={<UserPage />} />
        </Route>

        {/* 마이페이지의 상세페이지 */}
        <Route path="/lived/my" element={<SubLayout />}>
          {/* 공지사항 */}
          <Route path="notice" element={<Notice />} />

          {/* 문의하기 */}
          <Route path="inquiry" element={<Inquiry />} />

          {/* 정보 */}
          <Route path="info" element={<Info />} />

          {/* 계정관리 */}
          <Route path="account" element={<Account />} />

          {/* 알림 설정 */}
          <Route path="notifications" element={<Notifications />} />

          {/* 개인정보보호 */}
          <Route path="privacy" element={<Privacy />} />

          {/* 차단 목록 */}
          <Route path="privacy/blocked" element={<Blocked />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
