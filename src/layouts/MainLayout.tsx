import Footer from '@/components/commons/Footer';
import HomeFloatingButton from '@/components/homes/HomeFloatingButton';
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout = () => {
  const { pathname } = useLocation();

  const showFloating = pathname.startsWith('/lived');

  return (
    <div className="w-full h-dvh">
      <Outlet />
      {showFloating && (
        <div className="fixed right-4 bottom-29 z-50">
          <HomeFloatingButton />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default MainLayout;
