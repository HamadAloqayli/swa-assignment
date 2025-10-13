import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex min-h-screen">
      {/* Main Content - Left Side */}
      <main className="flex-1 p-8 min-h-screen order-2">
        <div className="max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Sidebar - Right Side */}
      <div className="w-64 order-1">
        <Sidebar />
      </div>
    </div>
  );
};

export default Layout;
