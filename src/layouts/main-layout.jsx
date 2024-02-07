import { Outlet } from "react-router-dom";
import AppNavbar from "src/components/app-navbar";

const MainLayout = () => {
  return (
    <div className="flex flex-col h-full overflow-auto">
      <AppNavbar />
      <div className="flex-1 overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
