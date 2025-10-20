import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, Users, FileText } from "lucide-react";
import { cn } from "../../lib/utils";
import useAuthStore from "../../store/authStore";

const AdminSidebar = () => {
  // Zustand store se sidebar state manage karte hain
  const { openSidebar, setOpenSidebar } = useAuthStore();

  // Current path ko track karte hain active link dikhane ke liye
  const pathName = useLocation().pathname;

  return (
    <div
      className={cn(
        "fixed top-[74px] left-0 h-[calc(100vh-74px)] z-20 bg-gradient-to-b from-gray-900 to-gray-800 transition-all duration-300 border-r border-gray-700",
        openSidebar ? "w-64" : "w-16"
      )}
    >
      {/* Sidebar Toggle Button */}
      <div className="p-3 flex justify-end border-b border-gray-700">
        <button
          onClick={() => setOpenSidebar(!openSidebar)}
          className="text-white hover:bg-gray-700 p-2 rounded-lg transition-colors"
          title={openSidebar ? "Close Sidebar" : "Expand Sidebar"}
        >
          {openSidebar ? (
            <ChevronLeft className="w-5 h-5" />
          ) : (
            <ChevronRight className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Sidebar Navigation Links */}
      <nav className="flex flex-col gap-2 p-3">
        {/* All Users Link */}
        <Link
          to="/admin/users"
          className={cn(
            "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
            pathName.startsWith("/admin/users")
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          )}
          title={!openSidebar ? "All Users" : ""}
        >
          <Users className="w-5 h-5 shrink-0" />
          <span
            className={cn(
              "font-medium transition-opacity duration-300",
              !openSidebar && "opacity-0 w-0"
            )}
          >
            All Users
          </span>
        </Link>

        {/* Audit Logs Link */}
        <Link
          to="/admin/audit-logs"
          className={cn(
            "flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200",
            pathName.startsWith("/admin/audit-logs")
              ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
              : "text-gray-300 hover:bg-gray-700 hover:text-white"
          )}
          title={!openSidebar ? "Audit Logs" : ""}
        >
          <FileText className="w-5 h-5 shrink-0" />
          <span
            className={cn(
              "font-medium transition-opacity duration-300",
              !openSidebar && "opacity-0 w-0"
            )}
          >
            Audit Logs
          </span>
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
