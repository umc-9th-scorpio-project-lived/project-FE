import { Outlet } from 'react-router-dom';

const SubLayout = () => {
  return (
    <div className="w-full h-dvh">
      <Outlet />
    </div>
  );
};

export default SubLayout;
