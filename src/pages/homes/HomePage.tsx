import HomeHeader from '@/components/homes/HomeHeader';
import HomeContent from '@/components/homes/HomeContent';
import RoutineSnackbar from '@/components/commons/RoutineSnackbar';
import { useEffect } from 'react';
import { useSnackbarStore } from '@/stores/homes/snackbarStore';

const HomePage = () => {
  useEffect(() => {
    return () => {
      useSnackbarStore.getState().hide();
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-y-hidden pb-25">
      <HomeHeader />
      <HomeContent />
      <div className="absolute bottom-28 w-full z-10 px-4">
        <RoutineSnackbar />
      </div>
    </div>
  );
};

export default HomePage;
