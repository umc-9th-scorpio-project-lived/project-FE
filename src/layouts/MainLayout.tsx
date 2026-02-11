import Footer from '@/components/commons/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="w-full h-dvh">
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainLayout;
