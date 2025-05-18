
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, Users, FileText, BarChart, Mail, Settings, LogOut 
} from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { cn } from "@/lib/utils";

const AdminSidebar = () => {
  const { admin, logout } = useAdminAuth();

  const navItems = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
    { name: "Loan Requests", path: "/admin/loan-requests", icon: FileText },
    { name: "Users", path: "/admin/users", icon: Users },
    { name: "Repayments", path: "/admin/repayments", icon: FileText },
    { name: "Analytics", path: "/admin/analytics", icon: BarChart },
    { name: "Notifications", path: "/admin/notifications", icon: Mail },
  ];

  if (admin?.isSuperAdmin) {
    navItems.push({ name: "Admin Management", path: "/admin/admins", icon: Settings });
  }

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-64 bg-white border-r h-screen flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">Fico Point</h2>
        <p className="text-sm text-gray-600">Admin Dashboard</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-all",
              isActive 
                ? "bg-gray-100 text-gray-900 font-medium" 
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
            end={item.path === "/admin"}
          >
            <item.icon size={18} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div className="p-4 border-t">
        <button 
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-md transition-all"
        >
          <LogOut size={18} />
          <span>Log out</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
