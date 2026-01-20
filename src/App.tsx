import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/homes/HomePage";
import TreePage from "./pages/trees/TreePage";
import CommunityPage from "./pages/communities/CommunityPage";
import UserPage from "./pages/users/UserPage";
import ModalPage from "./pages/commons/ModalPage";
import SubLayout from "./layouts/SubLayout";
import LoginPage from "./pages/onboardings/LoginPage";
import PostWritingPage from "./pages/communities/PostWritingPage";
import CommunityProfilePage from "./pages/communities/CommunityProfilePage";
import PostSearchPage from "./pages/communities/PostSearchPage";
import PostDetailPage from "./pages/communities/PostDetailPage";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
