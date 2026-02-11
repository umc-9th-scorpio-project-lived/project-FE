import BottomSplashFruit from '@/components/commons/BottomSplashFruit';
import EmptyTree from '@/components/commons/EmptyTree';
import MiddleSplashFruit from '@/components/commons/MiddleSplashFruit';
import TopSplashFruit from '@/components/commons/TopSplashFruit';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const t = window.setTimeout(() => {
      navigate('/login', { replace: true });
    }, 2000);

    return () => window.clearTimeout(t);
  }, [navigate]);

  return (
    <div className="h-dvh w-full flex flex-col items-center justify-start pt-33.75">
      <div className="relative">
        <EmptyTree />

        <TopSplashFruit className="absolute top-7.5 left-1/3 -translate-x-1/2 animate-fruitAppear" />
        <MiddleSplashFruit className="absolute top-15 right-5 animate-fruitAppear" />
        <BottomSplashFruit className="absolute top-22.5 left-5.5 animate-fruitAppear" />
      </div>

      <div className="mt-6 flex flex-col items-center">
        <span className="typo-h1_bold24 text-gray-900">살아보니,</span>
        <span className="typo-body_reg18 text-gray-900">열매가 맺히더라</span>
      </div>
    </div>
  );
};

export default SplashPage;
