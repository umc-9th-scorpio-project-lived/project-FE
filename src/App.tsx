import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import SubLayout from './layouts/SubLayout';
import ModalPage from './pages/commons/ModalPage';
import LoginPage from './pages/onboardings/LoginPage';
import HomePage from './pages/homes/HomePage';
import TreePage from './pages/trees/TreePage';
import CommunityPage from './pages/communities/CommunityPage';
import UserPage from './pages/users/UserPage';

import CreateRoutinePage from './pages/homes/CreateRoutinePage';
import EditRoutinePage from './pages/homes/EditRoutinePage';
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
import RoutinePage from './pages/onboardings/RoutinePage';
import ToastPage from './pages/commons/ToastPage';
import EditCommentPage from './pages/communities/EditCommentPage';
import CommunityLayout from './layouts/CommunityLayout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ArchivedTreePage from './pages/trees/ArchivedTreePage';
import FriendTreeArchivePage from './pages/trees/FriendTreeArchivePage';
import AcceptInvitePage from './pages/commons/AcceptInvitePage';
import SplashPage from './pages/commons/SplashPage';
import ScrollToTop from './components/commons/ScrollToTop';
import ProtectedRoute from './components/commons/ProtectedRoute';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ScrollToTop />
        <ModalPage />
        <ToastPage />

        <Routes>
          {/* 스플래시 스크린 */}
          <Route path="/" element={<SplashPage />} />

          {/* 콜백 페이지 */}
          <Route path="/login/callback" element={<CallbackPage />} />
          <Route path="/signup/callback" element={<CallbackPage />} />
          <Route path="/accept-invite" element={<AcceptInvitePage />} />

          {/* 서브 레이아웃 영역 */}
          <Route element={<SubLayout />}>
            {/* 로그인 */}
            <Route path="/login" element={<LoginPage />} />

            {/* 온보딩 관련 페이지 */}
            {/* 온보딩 기본 정보 */}
            <Route path="/onboardings/basic-info" element={<BasicInfoPage />} />
            {/* 온보딩 자취 고민 */}
            <Route path="/onboardings/concern" element={<ConcernPage />} />
            {/* 온보딩 맞춤 루틴 */}
            <Route path="/onboardings/routine" element={<RoutinePage />} />
            {/* 온보딩 알림 설정 */}
            <Route path="/onboardings/push-guide" element={<PushGuidePage />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            {/* 메인 레이아웃 영역 */}
            <Route path="/lived" element={<MainLayout />}>
              <Route index element={<HomePage />} />
              <Route path="tree" element={<TreePage />} />
              <Route path="community" element={<CommunityPage />} />
              <Route path="my" element={<UserPage />} />
            </Route>

            {/* 홈 페이지의 상세 페이지 */}
            <Route element={<SubLayout />}>
              {/* 루틴 생성페이지 */}
              <Route path="/lived/create" element={<CreateRoutinePage />} />
              {/* 루틴 수정페이지 */}
              <Route
                path="/lived/edit/:memberRoutineId"
                element={<EditRoutinePage />}
              />
              {/* 알림 페이지 */}
              <Route path="/lived/alarm" element={<AlarmPage />} />
              {/* 루틴 추천 페이지 */}
              <Route path="/lived/recommend" element={<RecommendPage />} />
            </Route>

            {/* 루틴 나무 페이지의 상세 페이지 */}
            <Route path="/lived/tree" element={<SubLayout />}>
              {/* 특정 달의 루틴 나무 페이지 */}
              <Route path="archivedTree" element={<ArchivedTreePage />} />
              <Route path="tracker" element={<RoutineTrackerPage />} />
              <Route path="friend/:friendId" element={<FriendTreePage />} />
              <Route path="statistics" element={<StatisticsPage />} />
              <Route path="archive" element={<TreeArchivePage />} />
              <Route
                path="friendArchive/:friendId"
                element={<FriendTreeArchivePage />}
              />
            </Route>

            {/* 커뮤니티 페이지의 상세페이지 */}
            <Route path="/lived/community" element={<SubLayout />}>
              <Route element={<CommunityLayout />}>
                {/* 게시물 상세페이지 */}
                <Route path=":postId" element={<PostDetailPage />} />
                {/* 게시글 작성페이지 */}
                <Route path="write" element={<PostWritingPage />} />
                {/* 커뮤니티 프로필 페이지 */}
                <Route path="profile" element={<CommunityProfilePage />} />
                {/* 게시글 검색페이지 */}
                <Route path="search" element={<PostSearchPage />} />
                {/* 게시글 편집페이지 */}
                <Route path=":postId/edit" element={<PostWritingPage />} />
                {/* 댓글 수정페이지 */}
                <Route
                  path=":postId/comments/:commentId/edit"
                  element={<EditCommentPage />}
                />
              </Route>
            </Route>

            {/* 마이 페이지의 상세 페이지 */}
            <Route path="/lived/my" element={<SubLayout />}>
              {/* 공지사항 */}
              <Route path="notice" element={<NoticePage />} />
              {/* 문의하기 */}
              <Route path="inquiry" element={<InquiryPage />} />
              {/* 정보 */}
              <Route path="info" element={<InfoPage />} />
              {/* 계정 관리 */}
              <Route path="account" element={<AccountPage />} />
              {/* 알림 설정 */}
              <Route path="notifications" element={<NotificationsPage />} />
              {/* 개인정보보호 */}
              <Route path="privacy" element={<PrivacyPage />} />
              {/* 차단 목록 */}
              <Route path="privacy/blocked" element={<BlockedPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
