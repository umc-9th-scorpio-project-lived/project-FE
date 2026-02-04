import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/homes/HomePage';
import TreePage from './pages/trees/TreePage';
import CommunityPage from './pages/communities/CommunityPage';
import UserPage from './pages/users/UserPage';
import ModalPage from './pages/commons/ModalPage';
import SubLayout from './layouts/SubLayout';
import LoginPage from './pages/onboardings/LoginPage';
import AlarmPage from './pages/alarms/AlarmPage';
import RecommendPage from './pages/homes/RecommendPage';
import BasicInfoPage from './pages/onboardings/BasicInfoPage';
import ConcernPage from './pages/onboardings/ConcernPage';
import PushGuidePage from './pages/onboardings/PushGuidePage';
import RoutineTrackerPage from './pages/trees/RoutineTrackerPage';
import FriendTreePage from './pages/trees/FriendTreePage';
import StatisticsPage from './pages/trees/StatisticsPage';
import TreeArchivePage from './pages/trees/TreeArchivePage';
import PostWritingPage from './pages/communities/PostWritingPage';
import CommunityProfilePage from './pages/communities/CommunityProfilePage';
import PostSearchPage from './pages/communities/PostSearchPage';
import PostDetailPage from './pages/communities/PostDetailPage';
import PrivacyPage from './pages/users/PrivacyPage';
import NoticePage from './pages/users/NoticePage';
import InquiryPage from './pages/users/InquiryPage';
import InfoPage from './pages/users/InfoPage';
import AccountPage from './pages/users/AccountPage';
import NotificationsPage from './pages/users/NotificationsPage';
import BlockedPage from './pages/users/BlockedPage';
import CallbackPage from './pages/commons/CallbackPage';
import HomeRoutinePage from './pages/homes/HomeRoutinePage';
import RoutinePage from './pages/onboardings/RoutinePage';

function App() {
  return (
    <BrowserRouter>
      <ModalPage />
      <Routes>
        <Route path="/login/callback" element={<CallbackPage />} />
        <Route path="/signup/callback" element={<CallbackPage />} />

        <Route element={<SubLayout />}>
          {/* 로그인 */}
          <Route path="/" element={<LoginPage />} />

          {/* 루틴 생성/수정 페이지 */}
          <Route
            path="/lived/create"
            element={<HomeRoutinePage mode="create" />}
          />
          {/* 추후 루틴 아이디 별로 관리 */}
          <Route path="/lived/edit" element={<HomeRoutinePage mode="edit" />} />
          {/* 알림 페이지 */}
          <Route path="/lived/alarm" element={<AlarmPage />} />
          {/* 루틴 추천 페이지 */}
          <Route path="/lived/recommend" element={<RecommendPage />} />
          {/* 온보딩 기본 정보 */}
          <Route path="/onboardings/basic-info" element={<BasicInfoPage />} />

          {/* 온보딩 자취 고민 */}
          <Route path="/onboardings/concern" element={<ConcernPage />} />

          {/* 온보딩 맞춤 루틴 */}
          <Route path="/onboardings/routine" element={<RoutinePage />} />

          {/* 온보딩 알림 설정 */}
          <Route path="/onboardings/push-guide" element={<PushGuidePage />} />
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
        </Route>

        {/* 커뮤니티 페이지의 상세페이지 */}
        <Route path="/lived/community" element={<SubLayout />}>
          {/* 게시물 상세페이지 */}
          <Route path=":postId" element={<PostDetailPage />} />
          {/* 게시글 작성페이지 */}
          <Route path="write" element={<PostWritingPage />} />
          {/* 커뮤니티 프로필 페이지 */}
          <Route path="profile/:userid" element={<CommunityProfilePage />} />
          {/* 게시글 검색페이지 */}
          <Route path="search" element={<PostSearchPage />} />
          {/* 게시글 편집페이지*/}
          <Route path=":postId/edit" element={<PostWritingPage />} />
        </Route>

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
