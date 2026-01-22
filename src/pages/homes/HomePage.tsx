import HomeHeader from "@/components/homes/HomeHeader";
import HomeContent from "@/components/homes/HomeContent";
import HomeFloatingButton from "@/components/homes/HomeFloatingButton";

const HomePage = () => {
  return (
    <div className="relative w-full h-full overflow-y-hidden">
      <HomeHeader />
      <HomeContent />
      <div className="absolute bottom-4 right-4">
        <HomeFloatingButton />
      </div>
    </div>
  );
};

export default HomePage;
