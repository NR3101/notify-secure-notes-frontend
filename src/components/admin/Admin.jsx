import { Route, Routes } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import UserList from "./UserList";
import UserDetails from "./UserDetails";
import AdminAuditLogs from "./AdminAuditLogs";
import AuditLogsDetails from "./AuditLogsDetails";
import useAuthStore from "../../store/authStore";

const Admin = () => {
  // Zustand store se sidebar state lena
  const { openSidebar } = useAuthStore();

  return (
    <div className="flex">
      {/* Admin Sidebar - fixed position with navigation links */}
      <AdminSidebar />

      {/* Main Content Area - margin left dynamically adjust hota hai sidebar ke state ke according */}
      <div
        className={`flex-1 transition-all duration-300 min-h-[calc(100vh-74px)] bg-gray-50 dark:bg-gray-900 ${
          openSidebar ? "ml-64" : "ml-16"
        }`}
      >
        <Routes>
          <Route path="audit-logs" element={<AdminAuditLogs />} />
          <Route path="audit-logs/:noteId" element={<AuditLogsDetails />} />
          <Route path="users" element={<UserList />} />
          <Route path="users/:userId" element={<UserDetails />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
