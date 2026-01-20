import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/homes/HomePage";
import TreePage from "./pages/trees/TreePage";
import CommunityPage from "./pages/communities/CommunityPage";
import UserPage from "./pages/users/UserPage";
import ModalPage from "./pages/commons/ModalPage";
import SubLayout from "./layouts/SubLayout";
import LoginPage from "./pages/onboardings/LoginPage";
import BasicInfoPage from "./pages/onboardings/BasicInfoPage";
import ConcernPage from "./pages/onboardings/ConcernPage";
import RoutinePage from "./pages/onboardings/RoutinePage";
import PushGuidePage from "./pages/onboardings/PushGuidePage";

function App() {
  return (
    <BrowserRouter>
      <ModalPage />
      <Routes>
        <Route element={<SubLayout />}>
          {/* 로그인 */}
          <Route path="/" element={<LoginPage />} />

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
