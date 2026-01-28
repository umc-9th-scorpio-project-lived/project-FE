import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/homes/HomePage";
import TreePage from "./pages/trees/TreePage";
import CommunityPage from "./pages/communities/CommunityPage";
import UserPage from "./pages/users/UserPage";
import ModalPage from "./pages/commons/ModalPage";
import SubLayout from "./layouts/SubLayout";
import LoginPage from "./pages/onboardings/LoginPage";
import RoutineTrackerPage from "./pages/trees/RoutineTrackerPage";
import FriendTreePage from "./pages/trees/FriendTreePage";
import StatisticsPage from "./pages/trees/StatisticsPage";
import TreeArchivePage from "./pages/trees/TreeArchivePage";
import PostWritingPage from "./pages/communities/PostWritingPage";
import CommunityProfilePage from "./pages/communities/CommunityProfilePage";
import PostSearchPage from "./pages/communities/PostSearchPage";
import PostDetailPage from "./pages/communities/PostDetailPage";
import PrivacyPage from "./pages/users/PrivacyPage";
import NoticePage from "./pages/users/NoticePage";
import InquiryPage from "./pages/users/InquiryPage";
import InfoPage from "./pages/users/InfoPage";
import AccountPage from "./pages/users/AccountPage";
import NotificationsPage from "./pages/users/NotificationsPage";
import BlockedPage from "./pages/users/BlockedPage";

function App() {
  return (
    <BrowserRouter>
      <ModalPage />
      <Routes>
        <Route element={<SubLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/lived/community/:postId" element={<PostDetailPage />} />
          <Route path="/lived/community/write" element={<PostWritingPage />} />
          <Route path="/lived/community/profile/:userid" element={<CommunityProfilePage />} />
          <Route path="/lived/community/search" element={<PostSearchPage />} />
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

        {/* 루틴나무 페이지의 상세페이지 */}
        <Route path="/lived/tree" element={<SubLayout />}>
          <Route path="tracker" element={<RoutineTrackerPage />} />
          <Route path="friend" element={<FriendTreePage />} />
          <Route path="statistics" element={<StatisticsPage />} />
          <Route path="archive" element={<TreeArchivePage />} />
        {/* 마이페이지의 상세페이지 */}
        <Route path="/lived/my" element={<SubLayout />}>
          {/* 공지사항 */}
          <Route path="notice" element={<NoticePage />} />

          {/* 문의하기 */}
          <Route path="inquiry" element={<InquiryPage />} />

          {/* 정보 */}
          <Route path="info" element={<InfoPage />} />

          {/* 계정관리 */}
          <Route path="account" element={<AccountPage />} />

          {/* 알림 설정 */}
          <Route path="notifications" element={<NotificationsPage />} />

          {/* 개인정보보호 */}
          <Route path="privacy" element={<PrivacyPage />} />

          {/* 차단 목록 */}
          <Route path="privacy/blocked" element={<BlockedPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
