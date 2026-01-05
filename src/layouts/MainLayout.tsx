import Footer from "@/components/commons/Footer";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <Outlet />
      {/* <NavTap /> */}
      <Footer />
    </>
  );
};

export default MainLayout;
