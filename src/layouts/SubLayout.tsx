import { Outlet } from 'react-router-dom';

const SubLayout = () => {
  return (
    <div className="h-dvh w-full">
      <Outlet />
    </div>
  );
};

export default SubLayout;
