
import { Bell, Search } from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const AdminHeader = () => {
  const { admin } = useAdminAuth();

  return (
    <header className="bg-white border-b px-6 py-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2 w-1/3">
          <Search size={18} className="text-gray-400" />
          <Input 
            type="text" 
            placeholder="Search..." 
            className="border-0 shadow-none focus-visible:ring-0"
          />
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={18} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </Button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="font-medium text-sm text-gray-600">
                {admin?.username.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium">{admin?.username}</p>
              <p className="text-xs text-gray-500">
                {admin?.isSuperAdmin ? "Super Admin" : "Admin"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
