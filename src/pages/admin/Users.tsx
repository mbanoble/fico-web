
import { useState } from "react";
import { Eye, Search } from "lucide-react";
import DataTable from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

// Type for users
type User = {
  id: string;
  name: string;
  phone: string;
  email: string;
  registrationDate: string;
  totalLoans: number;
  status: "Active" | "Suspended";
};

// Type for user loan history
type UserLoan = {
  id: string;
  amount: number;
  date: string;
  status: string;
  repaidDate: string | null;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  // Empty array for user loan history - to be replaced with Supabase data
  const userLoanHistory: UserLoan[] = [];

  const handleViewDetails = (user: User) => {
    setSelectedUser(user);
    setViewModalOpen(true);
  };

  const handleStatusChange = (userId: string, newStatus: "Active" | "Suspended") => {
    // Update user status logic - to be replaced with Supabase call
    setUsers(users.map(user => 
      user.id === userId ? { ...user, status: newStatus } : user
    ));
    
    // Close modal if open
    setViewModalOpen(false);
    
    // Show toast notification
    toast({
      title: `User ${newStatus === "Active" ? "activated" : "suspended"}`,
      description: `The user has been ${newStatus === "Active" ? "activated" : "suspended"} successfully.`,
    });
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch = !searchQuery || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesStatus = !statusFilter || user.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const columns = [
    {
      header: "Name",
      accessorKey: "name" as keyof User,
    },
    {
      header: "Phone",
      accessorKey: "phone" as keyof User,
    },
    {
      header: "Registration Date",
      accessorKey: "registrationDate" as keyof User,
    },
    {
      header: "Total Loans",
      accessorKey: "totalLoans" as keyof User,
    },
    {
      header: "Status",
      accessorKey: "status" as keyof User,
      cell: (user: User) => {
        const statusColor = user.status === "Active" 
          ? "bg-green-100 text-green-800" 
          : "bg-red-100 text-red-800";
        
        return <Badge className={statusColor}>{user.status}</Badge>;
      },
    },
    {
      header: "Actions",
      accessorKey: "id" as keyof User,
      cell: (user: User) => (
        <Button size="sm" variant="outline" onClick={() => handleViewDetails(user)}>
          <Eye className="h-4 w-4 mr-1" />
          View Profile
        </Button>
      ),
    },
  ];

  return (
    <>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Users</h2>
          <p className="text-gray-500 mt-1">Manage registered application users</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row justify-between mb-6 space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                <Input
                  placeholder="Search by name, email or phone..."
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <Select onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <DataTable
              columns={columns}
              data={filteredUsers}
              emptyMessage="No users found matching the criteria"
            />
          </CardContent>
        </Card>
      </div>
      
      {/* View User Modal */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
          </DialogHeader>
          
          {selectedUser && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Name</p>
                  <p>{selectedUser.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p>{selectedUser.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p>{selectedUser.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Registration Date</p>
                  <p>{selectedUser.registrationDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Loans</p>
                  <p>{selectedUser.totalLoans}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <Badge className={
                    selectedUser.status === "Active" 
                      ? "bg-green-100 text-green-800" 
                      : "bg-red-100 text-red-800"
                  }>
                    {selectedUser.status}
                  </Badge>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3">Loan History</h4>
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Repaid Date</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userLoanHistory.length > 0 ? (
                        userLoanHistory.map((loan) => (
                          <tr key={loan.id}>
                            <td className="px-4 py-2">${loan.amount}</td>
                            <td className="px-4 py-2">{loan.date}</td>
                            <td className="px-4 py-2">
                              <Badge className={loan.status === "Repaid" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                                {loan.status}
                              </Badge>
                            </td>
                            <td className="px-4 py-2">{loan.repaidDate || "—"}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="px-4 py-2 text-center text-sm text-gray-500">No loan history available</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-2">
                <Button variant="outline" onClick={() => setViewModalOpen(false)}>
                  Close
                </Button>
                
                {selectedUser.status === "Active" ? (
                  <Button 
                    variant="destructive" 
                    onClick={() => handleStatusChange(selectedUser.id, "Suspended")}
                  >
                    Suspend User
                  </Button>
                ) : (
                  <Button 
                    variant="default"
                    onClick={() => handleStatusChange(selectedUser.id, "Active")}
                  >
                    Activate User
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Users;
