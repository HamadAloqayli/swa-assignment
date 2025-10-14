import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Monitor,
  Users,
  DollarSign,
  Scale,
  Briefcase,
  Shield,
  FileCheck,
  User,
} from "lucide-react";
import { user } from "../data/mockData";
import logo from "../assets/swa_logo.jpg";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: "/", label: "لوحة التحكم", icon: LayoutDashboard },
    { path: "/it", label: "تقنية المعلومات", icon: Monitor },
    { path: "/hr", label: "الموارد البشرية", icon: Users },
    { path: "/finance", label: "المالية", icon: DollarSign },
    { path: "/law", label: "الشؤون القانونية", icon: Scale },
    { path: "/pmo", label: "إدارة المشاريع", icon: Briefcase },
    { path: "/cyber", label: "الأمن السيبراني", icon: Shield },
    { path: "/audit", label: "التدقيق الداخلي", icon: FileCheck },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="h-screen w-64 bg-white flex flex-col shadow-xl border-l border-gray-200 sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-center mb-3">
          <img src={logo} alt="SWA Logo" className="h-24 w-24 object-contain" />
        </div>
        <h1 className="text-xl font-bold text-center text-gray-800">
          الهئية السعودية للمياه
        </h1>
        <p className="text-center text-xs text-gray-500 mt-1">
          نظام إدارة الوثائق
        </p>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-4 mb-2 rounded-lg transition-all duration-200 group ${
              isActive(item.path)
                ? "bg-primary-50 text-primary-600 font-semibold"
                : "text-gray-700 hover:bg-gray-100"
            }`}
          >
            <item.icon
              size={22}
              className={`transition-transform duration-200 ${
                isActive(item.path)
                  ? "text-primary-600"
                  : "group-hover:scale-110"
              }`}
            />
            <span className="font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>

      {/* Profile Section */}
      <div className="border-t border-gray-200 p-3">
        <Link
          to="/profile"
          className={`flex items-center gap-3 px-4 py-4 rounded-lg transition-all duration-200 group ${
            isActive("/profile")
              ? "bg-primary-50 text-primary-600"
              : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <div className="relative">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isActive("/profile")
                  ? "bg-primary-600"
                  : "bg-gray-300 group-hover:bg-primary-500"
              } transition-colors duration-200`}
            >
              <User size={20} className="text-white" />
            </div>
            <div className="absolute bottom-0 left-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p
              className={`text-sm font-semibold truncate ${
                isActive("/profile") ? "text-primary-600" : "text-gray-800"
              }`}
            >
              {user.name}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.position}</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
