import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu, X } from "lucide-react";

const Layout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Mobile Menu Button - Only visible on mobile */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-4 right-4 z-50 lg:hidden bg-primary-600 text-white p-3 rounded-lg shadow-lg hover:bg-primary-700 transition-colors"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - Fixed on all screens */}
      <aside
        className={`
        fixed top-0 right-0
        w-64 h-screen
        z-50
        transform transition-transform duration-300
        ${
          isMobileMenuOpen
            ? "translate-x-0"
            : "translate-x-full lg:translate-x-0"
        }
      `}
      >
        <Sidebar onClose={() => setIsMobileMenuOpen(false)} />
      </aside>

      {/* Main Content - With padding for fixed sidebar on desktop */}
      <main className="min-h-screen p-4 md:p-6 lg:p-8 lg:pr-72">
        <div className="max-w-[1600px] mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
