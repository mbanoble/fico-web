
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import DataTable from "@/components/admin/DataTable";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Badge } from "@/components/ui/badge";

// Type for admin users
type AdminUser = {
  id: string;
  username: string;
  email: string;
  role: string;
  lastLogin?: string;
  isSuperAdmin: boolean;
};

const AdminsManagement = () => {
  const { admin, adminUsers, addAdmin, removeAdmin } = useAdminAuth();
  const [isNewAdminDialogOpen, setIsNewAdminDialogOpen] = useState(false);
  const [newAdminUsername, setNewAdminUsername] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [adminToRemove, setAdminToRemove] = useState<AdminUser | null>(null);

  // Transform adminUsers to the format expected by the DataTable
  const formattedAdminUsers = adminUsers.map(user => ({
    id: user.id,
    username: user.username,
    email: user.email || 'N/A',
    role: user.isSuperAdmin ? 'Super Admin' : 'Admin',
    lastLogin: 'N/A',
    isSuperAdmin: user.isSuperAdmin
  }));

  const handleAddNewAdmin = () => {
    if (!newAdminUsername || !newAdminEmail || !newAdminPassword) {
      toast({
        title: "Missing information",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Check if username already exists
    if (adminUsers.some(a => a.username === newAdminUsername)) {
      toast({
        title: "Username already exists",
        description: "Please choose a different username",
        variant: "destructive",
      });
      return;
    }

    // Add new admin
    const newAdmin = {
      id: Date.now().toString(), // Simple ID generation
      username: newAdminUsername,
      email: newAdminEmail,
      isSuperAdmin: false
    };
    
    addAdmin(newAdmin, newAdminPassword);
    
    toast({
      title: "Admin added",
      description: `New admin ${newAdminUsername} has been created successfully.`,
    });
    
    setNewAdminUsername("");
    setNewAdminEmail("");
    setNewAdminPassword("");
    setIsNewAdminDialogOpen(false);
  };

  const handleRemoveAdmin = () => {
    if (adminToRemove) {
      removeAdmin(adminToRemove.id);
      
      toast({
        title: "Admin removed",
        description: `Admin ${adminToRemove.username} has been removed successfully.`,
      });
      
      setAdminToRemove(null);
    }
  };

  const columns = [
    {
      header: "Username",
      accessorKey: "username" as keyof AdminUser,
    },
    {
      header: "Email",
      accessorKey: "email" as keyof AdminUser,
    },
    {
      header: "Role",
      accessorKey: "role" as keyof AdminUser,
      cell: (user: AdminUser) => {
        const isSuper = user.role === "Super Admin";
        return (
          <Badge className={isSuper ? "bg-purple-100 text-purple-800" : "bg-blue-100 text-blue-800"}>
            {user.role}
          </Badge>
        );
      },
    },
    {
      header: "Last Login",
      accessorKey: "lastLogin" as keyof AdminUser,
    },
    {
      header: "Actions",
      accessorKey: "id" as keyof AdminUser,
      cell: (user: AdminUser) => (
        // Only allow removing non-superadmin accounts and don't allow removing self
        admin?.isSuperAdmin && user.role !== "Super Admin" && user.username !== admin?.username ? (
          <Button 
            variant="outline" 
            size="sm" 
            className="text-red-600 border-red-600 hover:bg-red-50"
            onClick={() => setAdminToRemove(user)}
          >
            Remove
          </Button>
        ) : (
          <span className="text-sm text-gray-500">No action</span>
        )
      ),
    },
  ];

  if (!admin?.isSuperAdmin) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-500">You don't have permission to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Admin Management</h2>
            <p className="text-gray-500 mt-1">Manage administrator accounts</p>
          </div>
          
          <Button onClick={() => setIsNewAdminDialogOpen(true)}>Add New Admin</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Administrator Accounts</CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable 
              columns={columns} 
              data={formattedAdminUsers} 
              emptyMessage="No administrator accounts available yet"
            />
          </CardContent>
        </Card>
      </div>
      
      {/* Add New Admin Dialog */}
      <Dialog open={isNewAdminDialogOpen} onOpenChange={setIsNewAdminDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Administrator</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Username</label>
              <Input 
                placeholder="Enter admin username" 
                value={newAdminUsername}
                onChange={(e) => setNewAdminUsername(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input 
                type="email"
                placeholder="Enter admin email" 
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <Input 
                type="password"
                placeholder="Enter admin password" 
                value={newAdminPassword}
                onChange={(e) => setNewAdminPassword(e.target.value)}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNewAdminDialogOpen(false)}>Cancel</Button>
            <Button 
              onClick={handleAddNewAdmin} 
              disabled={!newAdminUsername || !newAdminEmail || !newAdminPassword}
            >
              Add Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Remove Admin Confirmation Dialog */}
      <Dialog open={!!adminToRemove} onOpenChange={() => setAdminToRemove(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove Administrator</DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p>
              Are you sure you want to remove admin <span className="font-medium">{adminToRemove?.username}</span>?
              This action cannot be undone.
            </p>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setAdminToRemove(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleRemoveAdmin}>Remove</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AdminsManagement;
