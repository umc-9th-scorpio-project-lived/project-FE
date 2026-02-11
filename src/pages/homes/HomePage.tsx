import HomeHeader from '@/components/homes/HomeHeader';
import HomeContent from '@/components/homes/HomeContent';
import RoutineSnackbar from '@/components/commons/RoutineSnackbar';

const HomePage = () => {
  return (
    <div className="relative w-full h-full overflow-y-hidden pb-25">
      <HomeHeader />
      <HomeContent />
      <RoutineSnackbar />
    </div>
  );
};

export default HomePage;
