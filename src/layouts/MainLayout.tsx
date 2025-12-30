import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Outlet />
      {/* <NavTap />
      <Footer /> */}
    </>
  );
};

export default MainLayout;
